import { z } from "zod";
import { format } from "date-fns";
import { cn } from "@/design/lib/utils";
import { useForm } from "react-hook-form";
import { ETripType } from "../../enums/trip.enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/design/components/ui/button";
import { IconPlaneDeparture } from "@tabler/icons-react";
import { FormContainer } from "@/design/components/ui/form";
import { ETravelClass } from "../../enums/travel-class.enum";
import { Separator } from "@/design/components/ui/separator";
import { TripFormOptions } from "../../constants/trip.constant";
import { IFlightSearchRequest } from "../../interface/flight.interface";
import AppFormSelect from "@/modules/@shared/components/form/form-select";
import PassengerSelectionComponent from "./_passenger-selection.component";
import { TravelClassFormOptions } from "../../constants/travel-class.constant";
import DestinationSelectionComponent from "./_destination-selection.component";
import AppFormDatepicker from "@/modules/@shared/components/form/form-datepicker";
import { CenterAbsoluteItemClassName } from "@/modules/@shared/constants/common-class-name.contant";
import { useEffect } from "react";
import { ArrowRightCircle } from "lucide-react";

interface IProps {
  className?: string;
  onSubmit: (data: IFlightSearchRequest) => void;
}

const formSchema = z.object({
  travelClass: z.nativeEnum(ETravelClass),
  tripType: z.nativeEnum(ETripType),
  origin: z.string().min(1, "Origin is required"),
  destination: z.string().min(1, "Destination is required"),
  dateRange: z
    .object({
      from: z.date({ required_error: "Departure date is required" }),
      to: z.date().optional(),
    })
    .or(z.date()),
  passengers: z.object({
    adult: z.number().int().min(1, "At least 1 adult is required"),
    children: z.number().int().min(0).default(0),
    infant: z.number().int().min(0).default(0),
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function FlightSearchComponent(props: IProps) {
  const { className, onSubmit } = props;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      origin: "",
      destination: "",
      tripType: ETripType.OneWay,
      travelClass: ETravelClass.Economy,
      dateRange: { from: new Date(), to: undefined },
      passengers: { adult: 1, children: 0, infant: 0 },
    },
  });

  const watchTripType = form.watch("tripType");

  function handleSubmitSearch(values: FormValues) {
    console.log("VALUES : ", values);
    const departureDate =
      values.dateRange instanceof Date
        ? format(values.dateRange, "yyyy-MM-dd")
        : format(values.dateRange.from, "yyyy-MM-dd");

    const returnDate =
      values.dateRange instanceof Date || !values.dateRange.to
        ? undefined
        : format(values.dateRange.to, "yyyy-MM-dd");

    onSubmit({
      returnDate,
      departureDate,
      adults: values.passengers.adult,
      travelClass: values.travelClass,
      infants: values.passengers.infant,
      originLocationCode: values.origin,
      children: values.passengers.children,
      destinationLocationCode: values.destination,
    });
  }

  return (
    <FormContainer {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitSearch)}
        className={cn(
          className,
          "bg-secondary shadow-md rounded-xl p-4 w-full relative"
        )}
      >
        <nav className="mb-3 flex gap-4 items-center w-2/4">
          <AppFormSelect
            name="travelClass"
            placeholder="Class"
            control={form.control}
            options={TravelClassFormOptions}
            className="bg-transparent border-none text-lg"
          />

          <AppFormSelect
            name="tripType"
            placeholder="Trip Type"
            control={form.control}
            options={TripFormOptions}
            className="bg-transparent border-none text-lg"
          />
        </nav>

        <section className="mb-6 grid gap-4 grid-cols-2">
          <DestinationSelectionComponent form={form} />

          <article className="relative grid gap-2 grid-cols-2 rounded-lg bg-white p-2">
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

            <Separator
              orientation="vertical"
              className={CenterAbsoluteItemClassName}
            />

            <PassengerSelectionComponent
              name="passengers"
              control={form.control}
              className="h-full border-none"
            />
          </article>
        </section>

        <Button
          type="submit"
          disabled={!form.formState.isValid}
          className="absolute left-1/2 transform -translate-x-1/2"
        >
          Search Flights
          <ArrowRightCircle className="ml-4" />
        </Button>
      </form>
    </FormContainer>
  );
}
