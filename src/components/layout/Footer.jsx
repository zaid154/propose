import { site } from '../../config/site'
import Divider from '../ui/Divider'

export default function Footer() {
  return (
    <footer className="relative z-10 mt-24">
      <Divider />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-xs uppercase tracking-[0.35em] text-ivory/50 sm:flex-row sm:px-8">
        <span>
          {site.siteTitle} · {site.myName} <span className="text-roseGoldLight">♥</span> {site.herName}
        </span>
        <span className="text-ivory/40">made with love</span>
      </div>
    </footer>
  )
}
