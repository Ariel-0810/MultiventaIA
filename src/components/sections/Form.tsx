
export function Form() {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-xl mx-auto text-center">
        <h3 className="text-xl font-semibold mb-2">Sumate a la beta exclusiva</h3>
        <p className="mb-6">Recibí acceso anticipado y ayudanos a construir el futuro del comercio inteligente.</p>
        <form className="space-y-4">
          <input type="text" placeholder="Tu nombre" className="w-full p-3 border rounded-lg" />
          <input type="email" placeholder="Tu email" className="w-full p-3 border rounded-lg" />
          <input type="text" placeholder="Rubro o tipo de negocio (opcional)" className="w-full p-3 border rounded-lg" />
          <button type="submit" className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition">
            Unirme a la lista
          </button>
        </form>
      </div>
    </section>
  )
}
