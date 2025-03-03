import { Filter } from "lucide-react";
import { Button } from "@/design/components/ui/button";
import FlightFilterComponent from "./_flight-filter.component";
import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from "@/design/components/ui/sheet";
import {
  IFlightFilterOptions,
  IFlightAppliedFilters,
} from "../../interface/flight-filter.interface";

interface IProps {
  filterOptions: IFlightFilterOptions;
  onFilterChange: (filters: IFlightAppliedFilters) => void;
}

export default function FlightFilterSheetComponent({
  filterOptions,
  onFilterChange,
}: IProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="lg:hidden">
          <Filter className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Flight Filters</SheetTitle>
          <SheetDescription>
            Adjust your flight search criteria here.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          <FlightFilterComponent
            filterOptions={filterOptions}
            onFilterChange={onFilterChange}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
