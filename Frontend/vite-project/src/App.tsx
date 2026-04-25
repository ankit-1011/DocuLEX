import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import AuthPage from './pages/AuthPage'
import DashboardPage from "./pages/DashboardPage"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  )
}

export default App
