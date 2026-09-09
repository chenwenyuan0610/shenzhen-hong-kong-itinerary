(function (root, factory) {
  const api = factory();

  if (typeof module === "object" && module.exports) module.exports = api;
  root.AmapLinks = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function buildAmapMarkerUrl(point) {
    if (!point) return "";

    const params = new URLSearchParams({ src: "duck-bro-trip", callnative: "1" });
    if (point.amapPoiId) {
      params.set("poiid", point.amapPoiId);
      return `https://uri.amap.com/marker?${params.toString()}`;
    }

    const coordinates = Array.isArray(point.amapCoords) ? point.amapCoords : point.coords;
    if (!Array.isArray(coordinates) || coordinates.length !== 2) return "";

    const [latitude, longitude] = coordinates;
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return "";

    params.set("position", `${longitude},${latitude}`);
    params.set("name", point.name || "行程景點");
    params.set("coordinate", Array.isArray(point.amapCoords) ? "gaode" : "wgs84");

    return `https://uri.amap.com/marker?${params.toString()}`;
  }

  return { buildAmapMarkerUrl };
});
