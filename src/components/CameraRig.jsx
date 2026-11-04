import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "../lib/scrollState";

// Car position on wide screens, as fractions of the screen size.
// X: negative = left, positive = right.  Y: bigger = higher up.
const HERO_SHIFT_X = -0.04;
const HERO_SHIFT_Y = 0.13;
const APPROACH_SHIFT_X = 0.22; // car moves right while the Approach text is on the left
const APPROACH_SHIFT_Y = 0.03;

const target = new THREE.Vector3(0, 0.7, 0);
const ordinaryCam = new THREE.Vector3(3.8, 1.0, 5.2);

export default function CameraRig() {
  const smooth = useRef(0);
  const point = useMemo(() => new THREE.Vector3(), []);
  const introOffset = useMemo(() => new THREE.Vector3(), []);

  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(5.4, 2.0, 6.4),
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

    // screen position of the car: hero spot -> approach spot -> back to centre
    const { width, height } = state.size;
    const wide = width > 900;

    const toApproach = THREE.MathUtils.smoothstep(scrollState.hero, 0, 0.7);
    const backToCentre = 1 - THREE.MathUtils.smoothstep(scrollState.approach, 0.9, 1);

    const fx = THREE.MathUtils.lerp(HERO_SHIFT_X, APPROACH_SHIFT_X, toApproach) * backToCentre;
    const fy = THREE.MathUtils.lerp(HERO_SHIFT_Y, APPROACH_SHIFT_Y, toApproach) * backToCentre;

    const shiftX = wide ? fx * width : 0;
    const shiftY = wide ? fy * height : 0;
    state.camera.setViewOffset(width, height, -shiftX, shiftY, width, height);
  });

  return null;
}