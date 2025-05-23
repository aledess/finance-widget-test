// OfferOptions.tsx
import Checkbox from '../../Checkbox'
import { CheckSquare, SquareX } from 'lucide-react'

import './styles.scss'

type Props = {
  options?: string[]
  selectedOptions: string[]
  onToggleOption: (label: string) => void
  onSelectAll?: () => void
  onReset?: () => void
}
export default function OfferOptions({
  options = [],
  selectedOptions,
  onToggleOption,
  onSelectAll,
  onReset,
}: Props) {
  return (
    <div className="offer-options-box">
      <div className="options-header">
        <h4>Vos options disponibles :</h4>
        <div className="options-actions">
          <button onClick={onSelectAll} title="Tout cocher">
            <CheckSquare size={16} />
          </button>
          <button onClick={onReset} title="Tout décocher">
            <SquareX size={16} />
          </button>
        </div>
      </div>

      <ul className="options-list">
        {options.map((opt) => (
          <li key={opt}>
            <Checkbox
              label={opt}
              checked={selectedOptions.includes(opt)}
              onChange={() => onToggleOption(opt)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
