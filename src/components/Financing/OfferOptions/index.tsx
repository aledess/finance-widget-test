// OfferOptions.tsx
import { useState } from 'react'
import Checkbox from '../../Checkbox'
import { CheckSquare, SquareX, Info } from 'lucide-react'
import Modal from '../../Modal'

import './styles.scss'

type Option = {
  label: string
  price: number
}

type Props = {
  options?: Option[]
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
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<Option | null>(null)

  const handleInfoClick = (option: Option) => {
    setModalContent(option)
    setModalOpen(true)
  }

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
          <li key={opt.label} className="option-item">
            <div className="option-content">
              <Checkbox
                label={
                  <>
                    {opt.label} <span className="option-price">(+{opt.price}€)</span>
                  </>
                }
                checked={selectedOptions.includes(opt.label)}
                onChange={() => onToggleOption(opt.label)}
              />
              <button
                className="option-info-button"
                title="Détails de l'option"
                onClick={() => handleInfoClick(opt)}
              >
                <Info size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={modalContent?.label}>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Cette option ajoute des fonctionnalités supplémentaires.</p>
        <p>Coût supplémentaire : {modalContent?.price}€</p>
      </Modal>
    </div>
  )
}
