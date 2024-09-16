export default interface Prediction {
  ts: Date,
  oceanProximity: OceanProximity,
  households: number,
  housing_median_age: number,
  latitude: number,
  longitude: number,
  median_income: number,
  population: number,
  total_bedrooms: number,
  total_rooms: number,
  y: number
}

enum OceanProximity {
  HourToOcean = 0,
  Inland = 1,
  Island = 2,
  NearBay = 3,
  NearOcean = 4,
}