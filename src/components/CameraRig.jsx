import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "../lib/scrollState";

const { smoothstep, lerp } = THREE.MathUtils;
const v = (a) => new THREE.Vector3(...a);

// ---------- where the car sits on screen (wide screens only) ----------
// fractions of the screen size. X: negative = left, positive = right. Y: bigger = higher.
const HERO_SHIFT_X = -0.04;
const HERO_SHIFT_Y = 0.13;
const APPROACH_SHIFT_X = 0.16; // car sits right of centre while the text is on the left
const APPROACH_SHIFT_Y = 0.02;

// ---------- hero and finale cameras ----------
const HERO_POS = v([5.4, 2.0, 6.4]);
const HERO_LOOK = v([0, 0.7, 0]);
const FINALE_POS = v([3.8, 1.0, 5.2]);

const FOV_OUT = 35; // normal lens
const FOV_IN = 62;  // wider lens once we're inside the cabin

// ---------- the Approach journey: from above, down to the door, in through the window ----------
// The car is centred at the origin. Front = +X. Passenger side = +Z. Driver's seat = -Z. Up = +Y.
// Each step has where the camera is (pos) and what it looks at (look).
const PATH = [
  { pos: [0.5, 7.6, 1.4], look: [0, 0.3, 0] },       // 0  directly above              (Identity)
  { pos: [3.6, 4.6, 4.8], look: [0, 0.6, 0] },       // 1  swooping down, three-quarter
  { pos: [2.6, 1.9, 3.2], look: [0, 0.9, 0] },       // 2  beside the passenger door   (Insight)
  { pos: [0.9, 1.1, 1.7], look: [-0.2, 0.95, 0.1] }, // 3  at the window
  { pos: [-0.1, 1.0, 0.5], look: [0.7, 0.9, -0.3] }, // 4  just inside the cabin
  { pos: [-0.4, 1.0, -0.38], look: [1.7, 0.78, -0.38] }, // 5 driver's seat, facing the dash (Cohesion)
];

const START_POS = v(PATH[0].pos);
const START_LOOK = v(PATH[0].look);

export default function CameraRig() {
  const posCurve = useMemo(() => new THREE.CatmullRomCurve3(PATH.map((p) => v(p.pos))), []);
  const lookCurve = useMemo(() => new THREE.CatmullRomCurve3(PATH.map((p) => v(p.look))), []);

  const pose = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);
  const introOffset = useMemo(() => new THREE.Vector3(), []);
  const lookNow = useRef(new THREE.Vector3(0, 0.7, 0));
  const fovNow = useRef(FOV_OUT);
  const lastBranch = useRef("journey");

  useFrame((state, delta) => {
    const cam = state.camera;

    // "finale" = the Ordinary section; "journey" = hero, then the Approach section
    const branch = scrollState.ordinary > 0 ? "finale" : "journey";
    const snap = branch !== lastBranch.current; // jump (don't glide) when switching
    lastBranch.current = branch;

    let fov = FOV_OUT;

    if (branch === "finale") {
      const e = smoothstep(scrollState.ordinary, 0, 1);
      pose.copy(HERO_POS).lerp(FINALE_POS, e);
      look.copy(HERO_LOOK);
    } else if (scrollState.approach > 0.0001) {
      // the Approach journey
      const t = scrollState.approach;
      posCurve.getPoint(t, pose);
      lookCurve.getPoint(t, look);
      fov = lerp(FOV_OUT, FOV_IN, smoothstep(t, 0.6, 0.9));
    } else {
      // the hero scrolling away: front three-quarter view -> directly above
      const h = smoothstep(scrollState.hero, 0, 1);
      pose.copy(HERO_POS).lerp(START_POS, h);
      look.copy(HERO_LOOK).lerp(START_LOOK, h);
    }

    // entrance animation: starts far away and dollies in
    pose.add(introOffset.set(6, 3, 10).multiplyScalar(1 - scrollState.intro));

    // glide toward the wanted pose (smooths out stepped scrolling)
    const k = snap ? 1 : 1 - Math.exp(-6 * delta);
    cam.position.lerp(pose, k);
    lookNow.current.lerp(look, k);
    fovNow.current = lerp(fovNow.current, fov, k);

    cam.lookAt(lookNow.current);
    cam.fov = fovNow.current;

    // screen position of the car: hero spot -> approach spot -> centred again
    const { width, height } = state.size;
    const wide = width > 900;

    const toApproach = smoothstep(scrollState.hero, 0, 0.7);
    const backToCentre = 1 - smoothstep(scrollState.approach, 0.9, 1);

    const fx = lerp(HERO_SHIFT_X, APPROACH_SHIFT_X, toApproach) * backToCentre;
    const fy = lerp(HERO_SHIFT_Y, APPROACH_SHIFT_Y, toApproach) * backToCentre;

    const shiftX = wide ? fx * width : 0;
    const shiftY = wide ? fy * height : 0;

    // (also refreshes the projection, so the fov change above takes effect)
    cam.setViewOffset(width, height, -shiftX, shiftY, width, height);
  });

  return null;
}