// Shared Framer Motion scroll animation hook
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return { ref, inView };
}

export const fadeUp = (delay = 0) => ({
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] },
});

export const fadeLeft = (delay = 0) => ({
  initial: { x: -60, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] },
});

export const fadeRight = (delay = 0) => ({
  initial: { x: 60, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] },
});

export const scaleIn = (delay = 0) => ({
  initial: { scale: 0.85, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.3, delay, ease: [0.16, 1, 0.3, 1] },
});
