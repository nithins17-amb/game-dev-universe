import { useEffect, useState } from "react";
import { levels } from "@/data/event";

export function useScrollProgress() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      let current = 0;
      levels.forEach((level, index) => {
        const element = document.getElementById(level.id);
        if (element && element.getBoundingClientRect().top < window.innerHeight * 0.55) current = index;
      });
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return { active, progress };
}