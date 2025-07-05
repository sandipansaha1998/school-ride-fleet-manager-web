"use client";
import { CustomTable } from "@/components/CustomTable";
import RouteInfoView from "@/components/Routes/routeInfo";
import { routes as routesReponse } from "@/seedData/routes";
import { RouteInfoType } from "@/types/maps";
import { randomUUID } from "crypto";
import { Eye, Route, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";

enum RouteActions {
  ViewOnly,
  AddNew,
  Edit,
  Delete,
}

const Routes = () => {
  const [workingMode, setWorkingMode] = useState<RouteActions>(
    RouteActions.ViewOnly
  );
  const [routes, setRoutes] = useState<RouteInfoType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [routeName, setRouteName] = useState("");

  const handleAddRoute = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWorkingMode(RouteActions.AddNew);
    setShowModal(false);
  };

  useEffect(() => {
    const fetchRoutes = async () => {
      // Simulating a delay for fetching data
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Set the fetched routes to state (if needed)
      // setRoutes(routesReponse);
    };
    fetchRoutes();
  }, []);

  const routes1: RouteInfoType[] = [];
  return (
    <div className="  flex flex-col gap-2  border-red-500 min-h-screen">
      {workingMode === RouteActions.ViewOnly && (
        <div className="flex ms-10  mt-10 gap-2 items-center justify-between me-5 ">
          <div className="flex flex-col gap-2">
            <div className="text-4xl font-bold">Manage your Routes</div>
            <div className="text-xl ">
              Easily create, view, and manage all your routes in one place.
            </div>
          </div>
          <div
            className=" shadow px-5 py-3 rounded-md bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-black font-semibold flex items-center gap-2"
            onClick={handleAddRoute}
          >
            Add Route
          </div>
        </div>
      )}
      {workingMode === RouteActions.ViewOnly && (
        <div className=" max-h-screen overflow-y-auto ps-10 pe-2">
          <hr className="border-t-3 border-gray-200  w-full mx-auto my-3" />

          <CustomTable
            headers={["name", "stops", "activeBuses", "students"]}
            data={[
              {
                name: "Route 1",
                stops: Array.from(
                  { length: 25 },
                  (_, i) => `Stop ${i + 1}`
                ).join(", "),
                activeBuses: 2,
                students: 60,
              },
              {
                name: "Route 2",
                stops: Array.from(
                  { length: 25 },
                  (_, i) => `Stop ${String.fromCharCode(65 + (i % 26))}`
                ).join(", "),
                activeBuses: 1,
                students: 30,
              },
            ]}
          />
        </div>
      )}
      {workingMode === RouteActions.AddNew && (
        <div className="flex-1 flex  ">
          {" "}
          <RouteInfoView
            routeInfo={{ id: "TODO", name: routeName, points: [] }}
          />
        </div>
      )}
      {/* Modal */}
      {showModal && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm transition-opacity duration-800 ${
            showModal ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="bg-white rounded-lg shadow-lg p-8 min-w-[320px] transition-transform duration-300 transform scale-100">
            <Route className="h-25 w-25 mx-auto mb-10" />
            <div className="text-xl font-bold mb-4">Add Route Name</div>
            <form onSubmit={handleModalSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                className="border rounded-md px-3 py-2"
                placeholder="Enter route name"
                value={routeName}
                onChange={(e) => setRouteName(e.target.value)}
                required
                autoFocus
              />
              <div className="flex flex-col  gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleModalSubmit;
                  }}
                  type="submit"
                  className="px-4 py-2 rounded bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Routes;
