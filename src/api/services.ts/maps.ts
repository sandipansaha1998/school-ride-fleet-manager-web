import { PlacePrediction } from "@/types/maps";
import { MapsEndPoints } from "../endpoints";
import { getRequest } from "../requests";
import { Address } from "@/types/entities";
export const getLocationByPlaceId = async (
  placeId: string
): Promise<Address> => {
  console.log("Fetching geometry for place ID:", placeId);
  const response = await getRequest(
    MapsEndPoints.getLocationByPlaceId(placeId)
  );
  console.log("Response from getLocationByPlaceId:", response);
  let addressString = response.address.split(",");

  return {
    id: placeId,
    address: response.address,
    latitude: response.lat,
    longitude: response.lng,
  };
};

export const getPlacesByName = async (
  name: string
): Promise<PlacePrediction[]> => {
  console.log("Fetching places by name:", name);
  const response = await getRequest(MapsEndPoints.searchPlacesByName, { name });

  const predictions = response.predictions;
  const result: PlacePrediction[] = [];

  try {
    for (const prediction of predictions) {
      result.push({
        description: prediction.description,
        placeId: prediction.place_id,
        structuredFormatting: prediction.structured_formatting,
        types: prediction.types,
      } as PlacePrediction);
    }
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error processing prediction:", error);
    throw new Error(`Error processing prediction: ${error}`);
  }
};

export const getDirections = async (
  origin: string,
  destination: string,
  waypoints?: string[]
): Promise<any> => {
  console.log("Fetching directions from", origin, "to", destination);
  const params: any = {};
  if (waypoints && waypoints.length > 0) {
    params.waypoints = waypoints;
  }
  const response = await getRequest(
    MapsEndPoints.getDirections(origin, destination),
    params
  );
  console.log("Response from getDirections:", response);
  if (response.status !== "OK") {
    throw new Error(`Error fetching directions: ${response.statusText}`);
  }
  return response;
};
