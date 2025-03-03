import { APP_HTTP_CLIENT } from "@/modules/@shared/http";
import { IAirportItem } from "../interface/airport.interface";
import { IBaseReponse } from "@/modules/@shared/interfaces/response.interface";
import {
  IFlightItem,
  IFlightSearchRequest,
} from "../interface/flight.interface";
import { IFlightSearchHistory } from "../interface/flight-search-history.interface";

export class FlightService {
  public static searchAirports(keyword: string) {
    return APP_HTTP_CLIENT.post<IBaseReponse<IAirportItem[]>>(
      `/flight/airport`,
      { keyword }
    );
  }

  public static searchFlights(payload: IFlightSearchRequest) {
    return APP_HTTP_CLIENT.post<IBaseReponse<IFlightItem[]>>(
      `/flight/search`,
      payload
    );
  }

  public static getSearchHistory() {
    return APP_HTTP_CLIENT.get<IBaseReponse<IFlightSearchHistory[]>>(
      `/flight/search/history`
    );
  }
}
