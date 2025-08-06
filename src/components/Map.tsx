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
  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    // setIsLoaded(true);
  }, []);

  // Fit bounds and smooth pan when centroid or stops change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Collect all points: centroid + stops
    const points: Point[] = [];
    if (centroid) points.push(centroid);
    if (stops && stops.length > 0) points.push(...stops);

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
  }, [centroid, stops]);
  useEffect(() => {
    const googleScript = document.getElementById("google-map-script");
    if (!googleScript) {
      return;
    }
    googleScript.addEventListener("load", () => {
      if (googleScript) {
        setIsLoaded(true);
      }
    });
    return () => {
      googleScript.removeEventListener("load", () => {});
    };
  });
  useEffect(() => {
    const googleScript = document.getElementById("google-map-script");

    if (typeof window !== "undefined" && window.google) {
      setIsLoaded(true);
    }
  }, [window]);

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
        center={centroid}
        zoom={17}
        options={{
          disableDefaultUI: true,
          keyboardShortcuts: false,
        }}
        onLoad={onLoad}
      >
        {schoolLocation && (
          <>
            {schoolLocation && (
              <>
                <Marker
                  position={schoolLocation}
                  icon={{
                    path: "M12 2L2 10h3v10h6v-6h2v6h6V10h3z",
                    fillColor: "#1976D2",
                    fillOpacity: 1,
                    strokeColor: "#0D47A1",
                    strokeWeight: 2,
                    scale: 1.1,
                  }}
                />
              </>
            )}
          </>
        )}

        {stops &&
          stops.map((marker, idx) => (
            <Marker
              key={idx}
              position={{ lat: marker.lat, lng: marker.lng }}
              label={{
                text: `${idx + 1}`,
                color: "black",
                fontWeight: "bold",
                fontSize: "14px",
              }}
              // icon={{
              //   path: google.maps.SymbolPath.CIRCLE,
              //   scale: 12,
              //   size: new window.google.maps.Size(20, 20),
              //   fillColor: "yellow",
              //   fillOpacity: 1,
              //   strokeColor: "black",
              //   strokeWeight: 3,
              //   labelOrigin: new window.google.maps.Point(0, 0),
              // }}
            />
          ))}
        {polylines.map((polyline, idx) => {
          const decodedPath = decodePolyline(polyline);
          // Generate a random color for each polyline
          const randomColor = `#${Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0")}`;
          return (
            <Polyline
              key={idx}
              path={decodedPath.map((p) => ({
                lat: p.lat,
                lng: p.lng,
              }))}
              options={{
                strokeColor: randomColor,
                strokeOpacity: 1,
                strokeWeight: 5,
              }}
            />
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
};

// ...existing code...
export default React.memo(Map);
