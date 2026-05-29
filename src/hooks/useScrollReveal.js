export const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] },
  },
}

export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

export function useScrollReveal() {
  return {
    initial: 'hidden',
    whileInView: 'show',
    viewport: { once: true, amount: 0.2 },
    variants: revealVariants,
  }
}

export function useStaggerContainer() {
  return {
    initial: 'hidden',
    whileInView: 'show',
    viewport: { once: true, amount: 0.2 },
    variants: staggerContainer,
  }
}
