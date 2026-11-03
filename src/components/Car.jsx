import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "../lib/scrollState";

const MODEL_URL = `${import.meta.env.BASE_URL}models/car.glb`;

// ---------- tune these for your model ----------
const TARGET_LENGTH = 4.4; // car length in scene units (the placeholder was 4.2)

// The car's front should point along +X (to the right from the starting camera).
// Model faces +Z (most common): Math.PI / 2.  Faces -Z: -Math.PI / 2.  Faces +X: 0.
const ROTATION_Y = Math.PI / 2;

// Lowercase pieces of the body paint material's name. The console prints all
// material names when the model loads, so you can see what to put here.
const PAINT_NAMES = ["body", "paint", "carpaint", "car_paint"];
// -----------------------------------------------

export default function Car() {
  const { scene } = useGLTF(MODEL_URL);

  const { model, paints } = useMemo(() => {
    const root = scene.clone(true); // never edit the cached original
    const paints = [];
    const names = new Set();

    root.traverse((obj) => {
      if (!obj.isMesh) return;

      const list = Array.isArray(obj.material) ? obj.material : [obj.material];
      const next = list.map((m) => {
        names.add(m.name || "(unnamed)");
        const isPaint = PAINT_NAMES.some((n) => m.name?.toLowerCase().includes(n));
        if (!isPaint) return m;

        const copy = m.clone(); // own copy, so we can recolour it freely
        paints.push(copy);
        return copy;
      });
      obj.material = Array.isArray(obj.material) ? next : next[0];
    });

    // orient, scale to a known length, centre, and drop onto the floor
    root.rotation.y = ROTATION_Y;
    root.updateMatrixWorld(true);

    let box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    root.scale.setScalar(TARGET_LENGTH / Math.max(size.x, size.z));
    root.updateMatrixWorld(true);

    box = new THREE.Box3().setFromObject(root);
    const center = box.getCenter(new THREE.Vector3());
    root.position.set(-center.x, -box.min.y, -center.z);

    console.info("[Car] material names in this model:", [...names]);
    if (!paints.length) {
      console.warn("[Car] no body paint matched. Add its name to PAINT_NAMES to enable colour changes.");
    }

    return { model: root, paints };
  }, [scene]);

  // same colour the placeholder used, driven by scroll
  useFrame(() => {
    paints.forEach((m) => m.color?.copy(scrollState.bodyColor));
  });

  return <primitive object={model} />;
}

useGLTF.preload(MODEL_URL);