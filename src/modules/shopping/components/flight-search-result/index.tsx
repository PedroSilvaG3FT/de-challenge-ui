import { useState, useEffect, useRef } from "react";
import FlightListComponent from "./_flight-list.component";
import FlightFilterComponent from "./_flight-filter.component";
import FlightSearchSortComponent from "./_flight-sort.component";
import { IFlightItem } from "../../interface/flight.interface";
import { FlightSearchHelper } from "../../helpers/flight-search.helper";
import { scrollToElement } from "@/modules/@shared/functions/scroll.function";
import {
  IFlightFilterOptions,
  IFlightAppliedFilters,
} from "../../interface/flight-filter.interface";
import { EFlightSortType } from "../../enums/flight-sort.enum";
import FlightFilterSheetComponent from "./_flight-filter-sheet.component";

interface IProps {
  title: string;
  flights: IFlightItem[];
  onPageChange: () => void;
}

export default function FlightSearchResultComponent({
  title,
  flights,
}: IProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [processedFlights, setProcessedFlights] =
    useState<IFlightItem[]>(flights);
  const [filterOptions, setFilterOptions] =
    useState<IFlightFilterOptions | null>(null);

  useEffect(() => {
    setProcessedFlights(flights);
    setFilterOptions(FlightSearchHelper.getFilterOptions(flights));
  }, [flights]);

  const scrollToContainerTop = () => scrollToElement(containerRef, -100);

  const handleFilterChange = (filters: IFlightAppliedFilters) => {
    setProcessedFlights(FlightSearchHelper.applyFilters(flights, filters));
  };

  const handleSortChange = (sortType: EFlightSortType) => {
    setProcessedFlights(
      FlightSearchHelper.sortFlights(processedFlights, sortType)
    );
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
        <nav className="flex gap-2 items-center mb-4">
          <h3 className="text-2xl font-normal mr-auto mobile:text-xl">
            {title}
          </h3>
          {filterOptions && (
            <FlightFilterSheetComponent
              filterOptions={filterOptions}
              onFilterChange={handleFilterChange}
            />
          )}
          <FlightSearchSortComponent onSortChange={handleSortChange} />
        </nav>

        <FlightListComponent
          itemsPerPage={5}
          flights={processedFlights}
          onPageChange={scrollToContainerTop}
        />
      </section>
    </section>
  );
}
