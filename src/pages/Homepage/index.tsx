import { useEffect, useRef, useState } from 'react'
import VehicleCard from '../../components/VehicleCard'
import './styles.scss'
import PageHeader from '../../components/PageHeader'

const CHUNK_SIZE = 6

type HomePageProps = {
  initialCatalog: any[] // oppure `Vehicle[]` se usi tipi
}

export default function HomePage({ initialCatalog }: HomePageProps) {
  const [visibleData, setVisibleData] = useState(() => initialCatalog.slice(0, CHUNK_SIZE))
  const [page, setPage] = useState(1)
  const loaderRef = useRef<HTMLDivElement | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoading(true)
          setTimeout(() => {
            const nextPage = page + 1
            const nextChunk = initialCatalog.slice(0, nextPage * CHUNK_SIZE)

            if (nextChunk.length > visibleData.length) {
              setVisibleData(nextChunk)
              setPage(nextPage)
            }

            setIsLoading(false)
          }, 500) // simulate API delay
        }
      },
      { threshold: 1 },
    )

    if (loaderRef.current) observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [page, visibleData, initialCatalog])

  return (
    <div className="home-container">
      <PageHeader showBack={false} breadcrumbs={[{ label: 'Home' }]} />

      <h2 className="home-title">Available Vehicles</h2>

      {visibleData.length === 0 ? (
        <p>No vehicles available.</p>
      ) : (
        <div className="vehicle-grid">
          {visibleData.map((item) => (
            <VehicleCard key={item.id} {...item} imageUrl={item.imageArray[0]?.imageUrl || ''} />
          ))}
        </div>
      )}

      <div ref={loaderRef} className="loader">
        {isLoading && <div className="spinner" />}
      </div>
    </div>
  )
}
