import { Point } from "@/types/maps";

/**
 * Calculates the centroid of a closed polygon given an array of points.
 * For 1 or 2 points, returns the first point as { lat, lng }.
 * Returns undefined if no points are provided.
 * @param points Array of points representing the polygon
 * @returns The centroid as { lat, lng } or undefined
 */
export function getPolygonCentroid(
  points: Point[]
): { lat: number; lng: number } | undefined {
  if (!points || points.length === 0) return undefined;
  if (points.length === 1 || points.length === 2) {
    return { lat: points[0].lat, lng: points[0].lng };
  }

  // Closed polygon: repeat first point at end
  const closedPoints = [...points, points[0]];
  let area = 0,
    cx = 0,
    cy = 0;

  for (let i = 0; i < closedPoints.length - 1; i++) {
    const xi = closedPoints[i].lat,
      yi = closedPoints[i].lng;
    const xi1 = closedPoints[i + 1].lat,
      yi1 = closedPoints[i + 1].lng;
    const cross = xi * yi1 - xi1 * yi;
    area += cross;
    cx += (xi + xi1) * cross;
    cy += (yi + yi1) * cross;
  }

  area *= 0.5;
  if (area === 0) return undefined; // Prevent division by zero

  cx /= 6 * area;
  cy /= 6 * area;

  return { lat: cx, lng: cy };
}
