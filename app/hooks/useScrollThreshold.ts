"use client";
import { useEffect, useState } from "react";
import { observeScrollThreshold } from "@/lib/lessonScroll";

export function useScrollThreshold(threshold: number, resetKey: string) {
  const [visible, setVisible] = useState(false);
  useEffect(() => observeScrollThreshold(threshold, setVisible), [threshold, resetKey]);
  return visible;
}
