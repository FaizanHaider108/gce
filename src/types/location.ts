export interface CityMetadata {
  averageSalary?: number;
  costOfLivingIndex?: number;
  population?: number;
}

export interface UKCity {
  cityName: string;
  slug: string;
  region: string;
  country: "UK";
  metadata?: CityMetadata;
}

export interface UKCitiesDataset {
  country: "UK";
  taxYear: string;
  cities: UKCity[];
}
