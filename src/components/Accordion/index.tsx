// src/components/Accordion/index.tsx
import { useState, useImperativeHandle, forwardRef } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import './styles.scss'
import type { AccordionRef } from './types'

type AccordionProps = {
  header: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
}

const Accordion = forwardRef<AccordionRef, AccordionProps>(
  ({ header, children, defaultOpen = false }, ref) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }))

    return (
      <div className="accordion">
        <div className="accordion__header-wrapper">
          <div className="accordion__header-content">{header}</div>
          <button
            className="accordion__toggle"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle accordion"
          >
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
        {isOpen && <div className="accordion__content">{children}</div>}
      </div>
    )
  },
)

Accordion.displayName = 'Accordion'

export default Accordion
