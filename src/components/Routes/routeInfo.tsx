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
import { Point } from "@/types/maps";
import { Direction, Route } from "@/types/entities";

const RouteInfoView = ({ routeInfo }: { routeInfo: Route }) => {
  let { id, name, points } = routeInfo;

  const [localRouteInstance, setlocalRouteInstance] = useState(routeInfo);

  const [localDirection, setlocalDirection] = useState<Direction | undefined>();
  useEffect(() => {
    setlocalRouteInstance(routeInfo);
  }, []);
  useEffect(() => {
    // make the api call to get the direction
  }, [localRouteInstance]);

  const {
    searchText,
    updateSearchText,
    searchResults,
    loading: searchPlacesLoading,
  } = useSearchPlacesByName();
  const {
    selectPlace,
    selectedAddress,
    loading: selectAddressLoading,
  } = useSelectAddressByPlaceId();

  useEffect(() => {
    if (selectedAddress === null) {
      return;
    }
    console.log("Selected Address: ", selectedAddress);
    setlocalRouteInstance({
      ...localRouteInstance,
      points: [...localRouteInstance.points, selectedAddress!],
    });
  }, [selectedAddress]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reordered = [...localRouteInstance.points];
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);

    setlocalRouteInstance((prev) => ({
      ...prev,
      points: reordered,
    }));
  };
  return (
    <div className="flex flex-1  ">
      <div className=" border border-gray-200 flex-col shadow-2xl w-[20vw] ">
        <div className="w-[95%]  mx-auto">
          <div className="text-xl ms-2 mt-[20px]">
            {localRouteInstance.name}
          </div>
          <hr className="border-t-3 border-gray-200  w-[95%] mx-auto my-3" />
          {localRouteInstance.points.length == 0 && (
            <div className="text-center my-5"> No stops added yet</div>
          )}
          <div className="flex justify-start gap-2  mx-auto    ">
            {localRouteInstance.points.length > 0 && (
              <JourneyIcon
                length={localRouteInstance.points.length}
                showTraillingDots
                showLastDot={searchText !== undefined}
              />
            )}
            {localRouteInstance.points.length > 0 && (
              <div className="flex flex-col gap-5 justify-start  flex-1 w-full   ">
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="points-list">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex flex-col gap-5 justify-center py-2 flex-1 "
                      >
                        {localRouteInstance.points.map((stop, idx) => (
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
                                />
                                <button
                                  type="button"
                                  className="p-2 hover:text-red-600"
                                  aria-label="Delete"
                                  onClick={() => {
                                    setlocalRouteInstance((prev) => ({
                                      ...prev,
                                      points: prev.points.filter(
                                        (_, index) => index !== idx
                                      ),
                                    }));
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
                  defaultValue={""}
                />
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
          {searchResults.map((result) => {
            return (
              <div
                onClick={() => {
                  selectPlace(result.placeId);
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
        <Map
          centroid={getPolygonCentroid(
            localRouteInstance.points.map((point) => ({
              lat: point.latitude,
              lng: point.longitude,
            }))
          )}
          markers={localRouteInstance.points.map((point) => ({
            lat: point.latitude,
            lng: point.longitude,
          }))}
        />
      </div>
    </div>
  );
};

export default RouteInfoView;
