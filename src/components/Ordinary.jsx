import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ordinary } from "../data/content";
import { scrollState } from "../lib/scrollState";

gsap.registerPlugin(ScrollTrigger);

export default function Ordinary({ onMode }) {
  const root = useRef(null);

  useEffect(() => {
    // the car canvas fades using this CSS variable (see .canvas-root--front)
    const html = document.documentElement;
    html.style.setProperty("--car-opacity", "0");

    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray(".ord-letter", root.current);
      const cars = gsap.utils.toArray(".ord-car", root.current);
      const mid = (letters.length - 1) / 2;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: true,
          anticipatePin: 1,

          // canvas goes in front while this section is pinned
          onEnter: () => onMode("front"),
          onLeave: () => onMode("hidden"),
          onEnterBack: () => onMode("front"),
          onLeaveBack: () => onMode("hidden"),

          onUpdate: (self) => {
            const p = self.progress;
            scrollState.ordinary = p;

            // car fades in over the first 12% and out over the last 12%
            const fadeIn = Math.min(p / 0.12, 1);
            const fadeOut = Math.min((1 - p) / 0.12, 1);
            html.style.setProperty("--car-opacity", String(Math.min(fadeIn, fadeOut)));

            // highlight one car name at a time
            const i = Math.min(cars.length - 1, Math.floor(p * cars.length));
            cars.forEach((el, k) => el.classList.toggle("is-active", k === i));
          },
        },
      });

      // timeline is 4 units long
      tl.fromTo(".ord-word", { scale: 0.85 }, { scale: 1.1, duration: 4 }, 0)
        .to(
          letters,
          {
            x: (i) => (i - mid) * 18,                 // letters spread apart
            y: (i) => (i % 2 ? 1 : -1) * 28,          // and split up/down
            duration: 2.5,
          },
          1
        )
        .fromTo(".ord-title", { yPercent: 110 }, { yPercent: 0, duration: 1 }, 2)
        .fromTo(".ord-text", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, 2.6);
    }, root);

    return () => {
      ctx.revert();
      html.style.removeProperty("--car-opacity");
    };
  }, [onMode]);

  return (
    <section ref={root} className="section section--dark ordinary">
      <div className="ord-stage">
        <h2 className="ord-word" aria-label={ordinary.word}>
          {ordinary.word.split("").map((ch, i) => (
            <span className="ord-letter" key={i} aria-hidden="true">
              {ch}
            </span>
          ))}
        </h2>
      </div>

      <div className="ord-foot">
        <div className="ord-title-mask">
          <p className="display display--panel ord-title">{ordinary.title}</p>
        </div>
        <p className="body-text ord-text">{ordinary.text}</p>
        <ul className="ord-cars mono">
          {ordinary.cars.map((c) => (
            <li className="ord-car" key={c}>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}