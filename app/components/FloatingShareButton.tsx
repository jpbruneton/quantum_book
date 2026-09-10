"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ShareButton } from "./ShareButton";

export function FloatingShareButton() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return visible ? <ShareButton key={pathname} variant="fab" /> : null;
}
