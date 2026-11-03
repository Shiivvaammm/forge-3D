import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import PlaceHolderCar from "./PlaceHolderCar";
import CameraRig from "./CameraRig";
import IntroGroup from "./IntroGroup";
import ApproachRig from "./ApproachRig";

// mode: "back" (behind content) | "hidden" (not rendered) | "front" (above content)
export default function Scene({ mode = "back" }) {
  const hidden = mode === "hidden";
  const className =
    "canvas-root" +
    (hidden ? " canvas-root--hidden" : "") +
    (mode === "front" ? " canvas-root--front" : "");

  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 2]}
        frameloop={hidden ? "never" : "always"}
        camera={{ position: [5.5, 2, 6.5], fov: 35 }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 6, 3]} intensity={1.5} castShadow />
        <Environment preset="city" />

        <CameraRig />
        <ApproachRig />

        <IntroGroup>
          <PlaceHolderCar />
        </IntroGroup>

        <ContactShadows position={[0, 0, 0]} opacity={0.45} scale={14} blur={2.6} far={4} />
      </Canvas>
    </div>
  );
}