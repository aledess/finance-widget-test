import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { UserRound, Building2 } from 'lucide-react'

import PageHeader from '../../components/PageHeader'
import Button from '../../components/Button'
import './styles.scss'

export default function ProfilePage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [selectedProfile, setSelectedProfile] = useState<'private' | 'company' | null>(null)

  const handleContinue = () => {
    if (!selectedProfile || !state) return
    navigate('/vehicle-detail', { state: { ...state, profile: selectedProfile } })
  }

  return (
    <div className="profile-page">
      <PageHeader breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Select Profile' }]} />

      <h1 className="profile-page__title">Who is the vehicle for?</h1>

      <div className="profile-page__options">
        <div
          className={`profile-card ${selectedProfile === 'private' ? 'selected' : ''}`}
          onClick={() => setSelectedProfile('private')}
        >
          <div className="profile-card__icon">
            <UserRound size={48} strokeWidth={1.5} />
          </div>
          <h2>Private</h2>
          <p>Personal use, private lease or contract.</p>
        </div>

        <div
          className={`profile-card ${selectedProfile === 'company' ? 'selected' : ''}`}
          onClick={() => setSelectedProfile('company')}
        >
          <div className="profile-card__icon">
            <Building2 size={48} strokeWidth={1.5} />
          </div>
          <h2>Company</h2>
          <p>Business use, fleet or corporate leasing.</p>
        </div>
      </div>

      <div className="profile-page__actions">
        <Button onClick={handleContinue} disabled={!selectedProfile}>
          Continue
        </Button>
      </div>
    </div>
  )
}
