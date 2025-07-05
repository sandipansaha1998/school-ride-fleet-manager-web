import { getDirections } from "@/api/services.ts/maps";
import { Direction } from "@/types/entities";
import { RouteInfoType } from "@/types/maps";
import React, { useEffect, useState } from "react";

const useJourney = (initialRouteInfo: RouteInfoType) => {
  let [route, setRoute] = useState<RouteInfoType>(initialRouteInfo);
  const [directions, setDirections] = useState<Direction | undefined>(
    undefined
  );

  useEffect(() => {
    getDirections(
      route.stops[0].id,
      route.stops[route.stops.length - 1].id,
      route.stops.slice(1, -1).map((stop) => stop.id)
    ).then((data) => {
      if (data) {
        setDirections(data);
      }
    });
  }, [route]);

  const changeRouteName = (newName: string) => {
    setRoute((prev) => ({
      ...prev,
      name: newName,
    }));
  };

  const changeStopsOrder = (newOrder: typeof route.stops) => {
    setRoute((prev) => ({
      ...prev,
      stops: newOrder,
    }));
  };

  const deleteStop = (stopId: string) => {
    setRoute((prev) => ({
      ...prev,
      stops: prev.stops.filter((stop) => stop.id !== stopId),
    }));
  };
  return { route, changeRouteName, changeStopsOrder, deleteStop };
};

export default useJourney;
