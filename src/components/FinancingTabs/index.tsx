// src/components/FinancingTabs/index.tsx
import './styles.scss'

type TabOffer = {
  title: string
  subtitle: string
}

type FinancingTabsProps = {
  offers: TabOffer[]
  activeIndex: number
  onChange: (index: number) => void
}

export default function FinancingTabs({ offers, activeIndex, onChange }: FinancingTabsProps) {
  return (
    <div className="financing-tabs">
      <div className="financing-tabs__nav">
        {offers.map((offer, index) => (
          <button
            key={index}
            className={`financing-tabs__tab ${index === activeIndex ? 'active' : ''}`}
            onClick={() => onChange(index)}
          >
            <span className="title">{offer.title}</span>
            <span className="subtitle">{offer.subtitle}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
