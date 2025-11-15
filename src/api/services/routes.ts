import { Address } from "@/types/entities";
import { RoutesEndPoints } from "../endpoints";
import { getRequest, postRequest } from "../requests";
import { BusRouteInfoType } from "@/types/maps";

/**
 * Fetches all routes from the backend.
 * @returns Promise<Route[]>
 */
export const getRoutes = async (
  schoolID: string
): Promise<BusRouteInfoType[]> => {
  try {
    const response = await getRequest({
      url: RoutesEndPoints.getRoutesForSchoolId(schoolID),
    });
    const routes: BusRouteInfoType[] = [];
    response.forEach((routeData: any) => {
      let stops: Address[] = [];
      routeData.stops.forEach((stopData: any) => {
        const stop: Address = {
          id: stopData.id,
          address: stopData.full_address,
          latitude: stopData.lat,
          longitude: stopData.lng,
        };
        stops.push(stop);
      });
      const route: BusRouteInfoType = {
        id: routeData.id,
        name: routeData.name,
        stops: routeData.stops,
        activeBuses: routeData.activeBuses,
      };
      routes.push(route);
    });
    return routes;
  } catch (error) {
    console.error("Error fetching routes:", error);
    throw error;
  }
};
export const saveRoute = async (route: {
  placeIDs: string[];
  direction: string;
  name: string;
  distance: number;
}): Promise<void> => {
  try {
    const response = await postRequest(RoutesEndPoints.saveRoute, route);
  } catch (error) {
    console.error("Error saving route:", error);
    throw error;
  }
};
