# Strictons Research

An internal hotel-intelligence and guide-strategy tool for **Strictons Signature Hotel Guides**.

Give it a hotel name, official website and location. The tool uses live web research to produce an evidence-led research brief covering:

- hotel positioning and strategic guide angle
- brand interpretation, colour and typography direction
- guest missions and guide implications
- in-house amenities, programmes and commercial offerings
- neighbourhood travel logic
- partner-category compatibility (Pursue / Selective / Avoid)
- recommended guide structure
- a practical 16-page flatplan
- source list and unresolved questions

The core principle is to keep **facts, inference and recommendations separate** so the Strictons team can see what is verified and what requires judgement.

## Deploy on Vercel

1. Import this GitHub repository into Vercel.
2. Add an environment variable named `OPENAI_API_KEY` with your OpenAI API key.
3. Optional: add `OPENAI_MODEL` to override the default model (`gpt-5.5`).
4. Deploy.

No database is required for the MVP. Saved briefs are stored in the browser's local storage, and each report can be exported as JSON or printed/saved as a PDF.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open `http://localhost:3000`.

## How research works

The server route uses the OpenAI Responses API with the hosted web-search tool and a strict JSON schema. It is instructed to prioritise the hotel's official website for hotel facts, research the surrounding destination, preserve uncertainty, and build Strictons-specific commercial conflict logic rather than generic travel recommendations.

Two research depths are available:

- **Standard** — balanced speed and synthesis.
- **Deep** — higher reasoning effort and more web-search context for important prospects.

## Product boundaries in this version

This first version deliberately does **not** try to replace InDesign or produce finished artwork. It creates the strategic brief that should exist before design begins. It also recommends business categories rather than automatically selecting paid partners.

Likely next layers are shared team storage/authentication, editable reports, actual candidate-business prospecting, CRM status, and an InDesign publishing handoff.
