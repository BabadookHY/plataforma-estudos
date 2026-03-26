require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const usuariosRotas = require("./rotas/usuarios");
const conteudosRotas = require("./rotas/conteudos");
const pontosRotas = require("./rotas/pontos");
const favoritosRotas = require("./rotas/favoritos");
const historicoRotas = require("./rotas/historico");
const comentariosRotas = require("./rotas/comentarios");
const filmesRotas = require("./rotas/filmes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensagem: "Servidor da plataforma de estudos funcionando!" });
});

app.use("/usuarios", usuariosRotas);
app.use("/conteudos", conteudosRotas);
app.use("/pontos", pontosRotas);
app.use("/favoritos", favoritosRotas);
app.use("/historico", historicoRotas);
app.use("/comentarios", comentariosRotas);
app.use("/filmes", filmesRotas);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
