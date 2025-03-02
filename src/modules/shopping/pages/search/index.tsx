import SearchHeroComponent from "./_search-hero.component";
import FlightSearchComponent from "../../components/flight-search";
import { IFlightSearchRequest } from "../../interface/flight.interface";

export default function ShoppingSearchPage() {
  const handleSubmitSearch = (data: IFlightSearchRequest) => {
    console.log("DATA : ", data);
  };

  return (
    <section className="min-h-screen">
      <SearchHeroComponent />

      <main className="app-container">
        <FlightSearchComponent
          onSubmit={handleSubmitSearch}
          className="relative z-10 -top-28"
        />
      </main>
    </section>
  );
}
