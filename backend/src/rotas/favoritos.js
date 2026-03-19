const express = require('express')
const router = express.Router()
const autenticar = require('../middlewares/auth')
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

router.post('/adicionar', autenticar, async (req, res) => {
  const { conteudo_id } = req.body

  if (!conteudo_id) {
    return res.status(400).json({ erro: 'conteudo_id é obrigatorio' })
  }

  const { data: existente } = await supabase
    .from('favoritos')
    .select('*')
    .eq('usuario_id', req.usuario.id)
    .eq('conteudo_id', conteudo_id)
    .single()

  if (existente) {
    return res.status(400).json({ erro: 'Conteudo ja favoritado' })
  }

  const { data, error } = await supabase
    .from('favoritos')
    .insert([{ usuario_id: req.usuario.id, conteudo_id }])
    .select()

  if (error) {
    return res.status(500).json({ erro: error.message })
  }

  res.status(201).json({ mensagem: 'Conteudo favoritado!', favorito: data[0] })
})

router.get('/listar', autenticar, async (req, res) => {
  const { data, error } = await supabase
    .from('favoritos')
    .select('*, conteudos(*)')
    .eq('usuario_id', req.usuario.id)
    .order('criado_em', { ascending: false })

  if (error) {
    return res.status(500).json({ erro: error.message })
  }

  res.json(data)
})

router.delete('/remover/:conteudo_id', autenticar, async (req, res) => {
  const { conteudo_id } = req.params

  const { error } = await supabase
    .from('favoritos')
    .delete()
    .eq('usuario_id', req.usuario.id)
    .eq('conteudo_id', conteudo_id)

  if (error) {
    return res.status(500).json({ erro: error.message })
  }

  res.json({ mensagem: 'Favorito removido!' })
})

module.exports = router