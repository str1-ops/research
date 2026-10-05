import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Strictons Research",
  description: "Hotel intelligence and guide strategy for Strictons Signature Hotel Guides.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
