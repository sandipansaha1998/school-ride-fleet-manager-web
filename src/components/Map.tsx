"use client";
import { Point } from "@/types/maps";
import { decodePolyline } from "@/utils/googleMaps";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import React, { useRef, useEffect, useCallback } from "react";
import { Polyline } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const Map = ({
  schoolLocation,
  stops,
  centroid,
  polylines = [],
}: {
  schoolLocation?: Point;
  stops?: Point[];
  centroid?: Point;
  polylines?: string[];
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Called when map is loaded
  const onLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;
      setIsLoaded(true);
    },
    [mapRef.current]
  );

  // // Fit bounds and smooth pan when centroid or stops change
  useEffect(() => {
    console.log("Map useEffect triggered", stops);
    const map = mapRef.current;

    if (!map) return;

    // Collect all points: centroid + stops
    const points: Point[] = [];
    if (centroid) points.push(centroid);
    if (stops && stops.length > 0) points.push(...stops);

    console.log("Fitting bounds to points:", points);
    if (points.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      points.forEach((p) => bounds.extend({ lat: p.lat, lng: p.lng }));

      // Smooth pan to centroid if provided
      if (centroid) {
        map.panTo({ lat: centroid.lat, lng: centroid.lng });
      }

      // Fit bounds to all points (with some padding)
      map.fitBounds(bounds, 80);
    }
  }, [stops]);

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      loadingElement={<div>Loading...</div>}
      id="google-map-script"
      onLoad={() => {
        setIsLoaded(true);
      }}
      onError={(error) => {
        console.error("Error loading Google Maps script:", error);
      }}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={stops && stops.length === 1 ? schoolLocation : undefined}
        zoom={17}
        options={{
          disableDefaultUI: true,
          keyboardShortcuts: false,
        }}
        onLoad={onLoad}
      >
        {!isLoaded || window.google === null ? (
          <>Loading...</>
        ) : (
          <>
            {" "}
            {schoolLocation && (
              <>
                <Marker
                  position={schoolLocation}
                  icon={{
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 15,
                    fillColor: "white",
                    fillOpacity: 0.5,
                    strokeColor: "black",
                    strokeWeight: 2,
                    anchor: new window.google.maps.Point(-0.8, -0.75),
                  }}
                />
                <Marker
                  position={schoolLocation}
                  icon={{
                    path: "M12 2L2 10h3v10h6v-6h2v6h6V10h3z",
                    fillColor: "blue",
                    fillOpacity: 1,
                    strokeColor: "blue",
                    strokeWeight: 2,
                    scale: 1,
                    anchor: new window.google.maps.Point(0, 0),
                    labelOrigin: new window.google.maps.Point(15, 40),
                  }}
                  label={"SCHOOL"}
                />
              </>
            )}
            {stops &&
              stops.map(
                (marker, idx) =>
                  idx !== 0 && (
                    <Marker
                      key={idx}
                      position={{ lat: marker.lat, lng: marker.lng }}
                      label={{
                        text: `${idx}`,
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
                  )
              )}
            {polylines.length > 0 &&
              (() => {
                const points = decodePolyline(polylines[0]);
                points.forEach((p, idx) => (
                  <Marker
                    key={`poly-point-${idx}`}
                    position={{ lat: p.lat, lng: p.lng }}
                    icon={{
                      path: google.maps.SymbolPath.CIRCLE,
                      scale: 6,
                      fillColor: "red",
                      fillOpacity: 1,
                      strokeColor: "black",
                      strokeWeight: 1,
                    }}
                  />
                ));
                return (
                  <>
                    {/* Polyline connecting the markers */}
                    <Polyline
                      path={points.map((p) => ({
                        lat: p.lat,
                        lng: p.lng,
                      }))}
                      options={{
                        strokeColor: "#darkyellow",
                        strokeOpacity: 1,
                        strokeWeight: 3,
                      }}
                    />
                  </>
                );
              })()}
          </>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
