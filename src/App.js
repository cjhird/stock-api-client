import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages/Components
import Landing from './components/pages/Landing.js'
import Screener from './components/pages/Screener.js'
import StockSingle from './components/pages/StockSingle.js'
import NotFound from './components/pages/NotFound.js'
import SiteNavBar from './components/comps/SiteNavBar.js'
// import Footer from './components/comps/Footer.js'
import Portfolio from './components/user/Portfolio.js'
import Leaderboard from './components/pages/Leaderboard.js'
import Register from './components/user/Register.js'
import Login from './components/user/Login.js'

const App = () => {
  return (
    <div className="site-wrapper">
      <BrowserRouter>
        <SiteNavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/screener" element={<Screener />} />
          <Route path="/stocks/:stockId" element={<StockSingle />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
