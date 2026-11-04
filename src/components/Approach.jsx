import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { approach } from "../data/content";
import { scrollState } from "../lib/scrollState";

gsap.registerPlugin(ScrollTrigger);

export default function Approach() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".approach-panel", root.current);
      const steps = gsap.utils.toArray(".approach-step", root.current);
      const fills = gsap.utils.toArray(".approach-step-fill", root.current);

      // first panel visible, the rest hidden by CSS
      gsap.set(panels[0], { opacity: 1, y: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=300%", // pinned for 3 screen-heights of scrolling
          pin: true,
          scrub: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            scrollState.approach = p;

            // light up the tab for the pillar currently shown
            const i = p < 0.3125 ? 0 : p < 0.6875 ? 1 : 2;
            steps.forEach((el, k) => el.classList.toggle("is-active", k === i));
          },
          onRefresh: (self) => {
            scrollState.approach = self.progress;
          },
        },
      });

      // timeline is 4 units long: the three tab lines fill one after another...
      tl.fromTo(fills[0], { scaleX: 0 }, { scaleX: 1, duration: 1.25 }, 0)
        .fromTo(fills[1], { scaleX: 0 }, { scaleX: 1, duration: 1.5 }, 1.25)
        .fromTo(fills[2], { scaleX: 0 }, { scaleX: 1, duration: 1.25 }, 2.75)
        // ...and the text cross-fades at 1 to 1.5 and 2.5 to 3 (same as the 3D car changes)
        .to(panels[0], { opacity: 0, y: -40, duration: 0.5 }, 1)
        .fromTo(panels[1], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5 }, 1)
        .to(panels[1], { opacity: 0, y: -40, duration: 0.5 }, 2.5)
        .fromTo(panels[2], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5 }, 2.5);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section approach">
      <div className="approach-top">
        <div className="approach-head stack">
          <p className="eyebrow">Process</p>
          <h2 className="h2">{approach.title}</h2>
          <p className="body-text">{approach.intro}</p>
        </div>

        <div className="approach-steps">
          {approach.pillars.map((p, i) => (
            <div className={`approach-step${i === 0 ? " is-active" : ""}`} key={p.title}>
              <span className="approach-step-label mono">
                0{i + 1} {p.title}
              </span>
              <span className="approach-step-line">
                <i className="approach-step-fill" />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="approach-panels">
        {approach.pillars.map((p, i) => (
          <article className="approach-panel" key={p.title}>
            <span className="approach-num">0{i + 1}</span>
            <h3 className="display display--panel">{p.title}</h3>
            <p className="body-text">{p.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}