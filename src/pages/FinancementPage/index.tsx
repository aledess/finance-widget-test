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

type Option = {
  label: string
  price: number
}

type Offer = {
  title: string
  price: number
  details: string
  options: Option[]
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
      options: [
        { label: 'Extension de garantie', price: 15 },
        { label: 'Maintenance', price: 20 },
      ],
      apport: 5000,
      duree: 36,
      kmAn: 10000,
    },
    {
      title: 'Crédit bail',
      price: 311,
      details: 'Le prêt auto particulier',
      options: [
        { label: 'Extension de garantie', price: 18 },
        { label: 'Maintenance', price: 22 },
      ],
      apport: 5000,
      duree: 36,
      kmAn: 10000,
    },
    {
      title: 'Location Liberté',
      price: 345,
      details: 'Le prêt auto particulier',
      options: [
        { label: 'Extension de garantie', price: 25 },
        { label: 'Maintenance', price: 28 },
      ],
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
        { label: 'Assurance décès invalidité', price: 30 },
        { label: 'Garantie valeur', price: 35 },
        { label: 'Extension de garantie', price: 40 },
        { label: 'Maintenance', price: 45 },
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
        { label: 'Assurance décès invalidité', price: 30 },
        { label: 'Garantie valeur', price: 35 },
        { label: 'Extension de garantie', price: 40 },
        { label: 'Maintenance', price: 45 },
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
                onSelectAll={() => setSelectedOptions(currentOptions.map((o) => o.label))}
                onReset={() => setSelectedOptions([])}
              />
            </div>

            <div className="offer-summary">
              <OfferDescriptionBox />
              <OfferInfoBox {...currentOffer} onInfoClick={() => setShowModal(true)} />
              <Modal open={showModal} onClose={() => setShowModal(false)} title="Legal Terms">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec odio nec augue
                  molestie porttitor id eu felis. Proin pellentesque sollicitudin tortor, nec
                  hendrerit eros feugiat a. Vivamus scelerisque consequat fermentum. Donec ut turpis
                  viverra, pharetra orci et, sagittis tortor. Curabitur et finibus nisi. Phasellus
                  mauris eros, pretium non urna nec, hendrerit consequat sem. Cras tincidunt at
                  turpis eu congue. Maecenas vel ante id nunc vehicula semper in nec nunc.
                  Suspendisse eu luctus felis. Sed non justo eu risus vehicula consectetur sit amet
                  in diam. Duis sed volutpat lectus, non maximus turpis. Praesent dignissim in nulla
                  ut cursus. Curabitur rhoncus magna at massa egestas gravida. Cras vitae sapien
                  tristique, auctor nisi quis, sagittis nisl. Sed ultricies, magna id interdum
                  vestibulum, nisl dolor commodo urna, ut dignissim risus augue eget nunc.
                  Suspendisse porta justo vel arcu maximus, eu scelerisque augue tempus. Sed
                  suscipit neque vitae rutrum tincidunt. Nullam quis neque et diam cursus feugiat.
                  Suspendisse orci ligula, accumsan nec arcu non, euismod posuere neque. Sed iaculis
                  rhoncus vulputate. Suspendisse potenti. Donec sodales condimentum dolor at
                  eleifend. Cras laoreet nisl non orci gravida, non imperdiet tortor imperdiet.
                  Etiam at neque justo. Nam efficitur vitae tellus vitae eleifend. In hac habitasse
                  platea dictumst. In vulputate neque tellus, eu sollicitudin mauris laoreet non.
                  Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                  himenaeos. Duis venenatis convallis massa, sit amet viverra orci luctus eu. Nulla
                  et ullamcorper dui. Donec sit amet molestie ligula. Aliquam condimentum eros nibh,
                  ac porta lorem rutrum sed. Proin tristique iaculis fringilla. Donec sem arcu,
                  mollis ac nunc a, ullamcorper sodales nisi. Proin a ex risus. Nam laoreet est sed
                  felis accumsan, vel volutpat mauris pretium. Mauris vitae elit eget eros
                  ullamcorper feugiat sed a tortor. Ut ac iaculis lectus. Ut vel orci lobortis,
                  congue massa vitae, tempor mauris. Mauris consectetur pellentesque maximus.
                  Vestibulum placerat viverra mi, et blandit sapien sagittis ac. Morbi non sapien at
                  tellus mollis ullamcorper ut vel lacus. Nulla facilisi. Interdum et malesuada
                  fames ac ante ipsum primis in faucibus. Sed malesuada, libero vel aliquam commodo,
                  elit dui scelerisque diam, et cursus tortor quam quis libero. Cras gravida mi quis
                  egestas tristique. Aliquam porta egestas ligula, in vestibulum augue sagittis ac.
                  Quisque iaculis luctus lobortis. Nulla sed magna eget elit posuere iaculis. Nulla
                  vulputate tellus non massa commodo, id malesuada sapien posuere. Pellentesque
                  cursus metus nibh, finibus fringilla diam ullamcorper sed. Quisque sed leo leo.
                  Vivamus ipsum nibh, sodales elementum placerat ac, sollicitudin quis mi. Quisque
                  mauris lectus, ultrices in erat eu, pharetra rutrum quam. Mauris eu eros
                  elementum, mollis nibh eleifend, auctor nulla. Suspendisse elementum molestie
                  metus, eu vulputate enim tempus id. Vestibulum sit amet mollis ligula. Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Nam sit amet turpis aliquet,
                  elementum magna sed, vehicula nunc. Proin urna lorem, dignissim sit amet tempus
                  at, auctor eu eros. Phasellus varius dignissim felis, sed porta ligula lobortis
                  quis. Duis est lorem, lacinia sit amet condimentum eget, aliquet sed diam. In
                  neque lectus, porta nec nibh ac, laoreet porta risus. Nullam ornare urna vitae
                  enim tempus tincidunt. Aliquam quis commodo elit, viverra sollicitudin dolor. Cras
                  luctus condimentum orci, vel vehicula neque mattis eu. Proin placerat luctus purus
                  id hendrerit. Morbi tincidunt tincidunt sem vitae auctor. Suspendisse potenti.
                  Donec efficitur ligula a malesuada lobortis. Phasellus facilisis metus ac quam
                  tempus, a sollicitudin mauris congue. Cras porta est vel tempus dapibus. Phasellus
                  mollis libero quis odio finibus, eu dictum ex scelerisque. Aliquam in elit ornare,
                  ullamcorper felis sit amet, molestie dui. Aliquam bibendum felis sit amet ornare
                  ornare. Mauris non rutrum elit. Duis lobortis neque ut posuere malesuada. Sed
                  semper sed nulla a vehicula. Cras sed urna quis lectus pretium accumsan in at est.
                  Nunc erat neque, lacinia in mattis ut, ultrices at purus. Vestibulum facilisis
                  augue vitae lacus ultricies congue. Curabitur in hendrerit diam, ut commodo felis.
                  Nam diam libero, pretium convallis ante non, vestibulum maximus felis. Nulla
                  commodo sapien vel arcu tincidunt eleifend. Mauris interdum diam est, ac feugiat
                  ipsum pellentesque maximus. Sed quis porttitor enim. Nullam in enim nec ex
                  eleifend imperdiet quis et sem. Vestibulum sapien arcu, vehicula at ullamcorper
                  ut, facilisis et risus. Nulla facilisi. Aliquam accumsan neque in magna aliquet,
                  id fermentum neque varius. Cras dignissim mi felis, eget volutpat lectus congue
                  ac. Quisque bibendum erat id est tincidunt, id lobortis velit fringilla.
                  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
                  turpis egestas. Sed felis orci, ullamcorper vitae sagittis sed, dictum vitae
                  mauris. Praesent vitae ipsum at dolor tempus hendrerit porttitor id mi. Maecenas
                  in nunc at tortor aliquam tempus sed quis nulla. Orci varius natoque penatibus et
                  magnis dis parturient montes, nascetur ridiculus mus. Nullam vestibulum euismod
                  lacus eget cursus. Quisque quis nisl maximus, sodales ante eu, scelerisque ligula.
                  Proin at urna malesuada, interdum orci sit amet, efficitur nisl. Nullam fringilla
                  leo nibh. Aenean nec dictum nisi, in varius justo. Maecenas vulputate accumsan
                  lacus, venenatis ullamcorper metus vestibulum a. Maecenas rhoncus, purus eu
                  placerat congue, dolor purus fringilla mi, quis suscipit nulla odio consectetur
                  lorem. Suspendisse interdum enim at diam pretium semper. Aenean condimentum
                  dignissim lacus, sed dictum metus consequat quis. Quisque molestie urna et
                  suscipit rutrum. Proin consectetur enim tellus, in imperdiet mauris laoreet ut.
                  Pellentesque ipsum lacus, vehicula in lacinia sit amet, iaculis ut ex. Nullam
                  eleifend vel arcu vitae convallis. Donec ut mauris aliquet, blandit libero eget,
                  imperdiet massa. Cras fermentum, est placerat hendrerit bibendum, nibh dui gravida
                  mi, a facilisis arcu elit in leo. Quisque ut rhoncus mauris, nec hendrerit nibh.
                  Donec hendrerit laoreet felis, at ultrices tortor aliquam eu. Nullam ut nisl sed
                  sapien ultrices mattis. Aenean ut mattis justo. Donec ornare, sem ac convallis
                  consectetur, velit velit facilisis leo, in ullamcorper augue magna et tortor.
                  Praesent ac mauris ex. Pellentesque vulputate luctus nisi id luctus. Vestibulum
                  egestas odio et leo tincidunt, ullamcorper malesuada lectus varius. Morbi
                  consequat auctor nunc et ornare. Aenean vestibulum ipsum non neque placerat, sed
                  ornare diam sollicitudin. Duis id augue urna. Praesent ultrices imperdiet ante, ac
                  porttitor erat molestie at. Vivamus sit amet ante nulla. Aliquam arcu massa,
                  dignissim vel scelerisque eu, placerat id lacus. Interdum et malesuada fames ac
                  ante ipsum primis in faucibus. Morbi accumsan congue nibh, sed tempus magna
                  tristique vitae. Aenean ultricies accumsan commodo. In enim diam, eleifend eget
                  congue sed, aliquam nec justo. Praesent imperdiet ex sed enim venenatis fringilla.
                  Integer congue vehicula dolor sed dictum. Fusce at lacinia mauris. Vestibulum
                  blandit felis a diam fermentum, sit amet laoreet orci viverra. Aenean egestas
                  eleifend libero quis consectetur. Proin imperdiet semper dignissim. Donec ut elit
                  auctor, ultricies nisi vel, dapibus libero. Aenean ac arcu a ante accumsan viverra
                  non eget est. Morbi tincidunt augue sed euismod tincidunt. Etiam non lacus a massa
                  vehicula accumsan. Proin nec accumsan elit, et convallis velit. Proin dictum ante
                  efficitur sodales faucibus. Nam dignissim libero a lectus sagittis, rhoncus
                  fringilla diam elementum. Ut congue magna quis ex mattis molestie. Vestibulum sit
                  amet lacinia odio, in condimentum mi. Sed ut risus in dolor varius scelerisque. Ut
                  in neque aliquet nibh varius gravida id at magna. Cras ac luctus nulla, quis
                  bibendum libero. Phasellus ultricies mollis porttitor. Mauris luctus dignissim
                  molestie. Donec leo nisl, gravida eget turpis pulvinar, laoreet consectetur nibh.
                  Sed sagittis ligula eros, vitae malesuada libero viverra quis. Vivamus vel nunc
                  libero. Phasellus nec ultricies lectus, sit amet ornare augue. Cras blandit ornare
                  mi ut finibus. In tortor sem, consectetur at finibus non, malesuada a sem. Etiam
                  sit amet rutrum ante. Fusce aliquet, lacus pulvinar laoreet blandit, orci eros
                  vulputate justo, pretium consectetur lorem libero at nisi. Sed facilisis lacus
                  pretium porttitor porttitor. Duis a nisl tellus. Aenean at rutrum libero. Fusce
                  cursus sem vel ultrices maximus. Duis sed pharetra magna. Ut efficitur metus ac
                  dignissim consectetur. Quisque mollis nisl sed magna maximus, eget sodales nunc
                  pretium. Phasellus efficitur ut dui et tincidunt. Sed sagittis ligula ac nunc
                  dictum rhoncus. Suspendisse eu euismod libero. Duis cursus lorem libero, ut
                  dapibus orci fringilla nec. Sed dapibus ullamcorper sapien, in finibus metus
                  interdum ut. Nunc lacus quam, mollis eget augue ullamcorper, euismod blandit elit.
                  Cras ut ipsum a metus efficitur dignissim. Nunc sodales tortor ac odio dignissim
                  dignissim. Proin vel nulla nisl. Suspendisse dui dui, egestas finibus vulputate
                  consequat, finibus ut diam. Vestibulum id ultrices nisi, sit amet feugiat velit.
                  Aenean ac turpis ex. Phasellus consectetur ex diam. Quisque vehicula accumsan
                  tristique. Proin imperdiet posuere velit, nec posuere diam accumsan non. Nulla
                  scelerisque turpis et nunc tristique, a tempus augue egestas. Suspendisse
                  lobortis, libero lobortis semper ultrices, elit urna maximus dui, vel ultrices
                  turpis velit nec orci. Donec pulvinar pharetra suscipit. Cras euismod elit nec
                  lectus tempus laoreet. Praesent ultrices tincidunt elit, ut tincidunt magna
                  consectetur id. Integer blandit lectus ac justo ultrices laoreet. Fusce fermentum
                  volutpat purus. Morbi sed tellus sit amet elit hendrerit varius eu quis justo.
                  Nulla nec volutpat diam. Duis ut ultricies arcu. Nulla egestas dui at nunc
                  ultricies hendrerit. Donec semper sit amet urna volutpat scelerisque. Nullam
                  ultricies ligula enim, et blandit odio ultrices ornare. Ut sagittis, sem faucibus
                  dignissim venenatis, lorem mi interdum lectus, in malesuada metus ex ac est. Nam
                  quam magna, maximus sed ante quis, imperdiet dapibus turpis. Sed ut aliquet nibh.
                  Nam congue venenatis neque, vitae tempor dui faucibus a. Donec sit amet urna nibh.
                  Phasellus tempus blandit pellentesque. Aliquam dictum orci quam, a pulvinar ante
                  facilisis euismod. Vivamus cursus sapien lorem, quis aliquet nulla pretium et.
                  Donec nisl urna, ultrices in metus in, viverra vestibulum felis. Duis ante tellus,
                  luctus quis tincidunt accumsan, semper sed ante. Sed metus magna, efficitur a
                  interdum eu, vestibulum non enim. Quisque tempus imperdiet sapien id ultrices.
                  Aliquam scelerisque neque porta ipsum fermentum tincidunt. Maecenas eget sapien ac
                  metus mattis interdum nec a ex. Integer feugiat purus eu diam facilisis pulvinar.
                  Fusce ultricies maximus volutpat. Vivamus sed diam pulvinar, condimentum diam et,
                  pellentesque nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  mattis quam eu nibh suscipit auctor. Vestibulum a sagittis quam, eget posuere
                  risus. Sed accumsan nisi in ligula pulvinar iaculis. Praesent porttitor ipsum sit
                  amet velit convallis, sed bibendum urna tincidunt. Maecenas facilisis tristique
                  turpis, sed posuere est tincidunt nec. Nullam lacinia, diam eget luctus varius,
                  risus est malesuada eros, sed molestie sem erat in felis. Proin nisl sapien,
                  eleifend eget nisi vel, hendrerit consectetur sem. Vivamus consequat augue neque,
                  vel tempus sapien sollicitudin non. Aenean blandit neque eu nunc malesuada, quis
                  semper dui facilisis. In euismod euismod arcu, in porta lacus ullamcorper vitae.
                  Fusce tellus est, vulputate a libero sit amet, dictum tempor lorem. Suspendisse
                  vel sapien nulla. Mauris ultricies vulputate est, vitae ornare orci ultricies ac.
                  Etiam eu dictum nisl, ut vehicula odio. Nam a semper nunc. Cras velit justo,
                  consectetur et magna et, rhoncus cursus leo. Cras urna velit, ullamcorper sed arcu
                  a, suscipit tincidunt tellus. Pellentesque cursus vel ipsum a elementum. Orci
                  varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                  Proin viverra varius hendrerit. Vestibulum tincidunt dignissim elit. Donec
                  fermentum auctor rhoncus.
                </p>
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
