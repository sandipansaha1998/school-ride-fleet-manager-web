import { Point } from "./maps";

// all time is expressed in ISO format strings

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
  code: string;
  placeId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}
export interface Student {
  id: string;
  fullName: string;
  classInfo?: string;
  age: number;
  sex: "M" | "F" | "Other";
  code: string;
  address: Address;
  school: School;
}
export interface Bus {
  id: string;
  alias: string;
  vehicleNumber: string;
  capacity: number;
}

export interface Employee {
  id: string;
  fullName: string;
  role: "driver" | "operator";
  contactDetails: { phone: string; email?: string; imageUrl: string };
}
export type NewBusProps = {
  vehicleNumber: string;
  alias: string;
  capacity: number;
  vehicleNumberError?: string;
  aliasError?: string;
  capacityError?: string;
};

export type TripProps = {
  id: string;
  name: string;
  stops: { students: Student[]; stopDetails: Address; eta: string }[];
  bus: Bus;
  driver: Employee;
  operator: Employee;
  startingTime: string;
};
