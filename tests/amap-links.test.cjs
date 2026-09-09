const test = require("node:test");
const assert = require("node:assert/strict");

const { buildAmapMarkerUrl } = require("../amap-links.js");

test("builds a mobile-friendly Amap marker URL from a WGS84 itinerary point", () => {
  const url = new URL(buildAmapMarkerUrl({
    name: "華強北",
    coords: [22.5457, 114.0871]
  }));

  assert.equal(url.origin + url.pathname, "https://uri.amap.com/marker");
  assert.equal(url.searchParams.get("position"), "114.0871,22.5457");
  assert.equal(url.searchParams.get("name"), "華強北");
  assert.equal(url.searchParams.get("coordinate"), "wgs84");
  assert.equal(url.searchParams.get("callnative"), "1");
});

test("returns an empty string when a point has no usable coordinates", () => {
  assert.equal(buildAmapMarkerUrl({ name: "店家待定" }), "");
});

test("uses an Amap POI id when the itinerary point provides one", () => {
  const url = new URL(buildAmapMarkerUrl({
    name: "潮沫牛肉火鍋店（南頭老店）",
    amapPoiId: "B02F37TQHV",
    coords: [22.544881, 113.923785]
  }));

  assert.equal(url.searchParams.get("poiid"), "B02F37TQHV");
  assert.equal(url.searchParams.has("position"), false);
  assert.equal(url.searchParams.get("callnative"), "1");
});

test("prefers exact native Amap coordinates over map-display coordinates", () => {
  const url = new URL(buildAmapMarkerUrl({
    name: "深圳南山新豪方桔子水晶酒店",
    coords: [22.543731, 113.921149],
    amapCoords: [22.540978262626528, 113.92605543136597]
  }));

  assert.equal(url.searchParams.get("position"), "113.92605543136597,22.540978262626528");
  assert.equal(url.searchParams.get("coordinate"), "gaode");
});
