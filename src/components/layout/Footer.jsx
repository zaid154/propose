import { site } from '../../config/site'
import Divider from '../ui/Divider'

const Footer = () => {
  return (
    <footer className="relative z-10 mt-24">
      <Divider />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-xs uppercase tracking-widest text-gray-400 sm:flex-row sm:px-8">
        <span>
          {site.siteTitle} · {site.myName} <span className="text-pink-600">♥</span> {site.herName}
        </span>
        <span className="text-gray-400">made with love</span>
      </div>
    </footer>
  )
}

export default Footer
