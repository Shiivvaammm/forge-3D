import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { finalCta } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCta() {
  const root = useRef(null);
  const words = finalCta.title.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTrigger = {
        trigger: root.current,
        start: "top 60%",
        toggleActions: "play none none reverse",
      };

      gsap.fromTo(
        ".cta-line > span",
        { yPercent: 110 },
        { yPercent: 0, duration: 1.2, ease: "power4.out", stagger: 0.12, scrollTrigger }
      );

      gsap.fromTo(
        ".cta-fade",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.15, delay: 0.3, scrollTrigger }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section cta">
      <div className="cta-inner">
        <p className="eyebrow cta-fade">{finalCta.pre}</p>
        <h2 className="display cta-title">
          {words.map((w) => (
            <span className="cta-line" key={w}>
              <span>{w}</span>
            </span>
          ))}
        </h2>
        <Link to="/contact" className="btn cta-fade">
          {finalCta.cta} →
        </Link>
      </div>
    </section>
  );
}