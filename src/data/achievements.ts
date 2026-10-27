export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  badge?: string;
  imageUrl?: string;
  storagePath?: string;
  verificationUrl?: string;
}

export interface Achievement {
  id: string;
  year: string;
  title: string;
  competition: string;
  project: string;
  role: string;
  recognitions: string[];
  category: "International Innovation" | "National STEM" | "Supervisory Honour" | "Commendation";
  description: string;
  featured: boolean;
  visible: boolean;
  display_order: number;
  certificates: CertificateItem[];
  verification_url?: string;
  linkedin_url?: string;
}

export const initialAchievements: Achievement[] = [
  {
    id: "wsdg-2024",
    year: "2024",
    title: "World Sustainable Development Goal Challenge 2024",
    competition: "World Sustainable Development Goal Challenge 2024 (WSDG 2024)",
    project: "OxyPulse Alert System",
    role: "Participant / Project Developer",
    recognitions: [
      "Diamond Award",
      "Gold Award",
      "Top 5 Award",
      "Special Award",
    ],
    category: "International Innovation",
    description:
      "Quadruple distinction for the OxyPulse Alert System at WSDG 2024, demonstrating vital physiological monitoring, early anomaly detection, and community healthcare resilience.",
    featured: true,
    visible: true,
    display_order: 1,
    verification_url: "https://wsdgchallenge.org/verify/2024/oxypulse",
    linkedin_url: "https://www.linkedin.com/in/ng-kai-sheng",
    certificates: [
      {
        id: "wsdg-24-diamond",
        title: "Diamond Award Certificate",
        issuer: "WSDG 2024 International Secretariat",
        date: "2024",
        badge: "DIAMOND",
      },
      {
        id: "wsdg-24-gold",
        title: "Gold Award Certificate",
        issuer: "WSDG 2024 International Committee",
        date: "2024",
        badge: "GOLD",
      },
      {
        id: "wsdg-24-top5",
        title: "Top 5 Finalist Award",
        issuer: "WSDG 2024 Jury",
        date: "2024",
        badge: "TOP 5",
      },
      {
        id: "wsdg-24-special",
        title: "Special Innovation Award",
        issuer: "WSDG 2024 Organizing Body",
        date: "2024",
        badge: "SPECIAL",
      },
    ],
  },
  {
    id: "biicc-2025",
    year: "2025",
    title: "Borneo International Innovation & Creativity Competition 2025",
    competition: "Borneo International Innovation & Creativity Competition 2025 (BIICC 2025)",
    project: "MediTech OxyPulse Alert System",
    role: "Participant / Project Developer",
    recognitions: [
      "Best Innovation Entrepreneurs Award",
      "Gold Award",
      "3rd Place — Innovation Poster Presentation",
    ],
    category: "International Innovation",
    description:
      "Recognized for technological innovation and entrepreneurial translation in remote patient telemetry, sensor integration, and reliable alert escalation.",
    featured: true,
    visible: true,
    display_order: 2,
    verification_url: "https://biicc.org/archives/2025/meditech",
    linkedin_url: "https://www.linkedin.com/in/ng-kai-sheng",
    certificates: [
      {
        id: "biicc-25-entrepreneur",
        title: "Best Innovation Entrepreneurs Award",
        issuer: "BIICC 2025 Steering Committee",
        date: "2025",
        badge: "ENTREPRENEUR",
      },
      {
        id: "biicc-25-gold",
        title: "Gold Award Certificate",
        issuer: "BIICC 2025 International Jury",
        date: "2025",
        badge: "GOLD",
      },
      {
        id: "biicc-25-poster",
        title: "3rd Place Innovation Poster Presentation",
        issuer: "BIICC 2025 Academic Committee",
        date: "2025",
        badge: "3RD PLACE",
      },
    ],
  },
  {
    id: "innostem-2025",
    year: "2025",
    title: "National-Level InnoSTEM Competition",
    competition: "InnoSTEM Matrikulasi 2025 (National Level)",
    project: "STEM Innovation & Embedded Telemetry",
    role: "Competitor & Lead Developer",
    recognitions: ["Gold Medal"],
    category: "National STEM",
    description:
      "Awarded Gold Medal at the National Matriculation STEM Innovation Competition for engineering rigor, embedded circuit design, and algorithmic problem solving.",
    featured: true,
    visible: true,
    display_order: 3,
    verification_url: "https://innostem.edu.my/verify/2025/kmk-gold",
    linkedin_url: "https://www.linkedin.com/in/ng-kai-sheng",
    certificates: [
      {
        id: "innostem-25-gold",
        title: "Gold Medal Distinction Certificate",
        issuer: "Ministry of Education Malaysia / InnoSTEM Board",
        date: "2025",
        badge: "GOLD MEDAL",
      },
    ],
  },
  {
    id: "biicc-2026",
    year: "2026",
    title: "Borneo International Innovation & Creativity Competition 2026",
    competition: "Borneo International Innovation & Creativity Competition 2026 (BIICC 2026)",
    project: "CardiOxy Pro Alert System",
    role: "Project Supervisor",
    recognitions: [
      "Best AI Technology Award",
      "Gold Award",
    ],
    category: "Supervisory Honour",
    description:
      "Project Supervisor — Best AI Technology Award & Gold Award. Supervised the student participant team in architecting the predictive AI trajectory engine and ESP-NOW fault-tolerant telemetry.",
    featured: true,
    visible: true,
    display_order: 4,
    verification_url: "https://biicc.org/verify/2026/cardioxy-pro",
    linkedin_url: "https://www.linkedin.com/in/ng-kai-sheng",
    certificates: [
      {
        id: "biicc-26-best-ai",
        title: "Best AI Technology Award Certificate (Supervisory Attribution)",
        issuer: "BIICC 2026 International Committee",
        date: "2026",
        badge: "BEST AI TECH",
      },
      {
        id: "biicc-26-gold",
        title: "Gold Award Certificate (Supervisory Attribution)",
        issuer: "BIICC 2026 International Committee",
        date: "2026",
        badge: "GOLD AWARD",
      },
    ],
  },
  {
    id: "wsdg-2026",
    year: "2026",
    title: "World Sustainable Development Goals Challenge 2026",
    competition: "World Sustainable Development Goals Challenge 2026 (WSDG 2026)",
    project: "CardiOxy Pro Alert System",
    role: "Project Supervisor",
    recognitions: [
      "Platinum Award",
      "Gold Award",
      "Top 5 Innovators Award",
    ],
    category: "Supervisory Honour",
    description:
      "Project Supervisor — Platinum Award, Gold Award & Top 5 Innovators Award. Guided architecture design, medical-safety thresholding, multi-controller synchronization, and continuous offline packet logging.",
    featured: true,
    visible: true,
    display_order: 5,
    verification_url: "https://wsdgchallenge.org/verify/2026/cardioxy-supervisor",
    linkedin_url: "https://www.linkedin.com/in/ng-kai-sheng",
    certificates: [
      {
        id: "wsdg-26-plat",
        title: "Platinum Award Certificate (Supervisory Attribution)",
        issuer: "WSDG 2026 International Secretariat",
        date: "2026",
        badge: "PLATINUM",
      },
      {
        id: "wsdg-26-gold",
        title: "Gold Award Certificate (Supervisory Attribution)",
        issuer: "WSDG 2026 International Committee",
        date: "2026",
        badge: "GOLD",
      },
      {
        id: "wsdg-26-top5",
        title: "Top 5 Innovators Certificate (Supervisory Attribution)",
        issuer: "WSDG 2026 Jury",
        date: "2026",
        badge: "TOP 5",
      },
    ],
  },
  {
    id: "wsdg-2024-appreciation",
    year: "2024",
    title: "Certificate of Appreciation — WSDG 2024",
    competition: "World Sustainable Development Goal Challenge 2024 (WSDG 2024)",
    project: "Global Sustainability & Innovation Initiative",
    role: "Contributing Developer",
    recognitions: ["Certificate of Appreciation"],
    category: "Commendation",
    description:
      "Presented in appreciation of technical contribution, innovative engineering, and dedication towards advancing United Nations Sustainable Development Goals.",
    featured: false,
    visible: true,
    display_order: 6,
    verification_url: "https://wsdgchallenge.org/verify/2024/appreciation-kaisheng",
    linkedin_url: "https://www.linkedin.com/in/ng-kai-sheng",
    certificates: [
      {
        id: "wsdg-24-appr",
        title: "Certificate of Appreciation",
        issuer: "WSDG 2024 Executive Board",
        date: "2024",
        badge: "COMMENDATION",
      },
    ],
  },
];

export function getFeaturedAchievements(list: Achievement[] = initialAchievements): Achievement[] {
  return list
    .filter((a) => a.visible && a.featured)
    .sort((a, b) => a.display_order - b.display_order);
}

export function getAllVisibleAchievements(list: Achievement[] = initialAchievements): Achievement[] {
  return list
    .filter((a) => a.visible)
    .sort((a, b) => a.display_order - b.display_order);
}

export function getAchievementById(id: string, list: Achievement[] = initialAchievements): Achievement | undefined {
  return list.find((a) => a.id === id);
}
