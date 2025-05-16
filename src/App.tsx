import { MemoryRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Homepage'
import VehicleList from './pages/VehicleList'
import VehicleDetail from './pages/VehicleDetail'
import SubmitPage from './pages/SubmitPage'

export type AppProps = {
  config?: {
    lang: string
    brand: string
    theme: string
  }
}

export default function App({ config }: AppProps) {
  console.log('App', config)
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vehicle" element={<VehicleList />} />
        <Route path="/vehicle/:id" element={<VehicleDetail />} />
        <Route path="/submit" element={<SubmitPage />} />
      </Routes>
    </MemoryRouter>
  )
}
