import { cn } from "@/design/lib/utils";
import { ArrowLeftRight } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/design/components/ui/button";
import { Separator } from "@/design/components/ui/separator";
import AirportSearchComponent from "./_airport-search.component";
import { CenterAbsoluteItemClassName } from "@/modules/@shared/constants/common-class-name.contant";
import useScreenSize from "@/hooks/screen-size.hook";

interface IProps {
  form: UseFormReturn<any>;
}

export default function DestinationSelectionComponent(props: IProps) {
  const { form } = props;
  const { isMobile } = useScreenSize();

  const swapOriginAndDestination = () => {
    const origin = form.getValues("origin");
    const destination = form.getValues("destination");

    form.setValue("origin", destination);
    form.setValue("destination", origin);
  };

  return (
    <article className="relative grid gap-12 grid-cols-2 rounded-lg bg-background border border-foreground/10 p-2 mobile:grid-cols-1">
      <AirportSearchComponent
        name="origin"
        placeholder="Origin"
        control={form.control}
      />

      <Separator
        className={CenterAbsoluteItemClassName}
        orientation={isMobile ? "horizontal" : "vertical"}
      />

      <Button
        size="icon"
        type="button"
        onClick={swapOriginAndDestination}
        className={cn(
          CenterAbsoluteItemClassName,
          "rounded-full scale-75 transition-transform duration-500 hover:scale-90"
        )}
      >
        <ArrowLeftRight className="w-4 h-4" />
      </Button>

      <AirportSearchComponent
        name="destination"
        control={form.control}
        placeholder="Destination"
      />
    </article>
  );
}
