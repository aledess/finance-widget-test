import { createRoot } from 'react-dom/client'
import App from './App'

class FinanceWidget extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    if (!this.shadowRoot || this.shadowRoot.querySelector('#root')) return

    const mount = document.createElement('div')
    mount.id = 'root'
    this.shadowRoot.appendChild(mount)

    requestAnimationFrame(() => {
      const styles = Array.from(document.head.querySelectorAll('style'))
      const injectedStyle = styles.find((s) => s.textContent?.includes('._wrapper_'))

      if (injectedStyle && this.shadowRoot) {
        this.shadowRoot.prepend(injectedStyle.cloneNode(true))
        injectedStyle.remove() // opzionale
      }
    })

    createRoot(mount).render(<App />)
  }
}

customElements.define('finance-widget', FinanceWidget)
