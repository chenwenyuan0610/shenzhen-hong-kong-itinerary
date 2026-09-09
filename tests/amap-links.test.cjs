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
