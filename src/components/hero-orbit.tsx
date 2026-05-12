"use client";

import { Box, Line, MeshTransmissionMaterial, RoundedBox, Torus } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";

function DataPulse({ radius = 1.7, speed = 0.8, offset = 0 }: { radius?: number; speed?: number; offset?: number }) {
  const pulse = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.elapsedTime * speed + offset;
    if (!pulse.current) return;
    pulse.current.position.x = Math.cos(time) * radius;
    pulse.current.position.z = Math.sin(time) * radius * 0.45;
    pulse.current.position.y = Math.sin(time * 1.4) * 0.18;
  });

  return (
    <mesh ref={pulse}>
      <sphereGeometry args={[0.045, 16, 16]} />
      <meshStandardMaterial color="#67e8f9" emissive="#0891b2" emissiveIntensity={1.4} roughness={0.18} />
    </mesh>
  );
}

function InfrastructureModel() {
  const root = useRef<Group>(null);
  const core = useRef<Mesh>(null);
  const nodes = useMemo<[number, number, number][]>(
    () => [
      [0, 0, 0],
      [-1.65, -0.55, 0.15],
      [1.55, -0.6, -0.05],
      [-0.95, 0.8, -0.35],
      [0.95, 0.76, -0.28],
      [0, -1.1, 0.42]
    ],
    []
  );

  useFrame(({ clock }, delta) => {
    if (root.current) {
      root.current.rotation.y += delta * 0.08;
      root.current.rotation.x = Math.sin(clock.elapsedTime * 0.35) * 0.045;
    }
    if (core.current) {
      core.current.rotation.y -= delta * 0.45;
      core.current.rotation.z += delta * 0.22;
    }
  });

  return (
    <group ref={root} rotation={[0.08, -0.35, 0]} position={[1.55, -0.03, 0]} scale={1.22}>
      <group>
        <mesh ref={core} position={nodes[0]}>
          <octahedronGeometry args={[0.42, 1]} />
          <meshStandardMaterial color="#67e8f9" emissive="#0891b2" emissiveIntensity={1.4} metalness={0.2} roughness={0.18} />
        </mesh>
        <mesh position={nodes[0]} scale={1.28}>
          <octahedronGeometry args={[0.42, 1]} />
          <MeshTransmissionMaterial
            color="#67e8f9"
            thickness={0.35}
            roughness={0.18}
            transmission={0.55}
            chromaticAberration={0.04}
            anisotropy={0.25}
            transparent
            opacity={0.5}
          />
        </mesh>
        <Torus args={[0.72, 0.012, 12, 96]} rotation={[Math.PI / 2.2, 0, 0]}>
          <meshStandardMaterial color="#22d3ee" emissive="#155e75" emissiveIntensity={0.9} transparent opacity={0.7} />
        </Torus>
        <Torus args={[1.28, 0.009, 12, 112]} rotation={[Math.PI / 2.6, 0.2, 0.35]}>
          <meshStandardMaterial color="#a7f3d0" emissive="#047857" emissiveIntensity={0.45} transparent opacity={0.42} />
        </Torus>
      </group>

      {nodes.slice(1).map((node, index) => (
        <group key={node.join(",")} position={node}>
          <RoundedBox args={[0.5, 0.32, 0.16]} radius={0.035} smoothness={5}>
            <meshStandardMaterial
              color={index % 2 === 0 ? "#164e63" : "#14532d"}
              emissive={index % 2 === 0 ? "#0891b2" : "#16a34a"}
              emissiveIntensity={0.62}
              metalness={0.45}
              roughness={0.38}
            />
          </RoundedBox>
          <Box args={[0.34, 0.018, 0.172]} position={[0, 0.08, 0.002]}>
            <meshStandardMaterial color={index % 2 === 0 ? "#67e8f9" : "#86efac"} emissive="#0891b2" emissiveIntensity={0.8} />
          </Box>
        </group>
      ))}

      {nodes.slice(1).map((node, index) => (
        <Line
          key={`line-${node.join(",")}`}
          points={[nodes[0], node]}
          color={index % 2 === 0 ? "#67e8f9" : "#a7f3d0"}
          transparent
          opacity={0.72}
          lineWidth={1.7}
        />
      ))}

      <DataPulse radius={1.55} speed={0.75} />
      <DataPulse radius={1.95} speed={0.62} offset={2.1} />
      <DataPulse radius={1.15} speed={0.95} offset={4.2} />
    </group>
  );
}

export function HeroOrbit() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0.2, 5.4], fov: 38 }} dpr={[1, 1.35]} performance={{ min: 0.55 }}>
        <ambientLight intensity={0.72} />
        <directionalLight position={[4, 4, 5]} intensity={1.15} />
        <pointLight position={[-3, 1.2, 3]} color="#67e8f9" intensity={1.65} />
        <pointLight position={[3, -1.8, 2]} color="#fbbf24" intensity={0.72} />
        <InfrastructureModel />
      </Canvas>
    </div>
  );
}
