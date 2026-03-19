const express = require('express')
const router = express.Router()
const autenticar = require('../middlewares/auth')
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

router.post('/registrar', autenticar, async (req, res) => {
  const { conteudo_id } = req.body

  if (!conteudo_id) {
    return res.status(400).json({ erro: 'conteudo_id é obrigatorio' })
  }

  const { data, error } = await supabase
    .from('historico')
    .insert([{
      usuario_id: req.usuario.id,
      conteudo_id
    }])
    .select()

  if (error) {
    return res.status(500).json({ erro: error.message })
  }

  await supabase
    .from('usuarios')
    .update({ ultimo_acesso: new Date().toISOString() })
    .eq('id', req.usuario.id)

  res.status(201).json({ mensagem: 'Historico registrado!', registro: data[0] })
})

router.get('/listar', autenticar, async (req, res) => {
  const { data, error } = await supabase
    .from('historico')
    .select('*, conteudos(*)')
    .eq('usuario_id', req.usuario.id)
    .order('acessado_em', { ascending: false })

  if (error) {
    return res.status(500).json({ erro: error.message })
  }

  res.json(data)
})

module.exports = router