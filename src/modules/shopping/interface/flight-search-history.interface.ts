export interface IFlightSearchHistory {
  id: string;
  origin: string;
  destination: string;
  profileUserId: string;
  countPassengers: number;
  createdAt: Date | string;
  originDate: Date | string;
  higherPrice: string | number;
  lowestPrice: string | number;
  destinationDate: Date | string;
}
