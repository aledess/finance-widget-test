// src/components/Financing/SliderPanel.tsx
import SliderInput from '../../SliderInput'
import Button from '../../Button'
import './styles.scss'
import { RefreshCcw, SlidersHorizontal } from 'lucide-react'

type Props = {
  apport: number
  duree: number
  kmAn: number
  onChangeApport: (val: number) => void
  onChangeDuree: (val: number) => void
  onChangeKmAn: (val: number) => void
  onReset: () => void
  onAlign: () => void
}

export default function SliderPanel({
  apport,
  duree,
  kmAn,
  onChangeApport,
  onChangeDuree,
  onChangeKmAn,
  onReset,
  onAlign,
}: Props) {
  return (
    <div className="slider-panel">
      <div className="slider-layout">
        <div className="sliders-group">
          <SliderInput
            label="Apport"
            unit="€"
            min={0}
            max={30000}
            step={500}
            value={apport}
            onChange={onChangeApport}
          />
          <SliderInput
            label="Durée"
            unit="mois"
            min={12}
            max={60}
            step={1}
            value={duree}
            onChange={onChangeDuree}
          />
          <SliderInput
            label="Km/an"
            unit="Km"
            min={5000}
            max={30000}
            step={1000}
            value={kmAn}
            onChange={onChangeKmAn}
          />
        </div>

        <div className="sliders-actions">
          <Button size="small" outline onClick={onReset}>
            <RefreshCcw size={14} />
            RESET
          </Button>
          <Button size="small" outline onClick={onAlign}>
            <SlidersHorizontal size={14} />
            ALIGN
          </Button>
        </div>
      </div>
    </div>
  )
}
