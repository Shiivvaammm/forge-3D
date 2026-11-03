import { useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { site, nav } from "../data/content";

const routes = {
  Home: "/",
  Builds: "/builds",
  Stock: "/stock",
  Contact: "/contact",
};

export default function Header() {
  const ref = useRef(null);
  const { pathname } = useLocation();

  // hide on scroll down, show on scroll up
  useEffect(() => {
    let last = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 4) return; // ignore tiny movements
      ref.current.classList.toggle("is-hidden", y > last && y > 120);
      last = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // always show it again after navigating
  useEffect(() => {
    ref.current.classList.remove("is-hidden");
  }, [pathname]);

  return (
    <header ref={ref} className="site-header">
      <Link to="/" className="site-logo">
        {site.name}
      </Link>

      <nav className="site-nav" aria-label="Main">
        {nav.map((item) => (
          <NavLink key={item} to={routes[item]} end={item === "Home"}>
            {item}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}