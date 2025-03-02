import { useState } from "react";
import { Button } from "@/design/components/ui/button";
import { Minus, Plus, User, Users } from "lucide-react";
import { Control, useController } from "react-hook-form";
import { PassengerType } from "../../types/passenger.type";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/design/components/ui/popover";
import { cn } from "@/design/lib/utils";

interface IProps {
  name: string;
  className?: string;
  control: Control<any>;
}

export default function PassengerSelectionComponent(props: IProps) {
  const { name, control, className } = props;

  const [isOpen, setIsOpen] = useState(false);
  const { field } = useController({ name, control });

  const updatePassengers = (type: PassengerType, increment: boolean) => {
    const data = { ...field.value };

    if (increment) data[type]++;
    else {
      if (type === "adult") data[type] = Math.max(1, data[type] - 1);
      else if (data[type] > 0) data[type]--;
    }

    field.onChange(data);
  };

  const totalPassengers =
    field.value.adult + field.value.children + field.value.infant;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            className
          )}
        >
          <User className="mr-2 h-4 w-4" />
          <span>
            {totalPassengers} Passenger{totalPassengers !== 1 ? "s" : ""}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Users className="mb-2" />
            <h4 className="font-medium leading-none">Passengers</h4>
            <p className="text-sm text-muted-foreground">
              Add or remove passengers for your trip.
            </p>
          </div>
          {["adult", "children", "infant"].map((type) => (
            <div key={type} className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium leading-none">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </p>

                <p className="text-sm text-muted-foreground/60">
                  {type === "adult"
                    ? "12+ years"
                    : type === "children"
                    ? "2-11 years"
                    : "Under 2"}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => updatePassengers(type as PassengerType, false)}
                >
                  <Minus className="h-4 w-4 text-primary" />
                </Button>

                <span className="w-8 text-center">{field.value[type]}</span>

                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => updatePassengers(type as PassengerType, true)}
                >
                  <Plus className="h-4 w-4 text-primary" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
