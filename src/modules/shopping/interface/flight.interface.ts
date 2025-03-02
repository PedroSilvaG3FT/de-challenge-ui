import { ETravelClass } from "../enums/travel-class.enum";

export interface IFlightSearchRequest {
  adults: number;
  infants?: number;
  children?: number;

  max?: number;
  nonStop?: boolean;
  maxPrice?: number;
  returnDate?: string;
  departureDate: string;
  currencyCode?: string;
  travelClass?: ETravelClass;
  originLocationCode: string;
  destinationLocationCode: string;
}
