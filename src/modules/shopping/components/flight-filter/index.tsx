import { useState, useEffect } from "react";
import useDebounce from "@/hooks/debounce.hook";
import { Label } from "@/design/components/ui/label";
import { Checkbox } from "@/design/components/ui/checkbox";
import { useForm, Controller, useWatch } from "react-hook-form";
import { SliderRange } from "@/design/components/ui/slider-range";
import { RadioGroup, RadioGroupItem } from "@/design/components/ui/radio-group";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/design/components/ui/accordion";
import {
  IFilterOptions,
  IAppliedFilters,
} from "../../helpers/flight-search.helper";

interface FlightFilterProps {
  filterOptions: IFilterOptions;
  onFilterChange: (filters: IAppliedFilters) => void;
}

export default function FlightFilterComponent({
  filterOptions,
  onFilterChange,
}: FlightFilterProps) {
  const [openItems, setOpenItems] = useState<string[]>(["stops", "price"]);

  const { control } = useForm<IAppliedFilters>({
    defaultValues: {
      stops: "All",
      airlines: [],
      priceRange: filterOptions.priceRange,
      durationRange: filterOptions.durationRange,
      departureTimeRange: filterOptions.departureTimeRange,
    },
  });

  const watchedFilters = useWatch({ control });
  const debouncedFilters = useDebounce(watchedFilters, 300);

  useEffect(() => {
    if (debouncedFilters) onFilterChange(debouncedFilters as IAppliedFilters);
  }, [debouncedFilters, onFilterChange]);

  const formatCurrency = (value: number) =>
    `${value.toFixed(2).replace(".", ",")}`;
  const formatHours = (value: number) =>
    `${value.toFixed(1).replace(".", ":")}h`;
  const formatTime = (value: number) =>
    `${Math.floor(value).toString().padStart(2, "0")}:00`;

  return (
    <Accordion
      type="multiple"
      value={openItems}
      onValueChange={setOpenItems}
      className="w-full"
    >
      <AccordionItem value="stops">
        <AccordionTrigger className="text-sm">Stops</AccordionTrigger>
        <AccordionContent>
          <Controller
            name="stops"
            control={control}
            defaultValue="All"
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                {filterOptions.stops.map((stop) => (
                  <div key={stop} className="flex items-center space-x-2">
                    <RadioGroupItem value={stop} id={stop} />
                    <Label htmlFor={stop}>{stop}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="price">
        <AccordionTrigger className="text-sm">Price</AccordionTrigger>
        <AccordionContent className="py-2">
          <Controller
            name="priceRange"
            control={control}
            defaultValue={filterOptions.priceRange}
            render={({ field }) => (
              <SliderRange
                min={filterOptions.priceRange[0]}
                max={filterOptions.priceRange[1]}
                step={1}
                value={field.value}
                onValueChange={field.onChange}
                formatLabel={formatCurrency}
              />
            )}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="airlines">
        <AccordionTrigger className="text-sm">Airlines</AccordionTrigger>
        <AccordionContent className="space-y-2">
          {Object.entries(filterOptions.airlines).map(([code, name]) => (
            <section key={code} className="flex items-center space-x-2">
              <Controller
                name="airlines"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <Checkbox
                    id={code}
                    checked={field.value.includes(code)}
                    onCheckedChange={(checked) => {
                      const updatedValue = checked
                        ? [...field.value, code]
                        : field.value.filter((value) => value !== code);
                      field.onChange(updatedValue);
                    }}
                  />
                )}
              />
              <Label htmlFor={code} className="font-light">
                {name}
              </Label>
            </section>
          ))}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="duration">
        <AccordionTrigger className="text-sm">Duration</AccordionTrigger>
        <AccordionContent className="py-2">
          <Controller
            name="durationRange"
            control={control}
            defaultValue={filterOptions.durationRange}
            render={({ field }) => (
              <SliderRange
                min={filterOptions.durationRange[0]}
                max={filterOptions.durationRange[1]}
                step={0.5}
                value={field.value}
                onValueChange={field.onChange}
                formatLabel={formatHours}
              />
            )}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="departureTime">
        <AccordionTrigger className="text-sm">Departure Time</AccordionTrigger>
        <AccordionContent className="py-2">
          <Controller
            name="departureTimeRange"
            control={control}
            defaultValue={filterOptions.departureTimeRange}
            render={({ field }) => (
              <SliderRange
                min={0}
                max={24}
                step={1}
                value={field.value}
                formatLabel={formatTime}
                onValueChange={field.onChange}
              />
            )}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
