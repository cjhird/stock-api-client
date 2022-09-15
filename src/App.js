import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages/Components
import Landing from './components/Landing.js'
import ThreadIndex from './components/threads/ThreadIndex.js'
import ThreadDisplay from './components/threads/ThreadDisplay.js'
import ThreadAdd from './components/threads/ThreadAdd.js'
import ThreadUpdate from './components/threads/ThreadUpdate.js'
import NotFound from './components/NotFound.js'
import SiteNavBar from './components/SiteNavBar.js'
import Register from './auth/Register.js'
import Login from './auth/Login.js'

const App = () => {
  return (
    <div className="site-wrapper">
      <BrowserRouter>
        <SiteNavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/threads" element={<ThreadIndex />} />
          <Route path="/threads/:id" element={<ThreadDisplay />} />
          <Route path="/threads/add" element={<ThreadAdd />} />
          <Route path="/threads/:id/update" element={<ThreadUpdate />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
