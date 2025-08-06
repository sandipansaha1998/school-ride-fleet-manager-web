"use client";
import React, { useEffect, useState } from "react";
import Map from "../Map";
import {
  ArrowDownToDotIcon,
  GripVerticalIcon,
  LocateFixedIcon,
  LocateIcon,
  LocationEdit,
  MapPin,
  Plus,
  PlusCircleIcon,
} from "lucide-react";
import JourneyIcon from "../JourneyIcon";
import { useSearchPlacesByName } from "@/hooks/useSearchPlacesByName";
import useSelectAddressByPlaceId from "@/hooks/useSelectAddressByPlaceId";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { Marker } from "react-google-maps";
import { getPolygonCentroid } from "@/utils/geometry";
import { BusRouteInfoType, Point } from "@/types/maps";
import { Direction, Route } from "@/types/entities";
import useJourney from "@/hooks/useJourney";
import { DAVSchool } from "@/seedData/identity";
import { saveRoute } from "@/api/services.ts/routes";

const RouteInfoView = ({ routeInfo }: { routeInfo: BusRouteInfoType }) => {
  let { id, name, stops } = routeInfo;

  let { route, updateStops, availableDirection } = useJourney(routeInfo);

  const [saving, setSaving] = useState(false);

  const handleSaveRoute = async () => {
    setSaving(true);
    if (availableDirection === undefined) {
      console.error("No available direction to save");
      setSaving(false);
      return;
    }
    try {
      await saveRoute({
        placeIDs: route.stops.map((stop) => stop.id),
        direction: availableDirection!.polyline,
        name: route.name,
      });
      // Optionally show a success message here
    } catch (error) {
      // Optionally handle error here
    } finally {
      setSaving(false);
    }
  };

  const {
    searchText,
    updateSearchText,
    searchResults,
    loading: searchPlacesLoading,
  } = useSearchPlacesByName();
  const {
    selectPlace: selectStop,
    selectedAddress: selectedStopAdress,
    loading: selectStopAddressLoading,
  } = useSelectAddressByPlaceId();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reordered = [...route.stops];
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);

    updateStops(reordered);
  };

  useEffect(() => {
    // If a stop is selected, update the route with the new stop
    if (!selectedStopAdress) return;

    // Check if the stop already exists in the route
    const existingStop = route.stops.find(
      (stop) => stop.id === selectedStopAdress.id
    );
    if (existingStop) return; // If it exists, do not add it again
    //  Add the stop to the route if a stop is selected
    updateStops([...route.stops, selectedStopAdress!]);
  }, [selectedStopAdress]);
  return (
    <div className="flex flex-1  ">
      <div className=" border border-gray-200 flex-col shadow-2xl w-[20vw] ">
        <div className="w-[95%]  mx-auto">
          <div className="text-xl ms-2 mt-[20px]">{route.name}</div>
          <hr className="border-t-3 border-gray-200  w-[95%] mx-auto my-3" />
          {route.stops.length == 0 && (
            <div className="text-center my-5"> No stops added yet</div>
          )}
          <div className="flex justify-start gap-2  mx-auto    ">
            {route.stops.length > 0 && (
              <JourneyIcon
                length={route.stops.length}
                showTraillingDots
                showLastDot={searchText !== undefined}
              />
            )}
            {route.stops.length > 0 && (
              <div className="flex flex-col gap-5 justify-start  flex-1 w-full   ">
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="points-list">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex flex-col gap-5 justify-center py-2 flex-1 "
                      >
                        {route.stops.map((stop, idx) => (
                          <Draggable
                            key={idx}
                            draggableId={`stop-${idx}`}
                            index={idx}
                          >
                            {(provided, snapshot) => (
                              <div
                                className={`border h-10 flex items-center rounded   ${
                                  snapshot.isDragging ? "bg-gray-100" : ""
                                }`}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                              >
                                <div
                                  {...provided.dragHandleProps}
                                  className="p-2 cursor-grab "
                                >
                                  <GripVerticalIcon className="w-4 h-4 text-gray-500" />
                                </div>
                                <input
                                  type="text"
                                  value={stop?.address || ""}
                                  className="w-full h-full px-2 outline-none"
                                  readOnly
                                  disabled
                                />
                                <button
                                  type="button"
                                  className="p-2 hover:text-red-600"
                                  aria-label="Delete"
                                  onClick={() => {
                                    // Delete callback for the stops
                                    // This will remove the stop from the route
                                    // and update the state
                                    let updatedStops = route.stops.filter(
                                      (s) => s.id !== stop.id
                                    );
                                    updateStops(updatedStops);
                                  }}
                                >
                                  &#10005;
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {searchText !== undefined && (
              <JourneyIcon length={1} showTraillingDots={false} />
            )}
            {searchText !== undefined && (
              <div className="border rounded-md h-10 flex items-center  w-[95%] mx-auto my-2  ">
                <input
                  type="text"
                  className="ps-2 w-full h-full  outline-none text-2xl"
                  value={searchText || ""}
                  onChange={(e) => {
                    updateSearchText(e.target.value);
                  }}
                  placeholder="Search for a stop"
                />
                {(selectStopAddressLoading || searchPlacesLoading) && (
                  <span className="mx-2 animate-spin text-gray-500">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  </span>
                )}
                <button
                  type="button"
                  className="p-2 hover:text-red-600"
                  aria-label="Delete"
                  onClick={() => {
                    updateSearchText(undefined);
                  }}
                >
                  &#10005;
                </button>
              </div>
            )}
          </div>

          <div
            onClick={() => {
              updateSearchText("");
            }}
            hidden={searchText !== undefined}
            className="h-12 flex justify-center  items-center my-5 mx-2 bg-yellow-400 hover:bg-yellow-500 transition-colors rounded font-light text-black cursor-pointer"
          >
            {" "}
            <PlusCircleIcon className="w-5 h-5 mr-2" />
            <span>Add stop</span>
          </div>
          <hr className="border-t-3 border-gray-200  w-[95%] mx-auto my-3" />
          {searchText !== undefined &&
            searchResults.map((result) => {
              return (
                <div
                  key={result.placeId}
                  onClick={() => {
                    selectStop(result.placeId);
                    updateSearchText(undefined);
                  }}
                  className="h-12 p-2 flex justify-start items-center  gap-2 hover:bg-gray-200 cursor-pointer px-2"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={result.description}
                >
                  <MapPin className="text-gray-500" />
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {result.description}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
      <div className="flex-3 ">
        {/* display the distance */}
        <div className="text-sm text-gray-500">
          Distance: {availableDirection?.distance}
          km
        </div>
        <Map
          schoolLocation={{ lat: DAVSchool.latitude, lng: DAVSchool.longitude }}
          centroid={getPolygonCentroid([
            { lat: DAVSchool.latitude, lng: DAVSchool.longitude },
            ...route.stops.map((stop) => ({
              lat: stop.latitude,
              lng: stop.longitude,
            })),
          ])}
          stops={route.stops.map((stop) => ({
            lat: stop.latitude,
            lng: stop.longitude,
          }))}
          polylines={availableDirection ? [availableDirection.polyline] : []}
        />
      </div>
      <div
        onClick={() => {
          handleSaveRoute();
        }}
        className="w-[200px] text-center fixed bottom-6 right-6 bg-yellow-400 hover:bg-yellow-500 transition-colors rounded px-6 py-3 shadow-lg cursor-pointer text-black font-semibold"
      >
        {saving ? "Saving..." : "Save"}
      </div>
    </div>
  );
};

export default RouteInfoView;
