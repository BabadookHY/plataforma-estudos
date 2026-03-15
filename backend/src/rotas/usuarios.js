const express = require('express')
const router = express.Router()
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

  const { data, error } = await supabase
    .from('usuarios')
    .insert([{ nome, email, senha, tipo_usuario, pontos: 0 }])
    .select()

  if (error) {
    return res.status(500).json({ erro: error.message })
  }

  res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!', usuario: data[0] })
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