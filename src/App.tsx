import React from 'react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Homepage'
import VehicleDetail from './pages/VehicleDetail'
import SubmitPage from './pages/SubmitPage'
import ProfilePage from './pages/ProfilePage'
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
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/vehicle-detail" element={<VehicleDetail />} />
        <Route path="/submit" element={<SubmitPage />} />
      </Routes>
    </MemoryRouter>
  )
}
