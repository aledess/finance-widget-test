import { createRoot } from 'react-dom/client'
import App from './App' // ✅ torna ad usare direttamente App
import './index.css' // ✅ assicurati che venga incluso lo stile

class FinanceWidget extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    if (!this.shadowRoot) return

    let mount = this.shadowRoot.querySelector('#root')
    if (mount) return

    mount = document.createElement('div')
    mount.id = 'root'
    this.shadowRoot.appendChild(mount)

    // Inject style if needed (facoltativo)
    requestAnimationFrame(() => {
      const styles = Array.from(document.head.querySelectorAll('style'))
      const injectedStyle = styles.find((s) => s.textContent?.includes('._wrapper_'))

      if (injectedStyle && this.shadowRoot) {
        this.shadowRoot.prepend(injectedStyle.cloneNode(true))
        injectedStyle.remove()
      }
    })

    // Config
    let config = {
      lang: this.getAttribute('lang') || 'it',
      brand: this.getAttribute('brand') || 'default',
      theme: this.getAttribute('theme') || 'light',
    }

    const configAttr = this.getAttribute('config')
    if (configAttr) {
      try {
        config = { ...config, ...JSON.parse(configAttr) }
      } catch (err) {
        console.warn('[FinanceWidget] Invalid JSON in config:', err)
      }
    }

    createRoot(mount).render(<App config={config} />)
  }
}

customElements.define('finance-widget', FinanceWidget)
