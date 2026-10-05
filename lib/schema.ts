const evidenceFields = {
  basis: { type: "string", enum: ["OBSERVED", "INFERRED", "RECOMMENDED"] },
  confidence: { type: "string", enum: ["HIGH", "MEDIUM", "LOW"] },
  evidenceIds: { type: "array", items: { type: "string" } },
};

export const researchSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    meta: {
      type: "object",
      additionalProperties: false,
      properties: {
        hotelName: { type: "string" },
        website: { type: "string" },
        location: { type: "string" },
        generatedAt: { type: "string" },
        researchSummary: { type: "string" },
      },
      required: ["hotelName", "website", "location", "generatedAt", "researchSummary"],
    },
    executiveSummary: {
      type: "object",
      additionalProperties: false,
      properties: {
        positioning: { type: "string" },
        opportunity: { type: "string" },
        recommendedAngle: { type: "string" },
        keyPrinciples: { type: "array", items: { type: "string" } },
      },
      required: ["positioning", "opportunity", "recommendedAngle", "keyPrinciples"],
    },
    brand: {
      type: "object",
      additionalProperties: false,
      properties: {
        essence: { type: "string" },
        tone: { type: "array", items: { type: "string" } },
        visualDirection: { type: "string" },
        colors: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              name: { type: "string" },
              hex: { type: "string" },
              usage: { type: "string" },
              ...evidenceFields,
            },
            required: ["name", "hex", "usage", "basis", "confidence", "evidenceIds"],
          },
        },
        typography: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              role: { type: "string" },
              family: { type: "string" },
              style: { type: "string" },
              ...evidenceFields,
            },
            required: ["role", "family", "style", "basis", "confidence", "evidenceIds"],
          },
        },
        photography: { type: "array", items: { type: "string" } },
        designDos: { type: "array", items: { type: "string" } },
        designDonts: { type: "array", items: { type: "string" } },
      },
      required: ["essence", "tone", "visualDirection", "colors", "typography", "photography", "designDos", "designDonts"],
    },
    guestProfiles: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          name: { type: "string" },
          importance: { type: "string", enum: ["HIGH", "MEDIUM", "LOW"] },
          description: { type: "string" },
          needs: { type: "array", items: { type: "string" } },
          guideImplications: { type: "array", items: { type: "string" } },
          ...evidenceFields,
        },
        required: ["name", "importance", "description", "needs", "guideImplications", "basis", "confidence", "evidenceIds"],
      },
    },
    hotelOfferings: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          name: { type: "string" },
          category: { type: "string" },
          summary: { type: "string" },
          commercialPriority: { type: "string", enum: ["HIGH", "MEDIUM", "LOW"] },
          guideTreatment: { type: "string" },
          conflictImplication: { type: "string" },
          ...evidenceFields,
        },
        required: ["name", "category", "summary", "commercialPriority", "guideTreatment", "conflictImplication", "basis", "confidence", "evidenceIds"],
      },
    },
    neighbourhood: {
      type: "object",
      additionalProperties: false,
      properties: {
        character: { type: "string" },
        travelLogic: { type: "string" },
        strengths: { type: "array", items: { type: "string" } },
        gaps: { type: "array", items: { type: "string" } },
        zones: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              name: { type: "string" },
              distance: { type: "string" },
              role: { type: "string" },
              opportunities: { type: "array", items: { type: "string" } },
              evidenceIds: { type: "array", items: { type: "string" } },
            },
            required: ["name", "distance", "role", "opportunities", "evidenceIds"],
          },
        },
      },
      required: ["character", "travelLogic", "strengths", "gaps", "zones"],
    },
    categoryStrategy: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          category: { type: "string" },
          status: { type: "string", enum: ["PURSUE", "SELECTIVE", "AVOID"] },
          priority: { type: "string", enum: ["HIGH", "MEDIUM", "LOW"] },
          targetCount: { type: "integer", minimum: 0, maximum: 12 },
          rationale: { type: "string" },
          guestValue: { type: "string" },
          conflictNote: { type: "string" },
        },
        required: ["category", "status", "priority", "targetCount", "rationale", "guestValue", "conflictNote"],
      },
    },
    guideStructure: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          order: { type: "integer" },
          title: { type: "string" },
          purpose: { type: "string" },
          include: { type: "array", items: { type: "string" } },
          commercialRole: { type: "string" },
        },
        required: ["order", "title", "purpose", "include", "commercialRole"],
      },
    },
    flatplan: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          pages: { type: "string" },
          title: { type: "string" },
          layout: { type: "string" },
          content: { type: "array", items: { type: "string" } },
          rationale: { type: "string" },
        },
        required: ["pages", "title", "layout", "content", "rationale"],
      },
    },
    unresolvedQuestions: { type: "array", items: { type: "string" } },
    sources: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          url: { type: "string" },
          publisher: { type: "string" },
          whyUsed: { type: "string" },
        },
        required: ["id", "title", "url", "publisher", "whyUsed"],
      },
    },
  },
  required: [
    "meta",
    "executiveSummary",
    "brand",
    "guestProfiles",
    "hotelOfferings",
    "neighbourhood",
    "categoryStrategy",
    "guideStructure",
    "flatplan",
    "unresolvedQuestions",
    "sources"
  ],
} as const;
