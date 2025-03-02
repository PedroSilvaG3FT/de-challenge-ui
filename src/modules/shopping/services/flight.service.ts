import { APP_HTTP_CLIENT } from "@/modules/@shared/http";
import { IAirportItem } from "../interface/airport.interface";
import { IBaseReponse } from "@/modules/@shared/interfaces/response.interface";
import {
  IFlightItem,
  IFlightSearchRequest,
} from "../interface/flight.interface";

export class FlightService {
  public static searchAirports(term: string) {
    return APP_HTTP_CLIENT.get<IBaseReponse<IAirportItem[]>>(
      `/flight/airport?keyword=${term}`
    );
  }

  public static searchFlights(payload: IFlightSearchRequest) {
    return APP_HTTP_CLIENT.post<IBaseReponse<IFlightItem[]>>(
      `/flight/search`,
      payload
    );
  }
}
