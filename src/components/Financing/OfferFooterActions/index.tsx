import './styles.scss'

type Props = {
  onClick?: () => void
}

export default function OfferFooterActions({ onClick }: Props) {
  return (
    <div className="offer-footer-actions">
      <button className="cta-offer" onClick={onClick}>
        RECEVOIR L'OFFRE
      </button>
    </div>
  )
}
