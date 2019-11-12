"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Map_1 = require("../Map");
var useBindEvents_1 = require("../../hooks/useBindEvents");
var useContext = React.useContext, useEffect = React.useEffect, useState = React.useState;
function Polygon(props) {
    var polygonOptions = props.polygonOptions, events = props.events;
    var map = useContext(Map_1.MapContext);
    var _a = useState(null), polygon = _a[0], setPolygon = _a[1];
    useBindEvents_1.default(polygon, events);
    useEffect(function () {
        if (!map) {
            return;
        }
        if (polygon) {
            map.remove([polygon]);
        }
        var newPolygon = new AMap.Polygon(props.polygonOptions);
        map.add(newPolygon);
        setPolygon(newPolygon);
    }, [map, polygonOptions]);
    return null;
}
exports.default = Polygon;
//# sourceMappingURL=index.js.map