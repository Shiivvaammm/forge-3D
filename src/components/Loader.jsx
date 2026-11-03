import { useEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import { site } from "../data/content";

export default function Loader({ onDone }) {
  const { progress } = useProgress(); // tracks real asset loading (HDR now, GLB later)
  const [minTimePassed, setMinTimePassed] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const root = useRef(null);
  const fired = useRef(false);

  useEffect(() => {
    const a = setTimeout(() => setMinTimePassed(true), 1200); // never flash
    const b = setTimeout(() => setTimedOut(true), 6000);      // never hang
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);

  useEffect(() => {
    if (fired.current) return;
    if (!minTimePassed || !(progress >= 100 || timedOut)) return;
    fired.current = true;

    gsap.to(root.current, {
      yPercent: -100,
      duration: 1,
      ease: "power4.inOut",
      onStart: onDone,
      onComplete: () => {
        if (root.current) root.current.style.display = "none";
      },
    });
  }, [progress, minTimePassed, timedOut, onDone]);

  return (
    <div ref={root} className="loader">
      <p className="eyebrow">{site.name}</p>
      <p className="loader-count">{Math.round(progress)}</p>
    </div>
  );
}