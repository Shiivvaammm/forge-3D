import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { finalCta, contact } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCta() {
  const root = useRef(null);

  const words = finalCta.title.split(" "); // "Refuse", "Ordinary"
  const ringText = `${finalCta.cta.toUpperCase()} • `.repeat(2);

  const phone = contact.methods.find((m) => m.label === "Phone");
  const visit = contact.methods.find((m) => m.label === "Visit Us");
  const concierge = contact.methods.find((m) => m.label === "Concierge");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const drift = {
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      };

      // the two lines slide in opposite directions as the section scrolls past
      gsap.fromTo(".fin-line--1", { xPercent: 8 }, { xPercent: -8, ease: "none", scrollTrigger: drift });
      gsap.fromTo(".fin-line--2", { xPercent: -8 }, { xPercent: 8, ease: "none", scrollTrigger: drift });

      // small items fade up once
      gsap.from(".fin-fade", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 65%", once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="fin">
      <p className="fin-pre mono fin-fade">{finalCta.pre}</p>

      <div className="fin-title">
        <h2 aria-label={finalCta.title}>
          {words.map((w, i) => (
            <span className={`fin-line fin-line--${i + 1}`} key={w} aria-hidden="true">
              {w}
            </span>
          ))}
        </h2>

        <Link to="/contact" className="fin-btn" aria-label={finalCta.cta}>
          <svg className="fin-ring" viewBox="0 0 200 200" aria-hidden="true">
            <defs>
              <path id="fin-circle" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
            </defs>
            <text>
              <textPath href="#fin-circle" textLength="502" lengthAdjust="spacing">
                {ringText}
              </textPath>
            </text>
          </svg>
          <span className="fin-arrow">→</span>
        </Link>
      </div>

      <div className="fin-info mono fin-fade">
        <div>
          <span className="fin-label">{phone?.label}</span>
          <a href={phone?.href}>{phone?.value}</a>
        </div>
        <div>
          <span className="fin-label">{visit?.label}</span>
          <span>
            {visit?.value} · {contact.sites.join(" / ")}
          </span>
        </div>
        <div>
          <span className="fin-label">{concierge?.label}</span>
          <span>{concierge?.value}</span>
        </div>
      </div>
    </section>
  );
}