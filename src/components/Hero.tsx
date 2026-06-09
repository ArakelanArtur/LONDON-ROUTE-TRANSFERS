'use client';

import { useRef, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Hero() {
  const t = useTranslations('home.hero');
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
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
    rafRef.current = requestAnimationFrame(() => {
      bg.style.transform = `translate(${offset.x}px, ${offset.y}px) scale(1.05)`;
    });
    return () => cancelAnimationFrame(rafRef.current);
  }, [offset]);

  return (
    <section ref={sectionRef} className="relative min-h-[420px] sm:min-h-[520px] md:min-h-[600px] flex items-end w-full overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: 'url(/images/london-bg.jpg)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-navy)] via-[var(--brand-navy)]/60 to-[var(--brand-navy)]/20" />
      <div className="relative z-10 w-full pb-10 sm:pb-14 pt-20 sm:pt-24 px-5 sm:px-8 md:px-16 lg:px-24">
        <div className="w-10 sm:w-16 h-0.5 bg-[var(--brand-gold)] mb-4 sm:mb-6" />
        <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 sm:mb-5 text-white tracking-tight max-w-3xl">
          {t('heading')}
        </h1>
        <p className="text-sm sm:text-lg md:text-xl text-white/80 mb-2 max-w-2xl leading-relaxed">
          {t('subheading')}
        </p>
        <p className="text-xs sm:text-sm text-white/50 mb-6 sm:mb-10 max-w-2xl leading-relaxed">
          {t('text')}
        </p>
        <Link
          href="/booking"
          className="inline-block px-7 sm:px-10 py-3 sm:py-4 bg-[var(--brand-gold)] text-[var(--brand-navy)] rounded-sm text-sm sm:text-base no-underline font-serif tracking-wide font-semibold hover:bg-[var(--brand-gold-light)]"
        >
          {t('cta')}
        </Link>
        <p className="text-[0.65rem] sm:text-xs text-white/40 mt-3 sm:mt-4 tracking-wide">{t('underCta')} </p>
      </div>
    </section>
  );
}
