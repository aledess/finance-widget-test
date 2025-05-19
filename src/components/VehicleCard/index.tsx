import { useNavigate } from 'react-router-dom'
import Button from '../Button'
import Chip from '../Chip'
import './styles.scss'

type VehicleCardProps = {
  id: string
  make: string
  model: string
  year: number
  price: number
  mileage: number
  imageUrl: string
  fuelType: string
  transmission: string
  monthlyPayment: number
  duration?: number
  mileagePerYear?: number
  extraTags?: string[]
  order?: number
  onSimulateClick?: (vehicle: VehicleCardProps) => void
}

export default function VehicleCard(props: VehicleCardProps) {
  const { id, make, model, year, price, imageUrl, fuelType, transmission, monthlyPayment } = props

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
        <img src={imageUrl} alt={`${make} ${model}`} />
      </div>

      <div className="vehicle-card__content">
        <div className="vehicle-card__info">
          <h3 className="vehicle-card__title">
            {make} {model} <span className="vehicle-card__year">({year})</span>
          </h3>

          <div className="vehicle-card__price">
            <span className="price">€ {price.toLocaleString()}</span>
            <span className="monthly">or € {monthlyPayment}/month</span>
          </div>

          <div className="vehicle-card__chips">
            <Chip label={fuelType} />
            <Chip label={transmission} />
          </div>
        </div>

        <div className="vehicle-card__footer">
          <Button onClick={handleSimulate}>Simulate</Button>
        </div>
      </div>
    </div>
  )
}
