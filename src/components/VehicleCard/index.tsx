import { useNavigate } from 'react-router-dom'
import Button from '../Button'
import Chip from '../Chip'
import './styles.scss'

type ChipItem = {
  key: string
  label: string
}

type DetailItem = {
  label: string
  value: string
}

type VehicleCardProps = {
  id: string
  vehicleBrand: string
  vehicleModel: string
  vehicleVersion: string
  chipData?: ChipItem[]
  detailsData?: DetailItem[]
  imageUrl: string
  offerMonthlyInstalment: number
  vehicleListPrice: number
  onSimulateClick?: (vehicle: VehicleCardProps) => void
}

export default function VehicleCard(props: VehicleCardProps) {
  const {
    id,
    vehicleBrand,
    vehicleModel,
    vehicleVersion,
    imageUrl,
    chipData,
    detailsData,
    vehicleListPrice,
    offerMonthlyInstalment,
  } = props

  const navigate = useNavigate()

  const handleSimulate = () => {
    if (props.onSimulateClick) {
      props.onSimulateClick(props)
    } else {
      navigate(`/vehicle/${id}`, { state: props })
    }
  }

  return (
    <div className="vehicle-card">
      <div className="vehicle-card__image">
        <img src={imageUrl} alt={`${vehicleBrand} ${vehicleModel}`} />
      </div>

      <div className="vehicle-card__content">
        <div className="vehicle-card__info">
          <h3 className="vehicle-card__title">
            {vehicleBrand} {vehicleModel}
          </h3>
          <p className="vehicle-card__version">{vehicleVersion}</p>

          <div className="vehicle-card__chips">
            {chipData?.map((chip) => <Chip key={chip.key} label={chip.label} />)}
          </div>

          <div className="vehicle-card__details">
            {detailsData?.map((detail, index) => (
              <div key={index} className="vehicle-card__details-row">
                <span className="vehicle-card__details-label">{detail.label}:</span>
                <span className="vehicle-card__details-value">{detail.value}</span>
              </div>
            ))}
          </div>

          <div className="vehicle-card__price">
            <span className="price">
              {typeof vehicleListPrice === 'number'
                ? `€ ${vehicleListPrice.toLocaleString()}`
                : '—'}
            </span>

            <span className="monthly">
              {typeof offerMonthlyInstalment === 'number'
                ? `or € ${offerMonthlyInstalment.toFixed(2)}/month`
                : ''}
            </span>
          </div>
        </div>

        <div className="vehicle-card__footer">
          <Button onClick={handleSimulate}>Simulate</Button>
        </div>
      </div>
    </div>
  )
}
