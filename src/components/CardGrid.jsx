import { useRef } from "react";
import { Link } from "react-router-dom";
import TiltCard from "./TiltCard";
import useReveal from "../hooks/useReveal";

export default function CardGrid({
  dark = false,
  head = true,
  eyebrow,
  title,
  text,
  cta,
  to = "/",
  items,
  hueStart = 16,
}) {
  const root = useRef(null);
  useReveal(root);

  const className =
    "section cards" + (dark ? " section--dark" : "") + (head ? "" : " cards--flush");

  return (
    <section ref={root} className={className}>
      <div className="cards-inner">
        {head && (
          <header className="cards-head">
            <div className="stack">
              <p className="eyebrow reveal">{eyebrow}</p>
              <h2 className="h2 reveal">{title}</h2>
              <p className="body-text reveal">{text}</p>
            </div>
            <Link to={to} className="btn reveal">
              {cta} →
            </Link>
          </header>
        )}

        <div className="cards-grid">
          {items.map((item, i) => (
            <div className="reveal" key={item.id}>
              <TiltCard>
                <div
                  className="card-img"
                  style={{ "--hue": (hueStart + i * 50) % 360 }}
                >
                  <span className="mono">IMAGE PLACEHOLDER</span>
                </div>

                <div className="card-body">
                  <div className="card-top mono">
                    <span className="card-tag">#{item.id}</span>
                    {item.price && <span>{item.price}</span>}
                    {item.status && <span className="card-status">{item.status}</span>}
                  </div>
                  <h3 className="card-name">{item.name}</h3>
                  <p className="body-text">{item.text}</p>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}