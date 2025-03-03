import FlightListComponent from "./_flight-list.component";
import { useState, useEffect, useRef } from "react";
import FlightFilterComponent from "./_flight-filter.component";
import { IFlightItem } from "../../interface/flight.interface";
import {
  IFilterOptions,
  IAppliedFilters,
  FlightSearchFilterHelper,
} from "../../helpers/flight-search.helper";
import { scrollToElement } from "@/modules/@shared/functions/scroll.function";

interface IProps {
  title: string;
  flights: IFlightItem[];
  onPageChange: () => void;
}

export default function FlightSearchResultComponent(props: IProps) {
  const { title, flights } = props;

  const containerRef = useRef<HTMLElement>(null);
  const [filteredFlights, setFilteredFlights] =
    useState<IFlightItem[]>(flights);

  const [filterOptions, setFilterOptions] = useState<IFilterOptions | null>(
    null
  );

  useEffect(() => {
    setFilteredFlights(flights);
    setFilterOptions(FlightSearchFilterHelper.getFilterOptions(flights));
  }, [flights]);

  const scrollToContainerTop = () => scrollToElement(containerRef, -100);
  const handleFilterChange = (filters: IAppliedFilters) => {
    setFilteredFlights(FlightSearchFilterHelper.applyFilters(flights, filters));
  };

  return (
    <section ref={containerRef} className="flex gap-4">
      {filterOptions && (
        <aside className="p-4 mobile:hidden h-min w-[300px] sticky top-20 bg-background shadow-md rounded-lg border border-foreground/10">
          <FlightFilterComponent
            filterOptions={filterOptions}
            onFilterChange={handleFilterChange}
          />
        </aside>
      )}

      <section className="flex-1">
        <h3 className="text-2xl font-normal mb-4">{title}</h3>

        <FlightListComponent
          itemsPerPage={5}
          flights={filteredFlights}
          onPageChange={() => scrollToContainerTop()}
        />
      </section>
    </section>
  );
}
