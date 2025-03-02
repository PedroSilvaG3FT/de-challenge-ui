export interface IAirportGeoCode {
  latitude: number;
  longitude: number;
}

export interface IAirportAddress {
  cityName: string;
  cityCode: string;
  countryName: string;
  countryCode: string;
  regionCode: string;
}

export interface IAirportSelf {
  href: string;
  methods: string[];
}

export interface IAirportItem {
  id: string;
  type: string;
  name: string;
  subType: string;
  iataCode: string;
  self: IAirportSelf;
  detailedName: string;
  timeZoneOffset: string;
  geoCode: IAirportGeoCode;
  address: IAirportAddress;
}
