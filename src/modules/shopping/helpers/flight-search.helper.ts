import { EFlightSortType } from "../enums/flight-sort.enum";
import {
  IFlightFilterOptions,
  IFlightAppliedFilters,
} from "../interface/flight-filter.interface";
import { IFlightItem } from "../interface/flight.interface";

export class FlightSearchHelper {
  static getFilterOptions(flights: IFlightItem[]): IFlightFilterOptions {
    const airlines: { [key: string]: string } = {};
    let minPrice = Infinity;
    let maxPrice = -Infinity;
    let minDuration = Infinity;
    let maxDuration = -Infinity;

    flights.forEach((flight) => {
      const price = parseFloat(flight.price.total);
      minPrice = Math.min(minPrice, price);
      maxPrice = Math.max(maxPrice, price);

      flight.validatingAirlineCodes.forEach((code) => {
        if (!airlines[code])
          airlines[code] = flight.itineraries[0].segments[0].carrierName;
      });

      flight.itineraries.forEach((itinerary) => {
        const duration = this.parseDuration(itinerary.duration);
        minDuration = Math.min(minDuration, duration);
        maxDuration = Math.max(maxDuration, duration);
      });
    });

    return {
      airlines,
      departureTimeRange: [0, 24],
      priceRange: [Math.floor(minPrice), Math.ceil(maxPrice)],
      stops: ["All", "Non-stop", "1 Stop", "2+ Stops"],
      durationRange: [Math.floor(minDuration), Math.ceil(maxDuration)],
    };
  }

  static applyFilters(
    flights: IFlightItem[],
    filters: IFlightAppliedFilters
  ): IFlightItem[] {
    return flights.filter((flight) => {
      if (filters.stops !== "All") {
        const stops = flight.itineraries[0].segments.length - 1;
        if (filters.stops === "Non-stop" && stops !== 0) return false;
        if (filters.stops === "1 Stop" && stops !== 1) return false;
        if (filters.stops === "2+ Stops" && stops < 2) return false;
      }

      const price = parseFloat(flight.price.total);
      if (price < filters.priceRange[0] || price > filters.priceRange[1])
        return false;

      if (
        filters.airlines.length > 0 &&
        !flight.validatingAirlineCodes.some((code) =>
          filters.airlines.includes(code)
        )
      )
        return false;

      const duration = this.parseDuration(flight.itineraries[0].duration);
      if (
        duration < filters.durationRange[0] ||
        duration > filters.durationRange[1]
      )
        return false;

      const departureHour = new Date(
        flight.itineraries[0].segments[0].departure.at
      ).getHours();
      if (
        departureHour < filters.departureTimeRange[0] ||
        departureHour > filters.departureTimeRange[1]
      )
        return false;

      return true;
    });
  }

  static sortFlights(flights: IFlightItem[], sortType: EFlightSortType) {
    const sortFunctions = {
      [EFlightSortType.LowestPrice]: (a: IFlightItem, b: IFlightItem) =>
        parseFloat(a.price.total) - parseFloat(b.price.total),
      [EFlightSortType.ShortestDuration]: (a: IFlightItem, b: IFlightItem) =>
        this.parseDuration(a.itineraries[0].duration) -
        this.parseDuration(b.itineraries[0].duration),
      [EFlightSortType.EarliestDeparture]: (a: IFlightItem, b: IFlightItem) =>
        new Date(a.itineraries[0].segments[0].departure.at).getTime() -
        new Date(b.itineraries[0].segments[0].departure.at).getTime(),
      [EFlightSortType.EarliestArrival]: (a: IFlightItem, b: IFlightItem) =>
        new Date(
          a.itineraries[0].segments[
            a.itineraries[0].segments.length - 1
          ].arrival.at
        ).getTime() -
        new Date(
          b.itineraries[0].segments[
            b.itineraries[0].segments.length - 1
          ].arrival.at
        ).getTime(),
    };

    return [...flights].sort(sortFunctions[sortType]);
  }

  private static parseDuration(duration: string): number {
    const match = duration.match(/PT(\d+H)?(\d+M)?/);
    let hours = 0;
    let minutes = 0;
    if (match) {
      if (match[1]) hours = parseInt(match[1]);
      if (match[2]) minutes = parseInt(match[2]);
    }
    return hours + minutes / 60;
  }
}
