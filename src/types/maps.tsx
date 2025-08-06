import { Address } from "./entities";

export interface PlacePrediction {
  description: string;
  placeId: string;
  structuredFormatting: {
    mainText: string;
    secondaryText: string;
  };
}

export interface BusRouteInfoType {
  id: string;
  name: string;
  stops: Address[];
  activeBuses?: number;
}

export interface Point {
  lat: number;
  lng: number;
}
