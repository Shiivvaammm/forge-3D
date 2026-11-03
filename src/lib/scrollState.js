import * as THREE from "three";

// Shared, mutable data read by the 3D loop. Not React state, on purpose.
export const scrollState = {
  intro: 0,     // intro animation: 0 = not started, 1 = finished
  hero: 0,      // progress of the hero section scrolling away (0 to 1)
  approach: 0,  // progress through the pinned approach section (0 to 1)
  ordinary: 0,  // progress through the pinned Ordinary section (0 to 1)

  // derived values, written by ApproachRig and read by the car
  carYaw: 0,
  bodyColor: new THREE.Color("#ff4d1a"),
};

// call when the homepage mounts, so a return visit starts from scratch
export function resetScrollState() {
  scrollState.intro = 0;
  scrollState.hero = 0;
  scrollState.approach = 0;
  scrollState.ordinary = 0;
  scrollState.carYaw = 0;
  scrollState.bodyColor.set("#ff4d1a");
}