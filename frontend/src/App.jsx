import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Home from './pages/Home'
import Explorar from './pages/Explorar'
import Ranking from './pages/Ranking'
import Perfil from './pages/Perfil'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode)
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const token = localStorage.getItem('token')

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-[#F8F9FF] dark:bg-[#1a1a2e] text-gray-900 dark:text-white transition-colors duration-300">

        <div className="flex justify-end p-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded-full bg-[#185FA5] text-white font-semibold text-sm hover:bg-[#378ADD] transition-colors duration-200"
          >
            {darkMode ? 'Modo Claro' : 'Modo Escuro'}
          </button>
        </div>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
          <Route path="/explorar" element={token ? <Explorar /> : <Navigate to="/login" />} />
          <Route path="/ranking" element={token ? <Ranking /> : <Navigate to="/login" />} />
          <Route path="/perfil" element={token ? <Perfil /> : <Navigate to="/login" />} />
        </Routes>

      </div>
    </div>
  )
}

export default App