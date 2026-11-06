import { useEffect } from "react";

const BRAND = "Forge Automotive";

// usePageTitle("Builds") -> "Builds | Forge Automotive"; no argument -> the home title
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${BRAND}` : `${BRAND} | Bespoke Vehicle Builds`;
  }, [title]);
}