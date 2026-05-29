import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import Home from './pages/Home'
import Memories from './pages/Memories'
import Proposal from './pages/Proposal'
import DatePlanner from './pages/DatePlanner'
import Surprise from './pages/Surprise'
import { routes } from './routes'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()

  return (
    <AppShell>
      <ScrollToTop />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.memories} element={<Memories />} />
          <Route path={routes.proposal} element={<Proposal />} />
          <Route path={routes.date} element={<DatePlanner />} />
          <Route path={routes.surprise} element={<Surprise />} />
          <Route path="*" element={<Navigate to={routes.home} replace />} />
        </Routes>
      </AnimatePresence>
    </AppShell>
  )
}
