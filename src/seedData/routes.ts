export const routes: Route[] = Array.from({ length: 10 }, (_, routeIdx) => ({
  id: (routeIdx + 1).toString(),
  name: `Route ${routeIdx + 1}`,
  points: Array.from({ length: 10 }, (_, stopIdx) => ({
    id: `${routeIdx + 1}-${stopIdx + 1}`,
    address: `Stop ${stopIdx + 1}, Route ${routeIdx + 1}`,
    latitude: 22.5 + routeIdx * 0.01 + stopIdx * 0.001,
    longitude: 88.3 + routeIdx * 0.01 + stopIdx * 0.001,
  })),
  activeBuses: Math.floor(Math.random() * 5) + 1,
}));
