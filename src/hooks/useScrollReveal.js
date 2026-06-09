// Animation for scroll reveal
export function getRevealAnimation() {
  return {
    initial: 'hidden',
    whileInView: 'show',
    viewport: { once: true, amount: 0.2 },
    variants: {
      hidden: { opacity: 0, y: 24 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7 },
      },
    },
  }
}

// Animation for staggered children
export function getStaggerAnimation() {
  return {
    initial: 'hidden',
    whileInView: 'show',
    viewport: { once: true, amount: 0.2 },
    variants: {
      hidden: {},
      show: {
        transition: { staggerChildren: 0.15 },
      },
    },
  }
}

// Single item variant for stagger lists
export const itemVariant = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
}
