import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services, servicesIntro } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

// one hue per placeholder picture (replace with real images later)
const hues = [16, 222, 158, 280, 42, 190];

export default function Services({ onCover }) {
  const root = useRef(null);
  const track = useRef(null);
  const counter = useRef(null);
  const bar = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const getDistance = () => track.current.scrollWidth - window.innerWidth;
      const total = services.length;

      // the horizontal movement: vertical scroll slides the whole track left
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
          invalidateOnRefresh: true, // recalculate on resize
          // once this section covers the screen, the 3D canvas can switch off
          onEnter: () => onCover?.(true),
          onLeaveBack: () => onCover?.(false),
          onRefresh: (self) => onCover?.(self.scroll() >= self.start),
          // counter + progress bar, written straight to the DOM (no React re-render)
          onUpdate: (self) => {
            const i = Math.round(self.progress * total);
            counter.current.textContent = String(i).padStart(2, "0");
            bar.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      // per-panel effects, triggered by the panel's position inside the moving track
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
        {/* panel 0: intro text */}
        <div className="service-intro">
          <p className="eyebrow">Services</p>
          <h2 className="h2">{servicesIntro.title}</h2>
          <p className="body-text">{servicesIntro.text}</p>
        </div>

        {/* panels 1 to 6: one per service */}
        {services.map((s, i) => (
          <article className="service-panel" key={s.title}>
            <div className="service-img">
              <div
                className="service-img-inner"
                style={{ "--hue": hues[i % hues.length] }}
              >
                <span className="mono">IMAGE PLACEHOLDER</span>
                <span className="service-img-num">{String(i + 1).padStart(2, "0")}</span>
              </div>
            </div>

            <div className="service-copy">
              <p className="eyebrow">
                {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
              </p>
              <h3 className="display display--panel">{s.title}</h3>
              <p className="body-text">{s.text}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="services-hud mono">
        <span>
          <span ref={counter}>00</span> / {String(services.length).padStart(2, "0")}
        </span>
        <div className="services-bar">
          <div ref={bar} className="services-bar-fill" />
        </div>
      </div>
    </section>
  );
}