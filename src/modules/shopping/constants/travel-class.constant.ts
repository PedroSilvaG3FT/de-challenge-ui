import { ETravelClass } from "../enums/travel-class.enum";
import { IFormOption } from "@/modules/@shared/components/_interfaces/form-option.interface";

export const TravelClassFormOptions: IFormOption[] = [
  { label: "Economy", value: ETravelClass.Economy },
  { label: "Premium Economy", value: ETravelClass.PremiumEconomy },
  { label: "Business", value: ETravelClass.Business },
  { label: "First", value: ETravelClass.First },
];
