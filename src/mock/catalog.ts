// src/mock/catalog.ts
export const mockCatalog = Array.from({ length: 30 }, (_, i) => ({
  id: (i + 1).toString(),
  make: ['Volkswagen', 'Peugeot', 'Fiat', 'BMW', 'Tesla'][i % 5],
  model: ['Golf', '208', '500', 'X1', 'Model 3'][i % 5],
  year: 2020 + (i % 4),
  price: 18000 + i * 300,
  mileage: 10000 + i * 500,
  imageArray: [
    {
      imageUrl: `https://carsbase.com/storage/photo/8/3345${i % 10}.jpg`,
    },
  ],
  fuelType: ['Petrol', 'Diesel', 'Hybrid', 'Electric'][i % 4],
  transmission: ['Automatic', 'Manual'][i % 2],
  monthlyPayment: 299 + i * 5,
  duration: 36,
  mileagePerYear: 10000,
  order: i + 1,
  extraTags: ['Panoramic Roof', 'AWD', 'Apple CarPlay'].slice(0, (i % 3) + 1),
}))
