import PageHero from "../components/PageHero";
import CardGrid from "../components/CardGrid";
import FinalCta from "../components/FinalCta";
import Footer from "../components/Footer";
import useSmoothScroll from "../hooks/useSmoothScroll";
import { buildsPage, buildItems } from "../data/content";

export default function Builds() {
  useSmoothScroll();

  return (
    <main className="page">
      <PageHero
        eyebrow={buildsPage.eyebrow}
        lines={buildsPage.lines}
        text={buildsPage.text}
      />
      <CardGrid head={false} items={buildItems} hueStart={16} />
      <FinalCta />
      <Footer />
    </main>
  );
}