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
var Icons_1 = require("../Icons");
var useContext = React.useContext, useEffect = React.useEffect, useState = React.useState;
;
function Marker(props) {
    var markerOptions = props.markerOptions, events = props.events;
    var map = useContext(Map_1.MapContext);
    var _a = useState(null), marker = _a[0], setMarker = _a[1];
    useBindEvents_1.default(marker, events);
    useEffect(function () {
        if (!map) {
            return;
        }
        if (marker) {
            map.remove([marker]);
        }
        var newMarker = new AMap.Marker(markerOptions);
        map.add(newMarker);
        setMarker(marker);
    }, [map, markerOptions]);
    return null;
}
exports.default = Marker;
function IconMarker(props) {
    var position = props.position, type = props.type, iconFontProps = __rest(props, ["position", "type"]);
    return (React.createElement(Marker, { markerOptions: {
            position: position,
            content: Icons_1.iconFontContent(type, iconFontProps),
        } }));
}
exports.IconMarker = IconMarker;
//# sourceMappingURL=index.js.map