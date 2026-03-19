const express = require('express')
const router = express.Router()
const autenticar = require('../middlewares/auth')
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

router.post('/adicionar', autenticar, async (req, res) => {
  const { conteudo_id, texto } = req.body

  if (!conteudo_id || !texto) {
    return res.status(400).json({ erro: 'conteudo_id e texto sao obrigatorios' })
  }

  const { data, error } = await supabase
    .from('comentarios')
    .insert([{ usuario_id: req.usuario.id, conteudo_id, texto }])
    .select()

  if (error) {
    return res.status(500).json({ erro: error.message })
  }

  res.status(201).json({ mensagem: 'Comentario adicionado!', comentario: data[0] })
})

router.get('/listar/:conteudo_id', async (req, res) => {
  const { conteudo_id } = req.params

  const { data, error } = await supabase
    .from('comentarios')
    .select('*, usuarios(id, nome)')
    .eq('conteudo_id', conteudo_id)
    .order('criado_em', { ascending: false })

  if (error) {
    return res.status(500).json({ erro: error.message })
  }

  res.json(data)
})

router.delete('/remover/:id', autenticar, async (req, res) => {
  const { id } = req.params

  const { error } = await supabase
    .from('comentarios')
    .delete()
    .eq('id', id)
    .eq('usuario_id', req.usuario.id)

  if (error) {
    return res.status(500).json({ erro: error.message })
  }

  res.json({ mensagem: 'Comentario removido!' })
})

module.exports = router