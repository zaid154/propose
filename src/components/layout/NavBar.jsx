import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { site } from '../../config/site'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/memories', label: 'Memories' },
  { to: '/proposal', label: 'Proposal' },
]

const NavBar = () => {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const titleWord = site.siteTitle.split(' ')[0] || '♥'

  return (
    <header className="sticky top-0 z-40 border-b border-pink-100 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="font-script text-3xl leading-none text-pink-600">{titleWord}</span>
          <span className="hidden text-xs uppercase tracking-widest text-pink-500 sm:inline">
            {site.myName} · {site.herName}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          {navLinks.map((link) => {
            let linkClass = 'text-sm text-gray-600 hover:text-pink-600 transition'
            if (location.pathname === link.to) {
              linkClass = 'text-sm text-pink-600'
            }
            return (
              <Link key={link.to} to={link.to} className={linkClass}>
                {link.label}
              </Link>
            )
          })}
        </nav>

        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1 sm:hidden"
        >
          <span className="block h-0.5 w-5 bg-gray-700" />
          <span className="block h-0.5 w-5 bg-gray-700" />
          <span className="block h-0.5 w-5 bg-gray-700" />
        </button>
      </div>

      {open ? (
        <div className="border-t border-pink-100 bg-white sm:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4">
            {navLinks.map((link) => {
              let linkClass = 'text-sm text-gray-600 hover:text-pink-600'
              if (location.pathname === link.to) {
                linkClass = 'text-sm text-pink-600'
              }
              return (
                <Link key={link.to} to={link.to} className={linkClass} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>
      ) : null}
    </header>
  )
}

export default NavBar
