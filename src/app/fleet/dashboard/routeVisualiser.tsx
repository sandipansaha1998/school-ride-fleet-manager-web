import React from "react";
import { Marker } from "react-google-maps";

interface RouteVisualiserProps {
  lat: number;
  lng: number;
}

const mapContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "400px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  overflow: "hidden",
};

export const RouteVisualiser: React.FC<RouteVisualiserProps> = ({
  lat,
  lng,
}) => {
  return <Marker position={{ lat, lng }} />;
};

export default RouteVisualiser;
