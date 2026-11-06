// holds the smooth-scroll (Lenis) instance so any component can use it
export const scroller = { lenis: null };

export function scrollToTop() {
  if (scroller.lenis) scroller.lenis.scrollTo(0, { duration: 1.4 });
  else window.scrollTo({ top: 0 });
}