function Home() {
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#185FA5] mb-2">
        Ola, {usuario.nome}! 
      </h1>
      <p className="text-gray-500 dark:text-gray-400">Bem-vindo de volta. Continue estudando!</p>
    </div>
  )
}

export default Home