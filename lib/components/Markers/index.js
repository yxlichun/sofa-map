"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Map_1 = require("../Map");
var useBindEvents_1 = require("../../hooks/useBindEvents");
var Icon_1 = require("../Icon");
var useContext = React.useContext, useEffect = React.useEffect, useState = React.useState;
function Markers(props) {
    var data = props.data, positions = props.positions, events = props.events;
    var map = useContext(Map_1.MapContext);
    var _a = useState([]), markers = _a[0], setMarkers = _a[1];
    useBindEvents_1.default(markers, events);
    useEffect(function () {
        if (!map) {
            return;
        }
        if (markers) {
            map.remove(markers);
        }
        var newMarkers;
        if (positions) {
            newMarkers = positions.map(function (item) {
                var markerOptions = {};
                markerOptions.position = item;
                return new AMap.Marker(markerOptions);
            });
        }
        else if (data) {
            newMarkers = data.map(function (item) {
                var markerOptions = {};
                if (item.position) {
                    var position = item.position, type = item.type, iconFontProps = __rest(item, ["position", "type"]);
                    markerOptions.position = item.position;
                    markerOptions.content = Icon_1.iconStr(type, iconFontProps);
                }
                return new AMap.Marker(markerOptions);
            });
        }
        if (newMarkers) {
            map.add(newMarkers);
            setMarkers(newMarkers);
        }
    }, [map, data, positions]);
    return null;
}
exports.default = Markers;
//# sourceMappingURL=index.js.map