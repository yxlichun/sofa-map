"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Map_1 = require("../Map");
var Polyline_1 = require("../Polyline");
var Marker_1 = require("../Marker");
var useState = React.useState, useEffect = React.useEffect;
function PolylineSelector(props) {
    var mapProps = props.mapProps, data = props.data, stationLabel = props.stationLabel;
    // 点线的初始数据
    var _a = useState([]), marker = _a[0], setMarker = _a[1];
    // 点的hover站点完整数据
    var _b = useState([]), stationMarker = _b[0], setStationMarker = _b[1];
    // 选中的点的数据
    var _c = useState([]), selectedMarker = _c[0], setSelectedMarker = _c[1];
    var _d = useState(false), showLine = _d[0], setShowLine = _d[1];
    useEffect(function () {
        if (Map_1.default.map) {
            PolylineSelector.map = Map_1.default.map;
            Map_1.default.map.clearMap();
            setTimeout(function () {
                Map_1.default.map.setFitView();
            }, 1000);
            setMarker(data);
            setStationMarker(stationLabel);
            if (props.showPath) {
                setShowLine(true);
            }
            else {
                setShowLine(false);
            }
        }
    }, [data, Map_1.default.map, props.showPath]);
    var onSelect = function (itemMarker) {
        var point = [];
        var isHas = false;
        point = selectedMarker.map(function (item) {
            return [item[0], item[1]];
        });
        point.map(function (item, index) {
            if (item[0] === itemMarker[0] && item[1] === itemMarker[1]) {
                point.splice(index, 1);
                isHas = true;
            }
        });
        if (!isHas) {
            point.push(itemMarker);
        }
        setSelectedMarker(point);
        if (props.selectedMarkerData) {
            props.selectedMarkerData(point);
        }
    };
    useEffect(function () {
        if (props.searchSelected && props.searchSelected[0]) {
            onSelect(props.searchSelected[0]);
        }
    }, [props.searchSelected]);
    return (React.createElement("div", { style: mapProps && mapProps.style ? mapProps.style : '' },
        React.createElement(Map_1.default, __assign({ mapOptions: { mapStyle: 'amap://styles/whitesmoke' }, fullScreen: true }, mapProps), marker.map(function (path, index) {
            return React.createElement("div", { key: index },
                showLine ?
                    React.createElement(Polyline_1.default, { key: index, polylineOptions: {
                            path: path,
                            strokeColor: '#DD2E35',
                            strokeWeight: 4,
                            showDir: true,
                        } })
                    :
                        '',
                path.map(function (point, indexP) {
                    var isSelected = false;
                    var contentIndex = '';
                    selectedMarker.map(function (item, indexM) {
                        if (point[0] === item[0] && point[1] === item[1]) {
                            isSelected = true;
                            contentIndex = indexM + 1;
                        }
                    });
                    return point.length && (point.length === 3 ?
                        React.createElement(Marker_1.default, { markerOptions: {
                                position: point,
                                content: { type: 1, color: '#DD2E35' },
                                offset: new AMap.Pixel(-10, -21),
                            }, label: stationMarker, key: index + indexP }) :
                        isSelected ?
                            React.createElement(Marker_1.default, { markerOptions: {
                                    position: point,
                                    content: { type: 2, color: '#DD2E35', index: contentIndex },
                                    offset: new AMap.Pixel(-10, -21),
                                }, label: stationMarker, isCanSelect: props.isCanSelect || false, onSelect: onSelect, key: index + indexP }) :
                            React.createElement(Marker_1.default, { markerOptions: {
                                    position: point,
                                    content: { type: 3, color: '#DD2E35' },
                                    offset: new AMap.Pixel(-10, -21),
                                }, label: stationMarker, isCanSelect: props.isCanSelect || false, onSelect: onSelect, key: index + indexP }));
                }));
        }))));
}
exports.default = PolylineSelector;
//# sourceMappingURL=index.js.map