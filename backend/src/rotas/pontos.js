const express = require('express')
const router = express.Router()
const autenticar = require('../middlewares/auth')
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

router.post('/adicionar', autenticar, async (req, res) => {
  const { acao, quantidade } = req.body

  const { data, error } = await supabase
    .from('pontos')
    .insert([{
      usuario_id: req.usuario.id,
      acao,
      quantidade
    }])
    .select()

  if (error) {
    return res.status(500).json({ erro: error.message })
  }

  await supabase
    .from('usuarios')
    .update({ pontos: supabase.rpc('increment', { x: quantidade }) })
    .eq('id', req.usuario.id)

  res.status(201).json({ mensagem: 'Pontos adicionados!', registro: data[0] })
})

router.get('/ranking', async (req, res) => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('id, nome, pontos, streak')
    .order('pontos', { ascending: false })
    .limit(10)

  if (error) {
    return res.status(500).json({ erro: error.message })
  }

  res.json(data)
})

router.get('/meus-pontos', autenticar, async (req, res) => {
  const { data, error } = await supabase
    .from('pontos')
    .select('*')
    .eq('usuario_id', req.usuario.id)
    .order('criado_em', { ascending: false })

  if (error) {
    return res.status(500).json({ erro: error.message })
  }

  res.json(data)
})

module.exports = router