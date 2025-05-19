import { useLocation } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import Button from '../../components/Button'
import { useState } from 'react'
import './styles.scss'

export default function VehicleDetail() {
  const { state } = useLocation()
  const data = state
  const [activeTab, setActiveTab] = useState(1)

  if (!data) return <p>Vehicle data not available.</p>

  return (
    <div className="vehicle-detail">
      <PageHeader
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: `${data.make} ${data.model}` }]}
      />

      <h1 className="vehicle-detail__title">
        {data.make} {data.model} ({data.year})
      </h1>

      <div className="vehicle-detail__main">
        {/* Left: images */}
        <div className="vehicle-detail__media">
          <div className="vehicle-detail__preview">
            <img src={data.imageUrl} alt="Main preview" />
          </div>
          <div className="vehicle-detail__thumbnails">
            {Array.from({ length: 5 }).map((_, i) => (
              <div className="vehicle-detail__thumb" key={i}>
                <img src={data.imageUrl} alt={`Thumbnail ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Right: info */}
        <div className="vehicle-detail__info">
          <p className="price">€ {data.price.toLocaleString()}</p>
          <p className="monthly">€ {data.monthlyPayment}/month</p>

          <Button>Request a quote</Button>
          <Button variant="tertiary">Talk to an advisor</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="vehicle-detail__tabs">
        <div className="vehicle-detail__tab-buttons">
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              className={`tab-button ${activeTab === n ? 'active' : ''}`}
              onClick={() => setActiveTab(n)}
            >
              Offer {n}
            </button>
          ))}
        </div>

        <div className="vehicle-detail__tab-content">
          {activeTab === 1 && <p>Offer 1 details (e.g. standard financing plan)</p>}
          {activeTab === 2 && <p>Offer 2 details (e.g. leasing or flexible rates)</p>}
          {activeTab === 3 && <p>Offer 3 details (e.g. upfront payment promotion)</p>}
        </div>
      </div>
    </div>
  )
}
