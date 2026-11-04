import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { site, contact, brands, buildItems, stockItems } from "../data/content";
import useSectionProgress from "../hooks/useSectionProgress";

const lines = ["For Those Who Refuse", "Ordinary"];

// numbers come straight from your data, so they stay correct when it changes
const stats = [
  { value: brands.length, label: "Marques" },
  { value: buildItems.length + stockItems.length, label: "Builds" },
  { value: contact.sites.length, label: "Studios" },
];

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
      <div className="hero-main">
        <h1 className="display display--hero">
          {lines.map((line, i) => (
            <span className="hero-line" key={line}>
              <span className={i === lines.length - 1 ? "is-accent" : undefined}>
                {line}
              </span>
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

        <div className="hero-stats">
          {stats.map((s) => (
            <div className="hero-stat" key={s.label}>
              <strong>{String(s.value).padStart(2, "0")}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}