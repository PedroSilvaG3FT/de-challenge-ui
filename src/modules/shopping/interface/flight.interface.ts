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

export interface IFlightPrice {
  base: string;
  total: string;
  currency: string;
  grandTotal: string;
  fees: Array<{
    type: string;
    amount: string;
  }>;
  currencyName: string;
}

export interface IFlightPricingOptions {
  fareType: string[];
  includedCheckedBagsOnly: boolean;
}

export interface IFlightSegmentArrivalDeparture {
  at: string;
  iataCode: string;
  terminal: string;
  cityCode: string;
  countryCode: string;
}

export interface IFlightAircraft {
  code: string;
  name: string;
}

export interface IFlightOperating {
  carrierCode: string;
}

export interface IFlightSegment {
  id: string;
  number: string;
  duration: string;
  carrierCode: string;
  numberOfStops: number;
  blacklistedInEU: boolean;
  arrival: IFlightSegmentArrivalDeparture;
  departure: IFlightSegmentArrivalDeparture;
  aircraft: IFlightAircraft;
  operating: IFlightOperating;
  carrierName: string;
}

export interface IFlightItinerary {
  duration: string;
  segments: IFlightSegment[];
}

export interface IFlightFareDetailsBySegment {
  class: string;
  cabin: string;
  segmentId: string;
  fareBasis: string;
  includedCheckedBags: Record<string, unknown>;
  includedCabinBags: Record<string, unknown>;
}

export interface IFlightTravelerPricing {
  price: {
    base: string;
    total: string;
    currency: string;
  };
  travelerId: string;
  fareOption: string;
  travelerType: string;
  fareDetailsBySegment: IFlightFareDetailsBySegment[];
}

export interface IFlightItem {
  id: string;
  type: string;
  source: string;
  oneWay: boolean;
  price: IFlightPrice;
  isUpsellOffer: boolean;
  nonHomogeneous: boolean;
  lastTicketingDate: string;
  lastTicketingDateTime: string;
  numberOfBookableSeats: number;
  instantTicketingRequired: boolean;
  pricingOptions: IFlightPricingOptions;
  itineraries: IFlightItinerary[];
  validatingAirlineCodes: string[];
  travelerPricings: IFlightTravelerPricing[];
}
