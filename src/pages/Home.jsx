import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import Scene from "../components/Scene";
import Loader from "../components/Loader";
import Hero from "../components/Hero";
import Approach from "../components/Approach";
import Services from "../components/Services";
import Ordinary from "../components/Ordinary";
import Brands from "../components/Brands";
import CardGrid from "../components/CardGrid";
import FinalCta from "../components/FinalCta";
import Footer from "../components/Footer";
import useSmoothScroll from "../hooks/useSmoothScroll";
import { scrollState, resetScrollState } from "../lib/scrollState";
import { builds, stock, buildItems, stockItems } from "../data/content";

// lives outside the component, so it survives navigating away and back
let introPlayed = false;

export default function Home() {
  const [showLoader] = useState(!introPlayed);
  const [ready, setReady] = useState(introPlayed);
  const [canvasMode, setCanvasMode] = useState("back"); // "back" | "hidden" | "front"

  const handleDone = useCallback(() => {
    introPlayed = true;
    setReady(true);
  }, []);

  const handleCover = useCallback(
    (covered) => setCanvasMode(covered ? "hidden" : "back"),
    []
  );

  // start the 3D state from scratch on every visit
  useLayoutEffect(() => {
    resetScrollState();
  }, []);

  useSmoothScroll(!ready);

  useEffect(() => {
    if (!ready) return;
    const tween = gsap.to(scrollState, {
      intro: 1,
      duration: 2.6,
      ease: "power3.out",
    });
    return () => tween.kill();
  }, [ready]);

  return (
    <>
      {showLoader && <Loader onDone={handleDone} />}
      <Scene mode={canvasMode} />

      <main className="page" id="top">
        <Hero ready={ready} />
        <Approach />
        <Services onCover={handleCover} />
        <Ordinary onMode={setCanvasMode} />
        <Brands />

        <CardGrid
          eyebrow="Portfolio"
          title={builds.title}
          text={builds.text}
          cta={builds.cta}
          to="/builds"
          items={buildItems.slice(0, 3)}
          count={buildItems.length}
          hueStart={16}
        />

        <CardGrid
          dark
          eyebrow="Showroom"
          title={stock.title}
          text={stock.text}
          cta={stock.cta}
          to="/stock"
          items={stockItems}
          count={stockItems.length}
          hueStart={200}
          cardAction="Enquire"
          endTile
        />

        

        <FinalCta />
        <Footer />
      </main>
    </>
  );
}