const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')

const usuariosRotas = require('./rotas/usuarios')
const conteudosRotas = require('./rotas/conteudos')

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

app.use('/usuarios', usuariosRotas)
app.use('/conteudos', conteudosRotas)

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})