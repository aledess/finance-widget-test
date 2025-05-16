import { Link, useNavigate } from 'react-router-dom'
export default function VehicleList() {
  const navigate = useNavigate()

  return (
    <div>
      <h2>Veicoli disponibili</h2>
      <ul>
        <li>
          <Link to="/vehicle/1">Veicolo 1</Link>
        </li>
        <li>
          <Link to="/vehicle/2">Veicolo 2</Link>
        </li>
      </ul>
      <button onClick={() => navigate(-1)}>Indietro</button>
    </div>
  )
}
