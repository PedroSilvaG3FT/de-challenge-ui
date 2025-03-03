import { useRef, useState } from "react";
import Show from "@/modules/@shared/components/utils/show";
import SearchHeroComponent from "./_search-hero.component";
import { Separator } from "@/design/components/ui/separator";
import { FlightService } from "../../services/flight.service";
import FlightSearchFormComponent from "../../components/flight-search-form";
import FlightSearchInfoComponent from "../../components/flight-search-info";
import { scrollToElement } from "@/modules/@shared/functions/scroll.function";
import FlightSearchResultComponent from "../../components/flight-search-result";
import LoadingSearchComponent from "../../components/flight-search-result/_flight-search-loading.component";
import {
  IFlightItem,
  IFlightSearchRequest,
} from "../../interface/flight.interface";

export default function ShoppingSearchPage() {
  const resultsSectionRef = useRef<HTMLElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [inboundFlights, setInboundFlights] = useState<IFlightItem[]>([]);
  const [outboundFlights, setOutboundFlights] = useState<IFlightItem[]>([]);

  const scrollToResults = () => scrollToElement(resultsSectionRef, -100);

  const handleSubmitSearch = async (data: IFlightSearchRequest) => {
    scrollToResults();
    setIsLoading(true);
    setHasSearched(true);

    try {
      const { data: outboundResponse } = await FlightService.searchFlights({
        ...data,
        departureDate: data.departureDate,
      });

      setOutboundFlights(outboundResponse.data);

      if (data.returnDate) {
        const { data: inboundResponse } = await FlightService.searchFlights({
          ...data,
          departureDate: data.returnDate,
          originLocationCode: data.destinationLocationCode,
          destinationLocationCode: data.originLocationCode,
        });
        setInboundFlights(inboundResponse.data);
      } else setInboundFlights([]);
    } catch (error) {
      console.log(error);
      setOutboundFlights([]);
      setInboundFlights([]);
    } finally {
      setIsLoading(false);
      scrollToResults();
    }
  };

  return (
    <section className="min-h-screen">
      <SearchHeroComponent />

      <main className="app-container">
        <FlightSearchFormComponent
          onSubmit={handleSubmitSearch}
          className="relative z-10 -top-28"
        />

        <section ref={resultsSectionRef} className="pb-5">
          <Show>
            <Show.When condition={isLoading}>
              <LoadingSearchComponent />
            </Show.When>

            <Show.When condition={!hasSearched}>
              <FlightSearchInfoComponent />
            </Show.When>

            <Show.When
              condition={
                !isLoading &&
                hasSearched &&
                !outboundFlights.length &&
                !inboundFlights.length
              }
            >
              <div className="text-center py-10">
                <h2 className="text-2xl font-bold mb-4">No Flights Found</h2>
                <p>
                  We couldn't find any flights matching your search criteria.
                  Please try adjusting your search parameters.
                </p>
              </div>
            </Show.When>

            <Show.When
              condition={
                !isLoading &&
                hasSearched &&
                (outboundFlights.length > 0 || inboundFlights.length > 0)
              }
            >
              <article className="min-h-screen space-y-8">
                <FlightSearchResultComponent
                  title="Outbound Flights"
                  flights={outboundFlights}
                  onPageChange={scrollToResults}
                />

                {inboundFlights.length > 0 && (
                  <>
                    <Separator />

                    <FlightSearchResultComponent
                      title="Inbound Flights"
                      flights={inboundFlights}
                      onPageChange={scrollToResults}
                    />
                  </>
                )}
              </article>
            </Show.When>
          </Show>
        </section>
      </main>
    </section>
  );
}
