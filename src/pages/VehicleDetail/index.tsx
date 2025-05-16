import { useParams, useNavigate, Link } from 'react-router-dom'

export default function VehicleDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div>
      <h2>Dettaglio veicolo {id}</h2>
      <button onClick={() => navigate(-1)}>Indietro</button>
      <Link to="/submit">Procedi</Link>
    </div>
  )
}
