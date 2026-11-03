import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { brands } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

export default function Brands() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // the track holds the brand list twice, so sliding by -50% loops seamlessly
      const marquee = gsap.to(".marquee-track", {
        xPercent: -50,
        ease: "none",
        duration: 40,
        repeat: -1,
      });

      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const boost = gsap.utils.clamp(0, 10, Math.abs(self.getVelocity()) / 250);

          // speed up with scroll velocity...
          gsap.to(marquee, { timeScale: 1 + boost, duration: 0.2, overwrite: true });
          // ...then ease back to normal speed
          gsap.to(marquee, { timeScale: 1, duration: 1.2, delay: 0.25, ease: "power2.out" });
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="brands">
      <p className="eyebrow brands-eyebrow">Marques</p>
      <div className="marquee">
        <div className="marquee-track">
          {[...brands, ...brands].map((b, i) => (
            <span className="marquee-item" key={i}>
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}