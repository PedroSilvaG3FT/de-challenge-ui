import { format, parseISO } from "date-fns";
import { Calendar, Clock, Users } from "lucide-react";
import { IFlightItem } from "../../interface/flight.interface";

interface IProps {
  data: IFlightItem;
}

export default function FlightCardComponent(props: IProps) {
  const { data } = props;

  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), "MMM d, yyyy");
  };

  const formatTime = (dateString: string) => {
    return format(parseISO(dateString), "HH:mm");
  };

  return (
    <article className="h-min p-4 flex flex-col space-y-8 bg-background rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-foreground/10">
      <nav className="flex items-center justify-between mobile:flex-col mobile:items-start">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">
            {data.validatingAirlineCodes[0]}
          </span>
          <span>
            | {data.itineraries[0].segments[0].carrierName} -{" "}
            {data.itineraries[0].segments[0].number}
          </span>
        </div>

        <div>
          <p className="text-xl font-bold text-primary">
            {data.price.total} {data.price.currency}
          </p>
          <p className="text-xs text-right mobile:text-left">per person</p>
        </div>
      </nav>

      <section className="flex items-center justify-between relative">
        <div className="flex flex-col items-center z-10 bg-background">
          <p className="text-base font-semibold">
            {data.itineraries[0].segments[0].departure.iataCode}
          </p>
          <p className="text-xs">
            {formatTime(data.itineraries[0].segments[0].departure.at)}
          </p>
        </div>

        <div className="flex-grow mx-4 relative">
          <div className="absolute top-1/2 left-0 right-0 border-t-2 border-dashed border-foreground/10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-background px-2">
            <p className="text-xs text-center font-medium text-foreground/70">
              Duration: {data.itineraries[0].duration.replace("PT", "")}
            </p>
            <p className="text-xs text-center">
              {data.itineraries[0].segments.length > 1
                ? `${data.itineraries[0].segments.length - 1} stop(s)`
                : "Direct"}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center z-10 bg-background">
          <p className="text-base font-semibold">
            {
              data.itineraries[0].segments[
                data.itineraries[0].segments.length - 1
              ].arrival.iataCode
            }
          </p>
          <p className="text-xs">
            {formatTime(
              data.itineraries[0].segments[
                data.itineraries[0].segments.length - 1
              ].arrival.at
            )}
          </p>
        </div>
      </section>

      <footer className="flex gap-4 text-xs text-foreground/70">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-muted-foreground/50" />
          {formatDate(data.itineraries[0].segments[0].departure.at)}
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2 text-muted-foreground/50" />
          {formatTime(data.itineraries[0].segments[0].departure.at)}
        </div>
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-2 text-muted-foreground/50" />
          {data.numberOfBookableSeats} seats left
        </div>
      </footer>
    </article>
  );
}
