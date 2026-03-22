function Perfil() {
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#185FA5] mb-2">Perfil</h1>
      <p className="text-gray-500 dark:text-gray-400">{usuario.nome} — {usuario.email}</p>
    </div>
  )
}

export default Perfil