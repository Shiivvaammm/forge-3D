import { lazy, Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, PerformanceMonitor } from "@react-three/drei";
import PlaceHolderCar from "./PlaceHolderCar";
import CameraRig from "./CameraRig";
import IntroGroup from "./IntroGroup";
import ApproachRig from "./ApproachRig";
import { USE_REAL_MODEL } from "../config";
import { site } from "../data/content";

// only downloaded when the real model is switched on
const Car = lazy(() => import("./Car"));

const device = () => window.devicePixelRatio || 1;

// mode: "back" (behind content) | "hidden" (not rendered) | "front" (above content)
export default function Scene({ mode = "back" }) {
  const [dpr, setDpr] = useState(() => Math.min(device(), 1.5));
  const hidden = mode === "hidden";

  const className =
    "canvas-root" +
    (hidden ? " canvas-root--hidden" : "") +
    (mode === "front" ? " canvas-root--front" : "");

  return (
    <div className={className} aria-hidden="true">
      {/* decoration that sits BEHIND the car */}
      <div className="backdrop">
        <span className="backdrop-word">{site.name.split(" ")[0]}</span>
        <span className="backdrop-dial" />
      </div>

      <Canvas
        dpr={dpr}
        frameloop={hidden ? "never" : "always"}
        camera={{ position: [5.5, 2, 6.5], fov: 35 }}
      >
        <PerformanceMonitor
          onIncline={() => setDpr(Math.min(device(), 2))}
          onDecline={() => setDpr(1)}
        />

        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 6, 3]} intensity={1.5} />
        <Environment preset="city" />

        <CameraRig />
        <ApproachRig />

        <IntroGroup>
          {USE_REAL_MODEL ? (
            <Suspense fallback={null}>
              <Car />
            </Suspense>
          ) : (
            <PlaceHolderCar />
          )}
        </IntroGroup>

        <ContactShadows position={[0, 0, 0]} opacity={0.45} scale={14} blur={2.6} far={4} />
      </Canvas>
    </div>
  );
}