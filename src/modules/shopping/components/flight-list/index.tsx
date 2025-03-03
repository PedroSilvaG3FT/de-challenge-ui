import { Plane } from "lucide-react";
import { useState, useEffect } from "react";
import FlightCardComponent from "../flight-card";
import Each from "@/modules/@shared/components/utils/each";
import { IFlightItem } from "../../interface/flight.interface";
import PaginationComponent from "./_flight-list-pagination.component";
import AppEmptyList from "@/modules/@shared/components/app-empty-list";
import { filterListPagination } from "@/modules/@shared/functions/pagination.function";

interface IProps {
  itemsPerPage: number;
  flights: IFlightItem[];
  onPageChange: (page: number) => void;
}

export default function FlightListComponent(props: IProps) {
  const { flights, onPageChange, itemsPerPage } = props;
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedFlights, setPaginatedFlights] = useState<IFlightItem[]>([]);

  useEffect(() => {
    const _totalPages = Math.ceil(flights.length / itemsPerPage);
    setTotalPages(_totalPages);

    if (currentPage > _totalPages) setCurrentPage(Math.max(1, _totalPages));

    const paginated = filterListPagination(flights, currentPage, itemsPerPage);
    setPaginatedFlights(paginated);
  }, [flights, currentPage, itemsPerPage]);

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage]);

  if (flights.length === 0) {
    return (
      <section className="h-full flex-1">
        <AppEmptyList
          icon={Plane}
          iconClassName="w-12 h-12"
          textClassName="text-base"
          text="No flights found. Try adjusting your search criteria."
        />
      </section>
    );
  }

  return (
    <section className="space-y-2 flex-1 pb-6">
      <Each
        data={paginatedFlights}
        render={(item) => <FlightCardComponent data={item} />}
      />

      <PaginationComponent
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </section>
  );
}
