import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProjectBySlug } from "@/data/projects";
import { ProgressiveCaseStudy } from "@/components/spatial/ProgressiveCaseStudy";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Case Study Not Found" };
  }
  return {
    title: `${project.title} — ${project.subtitle}`,
    description: project.tagline,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const currentIdx = projects.findIndex((p) => p.slug === project.slug);
  const prevProject =
    currentIdx > 0 ? projects[currentIdx - 1] : projects[projects.length - 1];
  const nextProject =
    currentIdx < projects.length - 1 ? projects[currentIdx + 1] : projects[0];

  return (
    <ProgressiveCaseStudy
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
