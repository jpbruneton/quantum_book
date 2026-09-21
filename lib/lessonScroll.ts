/** Track reading progress without measuring the lesson during every scroll. */
export function observeLessonScroll(
  headingIds: string[],
  onChange: (activeId: string, showBackToTop: boolean) => void,
): () => void {
  const headings = headingIds.flatMap(id => {
    const element = document.getElementById(id);
    return element ? [{ id, element, top: 0 }] : [];
  });
  let needsMeasurement = true;
  let frame: number | null = null;
  let disposed = false;
  let previousId: string | undefined;
  let previousBackToTop: boolean | undefined;

  const update = () => {
    frame = null;
    const scrollY = window.scrollY;
    if (needsMeasurement) {
      for (const heading of headings) {
        heading.top = heading.element.getBoundingClientRect().top + scrollY;
      }
      needsMeasurement = false;
    }

    // Find the last heading above the reading line (120 px below the top).
    let low = 0;
    let high = headings.length;
    while (low < high) {
      const middle = (low + high) >>> 1;
      if (headings[middle].top <= scrollY + 120) low = middle + 1;
      else high = middle;
    }
    const activeId = headings[Math.max(0, low - 1)]?.id ?? "";
    const showBackToTop = scrollY > 280;
    if (activeId !== previousId || showBackToTop !== previousBackToTop) {
      previousId = activeId;
      previousBackToTop = showBackToTop;
      onChange(activeId, showBackToTop);
    }
  };
  const schedule = () => {
    if (!disposed && frame === null) frame = window.requestAnimationFrame(update);
  };
  const invalidate = () => {
    needsMeasurement = true;
    schedule();
  };

  update();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", invalidate);
  // Images, fonts and expanded proofs can move headings after first render.
  const content = document.querySelector(".lesson-web-main");
  const observer = new ResizeObserver(invalidate);
  if (content) observer.observe(content);
  document.addEventListener("toggle", invalidate, true);
  void document.fonts.ready.then(invalidate);

  return () => {
    disposed = true;
    if (frame !== null) window.cancelAnimationFrame(frame);
    observer.disconnect();
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", invalidate);
    document.removeEventListener("toggle", invalidate, true);
  };
}
