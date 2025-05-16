import { MemoryRouter, Routes, Route } from 'react-router-dom'
import VehicleList from './pages/VehicleList'
import VehicleDetail from './pages/VehicleDetail'
import SubmitPage from './pages/SubmitPage'
import HomePage from './pages/Homepage'

import './index.css'

export default function App() {
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
