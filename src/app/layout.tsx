import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/spatial/InteractivePrimitives";
import { profile } from "@/data/profile";

const spaceGrotesk = localFont({
  src: "../fonts/space-grotesk-latin.woff2",
  variable: "--font-display",
  weight: "600 700",
  display: "swap",
});

const plusJakartaSans = localFont({
  src: "../fonts/plus-jakarta-sans-latin.woff2",
  variable: "--font-sans",
  weight: "400 700",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "../fonts/jetbrains-mono-latin.woff2",
  variable: "--font-mono",
  weight: "400 600",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ng Kai Sheng (KAI SHENG) — AI Engineer & Applied ML Systems Architect",
    template: "%s | Ng Kai Sheng (KAI SHENG)",
  },
  description:
    "AI Engineer and Computer Science (Artificial Intelligence) undergraduate at Universiti Malaya building fault-tolerant biomedical IoT telemetry (CardiOxy Pro), multi-horizon ML forecasting pipelines (FoodResilience), and calibrated NLP classification systems.",
  keywords: [
    "Ng Kai Sheng",
    "Kai Sheng",
    "AI Engineer",
    "Machine Learning Engineer",
    "Universiti Malaya",
    "CardiOxy Pro",
    "FoodResilience",
    "Occupational Skills Demand Predictor",
    "Embedded AI",
    "IoT Telemetry",
    "Applied Machine Learning",
  ],
  authors: [{ name: profile.fullName, url: profile.githubUrl }],
  creator: profile.fullName,
  openGraph: {
    type: "website",
    locale: "en_MY",
    title: "Ng Kai Sheng (KAI SHENG) — AI Engineer & Applied ML Systems Architect",
    description:
      "Predictive biomedical IoT systems, 1d–30d walk-forward supply-chain forecasting, and calibrated multi-label NLP engines. Built at Universiti Malaya.",
    siteName: "Ng Kai Sheng — Engineering Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ng Kai Sheng (KAI SHENG) — AI Engineer & Applied ML Systems Architect",
    description:
      "Predictive biomedical IoT systems, 1d–30d walk-forward supply-chain forecasting, and calibrated multi-label NLP engines.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    alternateName: profile.displayName,
    jobTitle: profile.primaryTitle,
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: profile.university,
    },
    email: `mailto:${profile.email}`,
    url: profile.githubUrl,
    sameAs: [profile.githubUrl, profile.linkedInUrl],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Time-Series Forecasting",
      "Natural Language Processing",
      "Embedded IoT Systems",
      "ESP32",
      "Python",
      "TypeScript",
    ],
  };

  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col selection:bg-[var(--accent-primary)] selection:text-slate-950">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CustomCursor />
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
