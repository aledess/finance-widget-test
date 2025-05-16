import type { AppProps } from './App'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Homepage'
import VehicleList from './pages/VehicleList'
import VehicleDetail from './pages/VehicleDetail'
import SubmitPage from './pages/SubmitPage'

export default function WidgetApp({ config }: AppProps) {
  console.log('-----WidgetApp', config)
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<HomePage config={config} />} />
        <Route path="/vehicle" element={<VehicleList />} />
        <Route path="/vehicle/:id" element={<VehicleDetail />} />
        <Route path="/submit" element={<SubmitPage />} />
      </Routes>
    </MemoryRouter>
  )
}
