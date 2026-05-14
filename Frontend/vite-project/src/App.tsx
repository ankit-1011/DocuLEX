import './App.css'
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Providers } from './Provider'
import ProtectedRoutes from './routes/ProtectedRoutes'

const Home = lazy(() => new Promise((resolve) => setTimeout(() => resolve(import('./pages/homePage')), 2000)) as Promise<{ default: React.ComponentType<any> }>)
const AuthPage = lazy(() => new Promise((resolve) => setTimeout(() => resolve(import('./pages/AuthPage')), 2000)) as Promise<{ default: React.ComponentType<any> }>)
const DashboardPage = lazy(() => new Promise((resolve) => setTimeout(() => resolve(import('./pages/DashboardPage')), 2000)) as Promise<{ default: React.ComponentType<any> }>)
const NotFoundPage = lazy(() => new Promise((resolve) => setTimeout(() => resolve(import('./pages/NotFoundPage')), 2000)) as Promise<{ default: React.ComponentType<any> }>)

const App = () => {
  return (


    <Suspense fallback={<div className="flex justify-center items-center h-screen font-bold text-6xl">Loading...</div>}>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Providers><DashboardPage /></Providers>} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}

export default App
