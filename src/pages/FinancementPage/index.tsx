// src/pages/FinancementPage/index.tsx
import { useState } from 'react'
import { UserRound, Building2 } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import FinancingTabs from '../../components/FinancingTabs'
import SliderPanel from '../../components/Financing/SliderPanel'
import OfferInfoBox from '../../components/Financing/OfferInfoBox'
import OfferOptions from '../../components/Financing/OfferOptions'
import OfferFooterActions from '../../components/Financing/OfferFooterActions'
import OfferDescriptionBox from '../../components/Financing/OfferDescriptionBox'
import Modal from '../../components/Modal'

import './styles.scss'

const RESET_ALL = false

type Offer = {
  title: string
  price: number
  details: string
  options: string[]
  redemptionValue?: number
  apport: number
  duree: number
  kmAn: number
}

export default function FinancementPage() {
  const [selectedProfile, setSelectedProfile] = useState<'private' | 'company' | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [showModal, setShowModal] = useState(false)
  const [alignTargetIndex, setAlignTargetIndex] = useState<number | null>(null)

  const [offersPrivate, setOffersPrivate] = useState<Offer[]>([
    {
      title: 'Crédit Start',
      price: 299,
      details: 'Le prêt auto particulier',
      options: ['Extension de garantie', 'Maintenance'],
      apport: 5000,
      duree: 36,
      kmAn: 10000,
    },
    {
      title: 'Crédit bail',
      price: 311,
      details: 'Le prêt auto particulier',
      options: ['Extension de garantie', 'Maintenance'],
      apport: 5000,
      duree: 36,
      kmAn: 10000,
    },
    {
      title: 'Location Liberté',
      price: 345,
      details: 'Le prêt auto particulier',
      options: ['Extension de garantie', 'Maintenance'],
      apport: 5000,
      duree: 36,
      kmAn: 10000,
    },
  ])

  const [offersCompany, setOffersCompany] = useState<Offer[]>([
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
      apport: 5000,
      duree: 36,
      kmAn: 10000,
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
      apport: 5000,
      duree: 36,
      kmAn: 10000,
    },
  ])

  const offers = selectedProfile === 'company' ? offersCompany : offersPrivate
  const setOffers = selectedProfile === 'company' ? setOffersCompany : setOffersPrivate
  const currentOffer = offers[activeIndex]
  const currentOptions = currentOffer?.options || []

  const handleProfileSelect = (profile: 'private' | 'company') => {
    setSelectedProfile(profile)
    setActiveIndex(0)
    setSelectedOptions([])
  }

  const handleReset = () => {
    setOffers((prev) => {
      const updated = [...prev]

      if (RESET_ALL) {
        return updated.map((offer) => ({
          ...offer,
          apport: 5000,
          duree: 36,
          kmAn: 10000,
        }))
      } else {
        updated[activeIndex] = {
          ...updated[activeIndex],
          apport: 5000,
          duree: 36,
          kmAn: 10000,
        }
        return updated
      }
    })
  }

  const updateSliderValue = (key: 'apport' | 'duree' | 'kmAn', value: number) => {
    setOffers((prev) =>
      prev.map((offer, idx) => (idx === activeIndex ? { ...offer, [key]: value } : offer)),
    )
  }

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
            offers={offers.map((offer) => ({
              ...offer,
              subtitle: `${offer.price}€/mois TTC`,
            }))}
            activeIndex={activeIndex}
            onChange={setActiveIndex}
          />

          <div className="finance-layout">
            <div className="side-by-side">
              <SliderPanel
                apport={currentOffer.apport}
                duree={currentOffer.duree}
                kmAn={currentOffer.kmAn}
                onChangeApport={(val) => updateSliderValue('apport', val)}
                onChangeDuree={(val) => updateSliderValue('duree', val)}
                onChangeKmAn={(val) => updateSliderValue('kmAn', val)}
                onReset={handleReset}
                offers={offers}
                currentIndex={activeIndex}
                alignTargetIndex={alignTargetIndex}
                setAlignTargetIndex={setAlignTargetIndex}
              />

              <OfferOptions
                options={currentOptions}
                selectedOptions={selectedOptions}
                onToggleOption={(label) => {
                  setSelectedOptions((prev) =>
                    prev.includes(label) ? prev.filter((o) => o !== label) : [...prev, label],
                  )
                }}
                onSelectAll={() => setSelectedOptions([...currentOptions])}
                onReset={() => setSelectedOptions([])}
              />
            </div>

            <div className="offer-summary">
              <OfferDescriptionBox />
              <OfferInfoBox {...currentOffer} onInfoClick={() => setShowModal(true)} />
              <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
                title="Détails de l'offre"
              >
                <p>Contenu de la modale avec les détails de l’offre...</p>
              </Modal>
            </div>
          </div>

          <div className="offer-bottom-row">
            <OfferFooterActions />
          </div>
        </div>
      )}
    </div>
  )
}
