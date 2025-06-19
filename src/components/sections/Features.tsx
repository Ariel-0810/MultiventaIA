
export function Features() {
  const items = [
    "✅ Pedidos organizados en un solo panel",
    "🤖 IA que responde automáticamente",
    "🛍️ Integración con WhatsApp, IG y más",
    "📦 Seguimiento de stock y entregas",
  ]

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-8">¿Qué podés hacer con MultiVenta AI?</h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {items.map((text, i) => <li key={i} className="bg-white shadow p-4 rounded-xl">{text}</li>)}
      </ul>
    </section>
  )
}
