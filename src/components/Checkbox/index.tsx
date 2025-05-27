// src/components/CustomCheckbox/index.tsx
import './styles.scss'

type CheckboxProps = {
  label: React.ReactNode | string
  checked?: boolean
  onChange?: (checked: boolean) => void
}

export default function Checkbox({ label, checked = false, onChange }: CheckboxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked)
  }

  return (
    <label className={`custom-checkbox ${checked ? 'checked' : ''}`}>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <span className="custom-checkbox__box" />
      <span className="custom-checkbox__label">{label}</span>
    </label>
  )
}
