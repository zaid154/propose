import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { site } from '../../config/site'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/memories', label: 'Memories' },
  { to: '/proposal', label: 'Proposal' },
]

function NavItem({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      onClick={onClick}
      className={({ isActive }) =>
        [
          'group relative px-1 py-2 text-sm tracking-wide transition-colors',
          isActive ? 'text-ivory' : 'text-ivory/70 hover:text-ivory',
        ].join(' ')
      }
    >
      {({ isActive }) => (
        <>
          <span>{label}</span>
          <span
            className={[
              'absolute inset-x-0 -bottom-0.5 mx-auto h-px origin-left bg-roseGoldLight transition-transform duration-300',
              isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
            ].join(' ')}
          />
        </>
      )}
    </NavLink>
  )
}

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-ivory/10 bg-wine/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <span className="font-script text-3xl leading-none text-roseGoldLight">
            {site.siteTitle.split(' ')[0] || '♥'}
          </span>
          <span className="hidden text-xs uppercase tracking-[0.4em] text-champagne/80 sm:inline">
            {site.myName} · {site.herName}
          </span>
        </NavLink>

        <nav className="hidden items-center gap-8 sm:flex">
          {LINKS.map((l) => (
            <NavItem key={l.to} {...l} />
          ))}
        </nav>

        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-ivory/15 text-ivory/80 transition hover:border-roseGoldLight"
        >
          <span className="block h-px w-4 bg-current shadow-[0_-5px_0_currentColor,0_5px_0_currentColor]" />
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="sm:hidden border-t border-ivory/10 bg-wine/95 backdrop-blur"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-4">
              {LINKS.map((l) => (
                <NavItem key={l.to} {...l} onClick={() => setOpen(false)} />
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
