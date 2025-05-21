const brands = [
  { brand: 'Audi', model: 'A4', image: '33450' },
  { brand: 'BMW', model: 'X1', image: '33451' },
  { brand: 'Volkswagen', model: 'Golf', image: '33452' },
  { brand: 'Peugeot', model: '208', image: '33453' },
  { brand: 'Fiat', model: '500', image: '33454' },
]

const chipPoolBase = {
  fuel: 'Hybrid',
  year: '2025',
  transmission: 'Automatic',
  cv: '136 CV',
  kw: '100 kW',
}

const chipKeys = Object.keys(chipPoolBase)

export const mockCatalog = Array.from({ length: 30 }, (_, i) => {
  const mileage = 25000 + i * 300
  const brandData = brands[i % brands.length]
  const imageCode = brandData.image

  // 🔹 Chip dinamiche 1–5
  const numChips = 1 + (i % 5)
  const selectedKeys = [...chipKeys].sort(() => Math.random() - 0.5).slice(0, numChips)

  const chipData = selectedKeys.map((key) => ({
    key,
    label: chipPoolBase[key as keyof typeof chipPoolBase],
  }))

  return {
    id: `${i + 1}`,
    vehicleBrand: brandData.brand,
    vehicleModel: brandData.model,
    vehicleVersion: '2.0 TDI S Tronic Business',
    vehicleListPrice: 48000 + i * 300,
    offerMonthlyInstalment: 350.99 + i * 10,
    imageArray: [
      {
        imageUrl: `https://carsbase.com/storage/photo/8/${imageCode}.jpg`,
      },
    ],
    chipData: [
      { key: 'brand', label: brandData.brand },
      { key: 'model', label: brandData.model },
      ...chipData,
    ],
    detailsData: [
      { label: 'First registration', value: 'May 2025' },
      { label: 'Mileage', value: `${mileage.toLocaleString()} km` },
      { label: 'Power', value: '100 kW / 136 CV' },
    ],
  }
})
