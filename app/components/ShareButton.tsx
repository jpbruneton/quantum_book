"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/app/context/LangContext";
import { ShareIcon } from "./ShareIcon";

// Same native share / social links flow as Thermo, using Quantum's server catalog.
export function ShareButton({ variant }: { variant: "fab" | "inline" }) {
  const { t } = useLang();
  const pathname = usePathname();
  const menuId = useId();
  const [shareData, setShareData] = useState<{ title: string; url: string } | null>(null);
  const [justCopied, setJustCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setShareData(null);
    setJustCopied(false);
    return () => clearTimeout(timer.current);
  }, [pathname]);

  useEffect(() => {
    if (!shareData) return;
    containerRef.current?.querySelector<HTMLAnchorElement>(".share-menu a")?.focus({ preventScroll: true });
    const onOutside = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setShareData(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShareData(null);
        triggerRef.current?.focus({ preventScroll: true });
      }
    };
    document.addEventListener("pointerdown", onOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [shareData]);

  const handleShare = async () => {
    if (shareData) { setShareData(null); return; }
    const data = { title: document.title, url: window.location.href };
    if (navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    setShareData(data);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareData?.url ?? window.location.href);
      setJustCopied(true);
      setShareData(null);
      triggerRef.current?.focus({ preventScroll: true });
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setJustCopied(false), 1800);
    } catch {
      // Keep the other sharing choices available when clipboard access is denied.
    }
  };

  const url = encodeURIComponent(shareData?.url ?? "");
  const title = encodeURIComponent(shareData?.title ?? "");
  const links = [
    { name: "X", href: `https://twitter.com/intent/tweet?url=${url}&text=${title}`, badge: "X", color: "#000" },
    { name: "WhatsApp", href: `https://wa.me/?text=${title}%20${url}`, badge: "W", color: "#128c4a" },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${url}`, badge: "f", color: "#1877f2" },
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`, badge: "in", color: "#0a66c2" },
    { name: t.share.email, href: `mailto:?subject=${title}&body=${url}`, badge: "@", color: "#475569" },
  ];

  return (
    <div ref={containerRef} className={variant === "fab" ? "share-control floating-share-btn" : "share-control share-inline"}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setShareData(null); }}>
      <button ref={triggerRef} type="button" className="share-trigger" onClick={handleShare}
        aria-label={justCopied ? t.share.copied : t.share.label}
        aria-expanded={Boolean(shareData)} aria-controls={shareData ? menuId : undefined}>
        <ShareIcon checked={justCopied} size={variant === "fab" ? 22 : 18} />
        {variant === "inline" && <span>{justCopied ? t.share.copied : t.share.label}</span>}
      </button>
      <span className="sr-only" role="status">{justCopied ? t.share.copied : ""}</span>
      {shareData && (
        <div id={menuId} className="share-menu" role="group" aria-label={t.share.label}>
          {links.map((link) => (
            <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" onClick={() => setShareData(null)}>
              <span className="share-badge" style={{ background: link.color }} aria-hidden="true">{link.badge}</span>
              {link.name}
            </a>
          ))}
          <button type="button" onClick={copyLink}>
            <span className="share-badge" aria-hidden="true">↗</span>{t.share.copyLink}
          </button>
        </div>
      )}
    </div>
  );
}
