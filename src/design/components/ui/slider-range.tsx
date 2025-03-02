import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/design/lib/utils";

interface SliderRangeProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
    "value" | "defaultValue"
  > {
  value?: [number, number];
  defaultValue?: [number, number];
  formatLabel?: (value: number) => string;
  className?: string;
}

const SliderRange = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderRangeProps
>(({ className, formatLabel, value, defaultValue, ...props }, ref) => {
  const [localValue, setLocalValue] = React.useState(
    value || defaultValue || [0, 100]
  );

  React.useEffect(() => {
    if (value) {
      setLocalValue(value);
    }
  }, [value]);

  const handleValueChange = (newValue: number[]) => {
    setLocalValue(newValue as [number, number]);
    if (props.onValueChange) {
      props.onValueChange(newValue);
    }
  };

  return (
    <div className="space-y-2">
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        value={localValue}
        onValueChange={handleValueChange}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        {[0, 1].map((index) => (
          <SliderPrimitive.Thumb
            key={index}
            className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          />
        ))}
      </SliderPrimitive.Root>
      <div className="flex justify-between text-sm text-gray-500">
        <span>{formatLabel ? formatLabel(localValue[0]) : localValue[0]}</span>
        <span>{formatLabel ? formatLabel(localValue[1]) : localValue[1]}</span>
      </div>
    </div>
  );
});

SliderRange.displayName = "SliderRange";

export { SliderRange };
