import { Fragment, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ordinary } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

const pad = (n) => String(n).padStart(2, "0");

// Depth positions in px along the road (negative = further away from the camera).
const WORD_Z = 0;
const CARD_Z = [-1500, -2800, -4100]; // spacing between cars: bigger = more road between them
const TITLE_Z = -5400;

// Where the camera stops: it parks each car this far in front of it.
// Closer to 0 = the car looks bigger when the camera pauses.
const PARK = -550;
const stopFor = (z) => PARK - z; // how far the world must move for an object at z to sit at PARK

const clamp = gsap.utils.clamp;

export default function Ordinary() {
  const root = useRef(null);
  const images = (ordinary.images ?? []).slice(0, CARD_Z.length);
  const [first, ...rest] = ordinary.title.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const world = root.current.querySelector(".fx-world");
      const items = gsap.utils
        .toArray(".fx-item", root.current)
        .map((el) => ({ el, z: parseFloat(el.dataset.z) }));

      gsap.set(world, { z: 0 });

      // fade things in out of the distance, and out as they pass the camera
      const apply = () => {
        const wz = gsap.getProperty(world, "z");
        items.forEach(({ el, z }) => {
          const eff = z + wz; // where the object is relative to the screen plane
          const far = clamp(0, 1, (eff + 1500) / 700);
          const near = clamp(0, 1, (700 - eff) / 500);
          el.style.opacity = Math.min(far, near);
        });
      };
      apply();

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        onUpdate: apply,
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=600%",
          pin: true,
          scrub: true,
          anticipatePin: 1,
        },
      });

      // 1. the word is crossed out
      tl.fromTo(".fx-strike", { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, 0.2);

      // 2. fly forward: stop at each car, then at the title
      let t = 0.9;
      [...CARD_Z, TITLE_Z].forEach((z, i) => {
        tl.to(world, { z: stopFor(z), duration: 1.4, ease: "power2.inOut" }, t);
        t += 1.4;
        if (i < CARD_Z.length) t += 0.5; // a short pause on each car
      });

      // 3. closing line and button
      tl.fromTo(
        ".fx-foot > *",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1 },
        t - 0.6
      ).to({}, { duration: 0.6 }, t); // hold at the end
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section section--dark fx">
      <div className="fx-scene">
        <div className="fx-world">
          <div className="fx-floor" aria-hidden="true" />

          <h2
            className="fx-item fx-word"
            data-z={WORD_Z}
            style={{ "--z": `${WORD_Z}px` }}
            aria-label={ordinary.word}
          >
            <span aria-hidden="true">{ordinary.word}</span>
            <i className="fx-strike" aria-hidden="true" />
          </h2>

          {images.map((src, i) => {
            const z = CARD_Z[i];
            const cardLeft = i % 2 === 0; // cars alternate: left, right, left

            return (
              <Fragment key={src}>
                <figure
                  className={`fx-item fx-card ${cardLeft ? "fx-card--l" : "fx-card--r"}`}
                  data-z={z}
                  style={{ "--z": `${z}px` }}
                >
                  <img src={src} alt={ordinary.cars[i] ?? ""} loading="lazy" />
                  <figcaption className="fx-cap mono">
                    {pad(i + 1)} / {pad(images.length)}
                  </figcaption>
                </figure>

                <div
                  className={`fx-item fx-label ${cardLeft ? "fx-label--r" : "fx-label--l"}`}
                  data-z={z}
                  style={{ "--z": `${z}px` }}
                >
                  <span className="mono">
                    {pad(i + 1)} / {pad(images.length)}
                  </span>
                  <h3 className="display">{ordinary.cars[i]}</h3>
                </div>
              </Fragment>
            );
          })}

          <p
            className="fx-item fx-title display"
            data-z={TITLE_Z}
            style={{ "--z": `${TITLE_Z}px` }}
          >
            <span>{first}</span> <span className="is-accent">{rest.join(" ")}</span>
          </p>
        </div>
      </div>

      <div className="fx-foot">
        <p className="body-text fx-text">{ordinary.text}</p>
        <Link to="/builds" className="btn">
          View builds →
        </Link>
      </div>
    </section>
  );
}