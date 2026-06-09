import NavBar from './NavBar'
import Footer from './Footer'

const AppShell = (props) => {
  return (
    <div className="min-h-screen bg-pink-50">
      <NavBar />
      <div className="relative z-10">{props.children}</div>
      <Footer />
    </div>
  )
}

export default AppShell
