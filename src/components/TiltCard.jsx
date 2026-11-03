import { useRef } from "react";
import gsap from "gsap";

export default function TiltCard({ children }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    // no tilt on touch screens
    if (!window.matchMedia("(hover: hover)").matches) return;

    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;  // -0.5 to 0.5
    const py = (e.clientY - r.top) / r.height - 0.5;

    gsap.to(ref.current, {
      rotateY: px * 10,
      rotateX: -py * 10,
      transformPerspective: 900,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleLeave = () => {
    gsap.to(ref.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <article
      ref={ref}
      className="card"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </article>
  );
}