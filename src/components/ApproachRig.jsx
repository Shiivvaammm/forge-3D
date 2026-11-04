import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "../lib/scrollState";

const CABIN_LIGHT = 8; // brightness of the light inside the car

export default function ApproachRig() {
  const light = useRef();

  useFrame(() => {
    const comingIn = THREE.MathUtils.smoothstep(scrollState.approach, 0.65, 0.9);
    const leaving = 1 - THREE.MathUtils.smoothstep(scrollState.ordinary, 0, 0.1);
    light.current.intensity = CABIN_LIGHT * comingIn * leaving;
  });

  return (
    <pointLight
      ref={light}
      position={[-0.1, 1.1, 0]}
      color="#ffd9b8"
      distance={4}
      decay={2}
      intensity={0}
    />
  );
}