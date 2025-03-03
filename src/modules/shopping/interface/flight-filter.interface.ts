export interface IFlightFilterOptions {
  stops: string[];
  priceRange: [number, number];
  durationRange: [number, number];
  airlines: { [key: string]: string };
  departureTimeRange: [number, number];
}

export interface IFlightAppliedFilters {
  stops: string;
  airlines: string[];
  priceRange: [number, number];
  durationRange: [number, number];
  departureTimeRange: [number, number];
}
