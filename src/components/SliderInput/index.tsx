import './styles.scss'
import { Minus, Plus } from 'lucide-react'

type SliderInputProps = {
  label: string
  unit: string
  min: number
  max: number
  step: number
  value: number
  onChange: (value: number) => void
}

export default function SliderInput({
  label,
  unit,
  min,
  max,
  step,
  value,
  onChange,
}: SliderInputProps) {
  const handleDecrease = () => {
    const newValue = Math.max(min, value - step)
    onChange(newValue)
  }

  const handleIncrease = () => {
    const newValue = Math.min(max, value + step)
    onChange(newValue)
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value))
  }

  return (
    <div className="slider-input">
      <div className="slider-input__label">
        <span>{label}</span>
        <span>
          {value.toLocaleString()} {unit}
        </span>
      </div>
      <div className="slider-input__control">
        <button type="button" onClick={handleDecrease} className="slider-input__btn">
          <Minus size={16} />
        </button>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSliderChange}
        />
        <button type="button" onClick={handleIncrease} className="slider-input__btn">
          <Plus size={16} />
        </button>
      </div>
    </div>
  )
}
