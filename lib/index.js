"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

var Map_1 = require("../lib/components/Map");
exports.Map = Map_1.default;
exports.setAMapKey = Map_1.setAMapKey;
exports.setAMapVersion = Map_1.setAMapVersion;

var Navigate_1 = require("../lib/components/Navigate");
exports.Navigate = Navigate_1.default;

var Polygon_1 = require("../lib/components/Polygon");
exports.Polygon = Polygon_1.default;

var Polyline_1 = require("../lib/components/Polyline");
exports.Polyline = Polyline_1.default;

var Marker_1 = require("../lib/components/Marker");
exports.Marker = Marker_1.default;
exports.IconMarker = Marker_1.IconMarker;

var Markers_1 = require("../lib/components/Markers");
exports.Markers = Markers_1.default;

var MapPlayer_1 = require("../lib/components/MapPlayer");
exports.MapPlayer = MapPlayer_1.default;

exports.default = {
    Map: Map_1.default,
    Navigate: Navigate_1.default,
    Polygon: Polygon_1.default,
    Polyline: Polyline_1.default,
    Marker: Marker_1.default,
    MapPlayer: MapPlayer_1.default,
    Markers: Markers_1.default,

    IconMarker: Marker_1.IconMarker,
    setAMapKey: Map_1.setAMapKey,
    setAMapVersion: Map_1.setAMapVersion,
};
