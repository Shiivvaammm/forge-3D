import { Link } from "react-router-dom";
import { site, nav, socials, contact } from "../data/content";

const routes = {
  Home: "/",
  Builds: "/builds",
  Stock: "/stock",
  Contact: "/contact",
};

export default function Footer() {
  const phone = contact.methods[0];

  return (
    <footer className="footer section--dark">
      <div className="footer-top">
        <div className="stack">
          <p className="footer-brand">{site.name}</p>
          <a href={phone.href} className="mono footer-phone">
            {phone.value}
          </a>
        </div>

        <nav className="footer-links mono" aria-label="Footer">
          {nav.map((item) => (
            <Link key={item} to={routes[item]}>
              {item}
            </Link>
          ))}
        </nav>

        <div className="footer-links mono">
          <a href={socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={socials.instagram} target="_blank" rel="noreferrer">Instagram</a>
          <a href={socials.facebook} target="_blank" rel="noreferrer">Facebook</a>
        </div>
      </div>

      <p className="footer-legal mono">
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  );
}