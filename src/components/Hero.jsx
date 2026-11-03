import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { site } from "../data/content";
import useSectionProgress from "../hooks/useSectionProgress";

const lines = ["For Those Who", "Refuse", "Ordinary"];

export default function Hero({ ready }) {
  const root = useRef(null);

  useSectionProgress(root, "hero", { start: "top top", end: "bottom top" });

  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.3 })
        .fromTo(
          ".hero-line > span",
          { yPercent: 110 },
          { yPercent: 0, duration: 1.2, ease: "power4.out", stagger: 0.12 }
        )
        .fromTo(
          ".hero-fade",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 },
          "-=0.7"
        );
    }, root);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section ref={root} className="section hero">
      <div className="hero-inner">
        <div className="stack">
          <p className="eyebrow hero-fade">{site.name}</p>
          <h1 className="display display--hero">
            {lines.map((line) => (
              <span className="hero-line" key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h1>
        </div>

        <div className="hero-side stack">
          <p className="body-text hero-fade">{site.subline}</p>
          <Link to="/contact" className="btn hero-fade">
            {site.cta} →
          </Link>
        </div>
      </div>
    </section>
  );
}