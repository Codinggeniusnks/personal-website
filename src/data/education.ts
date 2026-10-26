export interface EducationMilestone {
  id: string;
  year: string;
  institution: string;
  programme: string;
  distinction: string;
  summary: string;
}

export const educationData: EducationMilestone[] = [
  {
    id: "um-ai",
    year: "2026 — Present",
    institution: "Universiti Malaya",
    programme: "Bachelor of Computer Science (Artificial Intelligence)",
    distinction: "Major in Artificial Intelligence",
    summary:
      "Focusing on machine learning, predictive modelling, natural language processing, and intelligent software systems at Malaysia's premier research university.",
  },
  {
    id: "kmk-matriculation",
    year: "2025",
    institution: "Kolej Matrikulasi Kedah",
    programme: "Malaysian Matriculation Programme (Computer Science & Mathematics)",
    distinction: "PNGK 4.00",
    summary:
      "Graduated with a perfect 4.00 cumulative grade point average across computing, mathematics, and physical sciences.",
  },
  {
    id: "muet",
    year: "2025",
    institution: "Malaysian University English Test (MUET)",
    programme: "Academic & Technical English Proficiency",
    distinction: "Band 4.5",
    summary:
      "Strong technical communication across research documentation, system specifications, and international competition presentations.",
  },
  {
    id: "spm",
    year: "2024",
    institution: "Sijil Pelajaran Malaysia (SPM)",
    programme: "National Secondary Examination (Science Stream)",
    distinction: "10A (6A+, 4A)",
    summary:
      "Straight-A distinction across all 10 subjects, including 6A+ highest distinctions in mathematics and sciences.",
  },
];
