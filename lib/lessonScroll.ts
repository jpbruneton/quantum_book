/** A scroll burst triggers one frame; subscribers update only across the threshold. */
export function observeScrollThreshold(
  threshold: number,
  onChange: (visible: boolean) => void,
): () => void {
  let frame: number | null = null;
  let previous: boolean | undefined;
  const update = () => {
    frame = null;
    const visible = window.scrollY > threshold;
    if (visible !== previous) {
      previous = visible;
      onChange(visible);
    }
  };
  const schedule = () => {
    if (frame === null) frame = window.requestAnimationFrame(update);
  };
  update();
  window.addEventListener("scroll", schedule, { passive: true });
  return () => {
    if (frame !== null) window.cancelAnimationFrame(frame);
    window.removeEventListener("scroll", schedule);
  };
}
