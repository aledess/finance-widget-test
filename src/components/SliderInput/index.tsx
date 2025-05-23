// src/components/SliderInput/index.tsx
import { Minus, Plus } from 'lucide-react'
import './styles.scss'

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
  return (
    <div className="slider-input">
      <div className="slider-input__label">
        <span>{label}</span>
        <span>
          {value.toLocaleString()} {unit}
        </span>
      </div>
      <div className="slider-input__control">
        <Minus size={16} />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <Plus size={16} />
      </div>
    </div>
  )
}
