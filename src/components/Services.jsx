import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services, servicesIntro } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

// one colour per panel: tints the background glow (and the fallback placeholder)
const hues = [16, 222, 158, 280, 42, 190];

const pad = (n) => String(n).padStart(2, "0");

export default function Services({ onCover }) {
  const root = useRef(null);
  const track = useRef(null);
  const counter = useRef(null);
  const label = useRef(null);
  const bar = useRef(null);

  // intro statement: first sentence bright, the rest muted
  const [lead, ...rest] = servicesIntro.title.split(". ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const getDistance = () => track.current.scrollWidth - window.innerWidth;
      const total = services.length;

      const tween = gsap.to(track.current, {
        x: () => -getDistance(),
        ease: "none", // must be linear for containerAnimation to work
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => "+=" + getDistance(),
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => onCover?.(true),
          onLeaveBack: () => onCover?.(false),
          onRefresh: (self) => onCover?.(self.scroll() >= self.start),
          onUpdate: (self) => {
            const i = Math.round(self.progress * total);
            counter.current.textContent = pad(i);
            label.current.textContent = i === 0 ? "Introduction" : services[i - 1].title;
            bar.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      gsap.utils.toArray(".service-panel", track.current).forEach((panel) => {
        const img = panel.querySelector(".service-img-inner");
        const copy = panel.querySelectorAll(".service-copy > *");

        // picture drifts sideways inside its frame as the panel passes
        gsap.fromTo(
          img,
          { xPercent: -10 },
          {
            xPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );

        // text rises in when the panel is about two thirds into view
        gsap.from(copy, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            start: "left 65%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [onCover]);

  return (
    <section ref={root} className="section section--dark services">
      <div ref={track} className="services-track">
        {/* panel 0: intro statement */}
        <div className="service-intro">
          <p className="eyebrow">Services</p>
          <h2 className="h2 service-intro-title">
            <span>{lead}.</span>{" "}
            {rest.length > 0 && <span className="muted">{rest.join(". ")}</span>}
          </h2>
          <p className="body-text">{servicesIntro.text}</p>
        </div>

        {/* panels 1 to 6: one per service */}
        {services.map((s, i) => (
          <article
            className="service-panel"
            key={s.title}
            style={{ "--hue": hues[i % hues.length] }}
          >
            <div className="service-img">
              {s.image ? (
                <div className="service-img-inner service-img-inner--photo">
                  <img src={s.image} alt={s.title} loading="lazy" />
                </div>
              ) : (
                <div className="service-img-inner">
                  <span className="mono">IMAGE PLACEHOLDER</span>
                  <span className="service-img-num">{pad(i + 1)}</span>
                </div>
              )}
              <span className="service-chip mono">
                {pad(i + 1)} — {s.title}
              </span>
            </div>

            <div className="service-copy">
              <span className="service-ghost" aria-hidden="true">
                {pad(i + 1)}
              </span>
              <p className="eyebrow">
                {pad(i + 1)} / {pad(services.length)}
              </p>
              <h3 className="display display--panel">{s.title}</h3>
              <p className="body-text">{s.text}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="services-hud mono">
        <span>
          <span ref={counter}>00</span> / {pad(services.length)}
        </span>
        <span ref={label} className="services-label">
          Introduction
        </span>
        <div className="services-bar">
          <div ref={bar} className="services-bar-fill" />
        </div>
      </div>
    </section>
  );
}