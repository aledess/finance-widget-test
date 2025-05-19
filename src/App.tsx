import { MemoryRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Homepage'
import VehicleDetail from './pages/VehicleDetail'
import SubmitPage from './pages/SubmitPage'
import type { catalogItem } from './types/catalogItem'

export type AppProps = {
  config?: {
    lang: string
    brand: string
    theme?: string
  }
  catalog?: catalogItem[]
}

export default function App({ config, catalog }: AppProps) {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<HomePage initialCatalog={catalog ?? []} />} />
        <Route path="/vehicle/:id" element={<VehicleDetail />} />
        <Route path="/submit" element={<SubmitPage />} />
      </Routes>
    </MemoryRouter>
  )
}
