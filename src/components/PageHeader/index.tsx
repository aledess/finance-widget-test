import { useNavigate } from 'react-router-dom'
import './styles.scss'

type Crumb = {
  label: string
  path?: string
}

type Props = {
  breadcrumbs: Crumb[]
  showBack?: boolean
  rightSlot?: React.ReactNode
}

export default function PageHeader({ breadcrumbs, showBack = true, rightSlot = false }: Props) {
  const navigate = useNavigate()

  const handleBack = () => navigate(-1)

  return (
    <div className="header">
      {showBack && (
        <button className="back" onClick={handleBack} aria-label="Back">
          ←
        </button>
      )}
      <nav className="breadcrumb">
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="item">
            {crumb.path ? (
              <span className="link" onClick={() => navigate(crumb.path!)}>
                {crumb.label}
              </span>
            ) : (
              <span className="current">{crumb.label}</span>
            )}
            {i < breadcrumbs.length - 1 && <span className="separator">/</span>}
          </span>
        ))}
      </nav>
      {rightSlot && <div className="right">{rightSlot}</div>}
    </div>
  )
}
