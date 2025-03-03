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
        className="!bg-transparent border-none mobile:h-8"
        popoverClassName="mobile:[width:calc(100dvw-84px)] mobile:left-0"
        renderItem={(item: IAirportItem) => (
          <article className="flex items-start p-2 group">
            <IconPlaneDeparture className="w-6 h-6 mr-3 text-primary flex-shrink-0 mt-1 transition-transform duration-500 group-hover:scale-110 mobile:mb-2 mobile:mr-0" />

            <section className="flex-grow w-full">
              <div className="flex justify-between items-baseline">
                <strong className="text-lg mobile:text-base">
                  {item.iataCode}
                </strong>
                <span className="text-sm mobile:text-xs ">
                  {item.address.countryCode}
                </span>
              </div>

              <p className="text-sm font-medium mt-1">{item.name}</p>
              <p className="text-xs text-muted-foreground/80 mt-1">
                {item.address.cityName}, {item.address.countryName}
              </p>
            </section>
          </article>
        )}
      />
    </section>
  );
}
