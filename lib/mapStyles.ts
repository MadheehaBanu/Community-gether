export const WARM_MAP_STYLE = {
  version: 8 as const,
  sources: {
    osm: {
      type: "raster" as const,
      tiles: [
        "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
      attribution: "© Stadia Maps © OpenMapTiles",
    },
  },
  layers: [
    {
      id: "osm",
      type: "raster" as const,
      source: "osm",
      paint: {
        "raster-saturation": -0.3,
        "raster-brightness-min": 0.05,
        "raster-contrast": -0.1,
      },
    },
  ],
};
