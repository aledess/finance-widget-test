// src/components/Button/index.tsx
import './styles.scss'
import clsx from 'clsx'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'default' | 'small'
  iconOnly?: boolean
  outline?: boolean // 👈 nuova prop
}

export default function Button({
  children,
  variant = 'primary',
  size = 'default',
  iconOnly = false,
  outline = false,
  ...props
}: Props) {
  return (
    <button
      className={clsx(
        'btn',
        `btn--${variant}`,
        size === 'small' && 'btn--small',
        iconOnly && 'btn--icon',
        outline && 'btn--outline', // 👈 classe aggiunta se outline true
      )}
      {...props}
    >
      {children}
    </button>
  )
}
