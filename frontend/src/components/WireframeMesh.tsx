import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GridProps {
  mousePosition: { x: number; y: number };
  isHovering: boolean;
}

function FluidGrid({ mousePosition, isHovering }: GridProps) {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const dotsRef = useRef<THREE.Points>(null);
  const glowDotsRef = useRef<THREE.Points>(null);

  const smoothedMouse = useRef({ x: 0, y: 0 });
  const time = useRef(0);

  const gridCols = 55;
  const gridRows = 40;
  const spacingX = 0.28;
  const spacingY = 0.28;

  const { linePositions, dotPositions, originalDotPositions, glowPositions } =
    useMemo(() => {
      const lines: number[] = [];
      const dots: number[] = [];
      const origDots: number[] = [];
      const glow: number[] = [];

      for (let i = 0; i < gridRows; i++) {
        for (let j = 0; j < gridCols; j++) {
          const x = (j - gridCols / 2) * spacingX;
          const y = (i - gridRows / 2) * spacingY;
          const z = 0;

          dots.push(x, y, z);
          origDots.push(x, y, z);
          glow.push(x, y, z);
        }
      }

      for (let i = 0; i < gridRows; i++) {
        for (let j = 0; j < gridCols; j++) {
          const idx = (i * gridCols + j) * 3;
          const x1 = dots[idx];
          const y1 = dots[idx + 1];
          const z1 = dots[idx + 2];

          if (j < gridCols - 1) {
            const nextIdx = (i * gridCols + j + 1) * 3;
            lines.push(
              x1,
              y1,
              z1,
              dots[nextIdx],
              dots[nextIdx + 1],
              dots[nextIdx + 2],
            );
          }

          if (i < gridRows - 1) {
            const nextIdx = ((i + 1) * gridCols + j) * 3;
            lines.push(
              x1,
              y1,
              z1,
              dots[nextIdx],
              dots[nextIdx + 1],
              dots[nextIdx + 2],
            );
          }
        }
      }

      return {
        linePositions: new Float32Array(lines),
        dotPositions: new Float32Array(dots),
        originalDotPositions: new Float32Array(origDots),
        glowPositions: new Float32Array(glow),
      };
    }, []);

  useFrame((_, delta) => {
    if (!dotsRef.current || !linesRef.current || !glowDotsRef.current) return;

    time.current += delta;

    const lerpFactor = Math.min(delta * 6, 1);
    smoothedMouse.current.x +=
      (mousePosition.x - smoothedMouse.current.x) * lerpFactor;
    smoothedMouse.current.y +=
      (mousePosition.y - smoothedMouse.current.y) * lerpFactor;

    const dotAttr = dotsRef.current.geometry.attributes.position;
    const dotPos = dotAttr.array as Float32Array;
    const lineAttr = linesRef.current.geometry.attributes.position;
    const linePos = lineAttr.array as Float32Array;
    const glowAttr = glowDotsRef.current.geometry.attributes.position;
    const glowPos = glowAttr.array as Float32Array;

    const pointCount = dotPos.length / 3;

    for (let i = 0; i < pointCount; i++) {
      const ox = originalDotPositions[i * 3];
      const oy = originalDotPositions[i * 3 + 1];

      const currentX = dotPos[i * 3];
      const currentY = dotPos[i * 3 + 1];
      const currentZ = dotPos[i * 3 + 2];

      const driftX = Math.sin(time.current * 0.2 + ox * 2) * 0.01;
      const driftY = Math.cos(time.current * 0.15 + oy * 2) * 0.01;

      let targetX = ox + driftX;
      let targetY = oy + driftY;
      let targetZ = 0;

      if (isHovering) {
        const mouseWorldX = smoothedMouse.current.x * 6;
        const mouseWorldY = smoothedMouse.current.y * 4;

        const dx = mouseWorldX - ox;
        const dy = mouseWorldY - oy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const radius = 3.0;
        const influence = Math.max(0, 1 - dist / radius);

        const eased =
          influence *
          influence *
          influence *
          (influence * (influence * 6 - 15) + 10);
        const warpStrength = eased * 0.6;

        if (warpStrength > 0.001) {
          const angle = Math.atan2(dy, dx);
          const pullStrength = warpStrength * 0.3;

          targetX = ox + Math.cos(angle) * dist * pullStrength + driftX;
          targetY = oy + Math.sin(angle) * dist * pullStrength + driftY;
          targetZ = -warpStrength * 0.6;
        }
      }

      const smoothFactor = isHovering ? 0.08 : 0.04;
      dotPos[i * 3] = currentX + (targetX - currentX) * smoothFactor;
      dotPos[i * 3 + 1] = currentY + (targetY - currentY) * smoothFactor;
      dotPos[i * 3 + 2] = currentZ + (targetZ - currentZ) * smoothFactor;

      glowPos[i * 3] = dotPos[i * 3];
      glowPos[i * 3 + 1] = dotPos[i * 3 + 1];
      glowPos[i * 3 + 2] = dotPos[i * 3 + 2] - 0.01;
    }

    dotAttr.needsUpdate = true;
    glowAttr.needsUpdate = true;

    let lineIdx = 0;
    for (let i = 0; i < gridRows; i++) {
      for (let j = 0; j < gridCols; j++) {
        const dotIdx = (i * gridCols + j) * 3;

        if (j < gridCols - 1) {
          const nextDotIdx = (i * gridCols + j + 1) * 3;
          linePos[lineIdx++] = dotPos[dotIdx];
          linePos[lineIdx++] = dotPos[dotIdx + 1];
          linePos[lineIdx++] = dotPos[dotIdx + 2];
          linePos[lineIdx++] = dotPos[nextDotIdx];
          linePos[lineIdx++] = dotPos[nextDotIdx + 1];
          linePos[lineIdx++] = dotPos[nextDotIdx + 2];
        }

        if (i < gridRows - 1) {
          const nextDotIdx = ((i + 1) * gridCols + j) * 3;
          linePos[lineIdx++] = dotPos[dotIdx];
          linePos[lineIdx++] = dotPos[dotIdx + 1];
          linePos[lineIdx++] = dotPos[dotIdx + 2];
          linePos[lineIdx++] = dotPos[nextDotIdx];
          linePos[lineIdx++] = dotPos[nextDotIdx + 1];
          linePos[lineIdx++] = dotPos[nextDotIdx + 2];
        }
      }
    }

    lineAttr.needsUpdate = true;

    const glowMaterial = glowDotsRef.current.material as THREE.PointsMaterial;
    const targetOpacity = isHovering ? 0.15 : 0.05;
    glowMaterial.opacity += (targetOpacity - glowMaterial.opacity) * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#4fd1c5" transparent opacity={0.04} />
      </lineSegments>

      <points ref={glowDotsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={glowPositions.length / 3}
            array={glowPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#63b3ed"
          transparent
          opacity={0.05}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points ref={dotsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={dotPositions.length / 3}
            array={dotPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.015}
          color="#81e6d9"
          transparent
          opacity={0.08}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

function Scene({ mousePosition, isHovering }: GridProps) {
  return <FluidGrid mousePosition={mousePosition} isHovering={isHovering} />;
}

export function WireframeMesh() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-auto"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <Scene mousePosition={mousePosition} isHovering={isHovering} />
      </Canvas>
    </div>
  );
}
