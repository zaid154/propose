import BackgroundCandles from '../effects/BackgroundCandles'
import FilmGrain from '../effects/FilmGrain'
import NavBar from './NavBar'
import Footer from './Footer'

export default function AppShell({ children }) {
  return (
    <div className="relative min-h-screen bg-wine-gradient">
      <BackgroundCandles />
      <FilmGrain opacity={0.05} />

      <NavBar />
      <div className="relative z-10">{children}</div>
      <Footer />
    </div>
  )
}
