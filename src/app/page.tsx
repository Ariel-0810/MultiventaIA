import { Hero } from '../components/sections/Hero'
import { Features } from '../components/sections/Features'
import { Form } from '../components/sections/Form'
import { Footer } from '../components/sections/Footer'
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <Hero />
      <Features />
      <Form />
      <Footer />
    </main>
  )
}
