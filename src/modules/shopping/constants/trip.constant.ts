import { ETripType } from "../enums/trip.enum";
import { IFormOption } from "@/modules/@shared/components/_interfaces/form-option.interface";

export const TripFormOptions: IFormOption[] = [
  { label: "One-way", value: ETripType.OneWay },
  { label: "Round-trip", value: ETripType.OneWay },
];
