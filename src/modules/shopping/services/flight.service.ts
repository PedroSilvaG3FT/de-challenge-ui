import { APP_HTTP_CLIENT } from "@/modules/@shared/http";
import { IBaseReponse } from "@/modules/@shared/interfaces/response.interface";
import { IAirportItem } from "../interface/airport.interface";

export class FlightService {
  public static searchAirports(term: string) {
    return APP_HTTP_CLIENT.get<IBaseReponse<IAirportItem[]>>(
      `/flight/airport?keyword=${term}`
    );
  }
}
