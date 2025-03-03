import { useState } from "react";
import { Filter } from "lucide-react";
import { cn } from "@/design/lib/utils";
import { Input } from "@/design/components/ui/input";
import { Label } from "@/design/components/ui/label";
import { Switch } from "@/design/components/ui/switch";
import { Button } from "@/design/components/ui/button";
import { Control, useController } from "react-hook-form";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/design/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/design/components/ui/popover";

interface IProps {
  name: string;
  className?: string;
  control: Control<any>;
}

export default function SearchFlightFilterComponent(props: IProps) {
  const { name, control, className } = props;

  const [isOpen, setIsOpen] = useState(false);
  const { field } = useController({ name, control });

  const updateFilter = (key: string, value: any) => {
    const data = { ...field.value };
    data[key] = value;
    field.onChange(data);
  };

  const getActiveFiltersCount = () => {
    let count = 0;

    if (field.value.max) count++;
    if (field.value.nonStop) count++;
    if (field.value.maxPrice) count++;
    if (field.value.currencyCode) count++;

    return count;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("justify-start text-left font-normal", className)}
        >
          <Filter className="mr-2 h-4 w-4" />
          <span>
            Filters{" "}
            {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Flight Filters</h4>
            <p className="text-sm text-muted-foreground">
              Customize your flight search.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="non-stop"
              checked={field.value.nonStop || false}
              onCheckedChange={(checked) => updateFilter("nonStop", checked)}
            />
            <Label htmlFor="non-stop">Non-stop flights only</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-price">Maximum Price</Label>
            <Input
              min={0}
              type="number"
              id="max-price"
              value={field.value.maxPrice || ""}
              onChange={(e) =>
                updateFilter(
                  "maxPrice",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              placeholder="Enter max price"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-results">Maximum Results</Label>
            <Input
              min={0}
              max={100}
              type="number"
              id="max-results"
              value={field.value.max || ""}
              placeholder="Enter max results"
              onChange={(e) =>
                updateFilter(
                  "max",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency-code">Currency</Label>
            <Select
              value={field.value.currencyCode || ""}
              onValueChange={(value) => updateFilter("currencyCode", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="BRL">BRL</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
