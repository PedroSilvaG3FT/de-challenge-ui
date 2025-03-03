import { useRef, useState } from "react";
import Show from "@/modules/@shared/components/utils/show";
import SearchHeroComponent from "./_search-hero.component";
import { FlightService } from "../../services/flight.service";
import FlightListComponent from "../../components/flight-list";
import FlightFilterComponent from "../../components/flight-filter";
import FlightSearchComponent from "../../components/flight-search";
import LoadingSearchComponent from "../../components/loading-search";
import FlightSearchInfoComponent from "../../components/flight-search-info";
import {
  IFlightItem,
  IFlightSearchRequest,
} from "../../interface/flight.interface";
import {
  IFilterOptions,
  IAppliedFilters,
  FlightSearchFilterHelper,
} from "../../helpers/flight-search.helper";

export default function ShoppingSearchPage() {
  const resultsSectionRef = useRef<HTMLElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [flights, setFlights] = useState<IFlightItem[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<IFlightItem[]>([]);
  const [filterOptions, setFilterOptions] = useState<IFilterOptions | null>(
    null
  );

  const scrollToResults = () => {
    if (resultsSectionRef.current) {
      resultsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmitSearch = (data: IFlightSearchRequest) => {
    setIsLoading(true);
    setHasSearched(true);
    scrollToResults();

    FlightService.searchFlights(data)
      .then(({ data: response }) => {
        setFlights(response.data);
        setFilteredFlights(response.data);
        setFilterOptions(
          FlightSearchFilterHelper.getFilterOptions(response.data)
        );

        setIsLoading(false);
        scrollToResults();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setFlights([]);
        setFilteredFlights([]);
        setFilterOptions(null);
      });
  };

  const handleFilterChange = (filters: IAppliedFilters) => {
    setFilteredFlights(FlightSearchFilterHelper.applyFilters(flights, filters));
  };

  return (
    <section className="min-h-screen">
      <SearchHeroComponent />

      <main className="app-container">
        <FlightSearchComponent
          onSubmit={handleSubmitSearch}
          className="relative z-10 -top-28"
        />

        <Show>
          <Show.When condition={!isLoading && hasSearched && !flights.length}>
            <div className="text-center py-10">
              <h2 className="text-2xl font-bold mb-4">No Flights Found</h2>
              <p>
                We couldn't find any flights matching your search criteria.
                Please try adjusting your search parameters.
              </p>
            </div>
          </Show.When>
        </Show>

        <section ref={resultsSectionRef}>
          <Show>
            <Show.When condition={isLoading}>
              <LoadingSearchComponent />
            </Show.When>

            <Show.When condition={!hasSearched}>
              <FlightSearchInfoComponent />
            </Show.When>
            <Show.Else>
              <article className="min-h-screen flex gap-4">
                {filterOptions && (
                  <aside className="p-4 h-min w-[300px] sticky top-2 bg-background shadow-md rounded-lg border border-foreground/10">
                    <FlightFilterComponent
                      filterOptions={filterOptions}
                      onFilterChange={handleFilterChange}
                    />
                  </aside>
                )}

                <FlightListComponent
                  itemsPerPage={5}
                  flights={filteredFlights}
                  onPageChange={() => scrollToResults()}
                />
              </article>
            </Show.Else>
          </Show>
        </section>
      </main>
    </section>
  );
}
