import './App.css'
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Providers } from './Provider'
import ProtectedRoutes from './routes/ProtectedRoutes'

const Home = lazy(() => new Promise((resolve) => setTimeout(() => resolve(import('./pages/home')), 3000)) as Promise<{ default: React.ComponentType<any> }>)
const AuthPage = lazy(() => new Promise((resolve) => setTimeout(() => resolve(import('./pages/AuthPage')), 3000)) as Promise<{ default: React.ComponentType<any> }>)
const DashboardPage = lazy(() => new Promise((resolve) => setTimeout(() => resolve(import('./pages/DashboardPage')), 3000)) as Promise<{ default: React.ComponentType<any> }>)
const NotFoundPage = lazy(() => new Promise((resolve) => setTimeout(() => resolve(import('./pages/NotFoundPage')), 3000)) as Promise<{ default: React.ComponentType<any> }>)

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
