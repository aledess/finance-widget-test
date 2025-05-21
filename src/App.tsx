// src/App.tsx
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Homepage'
import SubmitPage from './pages/SubmitPage'
import FinancementPage from './pages/FinancementPage' // ✅ nuova pagina
import type { catalogItem } from './types/catalogItem'

export type AppProps = {
  config?: { lang: string }
  catalog?: catalogItem[]
}

export default function App({ config, catalog }: AppProps) {
  console.log('-----', config, catalog)
  return (
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<HomePage initialCatalog={catalog ?? []} />} />
        <Route path="/submit" element={<SubmitPage />} />
        <Route path="/financement" element={<FinancementPage />} /> {/* ✅ nuova route */}
      </Routes>
    </MemoryRouter>
  )
}
