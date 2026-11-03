import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "../lib/scrollState";

const colors = [
  new THREE.Color("#ff4d1a"), // Identity: signal orange
  new THREE.Color("#1f4fff"), // Insight: cobalt
  new THREE.Color("#2a2a2e"), // Cohesion: graphite
];
const target = new THREE.Color();

export default function ApproachRig() {
  useFrame((_, delta) => {
    const a = scrollState.approach;

    // s moves 0 to 1 during the first transition, 1 to 2 during the second
    const s =
      THREE.MathUtils.smoothstep(a, 0.25, 0.375) +
      THREE.MathUtils.smoothstep(a, 0.625, 0.75);

    scrollState.carYaw = THREE.MathUtils.damp(scrollState.carYaw, s * 1.2, 6, delta);

    const i = Math.min(Math.floor(s), 1);
    target.copy(colors[i]).lerp(colors[i + 1], s - i);

    // back to orange for the Ordinary finale
    if (scrollState.ordinary > 0) target.copy(colors[0]);

    scrollState.bodyColor.lerp(target, 1 - Math.exp(-6 * delta));
  });

  return null;
}