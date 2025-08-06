// components/Map.tsx
"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import RouteVisualiser from "./routeVisualiser";
import { School } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "100%",
};
// const SCHOOL_LAT = 18.56;
// const SCHOOL_LNG = 73.8038;

const HOME_LAT = 18.5486063;
const HOME_LNG = 73.80475418029151;
export default function Map() {
  return (
    <div>asd</div>
    // <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
    //   <GoogleMap
    //     mapContainerStyle={containerStyle}
    //     center={{ lat: HOME_LAT, lng: HOME_LNG }}
    //     zoom={14}
    //     options={{
    //       disableDefaultUI: true,
    //       keyboardShortcuts: false,
    //     }}
    //   ></GoogleMap>
    // </LoadScript>
  );
}
