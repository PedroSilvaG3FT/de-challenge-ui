import { z } from "zod";
import { cn } from "@/design/lib/utils";
import { useForm } from "react-hook-form";
import { ArrowLeftRight } from "lucide-react";
import { ETripType } from "../../enums/trip.enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/design/components/ui/button";
import { FormContainer } from "@/design/components/ui/form";
import { ETravelClass } from "../../enums/travel-class.enum";
import { TripFormOptions } from "../../constants/trip.constant";
import AirportSearchComponent from "./_airport-search.component";
import AppFormSelect from "@/modules/@shared/components/form/form-select";
import { TravelClassFormOptions } from "../../constants/travel-class.constant";
import AppFormDatepicker from "@/modules/@shared/components/form/form-datepicker";
import AppFormRadioGroup from "@/modules/@shared/components/form/form-radio-group";

interface IProps {
  className?: string;
}

const formSchema = z.object({
  travelClass: z.nativeEnum(ETravelClass),
  tripType: z.nativeEnum(ETripType),
  origin: z.string().min(1, "Campo obrigatório"),
  destination: z.string().min(1, "Campo obrigatório"),
  dateRange: z.object({
    from: z.date(),
    to: z.date().optional(),
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function FlightSearchComponent(props: IProps) {
  const { className } = props;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      origin: "",
      destination: "",
      tripType: ETripType.OneWay,
      travelClass: ETravelClass.Economy,
      dateRange: { from: new Date(), to: undefined },
    },
  });

  const watchTripType = form.watch("tripType");

  function onSubmit(values: FormValues) {
    console.log("Form values:", values);
  }

  return (
    <FormContainer {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          className,
          "bg-secondary shadow-md rounded-xl p-4 w-full"
        )}
      >
        <nav className="grid gap-4 grid-cols-2 items-center w-2/4">
          <AppFormSelect
            name="travelClass"
            placeholder="Class"
            control={form.control}
            options={TravelClassFormOptions}
          />

          <AppFormRadioGroup
            name="tripType"
            control={form.control}
            options={TripFormOptions}
            containerClassName="flex-row gap-6"
          />
        </nav>

        <section className="my-6 grid gap-4 grid-cols-2">
          <article className="relative grid grid-cols-2 rounded-lg bg-white p-2">
            <AirportSearchComponent
              name="origin"
              placeholder="Origin"
              control={form.control}
            />

            <Button
              size="icon"
              variant="ghost"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <ArrowLeftRight className="text-primary" />
            </Button>

            <AirportSearchComponent
              name="destination"
              control={form.control}
              placeholder="Destination"
              containerClassName="pl-4"
            />
          </article>

          <article className="relative grid grid-cols-1 rounded-lg bg-white p-2">
            <AppFormDatepicker
              name="dateRange"
              control={form.control}
              className="border-transparent h-full w-full"
              isRange={watchTripType === ETripType.RoundTrip}
              placeholder={
                watchTripType === ETripType.OneWay
                  ? "Departure Date"
                  : "Travel Dates"
              }
            />
          </article>
        </section>

        <Button type="submit">Search Flights</Button>
      </form>
    </FormContainer>
  );
}
