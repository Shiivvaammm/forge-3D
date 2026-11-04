import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { site, contact } from "../data/content";
import useSectionProgress from "../hooks/useSectionProgress";

const lines = ["For Those Who", "Refuse", "Ordinary"];

export default function Hero({ ready }) {
  const root = useRef(null);

  useSectionProgress(root, "hero", { start: "top top", end: "bottom top" });

  const appointment = contact.methods.find((m) => m.label === "Visit Us")?.value;

  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.3 })
        .fromTo(
          ".hero-line > span",
          // y: 0 on both sides overrides the pixel offset GSAP reads from the CSS
          { yPercent: 110, y: 0 },
          { yPercent: 0, y: 0, duration: 1.2, ease: "power4.out", stagger: 0.12 }
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
      <div className="hero-top mono hero-fade">
        <span>{site.name}</span>
        <span>{contact.sites.join(" · ")}</span>
      </div>

      <div className="hero-inner">
        <h1 className="display display--hero">
          {lines.map((line) => (
            <span className="hero-line" key={line}>
              <span>{line}</span>
            </span>
          ))}
        </h1>

        <div className="hero-side stack">
          <p className="body-text hero-fade">{site.subline}</p>
          <div className="hero-actions hero-fade">
            <Link to="/contact" className="btn btn--solid">
              {site.cta} →
            </Link>
            <Link to="/builds" className="btn">
              View builds
            </Link>
          </div>
        </div>
      </div>

      <div className="hero-bottom mono hero-fade">
        <span className="scroll-cue">
          <i /> Scroll
        </span>
        <span>{appointment}</span>
      </div>
    </section>
  );
}