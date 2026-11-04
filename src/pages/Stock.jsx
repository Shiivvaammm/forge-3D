import PageHero from "../components/PageHero";
import CardGrid from "../components/CardGrid";
import FinalCta from "../components/FinalCta";
import Footer from "../components/Footer";
import useSmoothScroll from "../hooks/useSmoothScroll";
import { stockPage, stockItems } from "../data/content";

export default function Stock() {
  useSmoothScroll();

  return (
    <main className="page">
      <PageHero
        eyebrow={stockPage.eyebrow}
        lines={stockPage.lines}
        text={stockPage.text}
      >
        <p className="mono hero-fade page-note">{stockPage.note}</p>
      </PageHero>
      <CardGrid
        dark
        head={false}
        items={stockItems}
        hueStart={200}
        cardAction="Enquire"
        endTile
      />
      <FinalCta />
      <Footer />
    </main>
  );
}