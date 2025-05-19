import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// ✅ Se NON è in un Web Component, montiamo App con una config mock
const mount = document.getElementById('root')

if (mount) {
  // fallback config solo per preview diretta (dev o Vercel)
  const devConfig = {
    lang: 'it',
    brand: 'fiat',
    theme: 'light',
  }

  createRoot(mount).render(
    <React.StrictMode>
      <App config={devConfig} />
    </React.StrictMode>,
  )
}
