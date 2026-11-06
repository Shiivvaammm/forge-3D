import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import { site } from "../data/content";

const COUNT_SECONDS = 3.6; // how long the 0 to 100 count takes (raise it to make the loader slower)
const GIVE_UP_AFTER = 6000; // ms: never wait longer than this for the real assets

export default function Loader({ onDone }) {
  const { progress } = useProgress(); // real loading, used so we never finish too early

  const root = useRef(null);
  const bg = useRef(null);
  const word = useRef(null);
  const hud = useRef(null);
  const counter = useRef(null);
  const line = useRef(null);

  const countTween = useRef(null);
  const loaded = useRef(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTimedOut(true), GIVE_UP_AFTER);
    return () => clearTimeout(t);
  }, []);

  // once the real assets are in, let the count finish
  useEffect(() => {
    if (progress >= 100 || timedOut) {
      loaded.current = true;
      countTween.current?.resume();
    }
  }, [progress, timedOut]);

  useLayoutEffect(() => {
    const html = document.documentElement;
    html.classList.add("is-loading"); // hides the navbar logo until the word lands on it

    const exit = () => {
      // land on the logo text; on narrow screens (where it's hidden) land on the mark instead
      const target = [".site-logo-text", ".site-logo-mark"]
        .map((q) => document.querySelector(q))
        .find((el) => el && el.getBoundingClientRect().width > 0);
      const el = word.current;

      const tl = gsap.timeline({
        onComplete: () => {
          root.current.style.display = "none";
          html.classList.remove("is-loading");
        },
      });

      tl.to(hud.current, { opacity: 0, duration: 0.4, ease: "power2.out" });

      if (target) {
        // measure where the word is and where the navbar text is
        gsap.set(el, { transformOrigin: "0% 50%" });
        const w = el.getBoundingClientRect();
        const l = target.getBoundingClientRect();

        const scale =
          parseFloat(getComputedStyle(target).fontSize) /
          parseFloat(getComputedStyle(el).fontSize);

        tl.to(
          el,
          {
            x: l.left - w.left,
            y: l.top + l.height / 2 - (w.top + w.height / 2),
            scale,
            duration: 1.5,
            ease: "power4.inOut",
          },
          0.2
        );
      }

      tl.to(bg.current, { opacity: 0, duration: 1.0, ease: "power2.inOut" }, 0.6)
        .add(() => doneRef.current?.(), 1.0) // hero and car start while the loader dissolves
        .add(() => html.classList.remove("is-loading"), 1.55) // the real logo fades in
        .to(el, { opacity: 0, duration: 0.4 }, 1.6);
    };

    const ctx = gsap.context(() => {
      // word appears
      gsap.set(word.current, { opacity: 0, y: 24, scale: 0.96 });
      gsap.set(hud.current, { opacity: 0 });
      gsap.to(word.current, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.2 });
      gsap.to(hud.current, { opacity: 1, duration: 0.8, delay: 0.6 });

      // the paced 0 to 100 count
      const proxy = { v: 0 };
      countTween.current = gsap.to(proxy, {
        v: 100,
        duration: COUNT_SECONDS,
        delay: 0.4,
        ease: "power1.inOut",
        onUpdate: () => {
          counter.current.textContent = String(Math.floor(proxy.v)).padStart(3, "0");
          line.current.style.transform = `scaleX(${proxy.v / 100})`;

          // hold at 99 until the real assets have finished loading
          if (proxy.v >= 99 && !loaded.current) countTween.current.pause();
        },
        onComplete: exit,
      });
    }, root);

    return () => {
      ctx.revert();
      html.classList.remove("is-loading");
    };
  }, []);

  return (
    <div ref={root} className="ld" role="status" aria-label="Loading">
      <div ref={bg} className="ld-bg" />

      <div className="ld-stage">
        <span ref={word} className="ld-word">
          {site.name.split(" ")[0]}
        </span>
      </div>

      <div ref={hud} className="ld-hud mono">
        <span className="ld-brand">
          <img src="/logo-mark.svg" alt="" width="35" height="16" />
          {site.name} — Loading
        </span>
        <span ref={counter} className="ld-count">
          000
        </span>
      </div>

      <div className="ld-line">
        <i ref={line} />
      </div>
    </div>
  );
}