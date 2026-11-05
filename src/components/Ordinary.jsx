import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ordinary } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

const pad = (n) => String(n).padStart(2, "0");

const START_TILTS = [-10, 5, 10]; // each card's tilt as it enters (degrees)
const END_TILTS = [-4, 0, 4];     // and where it settles
const LIFTS = ["0vh", "-3vh", "0vh"]; // the middle card sits a little higher

export default function Ordinary() {
  const root = useRef(null);
  const images = ordinary.images ?? [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".od-card", root.current);
      const imgs = gsap.utils.toArray(".od-card img", root.current);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=350%",
          pin: true,
          scrub: true,
          anticipatePin: 1,
        },
      });

      // 1. the word slowly grows, then gets crossed out
      tl.fromTo(".od-word", { scale: 0.92 }, { scale: 1.04, duration: 6.6 }, 0).fromTo(
        ".od-strike",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
        0.4
      );

      // 2. three cars rise from below, one after another, covering the word
      cards.forEach((card, i) => {
        const t = 1.4 + i * 1.1;

        tl.fromTo(
          card,
          { y: "115vh", rotate: START_TILTS[i] },
          { y: LIFTS[i], rotate: END_TILTS[i], duration: 1.0, ease: "power3.out" },
          t
        ).fromTo(imgs[i], { scale: 1.3 }, { scale: 1, duration: 1.0, ease: "power3.out" }, t);
      });

      // 3. the crossed-out word fades back as it gets covered
      tl.to(".od-word span", { opacity: 0.3, duration: 2.6 }, 1.6);

      // 4. "Ends Here"
      tl.fromTo(
        ".od-title",
        { yPercent: 110, y: 0 },
        { yPercent: 0, y: 0, duration: 0.9, ease: "power3.out" },
        4.8
      )
        .fromTo(
          ".od-text",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          5.1
        )
        .to({}, { duration: 0.6 }, 6.0); // short hold at the end
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section section--dark od">
      <div className="od-stage">
        <h2 className="od-word" aria-label={ordinary.word}>
          <span aria-hidden="true">{ordinary.word}</span>
          <i className="od-strike" aria-hidden="true" />
        </h2>

        <div className="od-cards">
          {images.map((src, i) => (
            <figure className="od-card" key={src}>
              <img src={src} alt={ordinary.cars[i] ?? ""} loading="lazy" />
              <figcaption className="od-cap mono">
                <span>
                  {pad(i + 1)} / {pad(images.length)}
                </span>
                <span>{ordinary.cars[i]}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="od-foot">
        <div className="od-title-mask">
          <p className="display od-title">{ordinary.title}</p>
        </div>
        <p className="body-text od-text">{ordinary.text}</p>
      </div>
    </section>
  );
}