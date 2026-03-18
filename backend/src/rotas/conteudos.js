const express = require('express')
const router = express.Router()
const autenticar = require('../middlewares/auth')
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

router.post('/adicionar', autenticar, async (req, res) => {
  const { titulo, tema, disciplina, tipo, link, descricao, palavras_chave } = req.body

  if (!titulo || !tema || !disciplina) {
    return res.status(400).json({ erro: 'Titulo, tema e disciplina sao obrigatorios' })
  }

  const { data, error } = await supabase
    .from('conteudos')
    .insert([{
      titulo,
      tema,
      disciplina,
      tipo,
      link,
      descricao,
      palavras_chave,
      criado_por: req.usuario.id
    }])
    .select()

  if (error) {
    return res.status(500).json({ erro: error.message })
  }

  res.status(201).json({ mensagem: 'Conteudo adicionado com sucesso!', conteudo: data[0] })
})

router.get('/listar', async (req, res) => {
  const { data, error } = await supabase
    .from('conteudos')
    .select('*')
    .order('criado_em', { ascending: false })

  if (error) {
    return res.status(500).json({ erro: error.message })
  }

  res.json(data)
})

router.get('/buscar', async (req, res) => {
  const { q } = req.query

  if (!q) {
    return res.status(400).json({ erro: 'Digite algo para buscar' })
  }

  const { data, error } = await supabase
    .from('conteudos')
    .select('*')
    .or(`titulo.ilike.%${q}%,tema.ilike.%${q}%,disciplina.ilike.%${q}%,palavras_chave.ilike.%${q}%`)

  if (error) {
    return res.status(500).json({ erro: error.message })
  }

  res.json(data)
})

module.exports = router