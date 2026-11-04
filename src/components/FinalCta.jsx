import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { finalCta } from "../data/content";

export default function FinalCta() {
  const root = useRef(null);
  const [inView, setInView] = useState(false);
  const words = finalCta.title.split(" ");

  // adds the "is-in" class while the section is on screen
  useEffect(() => {
    const el = root.current;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={root} className={`section cta${inView ? " is-in" : ""}`}>
      <div className="cta-inner">
        <p className="eyebrow cta-fade" style={{ "--d": "0.3s" }}>
          {finalCta.pre}
        </p>

        <h2 className="display cta-title">
          {words.map((w, i) => (
            <span className="cta-line" key={w}>
              <span style={{ "--d": `${i * 0.12}s` }}>{w}</span>
            </span>
          ))}
        </h2>

        <Link to="/contact" className="btn cta-fade" style={{ "--d": "0.6s" }}>
          {finalCta.cta} →
        </Link>
      </div>
    </section>
  );
}