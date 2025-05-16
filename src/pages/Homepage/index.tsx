import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'

export default function Home() {
  const [selected, setSelected] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleNext = () => {
    if (selected) {
      navigate('/vehicle')
    }
  }

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Simula il tuo finanziamento</h1>
      <p className={styles.subtitle}>Seleziona il tuo profilo per iniziare la simulazione:</p>

      <div className={styles.cardGrid}>
        <label className={styles.card}>
          <input
            type="radio"
            name="profile"
            value="particulier"
            checked={selected === 'particulier'}
            onChange={() => setSelected('particulier')}
          />
          <div className={styles.cardContent}>
            <h2>Particulier</h2>
            <p>Per clienti privati e uso personale.</p>
          </div>
        </label>

        <label className={styles.card}>
          <input
            type="radio"
            name="profile"
            value="business"
            checked={selected === 'business'}
            onChange={() => setSelected('business')}
          />
          <div className={styles.cardContent}>
            <h2>Business</h2>
            <p>Per aziende, liberi professionisti e flotte.</p>
          </div>
        </label>
      </div>

      <button className={styles.button} onClick={handleNext} disabled={!selected}>
        Avanti
      </button>
    </section>
  )
}
