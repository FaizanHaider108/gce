export interface CityMetadata {
  averageSalary?: number;
  costOfLivingIndex?: number;
  population?: number;
  /** Localized gross annual earnings baseline — derived when omitted. */
  cityMedianSalary?: number;
  /** Top local employment industries — derived from economic tier when omitted. */
  dominantSectors?: string;
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
