// src/components/Button/index.tsx
import './styles.scss'
import clsx from 'clsx'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'tertiary'
}

export default function Button({ children, variant = 'secondary', ...props }: Props) {
  return (
    <button className={clsx('btn', `btn--${variant}`)} {...props}>
      {children}
    </button>
  )
}
