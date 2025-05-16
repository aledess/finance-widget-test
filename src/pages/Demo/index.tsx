import '../../WidgetElement' // importa e registra il custom element

export default function Demo() {
  return (
    <main style={{ padding: '2rem' }}>
      <h2>Live preview widget</h2>
      <finance-widget config='{"lang":"fr","brand":"fiat","theme":"dark"}'></finance-widget>
    </main>
  )
}
