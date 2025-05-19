import { createRoot } from 'react-dom/client'
import App from './App'
// @ts-ignore
import mainStyles from './styles/main-styles.scss?inline'

class FinanceWidget extends HTMLElement {
  private mount: HTMLDivElement | null = null
  private config: any = {}
  private catalog: any = undefined
  private isRendered = false

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static get observedAttributes() {
    return ['catalog']
  }

  connectedCallback() {
    if (!this.shadowRoot) return

    this.mount = document.createElement('div')
    this.mount.id = 'root'
    this.shadowRoot.appendChild(this.mount)

    this.readAttributes()

    const globalStyle = document.createElement('style')
    globalStyle.textContent = mainStyles
    this.shadowRoot.prepend(globalStyle)

    const vars = document.createElement('style')
    vars.textContent = `
      :host {
        --primary-color: ${this.config.primaryColor || '#A0D7A2'};
        --secondary-color: ${this.config.secondaryColor || '#308276'};
        --tertiary-color: ${this.config.tertiaryColor || '#E30071'};
        --font-family: ${this.config.font || 'Inter, sans-serif'};
      }
    `
    this.shadowRoot.prepend(vars)

    // renderApp solo se catalog non è previsto o già presente
    if (!this.hasAttribute('catalog') || this.catalog) {
      this.renderApp()
    }
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    if (name === 'catalog' && newValue) {
      try {
        this.catalog = JSON.parse(newValue)
        this.renderApp()
      } catch (err) {
        console.warn('[FinanceWidget] Invalid JSON in catalog:', err)
      }
    }
  }

  private readAttributes() {
    // Config base
    this.config = {
      lang: this.getAttribute('lang') || 'it',
      brand: this.getAttribute('brand') || 'default',
      theme: this.getAttribute('theme') || 'light',
    }

    // Config JSON avanzato
    const configAttr = this.getAttribute('config')
    if (configAttr) {
      try {
        this.config = { ...this.config, ...JSON.parse(configAttr) }
      } catch (err) {
        console.warn('[FinanceWidget] Invalid JSON in config:', err)
      }
    }

    // Style
    const styleAttr = this.getAttribute('style')
    if (styleAttr) {
      try {
        const styleConfig = JSON.parse(styleAttr)
        this.config = { ...this.config, ...styleConfig }
      } catch (err) {
        console.warn('[FinanceWidget] Invalid JSON in style attribute:', err)
      }
    }

    // Catalog statico (se già presente all'inizio)
    const catalogAttr = this.getAttribute('catalog')
    if (catalogAttr) {
      try {
        this.catalog = JSON.parse(catalogAttr)
      } catch (err) {
        console.warn('[FinanceWidget] Invalid JSON in catalog attribute:', err)
      }
    }
  }

  private renderApp() {
    if (!this.mount || this.isRendered) return
    this.isRendered = true

    createRoot(this.mount).render(<App config={this.config} catalog={this.catalog} />)
  }
}

customElements.define('finance-widget', FinanceWidget)
