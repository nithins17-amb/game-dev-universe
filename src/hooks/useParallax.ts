import { useEffect, useState, type RefObject } from "react";

export function useParallax(ref: RefObject<HTMLElement | null>) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (event: PointerEvent) => {
      const bounds = element.getBoundingClientRect();
      setPosition({
        x: (event.clientX - bounds.left) / bounds.width - 0.5,
        y: (event.clientY - bounds.top) / bounds.height - 0.5,
      });
    };
    const reset = () => setPosition({ x: 0, y: 0 });
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", reset);
    return () => {
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", reset);
    };
  }, [ref]);
  return position;
}