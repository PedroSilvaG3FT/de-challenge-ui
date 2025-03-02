import { format, parseISO } from "date-fns";
import { IFlightItem } from "../../interface/flight.interface";
import { ArrowRight, Calendar, Clock, Users } from "lucide-react";

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
    <article className="h-min bg-background rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-foreground/10">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">
              {data.validatingAirlineCodes[0]}
            </span>
            <span>|</span>
            <span className="text-lg text-gray-700">
              {data.itineraries[0].segments[0].carrierName}
            </span>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">
              {data.price.total} {data.price.currency}
            </p>
            <p className="text-sm">per person</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-lg font-semibold">
                {data.itineraries[0].segments[0].departure.iataCode}
              </p>
              <p className="text-sm">
                {formatTime(data.itineraries[0].segments[0].departure.at)}
              </p>
            </div>
            <ArrowRight className="text-muted-foreground/50" />
            <div className="text-center">
              <p className="text-lg font-semibold">
                {
                  data.itineraries[0].segments[
                    data.itineraries[0].segments.length - 1
                  ].arrival.iataCode
                }
              </p>
              <p className="text-sm">
                {formatTime(
                  data.itineraries[0].segments[
                    data.itineraries[0].segments.length - 1
                  ].arrival.at
                )}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-600">
              {data.itineraries[0].duration.replace("PT", "")}
            </p>
            <p className="text-xs">
              {data.itineraries[0].segments.length > 1
                ? `${data.itineraries[0].segments.length - 1} stop(s)`
                : "Direct"}
            </p>
          </div>
        </div>

        <div className="flex gap-4 justify-end text-sm text-gray-600">
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
        </div>
      </div>
    </article>
  );
}
