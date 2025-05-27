// src/components/Financing/OfferInfoBox.tsx
import { Info } from 'lucide-react'
import Button from '../../Button'
import './styles.scss'

export type OfferInfoBoxProps = {
  title: string
  price: number
  details: string
  redemptionValue?: number
  onInfoClick?: () => void
}

export default function OfferInfoBox({
  title,
  price,
  details,
  onInfoClick,
  redemptionValue,
}: OfferInfoBoxProps) {
  return (
    <div className="offer-info-box">
      <div className="offer-column offer-recalc">
        <Button variant="secondary" onClick={() => console.log('Récalculer clicked')}>
          RÉCALCULER
        </Button>
      </div>

      <div className="offer-column offer-info-main">
        <div className="offer-title">
          <h3>{title}</h3>
        </div>

        <p className="offer-price">
          {price}€ <span className="offer-price-sub">/mois TTC</span>
          <button className="info-button" onClick={onInfoClick} title="Plus d’infos">
            <Info size={18} />
          </button>
        </p>

        <p className="offer-details">{details}</p>

        {redemptionValue !== undefined && (
          <p className="offer-redemption">
            <strong>Valeur de rachat :</strong> {redemptionValue}€ TTC
          </p>
        )}
      </div>
    </div>
  )
}
