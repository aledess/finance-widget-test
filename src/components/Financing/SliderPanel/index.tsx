// src/components/Financing/SliderPanel.tsx
import SliderInput from '../../SliderInput'
import Button from '../../Button'
import Select from '../../Select'
import { RefreshCcw } from 'lucide-react'
import './styles.scss'

type Offer = {
  title: string
  apport: number
  duree: number
  kmAn: number
}

type Props = {
  apport: number
  duree: number
  kmAn: number
  onChangeApport: (val: number) => void
  onChangeDuree: (val: number) => void
  onChangeKmAn: (val: number) => void
  onReset: () => void
  offers: Offer[]
  currentIndex: number
  alignTargetIndex: number | null
  setAlignTargetIndex: (index: number | null) => void
}

export default function SliderPanel({
  apport,
  duree,
  kmAn,
  onChangeApport,
  onChangeDuree,
  onChangeKmAn,
  onReset,
  offers,
  currentIndex,
  alignTargetIndex,
  setAlignTargetIndex,
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
          <Select
            options={offers.map((o, index) => ({ label: o.title, value: index }))}
            value={alignTargetIndex ?? undefined}
            placeholder="ALIGN"
            disabledValue={currentIndex}
            onChange={(targetIndex) => {
              const index = Number(targetIndex)
              const target = offers[index]
              onChangeApport(target.apport)
              onChangeDuree(target.duree)
              onChangeKmAn(target.kmAn)
              setAlignTargetIndex(null)
            }}
          />
        </div>
      </div>
    </div>
  )
}
