import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "../lib/scrollState";

const target = new THREE.Vector3(0, 0.7, 0);
const ordinaryCam = new THREE.Vector3(3.8, 1.0, 5.2);

export default function CameraRig() {
  const smooth = useRef(0);
  const point = useMemo(() => new THREE.Vector3(), []);
  const introOffset = useMemo(() => new THREE.Vector3(), []);

  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(4.7, 1.7, 5.6),   // start: closer than before, so the car is bigger
        new THREE.Vector3(0.0, 1.4, 8.0),
        new THREE.Vector3(-6.5, 2.2, 3.0),
        new THREE.Vector3(-3.0, 6.0, 5.0),
      ]),
    []
  );

  useFrame((state, delta) => {
    const wanted = 0.35 * scrollState.hero;

    smooth.current = THREE.MathUtils.damp(smooth.current, wanted, 4, delta);
    curve.getPoint(smooth.current, point);

    introOffset.set(6, 3, 10).multiplyScalar(1 - scrollState.intro);

    state.camera.position.copy(point).add(introOffset);

    const e = THREE.MathUtils.smoothstep(scrollState.ordinary, 0, 1);
    state.camera.position.lerp(ordinaryCam, e);

    state.camera.lookAt(target);

    // Hero composition: on wide screens the car sits right of centre and a little
    // higher, then glides back to the middle as the hero scrolls away.
    // If it moves the wrong way on your screen, flip the sign of shiftX / shiftY.
    const { width, height } = state.size;
    const wide = width > 900;
    const heroOut = 1 - THREE.MathUtils.smoothstep(scrollState.hero, 0, 0.7);
    const shiftX = wide ? 0.16 * width * heroOut : 0;
    const shiftY = wide ? 0.05 * height * heroOut : 0;
    state.camera.setViewOffset(width, height, -shiftX, shiftY, width, height);
  });

  return null;
}