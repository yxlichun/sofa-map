"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Map_1 = require("../Map");
var useBindEvents_1 = require("../../hooks/useBindEvents");
var useContext = React.useContext, useEffect = React.useEffect, useState = React.useState;
function Polyline(props) {
    var polylineOptions = props.polylineOptions, events = props.events;
    var map = useContext(Map_1.MapContext);
    var _a = useState(null), polyline = _a[0], setPolyline = _a[1];
    useBindEvents_1.default(polyline, events);
    useEffect(function () {
        if (!map) {
            return;
        }
        if (polyline) {
            map.remove([polyline]);
        }
        var newPolyline = new AMap.Polyline(props.polylineOptions);
        map.add(newPolyline);
        setPolyline(newPolyline);
    }, [map, polylineOptions]);
    return null;
}
exports.default = Polyline;
//# sourceMappingURL=index.js.map