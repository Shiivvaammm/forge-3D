import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { scrollState } from "../lib/scrollState";

export default function IntroGroup({ children }) {
  const ref = useRef();

  useFrame(() => {
    const t = 1 - scrollState.intro; // 1 at start, 0 when finished
    ref.current.position.x = -t * 9;
    ref.current.rotation.y =
      t * 1.2 + scrollState.carYaw + scrollState.ordinary * Math.PI * 1.5;
  });

  return <group ref={ref}>{children}</group>;
}