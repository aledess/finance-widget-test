import './styles.scss'
import Checkbox from '../Checkbox'
import { CheckSquare, SquareX } from 'lucide-react'
import { useState } from 'react'

export type FinancingOfferProps = {
  title: string
  price: number
  details: string
  redemptionValue?: number
  options?: string[]
}

const FinancingOffer = ({
  title,
  price,
  details,
  redemptionValue,
  options = [],
}: FinancingOfferProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const toggleOption = (label: string) => {
    setSelectedOptions((prev) =>
      prev.includes(label) ? prev.filter((o) => o !== label) : [...prev, label],
    )
  }

  const handleSelectAll = () => {
    setSelectedOptions([...options])
  }

  const handleReset = () => {
    setSelectedOptions([])
  }

  return (
    <div className="financing-offer">
      <div className="financing-offer__container">
        <div className="financing-offer__info">
          <h3>{title}</h3>
          <p className="financing-offer__price">
            {price}€ <span className="financing-offer__price-sub">/mois TTC</span>
          </p>
          <p className="financing-offer__details">{details}</p>

          {redemptionValue !== undefined && (
            <p className="financing-offer__redemption">
              <strong>Valeur de rachat :</strong> {redemptionValue}€ TTC
            </p>
          )}

          <div className="financing-offer__description">
            <h4>Description du produit</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod, nunc at
              varius facilisis, justo felis pulvinar metus, sed efficitur massa lacus sed nulla.
            </p>
          </div>

          <div className="financing-offer__legal">
            <h4>Mentions légales</h4>
            <div className="financing-offer__legal-content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum, sapien
                id blandit posuere, nulla erat malesuada odio, nec lobortis nulla justo nec nulla
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum, sapien
                id blandit posuere, nulla erat malesuada odio, nec lobortis nulla justo nec nulla
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum, sapien
                id blandit posuere, nulla erat malesuada odio, nec lobortis nulla justo nec nulla
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum, sapien
                id blandit posuere, nulla erat malesuada odio, nec lobortis nulla justo nec nulla
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum, sapien
                id blandit posuere, nulla erat malesuada odio, nec lobortis nulla justo nec nulla
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum, sapien
                id blandit posuere, nulla erat malesuada odio, nec lobortis nulla justo nec nulla
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum, sapien
                id blandit posuere, nulla erat malesuada odio, nec lobortis nulla justo nec nulla
              </p>
            </div>
          </div>
        </div>

        {options.length > 0 && (
          <div className="financing-offer__options">
            <div className="financing-offer__options-header">
              <h4>Vos options disponibles :</h4>
              <div className="financing-offer__options-actions">
                <button onClick={handleSelectAll} title="Tout cocher">
                  <CheckSquare size={16} />
                </button>
                <button onClick={handleReset} title="Tout décocher">
                  <SquareX size={16} />
                </button>
              </div>
            </div>

            <ul className="financing-offer__options-list">
              {options.map((opt) => (
                <li key={opt}>
                  <Checkbox
                    label={opt}
                    checked={selectedOptions.includes(opt)}
                    onChange={() => toggleOption(opt)}
                  />
                </li>
              ))}
            </ul>

            <div className="financing-offer__options-buttons">
              <button className="cta-offer">RECEVOIR L'OFFRE</button>
              <button className="cta-recalc">RÉCALCULER</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FinancingOffer
