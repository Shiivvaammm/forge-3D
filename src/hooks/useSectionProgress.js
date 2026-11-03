import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollState } from "../lib/scrollState";

// Writes a section's 0 to 1 scroll progress into scrollState[key]
export default function useSectionProgress(
  ref,
  key,
  { start = "top bottom", end = "bottom top" } = {}
) {
  useEffect(() => {
    if (!ref.current) return;

    const write = (self) => {
      scrollState[key] = self.progress;
    };

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start,
      end,
      onUpdate: write,
      onRefresh: write,
    });

    return () => trigger.kill();
  }, [ref, key, start, end]);
}