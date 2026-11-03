import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { brands } from "../data/content";
import { prefersReducedMotion } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function Brands() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // the track holds the logos twice, so sliding by -50% loops seamlessly
      const marquee = gsap.to(".marquee-track", {
        xPercent: -50,
        ease: "none",
        duration: 40,
        repeat: -1,
      });

      // no endless motion for people who asked for less
      if (prefersReducedMotion()) {
        marquee.pause();
        return;
      }

      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const boost = gsap.utils.clamp(0, 10, Math.abs(self.getVelocity()) / 250);
          gsap.to(marquee, { timeScale: 1 + boost, duration: 0.2, overwrite: true });
          gsap.to(marquee, { timeScale: 1, duration: 1.2, delay: 0.25, ease: "power2.out" });
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="brands section--dark">
      <p className="eyebrow brands-eyebrow">Marques</p>

      <div className="marquee">
        <div className="marquee-track">
          {[...brands, ...brands].map((b, i) => {
            const isCopy = i >= brands.length; // second set is only for the loop

            return (
              <span
                className="marquee-logo"
                key={i}
                style={{ "--h": b.h }}
                aria-hidden={isCopy || undefined}
              >
                <img
                  src={b.logo}
                  alt={isCopy ? "" : b.name}
                  width={b.w}
                  height={b.h}
                  decoding="async"
                  draggable="false"
                />
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}