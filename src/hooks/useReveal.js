import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Fades up every ".reveal" element inside `ref` as it scrolls into view
export default function useReveal(ref) {
  useEffect(() => {
    // respect the "reduce motion" setting: CSS already shows everything
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".reveal", ref.current);

      ScrollTrigger.batch(items, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 }
          ),
      });
    }, ref);

    return () => ctx.revert();
  }, [ref]);
}