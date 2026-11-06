import { Link } from "react-router-dom";
import { site, nav, socials, contact } from "../data/content";
import { scrollToTop } from "../lib/scroller";

const routes = {
  Home: "/",
  Builds: "/builds",
  Stock: "/stock",
  Contact: "/contact",
};

export default function Footer() {
  const phone = contact.methods.find((m) => m.label === "Phone");
  const visit = contact.methods.find((m) => m.label === "Visit Us");

  return (
    <footer className="ft section--dark">
      <div className="ft-grid">
        <div className="ft-brand stack">
          <p className="ft-logo">
            <img className="ft-logo-mark" src="/logo-mark.svg" alt="" width="35" height="16" />
            {site.name}
          </p>
          <p className="body-text">{site.subline}</p>
        </div>

        <nav className="ft-col" aria-label="Footer">
          <h4 className="ft-title mono">Navigate</h4>
          {nav.map((item) => (
            <Link key={item} to={routes[item]}>
              {item}
            </Link>
          ))}
        </nav>

        <div className="ft-col">
          <h4 className="ft-title mono">Visit</h4>
          <a href={phone?.href}>{phone?.value}</a>
          {visit?.links?.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
              {l.label} ↗
            </a>
          ))}
        </div>

        <div className="ft-col">
          <h4 className="ft-title mono">Follow</h4>
          <a href={socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={socials.instagram} target="_blank" rel="noreferrer">Instagram</a>
          <a href={socials.facebook} target="_blank" rel="noreferrer">Facebook</a>
        </div>
      </div>

      {/* giant word, cropped by the bottom edge */}
      <div className="ft-wordwrap" aria-hidden="true">
        <span className="ft-word">{site.name.split(" ")[0]}</span>
      </div>

      <div className="ft-bar mono">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <button type="button" className="ft-top" onClick={scrollToTop}>
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}