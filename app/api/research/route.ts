import OpenAI from "openai";
import { NextResponse } from "next/server";
import { buildResearchPrompt } from "@/lib/prompt";
import { scanBrandSignals } from "@/lib/brand-scan";
import { researchSchema } from "@/lib/schema";
import type { ResearchRequest } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 300;

function validateBody(body: Partial<ResearchRequest>) {
  if (!body.hotelName?.trim()) return "Hotel name is required.";
  if (!body.website?.trim()) return "Hotel website is required.";
  if (!body.location?.trim()) return "Hotel location is required.";
  try {
    const url = new URL(body.website);
    if (!["http:", "https:"].includes(url.protocol)) return "Website must use http or https.";
  } catch {
    return "Please enter a valid hotel website URL.";
  }
  return null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ResearchRequest>;
    const validationError = validateBody(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is not configured on this deployment." },
        { status: 500 },
      );
    }

    const input: ResearchRequest = {
      hotelName: body.hotelName!.trim(),
      website: body.website!.trim(),
      location: body.location!.trim(),
      notes: body.notes?.trim() || "",
      depth: body.depth === "deep" ? "deep" : "standard",
    };

    const brandSignals = await scanBrandSignals(input.website);

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const model = process.env.OPENAI_MODEL || "gpt-5.5";

    const response = await client.responses.create({
      model,
      reasoning: { effort: input.depth === "deep" ? "high" : "medium" },
      tools: [
        {
          type: "web_search",
          search_context_size: input.depth === "deep" ? "high" : "medium",
        },
      ],
      tool_choice: "required",
      input: [
        {
          role: "system",
          content:
            "You are a rigorous hospitality research strategist. Search before making factual claims, preserve uncertainty, and produce the requested structured report.",
        },
        { role: "user", content: buildResearchPrompt(input, brandSignals) },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "strictons_hotel_research",
          strict: true,
          schema: researchSchema as unknown as Record<string, unknown>,
        },
      },
      max_output_tokens: input.depth === "deep" ? 18000 : 12000,
    });

    if (!response.output_text) {
      return NextResponse.json({ error: "The research model returned no report." }, { status: 502 });
    }

    const report = JSON.parse(response.output_text);
    return NextResponse.json({ report });
  } catch (error) {
    console.error("Research generation failed", error);
    const message = error instanceof Error ? error.message : "Research failed unexpectedly.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
