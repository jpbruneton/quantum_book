"use client";

import { usePathname } from "next/navigation";
import { ShareButton } from "./ShareButton";
import { useScrollThreshold } from "@/app/hooks/useScrollThreshold";

export function FloatingShareButton() {
  const pathname = usePathname();
  const visible = useScrollThreshold(400, pathname);

  return visible ? <ShareButton key={pathname} variant="fab" /> : null;
}
