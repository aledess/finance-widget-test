import { MemoryRouter, Routes, Route } from 'react-router-dom'

import Demo from './pages/Demo'

export type AppProps = {
  config?: {
    lang: string
    brand: string
    theme: string
  }
}

export default function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Demo />} />
      </Routes>
    </MemoryRouter>
  )
}
