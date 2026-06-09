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

// Scroll to top when page changes
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(function () {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

const App = () => {
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

export default App
