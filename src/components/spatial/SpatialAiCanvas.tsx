"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type SpatialStage =
  | "hero"
  | "work"
  | "about"
  | "capabilities"
  | "achievements"
  | "journey"
  | "contact";

export type ActiveProjectId =
  | "cardioxy-pro"
  | "foodresilience"
  | "occupational-skills-demand"
  | "future-research";

interface CoreSceneProps {
  stage: SpatialStage;
  activeProject: ActiveProjectId;
  ctaHovered: boolean;
  reducedMotion: boolean;
}

const PROJECT_ACCENTS: Record<ActiveProjectId, string> = {
  "cardioxy-pro": "#E86238",
  foodresilience: "#2DD4BF",
  "occupational-skills-demand": "#F59E0B",
  "future-research": "#94A3B8",
};

const STAGE_CAMERA_Z: Record<SpatialStage, number> = {
  hero: 6.2,
  work: 5.1,
  about: 5.8,
  capabilities: 5.5,
  achievements: 5.9,
  journey: 6.0,
  contact: 6.8,
};

function AiCoreLattice({
  stage,
  activeProject,
  ctaHovered,
  reducedMotion,
}: CoreSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const outerShellRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const accentHex = PROJECT_ACCENTS[activeProject] || "#E86238";
  const targetColor = useMemo(() => new THREE.Color(accentHex), [accentHex]);

  // Generate deterministic neural lattice points on a Fibonacci sphere
  const { positions, linePositions } = useMemo(() => {
    const count = 160;
    const pos = new Float32Array(count * 3);
    const pts: THREE.Vector3[] = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < count; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const r = 1.85 + (i % 5) * 0.14;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      pts.push(new THREE.Vector3(x, y, z));
    }

    // Connect nearby lattice nodes into a sparse neural web
    const segments: number[] = [];
    for (let i = 0; i < count; i++) {
      let connections = 0;
      for (let j = i + 1; j < count && connections < 2; j++) {
        if (pts[i].distanceTo(pts[j]) < 0.78) {
          segments.push(
            pts[i].x,
            pts[i].y,
            pts[i].z,
            pts[j].x,
            pts[j].y,
            pts[j].z
          );
          connections++;
        }
      }
    }

    return {
      positions: pos,
      linePositions: new Float32Array(segments),
    };
  }, []);

  // 4 Orbiting Project Constellation Nodes in 3D space
  const satelliteOffsets = useMemo(
    () => [
      { id: "cardioxy-pro", pos: new THREE.Vector3(0, 2.35, 0.4), color: "#E86238" },
      { id: "foodresilience", pos: new THREE.Vector3(2.55, 0.1, 0.3), color: "#2DD4BF" },
      { id: "occupational-skills-demand", pos: new THREE.Vector3(-2.55, 0.1, 0.3), color: "#F59E0B" },
      { id: "future-research", pos: new THREE.Vector3(0, -2.35, 0.2), color: "#94A3B8" },
    ],
    []
  );

  useFrame((state, delta) => {
    const targetZ = ctaHovered ? 4.8 : STAGE_CAMERA_Z[stage];
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      targetZ,
      delta * 2.4
    );

    // Subtle pointer parallax
    const pointerX = state.pointer.x * 0.45;
    const pointerY = state.pointer.y * 0.35;
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      pointerX,
      delta * 2.2
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      pointerY,
      delta * 2.2
    );
    state.camera.lookAt(0, 0, 0);

    if (!groupRef.current) return;

    const speedMultiplier =
      stage === "contact" ? 0.35 : ctaHovered ? 1.8 : stage === "work" ? 0.9 : 0.65;

    if (!reducedMotion) {
      groupRef.current.rotation.y += delta * 0.16 * speedMultiplier;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        pointerY * 0.3 + (stage === "work" ? 0.18 : 0.05),
        delta * 2
      );
    }

    if (innerCoreRef.current) {
      const pulse =
        1 +
        Math.sin(state.clock.elapsedTime * (ctaHovered ? 3.2 : 1.6)) *
          (stage === "contact" ? 0.02 : 0.05);
      innerCoreRef.current.scale.setScalar(pulse);
      if (!reducedMotion) {
        innerCoreRef.current.rotation.z -= delta * 0.12;
      }
    }

    if (outerShellRef.current && !reducedMotion) {
      outerShellRef.current.rotation.y -= delta * 0.08 * speedMultiplier;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Computational Core Icosahedron */}
      <mesh ref={innerCoreRef}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial
          color={targetColor}
          wireframe
          transparent
          opacity={ctaHovered ? 0.42 : stage === "contact" ? 0.18 : 0.28}
        />
      </mesh>

      {/* Secondary Geodesic Lattice Shell */}
      <mesh ref={outerShellRef}>
        <icosahedronGeometry args={[1.65, 2]} />
        <meshBasicMaterial
          color="#94A3B8"
          wireframe
          transparent
          opacity={stage === "contact" ? 0.05 : 0.09}
        />
      </mesh>

      {/* Neural Lattice Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={targetColor}
          size={ctaHovered ? 0.055 : 0.042}
          transparent
          opacity={0.82}
          sizeAttenuation
        />
      </points>

      {/* Neural Synaptic Filaments */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={targetColor}
          transparent
          opacity={ctaHovered ? 0.24 : stage === "contact" ? 0.07 : 0.14}
        />
      </lineSegments>

      {/* 4 Constellation Satellite Nodes */}
      {satelliteOffsets.map((sat) => {
        const isSelected = activeProject === sat.id;
        return (
          <group key={sat.id} position={sat.pos}>
            <mesh scale={isSelected ? 1.45 : 0.9}>
              <octahedronGeometry args={[0.12, 0]} />
              <meshBasicMaterial
                color={sat.color}
                wireframe={!isSelected}
                transparent
                opacity={isSelected ? 0.95 : 0.45}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export function SpatialAiCanvas({
  stage = "hero",
  activeProject = "cardioxy-pro",
  ctaHovered = false,
}: {
  stage?: SpatialStage;
  activeProject?: ActiveProjectId;
  ctaHovered?: boolean;
}) {
  const [webglSupported, setWebglSupported] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);

    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }

    return () => mq.removeEventListener("change", handler);
  }, []);

  const accentHex = PROJECT_ACCENTS[activeProject] || "#E86238";

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
    >
      {/* Subtle Ambient Radial Atmosphere */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at 50% 42%, ${accentHex}14 0%, rgba(14, 18, 28, 0.04) 46%, transparent 75%)`,
        }}
      />

      {webglSupported ? (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 6.2], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <AiCoreLattice
            stage={stage}
            activeProject={activeProject}
            ctaHovered={ctaHovered}
            reducedMotion={reducedMotion}
          />
        </Canvas>
      ) : (
        /* Non-WebGL Architectural Fallback Lattice */
        <div className="flex h-full w-full items-center justify-center opacity-30">
          <svg className="h-[420px] w-[420px]" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="72"
              fill="none"
              stroke={accentHex}
              strokeWidth="0.6"
              strokeDasharray="4 4"
            />
            <circle
              cx="100"
              cy="100"
              r="44"
              fill="none"
              stroke={accentHex}
              strokeWidth="0.8"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
