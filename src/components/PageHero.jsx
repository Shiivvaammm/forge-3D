import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PageHero({ eyebrow, lines, text, children }) {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.15 })
        .fromTo(
          ".hero-line > span",
          { yPercent: 110, y: 0 },
          { yPercent: 0, y: 0, duration: 1.1, ease: "power4.out", stagger: 0.1 }
        )
        .fromTo(
          ".hero-fade",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 },
          "-=0.6"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="page-hero">
      <div className="page-hero-inner stack">
        {eyebrow && <p className="eyebrow hero-fade">{eyebrow}</p>}

        <h1 className="display display--page">
          {lines.map((line) => (
            <span className="hero-line" key={line}>
              <span>{line}</span>
            </span>
          ))}
        </h1>

        {text && <p className="body-text hero-fade">{text}</p>}
        {children}
      </div>
    </section>
  );
}