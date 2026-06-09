'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';

interface ParallaxBannerProps {
  children: ReactNode;
  className?: string;
  overlay?: string;
}

export default function ParallaxBanner({ children, className = '', overlay }: ParallaxBannerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const bg = bgRef.current!;
    if (!section || !bg) return;

    function disableTransition() {
      if (leaveTimerRef.current) {
        clearTimeout(leaveTimerRef.current);
        leaveTimerRef.current = null;
      }
      bg.style.transition = 'none';
    }

    function onMouseLeave() {
      bg.style.transition = 'transform 400ms ease-out';
      setOffset({ x: 0, y: 0 });
      leaveTimerRef.current = setTimeout(() => {
        if (bg) bg.style.transition = 'none';
        leaveTimerRef.current = null;
      }, 400);
    }

    function onMove(e: MouseEvent) {
      const rect = section.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const px = (e.clientX - cx) / (rect.width / 2);
      const py = (e.clientY - cy) / (rect.height / 2);
      disableTransition();
      setOffset({ x: px * -16, y: py * -10 });
    }

    section.addEventListener('mousemove', onMove, { passive: true });
    section.addEventListener('mouseleave', onMouseLeave, { passive: true });

    return () => {
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;
    bg.style.transform = `translate(${offset.x}px, ${offset.y}px) scale(1.05)`;
  }, [offset]);

  return (
    <section ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: 'url(/images/london-bg.jpg)' }}
      />
      {overlay !== undefined ? (
        <div className={`absolute inset-0 ${overlay}`} />
      ) : (
        <div className="absolute inset-0 bg-[var(--brand-navy)]/75" />
      )}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
