import { DateRange } from "react-day-picker";
import { Control, useController } from "react-hook-form";
import DatePicker from "@/design/components/ui/datepicker";
import DatePickerRange from "@/design/components/ui/datepicker-range";
interface IAppFormDatepickerProps {
  name: string;
  control: Control<any>;
  isRange?: boolean;
  label?: string;
}

export default function AppFormDatepicker({
  name,
  control,
  isRange = false,
  label,
}: IAppFormDatepickerProps) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <div>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900">
          {/* {props.required && <span className="text-red-400 mr-0.5">*</span>} */}
          {label}
        </label>
      )}
      {isRange ? (
        <DatePickerRange
          value={value as DateRange}
          onChange={(newValue) => onChange(newValue)}
        />
      ) : (
        <DatePicker
          value={value as Date}
          onChange={(newValue) => onChange(newValue)}
        />
      )}
      {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
    </div>
  );
}
