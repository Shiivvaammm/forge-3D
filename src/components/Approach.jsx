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

      // first panel visible, the rest hidden by CSS
      gsap.set(panels[0], { opacity: 1, y: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=300%",      // pinned for 3 screen-heights of scrolling
          pin: true,
          scrub: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            scrollState.approach = self.progress;
          },
          onRefresh: (self) => {
            scrollState.approach = self.progress;
          },
        },
      });

      // timeline is 4 units long: hold, cross-fade, hold, cross-fade, hold
      tl.fromTo(".approach-bar-fill", { scaleX: 0 }, { scaleX: 1, duration: 4 }, 0)
        .to(panels[0], { opacity: 0, y: -40, duration: 0.5 }, 1)
        .fromTo(panels[1], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5 }, 1)
        .to(panels[1], { opacity: 0, y: -40, duration: 0.5 }, 2.5)
        .fromTo(panels[2], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5 }, 2.5);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section approach">
      <div className="approach-head stack">
        <p className="eyebrow">Process</p>
        <h2 className="h2">{approach.title}</h2>
        <p className="body-text">{approach.intro}</p>
        <div className="approach-bar">
          <div className="approach-bar-fill" />
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