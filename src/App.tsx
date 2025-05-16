import { MemoryRouter, Routes, Route } from 'react-router-dom'

import Demo from './pages/Demo'

export default function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Demo />} />
      </Routes>
    </MemoryRouter>
  )
}
