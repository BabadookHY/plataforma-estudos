const { createClient } = require("@supabase/supabase-js");
const jwt = require("jsonwebtoken");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

const getUserByToken = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;
  try {
    const user = await supabase
      .from("usuarios")
      .select("*")
      .eq("id", userId)
      .single();

    return user;
  } catch (error) {
    throw new Error("Não foi possível buscar o usuário: " + error.message);
  }
};

module.exports = getUserByToken