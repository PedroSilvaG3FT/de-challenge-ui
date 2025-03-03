import React, { useState } from "react";
import { Button } from "@/design/components/ui/button";
import { SortAsc } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/design/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/design/components/ui/radio-group";
import { Label } from "@/design/components/ui/label";
import { EFlightSortType } from "../../enums/flight-sort.enum";
import { FlightSortOptions } from "../../constants/flight-sort.constant";

interface IProps {
  onSortChange: (sortType: EFlightSortType) => void;
}

export default function FlightSearchSortComponent({ onSortChange }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<EFlightSortType>(
    EFlightSortType.LowestPrice
  );

  const handleSortChange = (value: EFlightSortType) => {
    setSelectedSort(value);
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="justify-start text-left font-normal"
        >
          <SortAsc className="mr-2 h-4 w-4" />
          <span>
            Sort:{" "}
            {
              FlightSortOptions.find((option) => option.value === selectedSort)
                ?.label
            }
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <RadioGroup value={selectedSort} onValueChange={handleSortChange}>
          {FlightSortOptions.map((option) => (
            <div
              key={option.value}
              className="flex items-center space-x-2 mb-2"
            >
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </PopoverContent>
    </Popover>
  );
}
