import './styles.scss'
import Button from '../../Button' // importa il tuo Button

type Props = {
  onClick?: () => void
}

export default function OfferFooterActions({ onClick }: Props) {
  return (
    <div className="offer-footer-actions">
      <Button variant="primary" onClick={onClick}>
        RECEVOIR L'OFFRE
      </Button>
    </div>
  )
}
