import { useState } from "react";
import SearchHeroComponent from "./_search-hero.component";
import Each from "@/modules/@shared/components/utils/each";
import { FlightService } from "../../services/flight.service";
import FlightCardComponent from "../../components/flight-card";
import FlightFilterComponent from "../../components/flight-filter";
import FlightSearchComponent from "../../components/flight-search";
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
  const [flights, setFlights] = useState<IFlightItem[]>([]);

  const [filteredFlights, setFilteredFlights] = useState<IFlightItem[]>([]);
  const [filterOptions, setFilterOptions] = useState<IFilterOptions | null>(
    null
  );

  const handleSubmitSearch = (data: IFlightSearchRequest) => {
    FlightService.searchFlights(data)
      .then(({ data: response }) => {
        setFlights(response.data);
        setFilteredFlights(response.data);

        const options = FlightSearchFilterHelper.getFilterOptions(
          response.data
        );
        setFilterOptions(options);
      })
      .catch((error) => console.log(error));
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

        <section className="min-h-screen flex gap-4">
          {filterOptions && (
            <aside className="p-4 h-min w-[300px] sticky top-2 bg-background shadow-md rounded-lg border border-foreground/10">
              <FlightFilterComponent
                filterOptions={filterOptions}
                onFilterChange={handleFilterChange}
              />
            </aside>
          )}

          <section className="space-y-2 flex-1">
            <Each
              data={filteredFlights}
              render={(item) => <FlightCardComponent data={item} />}
            />
          </section>
        </section>
      </main>
    </section>
  );
}
