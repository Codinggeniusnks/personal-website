export interface SocialLinks {
  email: string;
  github: string;
  githubHandle: string;
  linkedin: string;
  linkedinHandle: string;
}

export interface ProfileData {
  name: string;
  fullName: string;
  headline: string;
  roles: string[];
  institution: string;
  degree: string;
  major: string;
  location: string;
  statusBadge: string;
  heroStatement: string;
  positioningThesis: string;
  shortIntro: string[];
  engineeringPrinciples: {
    code: string;
    title: string;
    description: string;
  }[];
  researchInterests: string[];
  links: SocialLinks;
}

export const profileData: ProfileData = {
  name: "KAI SHENG",
  fullName: "Ng Kai Sheng",
  headline: "AI ENGINEER + CREATIVE TECHNOLOGIST",
  roles: [
    "AI Engineer",
    "Machine Learning Engineer",
    "Artificial Intelligence Undergraduate",
    "Creative Technologist",
  ],
  institution: "Universiti Malaya",
  degree: "Bachelor of Computer Science",
  major: "Artificial Intelligence",
  location: "Kuala Lumpur, Malaysia",
  statusBadge: "UM CS (AI) · CGPA 4.00 Foundation · 3× International Gold",
  heroStatement:
    "I build intelligent systems that turn noisy real-world signals into calibrated predictions, resilient decisions, and measurable human impact.",
  positioningThesis:
    "I am an Artificial Intelligence student who actively builds, tests, and applies intelligent systems to real problems — bridging predictive machine learning, edge hardware telemetry, and high-craft interactive interfaces.",
  shortIntro: [
    "Currently pursuing a Bachelor of Computer Science majoring in Artificial Intelligence at Universiti Malaya, I focus on engineering complete intelligent products where statistical rigor meets operational reality.",
    "Whether designing an ESP-NOW fault-tolerant vital monitoring mesh for high-risk patients, validating walk-forward multi-horizon demand forecasts against macroeconomic price shifts, or calibrating multi-label NLP classifiers across national labour taxonomies, my work treats every model as part of a larger, accountable system.",
    "I refuse black-box hype: every project on this site documents its data engineering, validation holdouts, calibration curves, and honest empirical limitations.",
  ],
  engineeringPrinciples: [
    {
      code: "PRINCIPLE 01",
      title: "Validation Protocol Over Headline Accuracy",
      description:
        "A high F1 or RMSE means nothing if future information leaks into training. I design strict walk-forward temporal splits and cross-distribution holdouts (Protocol B vs. Protocol C) so metrics reflect deployment reality.",
    },
    {
      code: "PRINCIPLE 02",
      title: "Predictive Early Warning + Hard Safety Boundaries",
      description:
        "In safety-critical and operational systems, probabilistic AI trend detection must work alongside deterministic safety thresholds and offline hardware fallbacks — never replacing deterministic guardrails.",
    },
    {
      code: "PRINCIPLE 03",
      title: "Epistemic Honesty & Calibrated Uncertainty",
      description:
        "Models should know what they do not know. Using Platt scaling, Brier score auditing, and explicit synthetic-data ablation, I surface model uncertainty directly in the decision interface.",
    },
    {
      code: "PRINCIPLE 04",
      title: "Interfaces as Precision Instruments",
      description:
        "As a Creative Technologist, I believe the frontend is where intelligence becomes actionable. I build scannable, high-contrast, low-latency interfaces that let operators and domain experts inspect why a system made a prediction.",
    },
  ],
  researchInterests: [
    "Artificial Intelligence",
    "Machine Learning",
    "Predictive Modelling",
    "Natural Language Processing",
    "Generative AI",
    "Computer Vision",
    "Data Science",
    "IoT & Edge Telemetry",
    "Cloud Computing",
    "AI-Assisted Software Engineering",
    "Applied Research",
    "Intelligent Products",
  ],
  links: {
    email: "ngkaisheng@um.edu.my",
    github: "https://github.com/Codinggeniusnks",
    githubHandle: "@Codinggeniusnks",
    linkedin: "https://www.linkedin.com/in/ng-kai-sheng-64ab9942b/",
    linkedinHandle: "in/ng-kai-sheng-64ab9942b",
  },
};

export const profile = {
  displayName: profileData.name,
  fullName: profileData.fullName,
  primaryTitle: profileData.headline,
  university: profileData.institution,
  degree: `${profileData.degree} (${profileData.major})`,
  location: profileData.location,
  email: profileData.links.email,
  githubUrl: profileData.links.github,
  githubHandle: "Codinggeniusnks",
  linkedInUrl: profileData.links.linkedin,
  longBio: profileData.shortIntro,
  engineeringPrinciples: profileData.engineeringPrinciples,
  heroMetrics: [
    {
      value: "2× Gold + Best AI",
      label: "BIICC 2026 & ISIC-WOU24",
      context: "International AI & IoT Innovation Awards",
    },
    {
      value: "0.7149 / 0.8379",
      label: "Macro F1 / ROC AUC",
      context: "Platt-calibrated NLP across 2,000 occupations",
    },
    {
      value: "1d – 30d",
      label: "Walk-Forward ML",
      context: "6 direct horizons on 2024-Q4 holdout",
    },
    {
      value: "CGPA 4.00 · 10A",
      label: "KMK & SPM Record",
      context: "Universiti Malaya CS (AI) Undergraduate",
    },
  ],
  journey: [
    {
      period: "Secondary Foundation",
      title: "Quantitative & Scientific Grounding",
      organisation: "Sijil Pelajaran Malaysia (SPM)",
      summary:
        "Built a rigorous foundation in mathematics, computing, and sciences, graduating with 10A (6A+, 4A).",
      highlightMetric: "SPM 10A (6A+, 4A)",
    },
    {
      period: "Pre-University",
      title: "Matriculation Computer Science & Mathematics",
      organisation: "Kolej Matrikulasi Kedah (KMK)",
      summary:
        "Completed intensive pre-university science & computing track with a perfect 4.00 CGPA and MUET Band 4.5.",
      highlightMetric: "PNGK / CGPA 4.00 · MUET 4.5",
    },
    {
      period: "2024 – 2026",
      title: "International AI & IoT Competition Engineering",
      organisation: "ISIC-WOU24 · BIICC 2026 · DORMATHON 2026",
      summary:
        "Engineered CardiOxy Pro (winning ISIC-WOU24 Gold and BIICC 2026 Best AI Tech + Gold) and FoodResilience (1d–30d ML forecasting).",
      highlightMetric: "Best AI Tech + 2× Gold",
    },
    {
      period: "Present",
      title: "Bachelor of Computer Science (Artificial Intelligence)",
      organisation: "Universiti Malaya (UM)",
      summary:
        "Advancing applied ML methodology, calibrated multi-label NLP (Occupational Skills & Demand Predictor), and full-stack AI systems.",
      highlightMetric: "UM CS (AI) Undergraduate",
    },
  ],
};

