import { routes } from "@/seedData/routes";
import { RoutesEndPoints } from "../endpoints";
import { getRequest, postRequest } from "../requests";
import { Route } from "@/types/entities";

/**
 * Fetches all routes from the backend.
 * @returns Promise<Route[]>
 */
export const getRoutes = async (schoolID: string): Promise<Route[]> => {
  try {
    const response = await getRequest({
      url: RoutesEndPoints.getRoutesForSchoolId(schoolID),
    });
    if (response.status !== "OK") {
      throw new Error(`Error fetching routes: ${response.statusText}`);
    }
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
}): Promise<void> => {
  try {
    const response = await postRequest(RoutesEndPoints.saveRoute, route);
    if (response.status !== "OK") {
      throw new Error(`Error saving route: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error saving route:", error);
    throw error;
  }
};
