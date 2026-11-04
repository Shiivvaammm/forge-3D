import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "../lib/scrollState";

export default function IntroGroup({ children }) {
  const ref = useRef();
  const tilt = useRef(0);

  useFrame((state, delta) => {
    const t = 1 - scrollState.intro; // 1 at start, 0 when finished

    // the car turns slightly toward the cursor while the hero is on screen
    const heroOn = 1 - THREE.MathUtils.smoothstep(scrollState.hero, 0, 0.5);
    tilt.current = THREE.MathUtils.damp(tilt.current, state.pointer.x * 0.35 * heroOn, 3, delta);

    ref.current.position.x = -t * 9;
    ref.current.rotation.y =
      t * 1.2 + scrollState.carYaw + scrollState.ordinary * Math.PI * 1.5 + tilt.current;
  });

  return <group ref={ref}>{children}</group>;
}