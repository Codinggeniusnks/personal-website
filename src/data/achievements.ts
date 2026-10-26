export interface AwardItem {
  id: string;
  year: string;
  competition: string;
  shortCode: string;
  distinction: string;
  projectLinked: string;
  projectSlug: string;
  summary: string;
  highlight: boolean;
}

export interface AcademicCredential {
  id: string;
  period: string;
  institution: string;
  qualification: string;
  resultHeadline: string;
  details: string[];
  highlight?: boolean;
}

export interface JourneyMilestone {
  id: string;
  phase: string;
  period: string;
  title: string;
  organization: string;
  description: string;
  evidenceTag: string;
}

export const awardsData: AwardItem[] = [
  {
    id: "biicc-2026-best-ai",
    year: "2026",
    competition: "Borneo International Innovation & Creativity Competition 2026",
    shortCode: "BIICC 2026 // SPECIAL HONOUR",
    distinction: "Best AI Technology Award",
    projectLinked: "CardiOxy Pro",
    projectSlug: "cardioxy-pro",
    summary:
      "Recognized as the top Artificial Intelligence technology submission for combining pre-threshold predictive physiological trajectory detection with fault-tolerant IoT telemetry.",
    highlight: true,
  },
  {
    id: "biicc-2026-gold",
    year: "2026",
    competition: "Borneo International Innovation & Creativity Competition 2026",
    shortCode: "BIICC 2026 // GOLD",
    distinction: "Gold Award",
    projectLinked: "CardiOxy Pro",
    projectSlug: "cardioxy-pro",
    summary:
      "Awarded Gold for end-to-end hardware-software integration across MAX30102/MAX30105 biosensing, ESP-NOW offline continuity, and automated caregiver escalation.",
    highlight: true,
  },
  {
    id: "isic-wou24-gold",
    year: "2024",
    competition: "International Science and Innovation Competition (ISIC-WOU24)",
    shortCode: "ISIC-WOU24 // GOLD",
    distinction: "Gold Award",
    projectLinked: "CardiOxy Pro",
    projectSlug: "cardioxy-pro",
    summary:
      "Awarded Gold in international scientific innovation for developing a resilient, low-cost remote patient monitoring architecture for elderly and chronic care.",
    highlight: true,
  },
  {
    id: "dormathon-2026",
    year: "2026",
    competition: "DORMATHON 2026",
    shortCode: "DORMATHON 2026 // APPLIED AI",
    distinction: "Predictive Retail & Sustainability System",
    projectLinked: "FoodResilience",
    projectSlug: "foodresilience",
    summary:
      "Engineered a multi-horizon demand and wholesale price forecasting engine aligned with UN SDG 12 using walk-forward validation across POS and DOSM PriceCatcher datasets.",
    highlight: false,
  },
];

export const academicData: AcademicCredential[] = [
  {
    id: "um-bcs-ai",
    period: "Current",
    institution: "Universiti Malaya (UM)",
    qualification: "Bachelor of Computer Science (Major in Artificial Intelligence)",
    resultHeadline: "AI Major · Flagship Research & Engineering",
    details: [
      "Focusing on machine learning, predictive modelling, natural language processing, computer vision, and intelligent software systems at Malaysia's premier research university.",
      "Applying classroom theory directly to competitive innovation, multi-protocol ML benchmarks, and full-stack AI systems.",
    ],
    highlight: true,
  },
  {
    id: "kmk-matriculation",
    period: "Matriculation",
    institution: "Kolej Matrikulasi Kedah (KMK)",
    qualification: "Malaysian Matriculation Programme (Science / Computer Science Stream)",
    resultHeadline: "PNGK / CGPA: 4.00",
    details: [
      "Achieved a perfect 4.00 cumulative grade point average across mathematics, sciences, and computing.",
      "Demonstrated strong quantitative and analytical discipline prior to entering Universiti Malaya.",
    ],
    highlight: true,
  },
  {
    id: "spm",
    period: "Secondary Education",
    institution: "Sijil Pelajaran Malaysia (SPM)",
    qualification: "National Secondary School Leaving Examination",
    resultHeadline: "10A (6A+, 4A)",
    details: [
      "Straight-A distinction across all 10 examination subjects, including 6A+ (Highest Distinction) and 4A grades.",
    ],
    highlight: false,
  },
  {
    id: "muet",
    period: "Language Proficiency",
    institution: "Malaysian University English Test (MUET)",
    qualification: "Academic & Technical English Proficiency",
    resultHeadline: "Band 4.5",
    details: [
      "Proficient academic and technical communication across written research documentation, live competition pitching, and software engineering collaboration.",
    ],
    highlight: false,
  },
];

export const journeyData: JourneyMilestone[] = [
  {
    id: "stage-01",
    phase: "STAGE 01",
    period: "Secondary Foundation",
    title: "Quantitative & Scientific Grounding",
    organization: "Sijil Pelajaran Malaysia (SPM)",
    description:
      "Built a rigorous foundation in mathematics and sciences, graduating with 10A (6A+, 4A) and developing an early fascination with how algorithms solve physical problems.",
    evidenceTag: "SPM 10A (6A+, 4A)",
  },
  {
    id: "stage-02",
    phase: "STAGE 02",
    period: "Pre-University Excellence",
    title: "Perfect Academic Standing & Early Systems Building",
    organization: "Kolej Matrikulasi Kedah (KMK)",
    description:
      "Completed the intensive matriculation curriculum with a perfect PNGK / CGPA of 4.00 while achieving MUET Band 4.5 and beginning hands-on microcontroller and AI prototyping.",
    evidenceTag: "CGPA 4.00 · MUET 4.5",
  },
  {
    id: "stage-03",
    phase: "STAGE 03",
    period: "2024 – 2026",
    title: "International Innovation Competitions & Hackathon Engineering",
    organization: "ISIC-WOU24 · BIICC 2026 · DORMATHON 2026",
    description:
      "Tested engineering ideas against international judging panels — winning Gold at ISIC-WOU24 and Best AI Technology + Gold at BIICC 2026 for CardiOxy Pro, and building FoodResilience for DORMATHON 2026.",
    evidenceTag: "2× Gold + Best AI Tech",
  },
  {
    id: "stage-04",
    phase: "STAGE 04",
    period: "Present",
    title: "Artificial Intelligence Specialization & Applied ML Research",
    organization: "Universiti Malaya — Bachelor of Computer Science (AI)",
    description:
      "Advancing into rigorous ML methodology, calibrated multi-label NLP (Occupational Skills & Demand Predictor), walk-forward forecasting, and high-craft intelligent products.",
    evidenceTag: "UM CS (AI)",
  },
];

export interface AchievementView {
  id: string;
  year: string;
  title: string;
  organisation: string;
  metricBadge: string;
  significance: string;
  category: "International Competition" | "Academic Distinction";
}

export const achievements: AchievementView[] = [
  ...awardsData.map((a) => ({
    id: a.id.toUpperCase(),
    year: a.year,
    title: `${a.distinction} — ${a.projectLinked}`,
    organisation: a.competition,
    metricBadge: a.distinction.toUpperCase(),
    significance: a.summary,
    category: "International Competition" as const,
  })),
  ...academicData.map((ac) => ({
    id: ac.id.toUpperCase(),
    year: ac.period,
    title: ac.qualification,
    organisation: ac.institution,
    metricBadge: ac.resultHeadline,
    significance: ac.details.join(" "),
    category: "Academic Distinction" as const,
  })),
];

