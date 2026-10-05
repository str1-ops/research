export type Basis = "OBSERVED" | "INFERRED" | "RECOMMENDED";
export type Confidence = "HIGH" | "MEDIUM" | "LOW";
export type CategoryStatus = "PURSUE" | "SELECTIVE" | "AVOID";
export type Priority = "HIGH" | "MEDIUM" | "LOW";

export interface Source {
  id: string;
  title: string;
  url: string;
  publisher: string;
  whyUsed: string;
}

export interface EvidenceItem {
  basis: Basis;
  confidence: Confidence;
  evidenceIds: string[];
}

export interface ResearchReport {
  meta: {
    hotelName: string;
    website: string;
    location: string;
    generatedAt: string;
    researchSummary: string;
  };
  executiveSummary: {
    positioning: string;
    opportunity: string;
    recommendedAngle: string;
    keyPrinciples: string[];
  };
  brand: {
    essence: string;
    tone: string[];
    visualDirection: string;
    colors: Array<{
      name: string;
      hex: string;
      usage: string;
      basis: Basis;
      confidence: Confidence;
      evidenceIds: string[];
    }>;
    typography: Array<{
      role: string;
      family: string;
      style: string;
      basis: Basis;
      confidence: Confidence;
      evidenceIds: string[];
    }>;
    photography: string[];
    designDos: string[];
    designDonts: string[];
  };
  guestProfiles: Array<{
    name: string;
    importance: Priority;
    description: string;
    needs: string[];
    guideImplications: string[];
    basis: Basis;
    confidence: Confidence;
    evidenceIds: string[];
  }>;
  hotelOfferings: Array<{
    name: string;
    category: string;
    summary: string;
    commercialPriority: Priority;
    guideTreatment: string;
    conflictImplication: string;
    basis: Basis;
    confidence: Confidence;
    evidenceIds: string[];
  }>;
  neighbourhood: {
    character: string;
    travelLogic: string;
    strengths: string[];
    gaps: string[];
    zones: Array<{
      name: string;
      distance: string;
      role: string;
      opportunities: string[];
      evidenceIds: string[];
    }>;
  };
  categoryStrategy: Array<{
    category: string;
    status: CategoryStatus;
    priority: Priority;
    targetCount: number;
    rationale: string;
    guestValue: string;
    conflictNote: string;
  }>;
  guideStructure: Array<{
    order: number;
    title: string;
    purpose: string;
    include: string[];
    commercialRole: string;
  }>;
  flatplan: Array<{
    pages: string;
    title: string;
    layout: string;
    content: string[];
    rationale: string;
  }>;
  unresolvedQuestions: string[];
  sources: Source[];
}

export interface ResearchRequest {
  hotelName: string;
  website: string;
  location: string;
  notes?: string;
  depth: "standard" | "deep";
}
