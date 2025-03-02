import { useState, useCallback } from "react";
import { IconPlaneDeparture } from "@tabler/icons-react";
import { FlightService } from "../../services/flight.service";
import { IAirportItem } from "../../interface/airport.interface";
import AppFormAutoComplete, {
  IAppFormAutoCompleteProps,
} from "@/modules/@shared/components/form/form-autocomplete";

interface IProps extends Omit<IAppFormAutoCompleteProps, "suggestions"> {
  containerClassName?: string;
}

export default function AirportSearchComponent(props: IProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [airports, setAirports] = useState<IAirportItem[]>([]);

  const handleSearch = useCallback((term: string) => {
    if (term.length < 3 || term === searchTerm) return;

    setIsLoading(true);
    setSearchTerm(term);

    FlightService.searchAirports(term)
      .then(({ data: response }) => setAirports(response.data))
      .catch(() => setAirports([]))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <section className={props.containerClassName}>
      <AppFormAutoComplete
        {...props}
        bindKey="iataCode"
        isLoading={isLoading}
        suggestions={airports}
        onTermChanged={handleSearch}
        className="bg-transparent border-none"
        renderItem={(item: IAirportItem) => (
          <article className="flex items-center p-2 group">
            <IconPlaneDeparture className="w-6 h-6 mr-3 text-primary flex-shrink-0 mt-1 transition-transform duration-500 group-hover:scale-110" />

            <section className="flex-grow">
              <div className="flex justify-between items-baseline">
                <strong>{item.iataCode}</strong>
                <span className="text-sm">{item.address.countryCode}</span>
              </div>

              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-xs text-muted-foreground/80">
                {item.address.cityName}, {item.address.countryName}
              </p>
            </section>
          </article>
        )}
      />
    </section>
  );
}
