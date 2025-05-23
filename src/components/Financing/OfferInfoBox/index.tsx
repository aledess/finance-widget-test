import { Info } from 'lucide-react'
import Button from '../../Button'
import './styles.scss'

export type OfferInfoBoxProps = {
  title: string
  price: number
  details: string
  redemptionValue?: number
}

export default function OfferInfoBox({
  title,
  price,
  details,
  redemptionValue,
}: OfferInfoBoxProps) {
  const handleInfoClick = () => {
    alert('Modale informativa (sostituibile con componente)')
  }

  const handleRecalculate = () => {
    console.log('Récalculer clicked')
  }

  return (
    <div className="offer-info-box">
      <div className="offer-info-main">
        <div className="offer-title">
          <h3>{title}</h3>
          <button className="info-button" onClick={handleInfoClick} title="Info">
            <Info size={18} />
          </button>
        </div>
        <p className="offer-price">
          {price}€ <span className="offer-price-sub">/mois TTC</span>
        </p>
        <p className="offer-details">{details}</p>
        {redemptionValue !== undefined && (
          <p className="offer-redemption">
            <strong>Valeur de rachat :</strong> {redemptionValue}€ TTC
          </p>
        )}
      </div>

      <div className="offer-recalc">
        <Button variant="secondary" onClick={handleRecalculate}>
          RÉCALCULER
        </Button>
      </div>
    </div>
  )
}
