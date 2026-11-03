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
        new THREE.Vector3(5.5, 2.0, 6.5),
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

    // push in during the Ordinary section
    const e = THREE.MathUtils.smoothstep(scrollState.ordinary, 0, 1);
    state.camera.position.lerp(ordinaryCam, e);

    state.camera.lookAt(target);
  });

  return null;
}