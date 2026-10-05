import dns from "node:dns/promises";
import net from "node:net";

export type BrandSignals = {
  fetched: boolean;
  finalUrl?: string;
  pageTitle?: string;
  metaDescription?: string;
  colors: Array<{ value: string; count: number }>;
  fonts: Array<{ value: string; count: number }>;
  cssFilesScanned: number;
  note?: string;
};

function isPrivateIp(ip: string) {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split(".").map(Number);
    return (
      a === 10 ||
      a === 127 ||
      a === 0 ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168)
    );
  }
  if (net.isIPv6(ip)) {
    const value = ip.toLowerCase();
    return value === "::1" || value.startsWith("fc") || value.startsWith("fd") || value.startsWith("fe80:");
  }
  return true;
}

async function assertPublicUrl(value: string) {
  const url = new URL(value);
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("Unsupported protocol");
  const hostname = url.hostname.toLowerCase();
  if (hostname === "localhost" || hostname.endsWith(".local")) throw new Error("Private hostname");
  if (net.isIP(hostname) && isPrivateIp(hostname)) throw new Error("Private IP");
  if (!net.isIP(hostname)) {
    const addresses = await dns.lookup(hostname, { all: true, verbatim: true });
    if (!addresses.length || addresses.some((item) => isPrivateIp(item.address))) throw new Error("Private or unresolved host");
  }
  return url;
}

async function safeFetchText(value: string, redirects = 0): Promise<{ text: string; url: string }> {
  if (redirects > 3) throw new Error("Too many redirects");
  const url = await assertPublicUrl(value);
  const response = await fetch(url, {
    redirect: "manual",
    signal: AbortSignal.timeout(7000),
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; StrictonsResearch/1.0)",
      Accept: "text/html,text/css;q=0.9,*/*;q=0.7",
    },
  });
  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get("location");
    if (!location) throw new Error("Redirect without location");
    return safeFetchText(new URL(location, url).toString(), redirects + 1);
  }
  if (!response.ok) throw new Error("Website returned " + response.status);
  const length = Number(response.headers.get("content-length") || "0");
  if (length > 2_500_000) throw new Error("Response too large");
  const text = await response.text();
  if (text.length > 2_500_000) throw new Error("Response too large");
  return { text, url: response.url || url.toString() };
}

function topValues(values: string[], limit: number) {
  const counts = new Map<string, number>();
  for (const raw of values) {
    const value = raw.trim().replace(/[;)}]+$/g, "");
    if (!value || value.length > 90) continue;
    counts.set(value, (counts.get(value) || 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([value, count]) => ({ value, count }));
}

function extractSignals(css: string) {
  const colors = css.match(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g) || [];
  const fontMatches = [...css.matchAll(/font-family\s*:\s*([^;}{]+)/gi)].map((match) =>
    match[1].replace(/["']/g, "").split(",")[0].trim(),
  );
  const googleFamilies = [...css.matchAll(/family=([^&"']+)/gi)].map((match) =>
    decodeURIComponent(match[1]).replace(/\+/g, " ").split(":")[0],
  );
  return { colors, fonts: [...fontMatches, ...googleFamilies] };
}

function firstMatch(text: string, pattern: RegExp) {
  const match = text.match(pattern);
  return match?.[1]?.replace(/\s+/g, " ").trim();
}

export async function scanBrandSignals(website: string): Promise<BrandSignals> {
  try {
    const page = await safeFetchText(website);
    const pageUrl = new URL(page.url);
    const title = firstMatch(page.text, /<title[^>]*>([\s\S]*?)<\/title>/i);
    const description = firstMatch(
      page.text,
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    ) || firstMatch(
      page.text,
      /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["'][^>]*>/i,
    );

    const inlineCss = [
      ...[...page.text.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((match) => match[1]),
      ...[...page.text.matchAll(/style=["']([^"']+)["']/gi)].map((match) => match[1]),
      ...[...page.text.matchAll(/<meta[^>]+name=["']theme-color["'][^>]+content=["']([^"']+)["'][^>]*>/gi)].map((match) => "color:" + match[1]),
    ].join("\n");

    const hrefs = [...page.text.matchAll(/<link[^>]+href=["']([^"']+\.css(?:\?[^"']*)?)["'][^>]*>/gi)]
      .map((match) => match[1])
      .map((href) => new URL(href, pageUrl).toString())
      .filter((href, index, all) => all.indexOf(href) === index)
      .filter((href) => new URL(href).hostname === pageUrl.hostname)
      .slice(0, 4);

    const cssChunks = [inlineCss];
    let cssFilesScanned = 0;
    for (const href of hrefs) {
      try {
        const css = await safeFetchText(href);
        cssChunks.push(css.text);
        cssFilesScanned += 1;
      } catch {
        // A blocked stylesheet should not prevent the research report.
      }
    }

    const signals = extractSignals(cssChunks.join("\n"));
    return {
      fetched: true,
      finalUrl: page.url,
      pageTitle: title,
      metaDescription: description,
      colors: topValues(signals.colors.map((value) => value.toUpperCase()), 12),
      fonts: topValues(signals.fonts, 10),
      cssFilesScanned,
      note: "Technical signals are extracted from the public homepage and same-host CSS. Repeated utility colours may not be official brand colours.",
    };
  } catch (error) {
    return {
      fetched: false,
      colors: [],
      fonts: [],
      cssFilesScanned: 0,
      note: error instanceof Error ? "Direct website scan unavailable: " + error.message : "Direct website scan unavailable.",
    };
  }
}
