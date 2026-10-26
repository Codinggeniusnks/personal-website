export interface CapabilityClusterNode {
  id: string;
  label: string;
  subtitle: string;
  skills: {
    name: string;
    usedIn: string;
    projectSlug: string;
    detail: string;
  }[];
}

export const skillClusters: CapabilityClusterNode[] = [
  {
    id: "ai-ml",
    label: "AI / ML",
    subtitle: "Predictive Modelling & Gradient Boosting",
    skills: [
      {
        name: "Python",
        usedIn: "FoodResilience & Occupational AI",
        projectSlug: "foodresilience",
        detail: "End-to-end feature pipelines, walk-forward validation, and statistical calibration.",
      },
      {
        name: "scikit-learn",
        usedIn: "Occupational Skills & Demand Predictor",
        projectSlug: "occupational-skills-demand",
        detail: "One-vs-Rest Logistic Regression (C = 2.2) with Platt probability scaling.",
      },
      {
        name: "LightGBM",
        usedIn: "FoodResilience",
        projectSlug: "foodresilience",
        detail: "Direct multi-horizon (1d–30d) retail demand and price forecasting.",
      },
      {
        name: "CatBoost",
        usedIn: "FoodResilience",
        projectSlug: "foodresilience",
        detail: "High-cardinality SKU and categorical promotion forecasting.",
      },
      {
        name: "XGBoost",
        usedIn: "FoodResilience",
        projectSlug: "foodresilience",
        detail: "Long-horizon (14d–30d) seasonal surge and safety-stock modelling.",
      },
    ],
  },
  {
    id: "nlp",
    label: "NLP",
    subtitle: "Labour Taxonomy & Calibrated Classification",
    skills: [
      {
        name: "Word 1–3g & Char 3–5g TF-IDF",
        usedIn: "Occupational Skills & Demand Predictor",
        projectSlug: "occupational-skills-demand",
        detail: "Dual lexical + subword representation across MASCO, MyCOL, O*NET, ESCO & ILO.",
      },
      {
        name: "Multi-Label Classification",
        usedIn: "Occupational Skills & Demand Predictor",
        projectSlug: "occupational-skills-demand",
        detail: "Tuned decision threshold τ = 0.42 with 3× GOLD supervision weighting.",
      },
      {
        name: "Protocol B & C Evaluation",
        usedIn: "Occupational Skills & Demand Predictor",
        projectSlug: "occupational-skills-demand",
        detail: "0.7149 Skills Macro F1, 0.7644 Demand Macro F1, 0.8379 ROC AUC, 0.1668 Brier.",
      },
    ],
  },
  {
    id: "iot",
    label: "IoT & Edge",
    subtitle: "Fault-Tolerant Biomedical Telemetry",
    skills: [
      {
        name: "ESP32 & Wemos D1 R1",
        usedIn: "CardiOxy Pro",
        projectSlug: "cardioxy-pro",
        detail: "Multi-MCU architecture with online cloud sync and offline failover.",
      },
      {
        name: "ESP-NOW Protocol",
        usedIn: "CardiOxy Pro",
        projectSlug: "cardioxy-pro",
        detail: "Router-less peer-to-peer wireless telemetry during Wi-Fi outages.",
      },
      {
        name: "MAX30102 / MAX30105 & DS1302 RTC",
        usedIn: "CardiOxy Pro",
        projectSlug: "cardioxy-pro",
        detail: "Optical heart-rate & SpO₂ sensing with hardware-timestamped SD backup.",
      },
    ],
  },
  {
    id: "cloud-web",
    label: "Cloud / Web",
    subtitle: "Interactive Spatial & Telemetry Interfaces",
    skills: [
      {
        name: "Next.js & TypeScript",
        usedIn: "Spatial AI Portfolio & Dashboards",
        projectSlug: "cardioxy-pro",
        detail: "Type-safe full-stack web architecture and interactive simulation interfaces.",
      },
      {
        name: "Three.js / React Three Fiber",
        usedIn: "Spatial AI Portfolio",
        projectSlug: "occupational-skills-demand",
        detail: "Interactive 3D AI Core and spatial constellation storytelling.",
      },
      {
        name: "Telegram API & Cloud Sync",
        usedIn: "CardiOxy Pro",
        projectSlug: "cardioxy-pro",
        detail: "Real-time Google Sheets logging, Telegram alerts, and automated emergency calls.",
      },
    ],
  },
];
