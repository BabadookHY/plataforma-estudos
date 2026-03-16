const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

router.post('/cadastrar', async (req, res) => {
  const { nome, email, senha, tipo_usuario } = req.body

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios' })
  }

  const senhaHash = await bcrypt.hash(senha, 10)

  const { data, error } = await supabase
    .from('usuarios')
    .insert([{ nome, email, senha: senhaHash, tipo_usuario, pontos: 0 }])
    .select()

  if (error) {
    return res.status(500).json({ erro: error.message })
  }

  res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!', usuario: { id: data[0].id, nome: data[0].nome, email: data[0].email } })
})

router.post('/login', async (req, res) => {
  const { email, senha } = req.body

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios' })
  }

  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('email', email)
    .single()

  if (error || !data) {
    return res.status(401).json({ erro: 'Email ou senha incorretos' })
  }

  const senhaCorreta = await bcrypt.compare(senha, data.senha)

  if (!senhaCorreta) {
    return res.status(401).json({ erro: 'Email ou senha incorretos' })
  }

  const token = jwt.sign(
    { id: data.id, nome: data.nome, email: data.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  res.json({ mensagem: 'Login realizado com sucesso!', token, usuario: { id: data.id, nome: data.nome, email: data.email, pontos: data.pontos } })
})

router.get('/listar', async (req, res) => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('id, nome, email, tipo_usuario, pontos, criado_em')

  if (error) {
    return res.status(500).json({ erro: error.message })
  }

  res.json(data)
})

module.exports = router