import { useState } from "react";
import SearchHeroComponent from "./_search-hero.component";
import Each from "@/modules/@shared/components/utils/each";
import { FlightService } from "../../services/flight.service";
import FlightCardComponent from "../../components/flight-card";
import FlightSearchComponent from "../../components/flight-search";
import {
  IFlightItem,
  IFlightSearchRequest,
} from "../../interface/flight.interface";

export default function ShoppingSearchPage() {
  const [flights, setFlights] = useState<IFlightItem[]>([]);

  const handleSubmitSearch = (data: IFlightSearchRequest) => {
    FlightService.searchFlights(data)
      .then(({ data: response }) => setFlights(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <section className="min-h-screen">
      <SearchHeroComponent />

      <main className="app-container">
        <FlightSearchComponent
          onSubmit={handleSubmitSearch}
          className="relative z-10 -top-28"
        />

        <section className="h-screen grid gap-4 grid-cols-[300px_1fr]">
          <article>filter</article>
          <section className="grid gap-4">
            <Each
              data={flights}
              render={(item) => <FlightCardComponent data={item} />}
            />
          </section>
        </section>
      </main>
    </section>
  );
}
