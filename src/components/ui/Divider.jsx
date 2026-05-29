export default function Divider({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={[
        'h-px w-full',
        'bg-gradient-to-r from-transparent via-roseGold/40 to-transparent',
        className,
      ].join(' ')}
    />
  )
}
