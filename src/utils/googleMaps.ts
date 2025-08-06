import { Point } from "@/types/maps";

/**
 * Decodes an encoded Google Maps polyline string into an array of coordinates
 * @param encoded The encoded polyline string from Google Directions API
 * @returns Array of LatLng coordinates for use with react-native-maps
 */
export function decodePolyline(encoded: string): Point[] {
  const poly: Point[] = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    // Decode latitude
    let b: number;
    let shift = 0;
    let result = 0;

    do {
      b = encoded.charCodeAt(index++) - 63; // 63 is ASCII for "?"
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20); // Continue while 6th bit is set

    const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    // Decode longitude
    shift = 0;
    result = 0;

    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    // Add point to array (dividing by 1e5 converts to actual decimal degrees)
    poly.push({
      lat: lat / 1e5,
      lng: lng / 1e5,
    });
  }

  return poly;
}
