import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'
import api from '../services/api'

function Cadastro() {
  const [form, setForm] = useState({ nome: '', email: '', senha: '', tipo_usuario: 'estudante' })
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleCadastro = async (e) => {
    e.preventDefault()
    setErro('')
    setCarregando(true)

    try {
      await api.post('/usuarios/cadastrar', form)
      navigate('/login')
    } catch (err) {
      setErro(err.response?.data?.erro || 'Erro ao cadastrar')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FF] dark:bg-[#1a1a2e]">
      <Motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-[#0f0f23] rounded-2xl shadow-lg p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-[#185FA5] mb-2 text-center">Criar conta</h1>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-8">Junte-se a plataforma de estudos</p>

        {erro && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {erro}
          </div>
        )}

        <form onSubmit={handleCadastro} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Seu nome"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-[#F8F9FF] dark:bg-[#1a1a2e] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#185FA5] transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-[#F8F9FF] dark:bg-[#1a1a2e] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#185FA5] transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Senha</label>
            <input
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-[#F8F9FF] dark:bg-[#1a1a2e] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#185FA5] transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tipo de usuario</label>
            <select
              name="tipo_usuario"
              value={form.tipo_usuario}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-[#F8F9FF] dark:bg-[#1a1a2e] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#185FA5] transition"
            >
              <option value="estudante">Estudante</option>
              <option value="universitario">Universitario</option>
              <option value="enem">Preparando para o ENEM</option>
              <option value="concurso">Preparando para concurso</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={carregando}
            className="w-full py-3 rounded-xl bg-[#185FA5] hover:bg-[#378ADD] text-white font-semibold transition-colors duration-200 disabled:opacity-50"
          >
            {carregando ? 'Cadastrando...' : 'Criar conta'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Ja tem conta?{' '}
          <Link to="/login" className="text-[#185FA5] font-semibold hover:underline">
            Entrar
          </Link>
        </p>
      </Motion.div>
    </div>
  )
}

export default Cadastro