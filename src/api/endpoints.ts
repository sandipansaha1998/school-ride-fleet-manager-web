import { get } from "http";

export const SchoolEndPoints = {
  getSchools: "/schools",
};
export const RoutesEndPoints = {
  getRoutesForSchoolId: (schoolID: string) => `/routes/${schoolID}`,
};
export const MapsEndPoints = {
  searchPlacesByName: "/maps/search/places",
  getLocationByPlaceId: (placeId: string) =>
    `/maps/geometry?placeId=${placeId}`,
  getDirections: (origin: string, destination: string) =>
    `/maps/directions?origin=${origin}&destination=${destination}`,
};
