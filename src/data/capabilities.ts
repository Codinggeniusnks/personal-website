export interface CapabilityItem {
  id: string;
  code: string;
  domain: string;
  coreTechnologies: string[];
  architecturalApplication: string;
  verifyingProjects: {
    title: string;
    slug: string;
    evidenceNote: string;
  }[];
}

export const capabilitiesData: CapabilityItem[] = [
  {
    id: "predictive-ml",
    code: "CAP // 01",
    domain: "Machine Learning & Predictive Modelling",
    coreTechnologies: [
      "LightGBM",
      "CatBoost",
      "XGBoost",
      "Scikit-Learn",
      "Walk-Forward Validation",
      "Platt Scaling Calibration",
    ],
    architecturalApplication:
      "Designing multi-horizon forecasting ensembles and calibrated multi-label classifiers with strict out-of-time and cross-distribution holdouts.",
    verifyingProjects: [
      {
        title: "FoodResilience",
        slug: "foodresilience",
        evidenceNote:
          "1d–30d gradient-boosted demand & price forecasting validated on a strict 2024-Q4 walk-forward holdout.",
      },
      {
        title: "Occupational Skills & Demand Predictor",
        slug: "occupational-skills-demand",
        evidenceNote:
          "Platt-calibrated OvR Logistic Regression (C=2.2, τ=0.42) achieving 0.8379 ROC AUC and 0.1668 Brier score.",
      },
    ],
  },
  {
    id: "nlp-labour",
    code: "CAP // 02",
    domain: "Natural Language Processing & Taxonomic Intelligence",
    coreTechnologies: [
      "Word 1–3 Gram TF-IDF",
      "Character 3–5 Gram TF-IDF",
      "Multi-Label OvR Classification",
      "Sample Weighting (3× GOLD)",
      "Synthetic Ablation Auditing",
    ],
    architecturalApplication:
      "Mapping unstructured occupational narratives across MASCO 2020, MyCOL 2024/25, O*NET, ESCO, and ILO taxonomies while auditing synthetic data bias.",
    verifyingProjects: [
      {
        title: "Occupational Skills & Demand Predictor",
        slug: "occupational-skills-demand",
        evidenceNote:
          "Protocol B (0.7149 Skills Macro F1, 0.7644 Demand Macro F1) vs. Protocol C strict holdout (0.6196 Macro F1) & 0%→100% synthetic ablation.",
      },
    ],
  },
  {
    id: "iot-edge-ai",
    code: "CAP // 03",
    domain: "IoT, Embedded Systems & Edge Telemetry",
    coreTechnologies: [
      "ESP32",
      "Wemos D1 R1",
      "Arduino UNO",
      "ESP-NOW Protocol",
      "MAX30102 / MAX30105 PPG",
      "DS1302 RTC & MicroSD",
      "SSD1306 OLED",
    ],
    architecturalApplication:
      "Engineering fault-tolerant hardware-software pipelines that combine predictive pre-threshold trend detection with offline peer-to-peer wireless continuity.",
    verifyingProjects: [
      {
        title: "CardiOxy Pro",
        slug: "cardioxy-pro",
        evidenceNote:
          "Tri-mode (Manual, Online, Offline) vital signs monitor with ESP-NOW failover, SD logging, and predictive early warnings.",
      },
    ],
  },
  {
    id: "data-analytics",
    code: "CAP // 04",
    domain: "Data Engineering, Analytics & Validation Design",
    coreTechnologies: [
      "Python",
      "Pandas / NumPy",
      "Point-in-Time Joins",
      "DOSM PriceCatcher & OpenDOSM",
      "CPI & Macro Series",
      "Ablation Benchmarking",
    ],
    architecturalApplication:
      "Harmonizing multi-frequency public datasets (POS, CPI, PriceCatcher, MASCO, MyCOL) without temporal look-ahead leakage.",
    verifyingProjects: [
      {
        title: "FoodResilience",
        slug: "foodresilience",
        evidenceNote:
          "Publication-lag-aware alignment of retail POS history with DOSM PriceCatcher, CPI, fuel, weather, and holiday signals.",
      },
      {
        title: "Occupational Skills & Demand Predictor",
        slug: "occupational-skills-demand",
        evidenceNote:
          "Cross-walked MASCO 2020, MyCOL 2024/25, O*NET, ESCO, ILO, and OpenDOSM datasets with 3× GOLD supervision weighting.",
      },
    ],
  },
  {
    id: "cloud-dispatch",
    code: "CAP // 05",
    domain: "Cloud Sync, Real-Time Alerting & Automation",
    coreTechnologies: [
      "Telegram Bot API",
      "Automated Telephony Triggers",
      "Google Sheets Cloud Sync",
      "REST / Webhook Pipelines",
      "Git / GitHub Actions",
    ],
    architecturalApplication:
      "Connecting edge sensors and analytical models to real-time cloud dashboards, instant messaging dispatch, and automated emergency voice calls.",
    verifyingProjects: [
      {
        title: "CardiOxy Pro",
        slug: "cardioxy-pro",
        evidenceNote:
          "Live cloud synchronization to Google Sheets, tiered Telegram caregiver notifications, and automated emergency phone call triggers.",
      },
    ],
  },
  {
    id: "frontend-creative-tech",
    code: "CAP // 06",
    domain: "Frontend Engineering, Interactive Systems & AI-Assisted SWE",
    coreTechnologies: [
      "Next.js (App Router)",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Motion (Framer Motion)",
      "Interactive SVG Telemetry",
    ],
    architecturalApplication:
      "Building high-contrast, accessible, instrument-grade web interfaces that turn complex ML evaluation protocols and IoT state machines into inspectable experiences.",
    verifyingProjects: [
      {
        title: "CardiOxy Pro",
        slug: "cardioxy-pro",
        evidenceNote:
          "Live web telemetry dashboard & interactive tri-mode vital simulator.",
      },
      {
        title: "FoodResilience",
        slug: "foodresilience",
        evidenceNote:
          "Interactive multi-horizon forecast & days-of-stock decision support interface.",
      },
    ],
  },
];

export interface CapabilityGroupView {
  code: string;
  domain: string;
  summary: string;
  items: {
    technology: string;
    whereUsed: string;
    evidence: string;
  }[];
}

export const capabilityGroups: CapabilityGroupView[] = capabilitiesData.map((c) => ({
  code: c.code,
  domain: c.domain,
  summary: c.architecturalApplication,
  items: c.coreTechnologies.map((tech, idx) => {
    const proj = c.verifyingProjects[idx % c.verifyingProjects.length];
    return {
      technology: tech,
      whereUsed: proj.title,
      evidence: proj.evidenceNote,
    };
  }),
}));

