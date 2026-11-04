import { lazy, Suspense, useLayoutEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Header from "./components/Header";
import PageHero from "./components/PageHero";
import useSmoothScroll from "./hooks/useSmoothScroll";
import Builds from "./pages/Builds";
import Stock from "./pages/Stock";
import Contact from "./pages/Contact";

// the heavy 3D homepage is only downloaded when someone visits "/"
const Home = lazy(() => import("./pages/Home"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFound() {
  useSmoothScroll();
  return (
    <main className="page">
      <PageHero eyebrow="404" lines={["Page not", "found"]}>
        <Link to="/" className="btn hero-fade">
          Back home →
        </Link>
      </PageHero>
    </main>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Suspense fallback={<div className="route-fallback" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builds" element={<Builds />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}