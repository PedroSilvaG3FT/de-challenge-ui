import React from "react";
import {
  FormItem,
  FormField,
  FormLabel,
  FormControl,
} from "@/design/components/ui/form";
import { useState, useEffect } from "react";
import { Input } from "@/design/components/ui/input";
import { Control, useFormContext } from "react-hook-form";

export interface IAppFormAutoCompleteProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  bindKey?: string;
  suggestions: any[];
  control: Control<any>;
  containerClassName?: string;
  renderItem?: (item: any) => React.ReactNode;
}

export default function AppFormAutoComplete({
  suggestions,
  containerClassName,
  renderItem,
  bindKey,
  ...props
}: IAppFormAutoCompleteProps) {
  const { control, name, label, required } = props;

  const { setValue, watch } = useFormContext();
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([]);

  const fieldValue = watch(name);

  useEffect(() => {
    setInputValue(fieldValue || "");
  }, [fieldValue]);

  const getItemValue = (item: any): string => {
    if (typeof item === "string") return item;
    if (bindKey && typeof item === "object") return item[bindKey] || "";
    return item.toString();
  };

  const handleChange = (value: string) => {
    setInputValue(value);
    setValue(name, value);
    handleFilter(value);
  };

  const handleFilter = (term: string) => {
    if (term) {
      const filtered = suggestions.filter((suggestion) =>
        getItemValue(suggestion).toLowerCase().includes(term.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else setFilteredSuggestions(suggestions);
  };

  const handleSuggestionClick = (suggestion: any) => {
    const value = getItemValue(suggestion);
    handleChange(value);
    setFilteredSuggestions([]);
    setIsFocused(false);
  };

  useEffect(() => {
    if (!isFocused) setFilteredSuggestions([]);
    else handleFilter(inputValue);
  }, [isFocused, inputValue]);

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={containerClassName || ""}>
          <div className="relative">
            {label && (
              <FormLabel>
                {required && <span className="text-red-400 mr-0.5">*</span>}
                {label}
              </FormLabel>
            )}
            <FormControl>
              <Input
                {...field}
                {...props}
                value={inputValue}
                onChange={(e) => handleChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              />
            </FormControl>

            {(filteredSuggestions.length > 0 || isFocused) && (
              <ul className="mt-1 border border-gray-300 rounded-lg max-h-48 overflow-y-auto bg-white shadow-lg absolute z-10 w-full">
                {filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {renderItem
                      ? renderItem(suggestion)
                      : getItemValue(suggestion)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </FormItem>
      )}
    />
  );
}
