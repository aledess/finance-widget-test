import '../../WidgetElement'

export default function Demo() {
  return (
    <main style={{ padding: '2rem' }}>
      <h2>Live preview widget</h2>
      <finance-widget lang="fr" brand="fiat" catalog={JSON.stringify(mockCatalog)}></finance-widget>
    </main>
  )
}
