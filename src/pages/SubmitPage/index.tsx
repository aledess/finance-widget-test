import { useNavigate } from 'react-router-dom'

export default function SubmitPage() {
  const navigate = useNavigate()

  return (
    <div>
      <h2>Simulazione inviata!</h2>
      <button onClick={() => navigate(-1)}>🔙 Torna indietro</button>
    </div>
  )
}
