import { useLocation } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'

export default function VehicleDetail() {
  const { state } = useLocation()
  const data = state

  if (!data) {
    return <p>Dati non disponibili</p>
  }

  return (
    <div style={{ padding: '1rem' }}>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: `${data.make} ${data.model}` }, // pagina corrente
        ]}
      />

      <img src={data.imageUrl} alt={`${data.make} ${data.model}`} style={{ maxWidth: '100%' }} />
      <p>
        <strong>Price:</strong> €{data.price.toLocaleString()}
      </p>
      <p>
        <strong>Monthly:</strong> €{data.monthlyPayment}
      </p>
      <p>
        <strong>Fuel:</strong> {data.fuelType}
      </p>
      <p>
        <strong>Transmission:</strong> {data.transmission}
      </p>
      {data.extraTags?.length > 0 && (
        <ul>
          {data.extraTags.map((tag: string, i: number) => (
            <li key={i}>{tag}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
