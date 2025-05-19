import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles.scss'

export default function Home() {
  const [selected, setSelected] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleNext = () => {
    if (selected) {
      navigate('/vehicle')
    }
  }

  return (
    <section className="wrapper">
      <h1 className="title">Simula il tuo finanziamento</h1>
      <p className="subtitle">Seleziona il tuo profilo per iniziare la simulazione:</p>

      <div className="card-grid">
        <label className="card">
          <input
            type="radio"
            name="profile"
            value="particulier"
            checked={selected === 'particulier'}
            onChange={() => setSelected('particulier')}
          />
          <div className="card-content">
            <h2>Particulier</h2>
            <p>Per clienti privati e uso personale.</p>
          </div>
        </label>

        <label className="card">
          <input
            type="radio"
            name="profile"
            value="business"
            checked={selected === 'business'}
            onChange={() => setSelected('business')}
          />
          <div className="card-content">
            <h2>Business</h2>
            <p>Per aziende, liberi professionisti e flotte.</p>
          </div>
        </label>
      </div>

      <button className="button" onClick={handleNext} disabled={!selected}>
        Avanti
      </button>
    </section>
  )
}
