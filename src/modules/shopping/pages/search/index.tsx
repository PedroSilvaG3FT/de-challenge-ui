import SearchHeroComponent from "./_search-hero.component";
import FlightSearchComponent from "../../components/flight-search";

export default function ShoppingSearchPage() {
  return (
    <section className="min-h-screen">
      <SearchHeroComponent />

      <main className="app-container">
        <FlightSearchComponent className="relative z-10 -top-28" />
      </main>
    </section>
  );
}
