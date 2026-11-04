import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "../lib/scrollState";

const MODEL_URL = `${import.meta.env.BASE_URL}models/car.glb`;

// ---------- tune these for your model ----------
const TARGET_LENGTH = 4.4; // car length in scene units

// This model's front points along +Z, so Math.PI / 2 turns it to face +X.
const ROTATION_Y = Math.PI / 2;

// Objects deleted before measuring. This file contains a 1140-unit floor named "Plane".
const REMOVE_NAMES = /^(plane|ground|floor)/i;

// Body paint = a material named exactly this, but only on meshes whose name has one of these words
const PAINT_MATERIALS = ["carpaint"];
const PAINT_MESHES = /(body|bumper|hood|door|fender|trunk)/i;

// ----- wheel repair (this file's wheels are detached from the body) -----
const WHEEL_MESH = /Wheel\.?(Ft|Bk)\.?[LR]_/i; // all four original wheels (deleted)
const SOURCE_WHEEL = /Wheel\.?Bk\.?L_/i;       // the one good wheel we copy to every corner
const MECHANICAL = /(Hub|Brake|Tierod|Lowerarm|Stut|Shock|Spring|Subframe|Swaybar|Halfshaft|Steeringbox|Radiator|Transmission)/i;

const WHEEL_TRACK = 1.08;      // wheel centre's distance from the car's centre line. Wheels poke out: lower it. Sunk in: raise it.
const WHEELBASE_RATIO = 0.567; // distance between axles as a fraction of car length. Front wheels off-centre in their arches: change it.
const WHEEL_Z_SHIFT = 0;       // slides ALL wheels forwards (+) or backwards (-)
// -----------------------------------------------------------------------

export default function Car() {
  const { scene } = useGLTF(MODEL_URL);

  const { model, paints } = useMemo(() => {
    const root = scene.clone(true); // never edit the cached original
    const paints = [];
    const names = new Set();
    root.updateMatrixWorld(true);

    // 1. keep a copy of the one good wheel, with its position baked in
    const sourceMeshes = [];
    root.traverse((o) => {
      if (o.isMesh && SOURCE_WHEEL.test(o.name)) sourceMeshes.push(o);
    });

    let wheelProto = null;
    let wheelCentre = new THREE.Vector3();

    if (sourceMeshes.length) {
      const wheelBox = new THREE.Box3();
      sourceMeshes.forEach((m) => wheelBox.expandByObject(m));
      wheelBox.getCenter(wheelCentre);

      wheelProto = new THREE.Group();
      sourceMeshes.forEach((m) => {
        const c = m.clone(false);
        m.matrixWorld.decompose(c.position, c.quaternion, c.scale); // bake world transform
        c.position.sub(wheelCentre); // centre the wheel on the origin
        wheelProto.add(c);
      });
    } else {
      console.warn("[Car] source wheel not found; wheels will be missing");
    }

    // 2. delete the floor, the original wheels, and the loose mechanical parts
    const junk = [];
    root.traverse((o) => {
      if (REMOVE_NAMES.test(o.name)) junk.push(o);
      else if (o.isMesh && (WHEEL_MESH.test(o.name) || MECHANICAL.test(o.name))) junk.push(o);
    });
    junk.forEach((o) => o.removeFromParent());

    // 3. materials: paint recolouring + cheaper glass
    root.traverse((obj) => {
      if (!obj.isMesh) return;

      const isPaintPart = PAINT_MESHES.test(obj.name);
      const list = Array.isArray(obj.material) ? obj.material : [obj.material];

      const next = list.map((m) => {
        names.add(m.name || "(unnamed)");

        const isPaint = isPaintPart && PAINT_MATERIALS.includes(m.name?.toLowerCase());
        const hasTransmission = m.transmission > 0;
        if (!isPaint && !hasTransmission) return m;

        const copy = m.clone();
        if (isPaint) paints.push(copy);
        if (hasTransmission) {
          copy.transmission = 0; // transmission forces an extra render pass
          copy.transparent = true;
          copy.depthWrite = false;
        }
        return copy;
      });

      obj.material = Array.isArray(obj.material) ? next : next[0];
    });

    // 4. fit four wheels to the body
    if (wheelProto) {
      const body = new THREE.Box3().setFromObject(root);
      const length = body.max.z - body.min.z;

      const rearZ = wheelCentre.z + WHEEL_Z_SHIFT;
      const frontZ = rearZ + WHEELBASE_RATIO * length;
      const y = wheelCentre.y;

      [
        [1, rearZ],
        [1, frontZ],
        [-1, rearZ],
        [-1, frontZ],
      ].forEach(([side, z]) => {
        const wheel = wheelProto.clone(true);
        wheel.position.set(side * WHEEL_TRACK, y, z);
        wheel.scale.x = side; // mirror the right-hand side so the rim faces outwards
        root.add(wheel);
      });
    }

    // 5. orient, scale to a known length, centre, and drop onto the floor
    root.rotation.y = ROTATION_Y;
    root.updateMatrixWorld(true);

    let box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    console.info("[Car] size before scaling:", size.toArray().map((n) => +n.toFixed(2)));

    root.scale.setScalar(TARGET_LENGTH / Math.max(size.x, size.z));
    root.updateMatrixWorld(true);

    box = new THREE.Box3().setFromObject(root);
    const centre = box.getCenter(new THREE.Vector3());
    root.position.set(-centre.x, -box.min.y, -centre.z);

    console.info("[Car] material names in this model:", [...names]);
    if (!paints.length) {
      console.warn("[Car] no body paint matched; check PAINT_MATERIALS and PAINT_MESHES");
    }

    return { model: root, paints };
  }, [scene]);

  useFrame(() => {
    paints.forEach((m) => m.color?.copy(scrollState.bodyColor));
  });

  return <primitive object={model} />;
}

useGLTF.preload(MODEL_URL);