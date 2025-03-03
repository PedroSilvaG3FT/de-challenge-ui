import { Globe, Plane, Search } from "lucide-react";
import Each from "@/modules/@shared/components/utils/each";
import FlightSearchInfoCardComponent from "./_flight-search-info-card";
import { IFlightCardInfo } from "../../interface/flight-card-info.interface";
import { FlightSearchInfoMapComponent } from "./_flight-search-info-map";

export default function FlightSearchInfoComponent() {
  const data: IFlightCardInfo[] = [
    {
      icon: Plane,
      title: `Find the Best Flights`,
      bgImage: `/images/search-hero-bg.jpg`,
      description: `Discover amazing deals to destinations worldwide. Compare prices, schedules, and airlines in seconds.`,
    },
    {
      icon: Globe,
      title: `Explore New Destinations`,
      bgImage: `/images/search-hero-bg.jpg`,
      description: `From paradise beaches to vibrant cities, plan your next adventure with ease and confidence.`,
    },
    {
      icon: Search,
      title: `Save on Your Trip`,
      bgImage: `/images/search-hero-bg.jpg`,
      description: `Enjoy exclusive fares and special promotions to travel more while spending less. Let me know if you need any adjustments!`,
    },
  ];

  return (
    <section>
      <FlightSearchInfoMapComponent />

      <section className="grid gap-4 grid-cols-3 relative -top-20">
        <Each
          data={data}
          render={(item) => <FlightSearchInfoCardComponent data={item} />}
        />
      </section>
    </section>
  );
}
