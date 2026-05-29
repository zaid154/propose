export default function BackgroundCandles({ intensity = 'default' }) {
  const opacity = intensity === 'strong' ? 0.45 : 0.28

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-40 -left-32 h-[36rem] w-[36rem] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(255, 177, 120, 0.45), rgba(0,0,0,0))',
          opacity,
        }}
      />
      <div
        className="absolute -bottom-40 -right-32 h-[34rem] w-[34rem] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(183, 110, 121, 0.50), rgba(0,0,0,0))',
          opacity,
        }}
      />
      <div
        className="absolute left-1/3 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(122, 18, 50, 0.40), rgba(0,0,0,0))',
          opacity: opacity * 0.8,
        }}
      />
    </div>
  )
}
