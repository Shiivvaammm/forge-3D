import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { scrollState } from "../lib/scrollState";

export default function PlaceHolderCar() {
  const bodyMat = useRef();

  useFrame(() => {
    bodyMat.current.color.copy(scrollState.bodyColor);
  });

  const wheel = (x, z) => (
    <mesh
      key={`${x}${z}`}
      position={[x, 0.38, z]}
      rotation={[Math.PI / 2, 0, 0]}
      castShadow
    >
      <cylinderGeometry args={[0.38, 0.38, 0.32, 32]} />
      <meshStandardMaterial color="#111" roughness={0.6} />
    </mesh>
  );

  return (
    <group>
      {/* lower body */}
      <RoundedBox
        args={[4.2, 0.6, 1.8]}
        radius={0.15}
        smoothness={4}
        position={[0, 0.7, 0]}
        castShadow
      >
        <meshStandardMaterial ref={bodyMat} color="#ff4d1a" metalness={0.85} roughness={0.25} />
      </RoundedBox>

      {/* cabin */}
      <RoundedBox
        args={[2.1, 0.55, 1.55]}
        radius={0.2}
        smoothness={4}
        position={[-0.2, 1.25, 0]}
        castShadow
      >
        <meshStandardMaterial color="#1b1b1b" metalness={0.9} roughness={0.15} />
      </RoundedBox>

      {wheel(1.4, 0.95)}
      {wheel(1.4, -0.95)}
      {wheel(-1.4, 0.95)}
      {wheel(-1.4, -0.95)}
    </group>
  );
}