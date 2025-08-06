import { getDirections } from "@/api/services.ts/maps";
import { Direction } from "@/types/entities";
import { BusRouteInfoType, Point } from "@/types/maps";
import { decodePolyline } from "@/utils/googleMaps";
import React, { useEffect, useState } from "react";

const useJourney = (initialRouteInfo: BusRouteInfoType) => {
  let [route, setRoute] = useState<BusRouteInfoType>(initialRouteInfo);

  const [direction, setDirection] = useState<Direction | undefined>(undefined);
  const [availableDirection, setAvailableDirection] = useState<
    { polyline: string; distance: number } | undefined
  >();
  useEffect(() => {
    if (route.stops.length < 3) {
      return;
    }
    console.log(
      "Stop addresses:",
      route.stops.map((stop) => stop.address)
    );
    getDirections(
      route.stops[0].id,
      route.stops[route.stops.length - 1].id,
      route.stops.slice(1, -1).map((stop) => stop.id)
    ).then((data) => {
      let routes = data.routes;
      setAvailableDirection({
        polyline: routes.polyline,
        distance: routes.distance_km,
      });
    });
  }, [route]);

  const changeRouteName = (newName: string) => {
    setRoute((prev) => ({
      ...prev,
      name: newName,
    }));
  };

  const updateStops = (newStops: typeof route.stops) => {
    setRoute((prev) => ({
      ...prev,
      stops: newStops,
    }));
  };

  const deleteStop = (stopId: string) => {
    setRoute((prev) => ({
      ...prev,
      stops: prev.stops.filter((stop) => stop.id !== stopId),
    }));
  };
  return {
    route,
    changeRouteName,
    updateStops,
    deleteStop,
    direction,
    availableDirection,
  };
};

export default useJourney;
