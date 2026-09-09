(function (root, factory) {
  const api = factory();

  if (typeof module === "object" && module.exports) module.exports = api;
  root.AmapLinks = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function buildAmapMarkerUrl(point) {
    if (!point || !Array.isArray(point.coords) || point.coords.length !== 2) return "";

    const [latitude, longitude] = point.coords;
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return "";

    const params = new URLSearchParams({
      position: `${longitude},${latitude}`,
      name: point.name || "行程景點",
      src: "duck-bro-trip",
      coordinate: "wgs84",
      callnative: "1"
    });

    return `https://uri.amap.com/marker?${params.toString()}`;
  }

  return { buildAmapMarkerUrl };
});
