import { PlacePrediction } from "@/types/maps";
import { MapsEndPoints } from "../endpoints";
import { getRequest, postRequest } from "../requests";
import { Address } from "@/types/entities";
export const getLocationByPlaceId = async (
  placeId: string
): Promise<Address> => {
  const response = await getRequest({
    url: MapsEndPoints.getLocationByPlaceId(placeId),
  });
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
  const response = await getRequest({
    url: MapsEndPoints.searchPlacesByName,
    queryParams: { name },
  });

  const predictions = response.predictions;
  const result: PlacePrediction[] = [];
  ``;

  try {
    for (const prediction of predictions) {
      result.push({
        description: prediction.description,
        placeId: prediction.place_id,
        structuredFormatting: prediction.structured_formatting,
        types: prediction.types,
      } as PlacePrediction);
    }
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
  const response = await postRequest(MapsEndPoints.getDirections(), {
    placeIDs: [origin, destination, ...(waypoints || [])],
  });

  return response;
};
