"use client";
import { Point } from "@/types/maps";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import React, { useState, useEffect, useRef, useCallback } from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const Map = ({
  markers,
  centroid,
}: {
  markers?: Point[];
  centroid?: Point;
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<Marker | null>(null);

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      loadingElement={<div>Loadin123g...</div>}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        // center={centroid}
        center={centroid || { lat: 18.541415, lng: 73.79108219999999 }}
        zoom={17}
        options={{
          disableDefaultUI: true,
          keyboardShortcuts: false,
        }}
      >
        <Marker
          position={{ lat: 18.541415, lng: 73.79108219999999 }}
          icon={{
            path: "M12 2L2 10h3v10h6v-6h2v6h6V10h3z",
            fillColor: "#1976D2",
            fillOpacity: 1,
            strokeColor: "#0D47A1",
            strokeWeight: 2,
            scale: 1.1,
            // anchor: new window.google.maps.Point(12, 24),
          }}
        />
        {markers &&
          markers.map((marker, idx) => (
            <Marker
              key={idx}
              position={{ lat: marker.lat, lng: marker.lng }}
              label={{
                text: `${idx + 1}`,
                color: "black",
                fontWeight: "bold",
                fontSize: "14px",
              }}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 12,
                size: new window.google.maps.Size(20, 20),
                fillColor: "yellow",
                fillOpacity: 1,
                strokeColor: "black",
                strokeWeight: 3,
                labelOrigin: new window.google.maps.Point(0, 0),
              }}
            />
          ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
