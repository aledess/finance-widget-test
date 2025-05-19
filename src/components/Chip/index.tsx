import './styles.scss'

type Props = {
  label: string
}

export default function Chip({ label }: Props) {
  return <span className="chip">{label}</span>
}
