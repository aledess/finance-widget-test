import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/main-styles.scss'
import { mockCatalog } from './mock/catalog'

// ✅ Se NON è in un Web Component, montiamo App con una config + catalog mock
const mount = document.getElementById('root')

if (mount) {
  const devConfig = {
    lang: 'it',
    brand: 'fiat',
    theme: 'light',
  }

  createRoot(mount).render(
    <React.StrictMode>
      <App config={devConfig} catalog={mockCatalog} />
    </React.StrictMode>,
  )
}
