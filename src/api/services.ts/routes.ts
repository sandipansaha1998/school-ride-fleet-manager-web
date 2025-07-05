import { routes } from "@/seedData/routes";
import { RoutesEndPoints } from "../endpoints";
import { getRequest } from "../requests";
import { Route } from "@/types/entities";

/**
 * Fetches all routes from the backend.
 * @returns Promise<Route[]>
 */
export const getRoutes = async (schoolID: string): Promise<Route[]> => {
  try {
    const response = await getRequest(
      RoutesEndPoints.getRoutesForSchoolId(schoolID)
    );
    if (response.status !== "OK") {
      throw new Error(`Error fetching routes: ${response.statusText}`);
    }
    return routes;
    // return response.routes as Route[];
  } catch (error) {
    console.error("Error fetching routes:", error);
    throw error;
  }
};
