// src/components/SliderInput/index.tsx
import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import './styles.scss'

type SliderInputProps = {
  label: string
  unit: string
  min: number
  max: number
  step: number
  defaultValue?: number
  onChange?: (value: number) => void
}

export default function SliderInput({
  label,
  unit,
  min,
  max,
  step,
  defaultValue = min,
  onChange,
}: SliderInputProps) {
  const [value, setValue] = useState(defaultValue)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    setValue(newValue)
    onChange?.(newValue)
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
        <Minus size={16} />
        <input type="range" min={min} max={max} step={step} value={value} onChange={handleChange} />
        <Plus size={16} />
      </div>
    </div>
  )
}
