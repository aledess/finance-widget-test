// src/pages/FinancementPage/index.tsx
import { useState, useRef, useEffect } from 'react'
import { UserRound, Building2 } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import Accordion from '../../components/Accordion'
import type { AccordionRef } from '../../components/Accordion/types'
import './styles.scss'
import FinancingTabs from '../../components/FinancingTabs'
import SliderInput from '../../components/SliderInput'
import FinancingOffer from '../../components/FinancingOffer'

export default function FinancementPage() {
  const [selectedProfile, setSelectedProfile] = useState<'private' | 'company' | null>(null)
  const accordionRef = useRef<AccordionRef>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const [apport, setApport] = useState(5000)
  const [duree, setDuree] = useState(36)
  const [kmAn, setKmAn] = useState(10000)

  const offersPrivate = [
    {
      title: 'Crédit Start',
      price: 299,
      details: 'Le prêt auto particulier',
      options: ['Extension de garantie', 'Maintenance'],
    },
    {
      title: 'Crédit bail',
      price: 311,
      details: 'Le prêt auto particulier',
      options: ['Extension de garantie', 'Maintenance'],
    },
    {
      title: 'Location Liberté',
      price: 345,
      details: 'Le prêt auto particulier',
      options: ['Extension de garantie', 'Maintenance'],
    },
  ]

  const offersCompany = [
    {
      title: 'Crédit bail Pro',
      price: 997,
      details: "Une option d'achat maîtrisée",
      redemptionValue: 6321,
      options: [
        'Assurance décès invalidité',
        'Garantie valeur',
        'Extension de garantie',
        'Maintenance',
      ],
    },
    {
      title: 'Crédit Start Pro',
      price: 1099,
      details: 'Le prêt auto starterre',
      options: [
        'Assurance décès invalidité',
        'Garantie valeur',
        'Extension de garantie',
        'Maintenance',
      ],
    },
  ]

  const offersToShow = selectedProfile === 'company' ? offersCompany : offersPrivate

  const handleProfileSelect = (profile: 'private' | 'company') => {
    setSelectedProfile(profile)
    setActiveIndex(0) // reset index when profile changes
  }

  useEffect(() => {
    if (selectedProfile && accordionRef.current) {
      accordionRef.current.open()
    }
  }, [selectedProfile])

  return (
    <div className="financement-page">
      <PageHeader breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Financement' }]} />
      <h1>Sélectionnez votre profil</h1>
      <div className="profile-options">
        <div
          className={`profile-card ${selectedProfile === 'private' ? 'selected' : ''}`}
          onClick={() => handleProfileSelect('private')}
        >
          <UserRound size={48} />
          <h2>Usage privé</h2>
          <p>Particulier ou professionnel pour un usage privé</p>
        </div>
        <div
          className={`profile-card ${selectedProfile === 'company' ? 'selected' : ''}`}
          onClick={() => handleProfileSelect('company')}
        >
          <Building2 size={48} />
          <h2>Usage professionnel</h2>
          <p>Professionnel pour un usage professionnel</p>
        </div>
      </div>

      {selectedProfile && (
        <div className="offers-section">
          <h2>Offres et options disponibles</h2>
          <FinancingTabs
            offers={offersToShow.map((offer) => ({
              ...offer,
              subtitle: `${offer.price}€/mois TTC`,
            }))}
            activeIndex={activeIndex}
            onChange={setActiveIndex}
          />
          <div className="sliders">
            <SliderInput
              label="Apport"
              unit="€"
              min={0}
              max={30000}
              step={500}
              defaultValue={apport}
              onChange={setApport}
            />
            <SliderInput
              label="Durée"
              unit="mois"
              min={12}
              max={60}
              step={1}
              defaultValue={duree}
              onChange={setDuree}
            />
            <SliderInput
              label="Km/an"
              unit="Km"
              min={5000}
              max={30000}
              step={1000}
              defaultValue={kmAn}
              onChange={setKmAn}
            />
          </div>

          <FinancingOffer {...offersToShow[activeIndex]} />
        </div>
      )}
    </div>
  )
}
