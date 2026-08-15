"use client";

import { Canvas } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import { useMousePosition } from "@/hooks/useMousePosition";

function Shapes() {
  const { x, y } = useMousePosition();
  const w = typeof window !== "undefined" ? window.innerWidth : 1;
  const h = typeof window !== "undefined" ? window.innerHeight : 1;
  const parallaxX = (x / w - 0.5) * 0.3;
  const parallaxY = (y / h - 0.5) * 0.3;

  return (
    <group rotation={[parallaxY * 0.1, parallaxX * 0.1, 0]}>
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <RoundedBox args={[1, 1, 1]} radius={0.2} position={[2.5, 1, -2]}>
          <meshStandardMaterial color="#e85d3a" roughness={0.3} metalness={0.1} />
        </RoundedBox>
      </Float>

      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.4}>
        <mesh position={[-2.5, -0.5, -3]} rotation={[0.5, 0.3, 0]}>
          <torusGeometry args={[0.8, 0.35, 16, 32]} />
          <meshStandardMaterial color="#7c2d5b" roughness={0.2} metalness={0.2} />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.8}>
        <mesh position={[1, -1.5, -1.5]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial color="#c8963e" roughness={0.1} metalness={0.4} />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[-1.5, 1.5, -2.5]} rotation={[0, 0, 0.3]}>
          <coneGeometry args={[0.5, 1.2, 6]} />
          <meshStandardMaterial color="#2d7a4f" roughness={0.3} metalness={0.1} />
        </mesh>
      </Float>

      <pointLight position={[0, -3, 2]} color="#e85d3a" intensity={0.3} />
    </group>
  );
}

export default function HeroShapes() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#faf8f5" />
      <Shapes />
    </Canvas>
  );
}
