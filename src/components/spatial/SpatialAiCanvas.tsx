"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type SpatialStage =
  | "hero"
  | "work"
  | "build"
  | "recognition"
  | "stack"
  | "about"
  | "journey"
  | "contact";

export type ActiveProjectId =
  | "cardioxy-pro"
  | "foodresilience"
  | "occupational-skills-demand";

interface CoreSceneProps {
  stage: SpatialStage;
  activeProject: ActiveProjectId;
  ctaHovered: boolean;
  reducedMotion: boolean;
}

const STAGE_CAMERA_Z: Record<SpatialStage, number> = {
  hero: 6.1,
  work: 5.0,
  build: 5.5,
  recognition: 5.6,
  stack: 5.6,
  about: 5.9,
  journey: 6.1,
  contact: 6.8,
};

const STAGE_ROTATION_Y: Record<SpatialStage, number> = {
  hero: 0.25,
  work: 0.95,
  build: 1.55,
  recognition: 1.85,
  stack: 2.1,
  about: 2.65,
  journey: 3.15,
  contact: 3.6,
};

const PROJECT_ROTATION_OFFSET: Record<ActiveProjectId, { x: number; y: number }> = {
  "cardioxy-pro": { x: 0.14, y: -0.28 },
  foodresilience: { x: -0.1, y: 0.32 },
  "occupational-skills-demand": { x: 0.18, y: 0.72 },
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

  // Single controlled cool technological colour: Electric Cyan (#22D3EE)
  const cyanColor = useMemo(() => new THREE.Color("#22D3EE"), []);
  const mutedSlateColor = useMemo(() => new THREE.Color("#64748B"), []);

  // Deterministic neural lattice on a Fibonacci sphere
  const { positions, linePositions } = useMemo(() => {
    const count = 148;
    const pos = new Float32Array(count * 3);
    const pts: THREE.Vector3[] = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < count; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const r = 1.82 + (i % 4) * 0.13;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      pts.push(new THREE.Vector3(x, y, z));
    }

    const segments: number[] = [];
    for (let i = 0; i < count; i++) {
      let connections = 0;
      for (let j = i + 1; j < count && connections < 2; j++) {
        if (pts[i].distanceTo(pts[j]) < 0.76) {
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

  // 3 Orbiting Project Objects around the AI Core
  const satellites = useMemo(
    () => [
      { id: "cardioxy-pro", pos: new THREE.Vector3(-2.35, 1.15, 0.35) },
      { id: "foodresilience", pos: new THREE.Vector3(2.4, 0.85, 0.35) },
      { id: "occupational-skills-demand", pos: new THREE.Vector3(0.15, -2.25, 0.35) },
    ],
    []
  );

  useFrame((state, delta) => {
    // Weighted camera Z interpolation
    const targetZ = ctaHovered ? 4.75 : STAGE_CAMERA_Z[stage];
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      targetZ,
      delta * 2.1
    );

    // Damped cursor-reactive camera angle
    const pointerX = reducedMotion ? 0 : state.pointer.x * 0.48;
    const pointerY = reducedMotion ? 0 : state.pointer.y * 0.36;
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      pointerX,
      delta * 1.8
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      pointerY,
      delta * 1.8
    );
    state.camera.lookAt(0, 0, 0);

    if (!groupRef.current) return;

    // Intentional stage + project + pointer target orientation (not a mindless continuous spin)
    const projOffset = PROJECT_ROTATION_OFFSET[activeProject];
    const targetRotY =
      STAGE_ROTATION_Y[stage] +
      projOffset.y +
      pointerX * 0.55 +
      (reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.22) * 0.12);
    const targetRotX =
      projOffset.x -
      pointerY * 0.42 +
      (reducedMotion ? 0 : Math.cos(state.clock.elapsedTime * 0.18) * 0.06);

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      delta * 1.9
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      delta * 1.9
    );

    if (innerCoreRef.current) {
      const targetScale = ctaHovered ? 1.12 : stage === "contact" ? 0.94 : 1.02;
      innerCoreRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        delta * 2.4
      );
    }

    if (outerShellRef.current) {
      outerShellRef.current.rotation.z = THREE.MathUtils.lerp(
        outerShellRef.current.rotation.z,
        pointerX * -0.25,
        delta * 1.5
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Computational Core Icosahedron */}
      <mesh ref={innerCoreRef}>
        <icosahedronGeometry args={[1.02, 1]} />
        <meshBasicMaterial
          color={cyanColor}
          wireframe
          transparent
          opacity={ctaHovered ? 0.42 : stage === "contact" ? 0.15 : 0.26}
        />
      </mesh>

      {/* Secondary Structural Geodesic Lattice */}
      <mesh ref={outerShellRef}>
        <icosahedronGeometry args={[1.64, 2]} />
        <meshBasicMaterial
          color={mutedSlateColor}
          wireframe
          transparent
          opacity={stage === "contact" ? 0.04 : 0.08}
        />
      </mesh>

      {/* Neural Lattice Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={cyanColor}
          size={ctaHovered ? 0.052 : 0.038}
          transparent
          opacity={stage === "contact" ? 0.48 : 0.8}
          sizeAttenuation
        />
      </points>

      {/* Synaptic Connection Lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={cyanColor}
          transparent
          opacity={ctaHovered ? 0.24 : stage === "contact" ? 0.06 : 0.13}
        />
      </lineSegments>

      {/* 3 Project Objects Orbiting the AI Core */}
      {satellites.map((sat) => {
        const isSelected = activeProject === sat.id;
        return (
          <group key={sat.id} position={sat.pos}>
            <mesh scale={isSelected ? 1.5 : 0.92}>
              <octahedronGeometry args={[0.13, 0]} />
              <meshBasicMaterial
                color={isSelected ? cyanColor : mutedSlateColor}
                wireframe={!isSelected}
                transparent
                opacity={isSelected ? 0.95 : 0.4}
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

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
    >
      {/* Restrained Cool Cyan Atmospheric Depth */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(circle at 52% 40%, rgba(34, 211, 238, 0.075) 0%, rgba(14, 22, 36, 0.04) 48%, transparent 74%)",
        }}
      />

      {webglSupported ? (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 6.1], fov: 45 }}
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
        <div className="flex h-full w-full items-center justify-center opacity-25">
          <svg className="h-[400px] w-[400px]" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="72"
              fill="none"
              stroke="#22D3EE"
              strokeWidth="0.6"
              strokeDasharray="4 4"
            />
            <circle
              cx="100"
              cy="100"
              r="42"
              fill="none"
              stroke="#22D3EE"
              strokeWidth="0.8"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
