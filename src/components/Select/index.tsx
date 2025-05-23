import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import './styles.scss'

type Option = {
  label: string
  value: string | number
}

type Props = {
  options: Option[]
  value?: string | number
  onChange: (value: string | number) => void
  placeholder?: string
  disabledValue?: string | number
  className?: string
}

export default function Select({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  disabledValue,
  className = '',
}: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selected = options.find((opt) => String(opt.value) === String(value))

  return (
    <div className={`custom-select ${className}`} ref={ref}>
      <button className="select-trigger" onClick={() => setOpen((prev) => !prev)}>
        {selected?.label || placeholder}
        <ChevronDown size={16} className="icon" />
      </button>

      {open && (
        <ul className="select-options">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={opt.value === disabledValue ? 'disabled' : ''}
              onClick={() => {
                if (opt.value !== disabledValue) {
                  onChange(opt.value)
                  setOpen(false)
                }
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
