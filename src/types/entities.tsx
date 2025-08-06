import { Point } from "./maps";

export interface Route {
  id: string;
  name: string;
  points: Address[];
}

export interface Address {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface Direction {
  origin: Point;
  destination: Point;
  waypoints: Point[];
}

export interface School {
  id: string;
  placeId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}
