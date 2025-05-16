export {}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'finance-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        config?: string
        lang?: string
        brand?: string
        theme?: string
      }
    }
  }
}
