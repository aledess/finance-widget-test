import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/main-styles.scss'
import { mockCatalog } from './mock/catalog'

const mount = document.getElementById('root')

if (mount) {
  const devConfig = {
    lang: 'it',
  }

  // ❓ Vuoi testare con override colori? Imposta o lascia null
  type StyleConfig = {
    primaryColor?: string
    secondaryColor?: string
    tertiaryColor?: string
    fontFamily?: string
  }

  const styleConfig: StyleConfig | undefined = {
    primaryColor: 'yellow',
    secondaryColor: 'yellow',
    tertiaryColor: 'yellow',
  }

  if (styleConfig) {
    const { primaryColor, secondaryColor, tertiaryColor, fontFamily } = styleConfig

    const styleVars = document.createElement('style')
    styleVars.textContent = `
      :root {
        ${primaryColor ? `--primary-color: ${primaryColor};` : ''}
        ${secondaryColor ? `--secondary-color: ${secondaryColor};` : ''}
        ${tertiaryColor ? `--tertiary-color: ${tertiaryColor};` : ''}
        ${fontFamily ? `--font-family: ${fontFamily};` : ''}
      }
    `
    document.head.appendChild(styleVars)
  }

  createRoot(mount).render(
    <React.StrictMode>
      <App config={devConfig} catalog={mockCatalog} />
    </React.StrictMode>,
  )
}
