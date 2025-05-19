export type catalogItem = {
  id: string
  make: string
  model: string
  year: number
  price: number
  mileage: number
  imageArray: { imageUrl: string }[]
  fuelType: string
  transmission: string
  monthlyPayment: number
  duration: number
  mileagePerYear: number
  order: number
  [key: string]: any
}
