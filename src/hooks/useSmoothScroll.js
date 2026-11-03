import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

// the mobile address bar showing/hiding must not re-measure every pinned section
ScrollTrigger.config({ ignoreMobileResize: true });

export default function useSmoothScroll(locked = false) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // web fonts change text height, so re-measure once they're in
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    if (prefersReducedMotion()) return; // plain native scrolling

    const lenis = new Lenis({ lerp: 0.1 });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;

    if (!lenis) {
      // no Lenis (reduced motion): lock scrolling the plain way
      document.documentElement.style.overflow = locked ? "hidden" : "";
      return () => {
        document.documentElement.style.overflow = "";
      };
    }

    if (locked) lenis.stop();
    else lenis.start();
  }, [locked]);
}