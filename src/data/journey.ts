export interface JourneyNode {
  id: string;
  step: string;
  year: string;
  title: string;
  subtitle: string;
  detail: string;
  metric: string;
}

export const journeyNodes: JourneyNode[] = [
  {
    id: "secondary",
    step: "01",
    year: "2024",
    title: "Secondary Education (SPM)",
    subtitle: "Quantitative & Scientific Grounding",
    detail: "Achieved 10A (6A+, 4A) across mathematics, computing, and sciences, sparking a focus on algorithmic problem solving.",
    metric: "10A (6A+, 4A)",
  },
  {
    id: "matriculation",
    step: "02",
    year: "2024 – 2025",
    title: "Kolej Matrikulasi Kedah",
    subtitle: "Pre-University Computer Science & Mathematics",
    detail: "Graduated with a perfect PNGK 4.00 and MUET Band 4.5 while building early embedded hardware and software prototypes.",
    metric: "PNGK 4.00 · MUET 4.5",
  },
  {
    id: "competitions",
    step: "03",
    year: "2024 – 2026",
    title: "International Innovation Competitions",
    subtitle: "ISIC-WOU24 & BIICC 2026",
    detail: "Engineered CardiOxy Pro — earning Gold at ISIC-WOU24 and Best AI Technology Award + Gold Award at BIICC 2026.",
    metric: "Best AI Tech + 2× Gold",
  },
  {
    id: "hackathons",
    step: "04",
    year: "2026",
    title: "Applied AI Hackathons & Forecasting",
    subtitle: "DORMATHON 2026 — FoodResilience",
    detail: "Built a 1d–30d walk-forward demand and price forecasting engine aligned with UN SDG 12.",
    metric: "1d–30d Walk-Forward ML",
  },
  {
    id: "um-ai",
    step: "05",
    year: "2026 – Present",
    title: "Universiti Malaya — CS (Artificial Intelligence)",
    subtitle: "Calibrated ML & Spatial AI Engineering",
    detail: "Pursuing a Bachelor of Computer Science majoring in AI, building calibrated multi-label NLP models and interactive AI products.",
    metric: "UM CS (AI)",
  },
];
