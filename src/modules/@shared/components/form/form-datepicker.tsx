import { format } from "date-fns";
import { cn } from "@/design/lib/utils";
import { Control } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/design/components/ui/button";
import { Calendar } from "@/design/components/ui/calendar";
import {
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/design/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/design/components/ui/popover";
interface IAppFormDatePickerProps {
  name: string;
  label?: string;
  placeholder?: string;
  control: Control<any>;
  mode?: "single" | "range";
  containerClassName?: string;
  disabledDates?: (date: Date) => boolean;
}

export default function AppFormDatePicker(props: IAppFormDatePickerProps) {
  const {
    name,
    control,
    label = "",
    placeholder,
    disabledDates,
    containerClassName = "",
    mode = "single",
  } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col", containerClassName)}>
          {label && <FormLabel>{label}</FormLabel>}

          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {mode !== "range" ? (
                    <>
                      {field.value ? (
                        format(field.value, "dd/MM/yyyy")
                      ) : (
                        <span>{placeholder}</span>
                      )}
                    </>
                  ) : (
                    <>
                      {field?.value?.from ? (
                        field?.value.to ? (
                          <>
                            {format(field?.value.from, "dd/MM/yyyy")} -{" "}
                            {format(field?.value.to, "dd/MM/yyyy")}
                          </>
                        ) : (
                          format(field?.value.from, "dd/MM/yyyy")
                        )
                      ) : (
                        <span>{placeholder}</span>
                      )}
                    </>
                  )}

                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode={mode}
                initialFocus
                selected={field.value}
                onSelect={field.onChange}
                disabled={disabledDates}
              />
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
