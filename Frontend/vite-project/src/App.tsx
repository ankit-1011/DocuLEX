import './App.css'
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Providers } from './Provider'
import ProtectedRoutes from './routes/ProtectedRoutes'

const Home = lazy(() => import('./pages/homePage'))
const AuthPage = lazy(() => import('./pages/AuthPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

const App = () => {
  return (

    <Providers>
      <Suspense fallback={<div className="flex justify-center items-center h-screen font-bold text-6xl">Loading...</div>}>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Providers>
  )
}

export default App
