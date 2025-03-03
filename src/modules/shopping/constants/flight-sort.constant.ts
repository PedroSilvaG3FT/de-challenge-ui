// Em um arquivo separado, por exemplo: constants/flight-sort-options.ts
import { IFormOption } from "@/modules/@shared/components/_interfaces/form-option.interface";
import { EFlightSortType } from "../enums/flight-sort.enum";

export const FlightSortOptions: IFormOption[] = [
  { label: "Lowest Price", value: EFlightSortType.LowestPrice },
  { label: "Shortest Duration", value: EFlightSortType.ShortestDuration },
  { label: "Earliest Departure", value: EFlightSortType.EarliestDeparture },
  { label: "Earliest Arrival", value: EFlightSortType.EarliestArrival },
];
