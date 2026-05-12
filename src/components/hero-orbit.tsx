"use client";

import { Float, Line, OrbitControls, Sphere } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

function SystemModel() {
  const group = useRef<Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.16;
  });

  const nodes: [number, number, number][] = [
    [0, 0.6, 0],
    [-1.6, -0.35, 0.2],
    [1.55, -0.45, -0.15],
    [0.1, -1.25, 1.1],
    [0.2, -1.15, -1.15]
  ];

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.55}>
        {nodes.map((node, index) => (
          <Sphere key={node.join(",")} args={[index === 0 ? 0.24 : 0.15, 32, 32]} position={node}>
            <meshStandardMaterial
              color={index === 0 ? "#67e8f9" : index % 2 ? "#a7f3d0" : "#fbbf24"}
              emissive={index === 0 ? "#164e63" : "#0f172a"}
              roughness={0.28}
              metalness={0.25}
            />
          </Sphere>
        ))}
        {nodes.slice(1).map((node) => (
          <Line key={node.join("-")} points={[nodes[0], node]} color="#67e8f9" transparent opacity={0.45} lineWidth={1.4} />
        ))}
      </Float>
    </group>
  );
}

export function HeroOrbit() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 42 }} dpr={[1, 1.6]} performance={{ min: 0.5 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 3, 4]} intensity={1.1} />
        <pointLight position={[-2, 1, 3]} color="#67e8f9" intensity={1.4} />
        <SystemModel />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.55} />
      </Canvas>
    </div>
  );
}
