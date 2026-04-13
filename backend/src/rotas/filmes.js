const express = require("express");
const router = express.Router();
const autenticar = require("../middlewares/auth");
const { validateMovie } = require("../middlewares/validators");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

router.post("/adicionar", autenticar, validateMovie, async (req, res) => {
  const { titulo, ano, descricao, tema, disciplina, conteudo_id } = req.body;

  if (!titulo || !tema) {
    return res.status(400).json({ erro: "Titulo e tema sao obrigatorios" });
  }

  const { data, error } = await supabase
    .from("filmes")
    .insert([{ titulo, ano, descricao, tema, disciplina, conteudo_id }])
    .select();

  if (error) {
    return res.status(500).json({ erro: error.message });
  }

  return res.status(201).json({ mensagem: "Filme adicionado!", filme: data[0] });
});

router.get("/listar", async (req, res) => {
  const { data, error } = await supabase
    .from("filmes")
    .select("*")
    .order("criado_em", { ascending: false });

  if (error) {
    return res.status(500).json({ erro: error.message });
  }

  res.json(data);
});

router.get("/buscar", async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ erro: "Digite algo para buscar" });
  }

  const { data, error } = await supabase
    .from("filmes")
    .select("*")
    .or(`titulo.ilike.%${q}%,tema.ilike.%${q}%,disciplina.ilike.%${q}%`);

  if (error) {
    return res.status(500).json({ erro: error.message });
  }

  res.json(data);
});

module.exports = router;
