import { createRoot } from 'react-dom/client'
import App from './App'
import mainStyles from './styles/main-styles.scss?inline'

class FinanceWidget extends HTMLElement {
  private mount: HTMLDivElement | null = null
  private config: any = {}
  private catalog: any = {}
  private styleConfig: any = {}
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
    this.injectCSSVariables()
    this.injectGlobalStyles()

    // Se il catalog è già disponibile al mount, renderizza subito
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
      lang: this.getAttribute('lang') || 'fr',
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

    // Style config
    const styleAttr = this.getAttribute('styleConfig')
    if (styleAttr) {
      try {
        this.styleConfig = JSON.parse(styleAttr)
      } catch (err) {
        console.warn('[FinanceWidget] Invalid JSON in styleConfig:', err)
      }
    }

    // Catalog (iniziale)
    const catalogAttr = this.getAttribute('catalog')
    if (catalogAttr) {
      try {
        this.catalog = JSON.parse(catalogAttr)
      } catch (err) {
        console.warn('[FinanceWidget] Invalid JSON in catalog:', err)
      }
    }
  }

  private injectGlobalStyles() {
    const style = document.createElement('style')
    style.textContent = mainStyles
    this.shadowRoot?.prepend(style)
  }

  private injectCSSVariables() {
    const vars = document.createElement('style')
    vars.textContent = `
    :host {
      --primary-color: ${this.styleConfig.primaryColor || '#308276'} !important;
      --secondary-color: ${this.styleConfig.secondaryColor || '#E30071'} !important;
      --tertiary-color: ${this.styleConfig.tertiaryColor || '#fefefe'} !important;
      --font-family: ${this.styleConfig.fontFamily || 'Inter, sans-serif'} !important;
    }
  `
    this.shadowRoot?.prepend(vars)
  }

  private renderApp() {
    if (!this.mount || this.isRendered) return
    this.isRendered = true

    createRoot(this.mount).render(<App config={this.config} catalog={this.catalog} />)
  }
}

customElements.define('finance-widget', FinanceWidget)
