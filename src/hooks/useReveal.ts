import { useEffect } from "react";

/** Adds .is-visible to any [.reveal] element when it scrolls into view. */
export function useReveal() {
  useEffect(() => {
    const observed = new WeakSet<Element>();

    const revealNow = (el: Element) => {
      el.classList.add("is-visible");
    };

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll<HTMLElement>(".reveal").forEach(revealNow);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const observeReveals = () => {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
        if (observed.has(el) || el.classList.contains("is-visible")) return;
        observed.add(el);
        io.observe(el);
      });
    };

    observeReveals();
    const mo = new MutationObserver(observeReveals);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);
}
