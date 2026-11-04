import { useRef } from "react";
import { Link } from "react-router-dom";
import TiltCard from "./TiltCard";
import useReveal from "../hooks/useReveal";
import { finalCta } from "../data/content";

const pad = (n) => String(n).padStart(2, "0");

export default function CardGrid({
  dark = false,
  head = true,
  eyebrow,
  title,
  text,
  cta,
  to = "/",
  items,
  count, // number shown next to the title (defaults to items.length)
  hueStart = 16,
  cardAction, // e.g. "Enquire": shown on cars that have a price
  endTile = false, // orange "Refuse Ordinary" tile as the last grid cell
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
          {items.map((item, i) => {
            const photo = item.images?.[0];

            return (
              <div className="reveal" key={item.id}>
                <TiltCard>
                  <div
                    className={`card-img${photo ? " card-img--photo" : ""}`}
                    style={{ "--hue": (hueStart + i * 50) % 360 }}
                  >
                    {photo ? (
                      <img src={photo} alt={item.name} loading="lazy" />
                    ) : (
                      <span className="mono">IMAGE PLACEHOLDER</span>
                    )}
                  </div>

                  <div className="card-shade" />

                  <div className="card-top mono">
                    <span className="chip">#{item.id}</span>
                    {item.price && <span className="chip chip--accent">{item.price}</span>}
                    {item.status && <span className="chip chip--outline">{item.status}</span>}
                  </div>

                  <div className="card-body">
                    <h3 className="card-name">{item.name}</h3>

                    {/* slides open on hover (always open on touch screens) */}
                    <div className="card-more">
                      <div>
                        <p className="body-text">{item.text}</p>
                        {cardAction && item.price && (
                          <Link to="/contact" className="card-link mono">
                            {cardAction} →
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            );
          })}

          {endTile && (
            <div className="reveal">
              <Link to="/contact" className="card-tile">
                <span className="mono">{finalCta.pre}</span>
                <span className="card-tile-title">{finalCta.title}</span>
                <span className="card-tile-btn mono">{finalCta.cta} →</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}