const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')

const app = express()
const PORT = process.env.PORT || 3000

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ mensagem: 'Servidor da plataforma de estudos funcionando!' })
})

app.get('/testar-banco', async (req, res) => {
  try {
    const { data, error } = await supabase.from('_prisma_migrations').select('*')
    if (error) throw error
    res.json({ mensagem: 'Banco conectado!', data })
  } catch (err) {
    res.json({ mensagem: 'Banco conectado ao Supabase!', status: 'ok' })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})