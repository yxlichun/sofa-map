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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Map_1 = require("../Map");
var Marker_1 = require("../Marker");
var warehouseMarker = "<div class=\"station-marker\">\n  <div class=\"warehouse-marker__image\"></div>\n  <div class=\"station-marker__circle\" style=\"border-color: '#DD2E35'\"></div>\n</div>";
var selectedMarker = function (index) { return "<div class=\"station-marker\">\n  <div class=\"station-marker_base station-marker__image\"><div>" + index + "</div></div>\n  <div class=\"station-marker__circle\" style=\"border-color: '#000'\"></div>\n</div>"; };
var unSelectedMarker = "<div class=\"station-marker\">\n  <div class=\"station-marker_base unselected-marker__image\"></div>\n  <div class=\"station-marker__circle\" style=\"border-color: '#DD2E35'\"></div>\n</div>";
var useState = React.useState, useEffect = React.useEffect, useMemo = React.useMemo;
function MarkerSelector(props) {
    var mapProps = props.mapProps, markersData = props.markersData, selectedMarkersData = props.selectedMarkersData;
    // 点线的初始数据
    var _a = useState([]), markers = _a[0], setMarkers = _a[1];
    // 选中的点的数据
    var _b = useState([]), selectedMarkers = _b[0], setSelectedMarkers = _b[1];
    useEffect(function () {
        if (Map_1.default.map && markersData && Array.isArray(markersData)) {
            // (MarkerSelector as any).map = (Map as any).map;
            // const markerOverlays = (MarkerSelector as any).map.getAllOverlays('marker');
            // (MarkerSelector as any).map.remove(markerOverlays);
            // ((Map as any).map as unknown as AMap.Map).clearMap();
            // setTimeout(() => {
            //   ((Map as any).map as unknown as AMap.Map).setFitView();
            // }, 1000);
            setMarkers(markersData);
        }
    }, [JSON.stringify(markersData), Map_1.default.map]);
    useEffect(function () {
        if (Map_1.default.map) {
            MarkerSelector.map = Map_1.default.map;
            // const markerOverlays = (MarkerSelector as any).map.getAllOverlays('marker');
            // (MarkerSelector as any).map.remove(markerOverlays);
            // ((Map as any).map as unknown as AMap.Map).clearMap();
            // setTimeout(() => {
            //   ((Map as any).map as unknown as AMap.Map).setFitView();
            // }, 1000);
            if (selectedMarkersData && selectedMarkersData.length) {
                setSelectedMarkers(__spreadArrays(selectedMarkersData));
            }
        }
    }, [JSON.stringify(selectedMarkersData), Map_1.default.map]);
    // marker 选择事件
    var onSelect = function (marker) {
        if (!marker.isCanSelect || marker.station_type === 1) {
            return;
        }
        // 选择/取消选择处理
        var foundMarkerIndex = hasSelected(marker);
        if (foundMarkerIndex !== -1) {
            marker.isSelected = false;
            selectedMarkers.splice(foundMarkerIndex, 1);
            setSelectedMarkers(__spreadArrays(selectedMarkers));
            if (props.onChange) {
                props.onChange(__spreadArrays(selectedMarkers));
            }
        }
        else {
            marker.isSelected = true;
            selectedMarkers.push(marker);
            setSelectedMarkers(__spreadArrays(selectedMarkers));
            if (props.onChange) {
                props.onChange(__spreadArrays(selectedMarkers));
            }
            // 下面这种写法有问题：会出现重复添加的现象
            // setSelectedMarkers((data: IMarkerOptions[]) => {
            //   data.push(marker);
            //   if (props.onChange) {
            //     props.onChange(data);
            //   }
            //   return [...data];
            // });
        }
    };
    /**
     * 根据点的经纬度信息去判断当前marker是否已在选中marker里面
     * @param marker 判断的marker对象
     * @returns number markerIndex 当前marker在选中marker中的index
     */
    var hasSelected = function (marker) {
        var markerIndex = -1;
        selectedMarkers.filter(function (itemMarker, index) {
            if (marker.lat === itemMarker.lat && marker.lng === itemMarker.lng) {
                markerIndex = index;
            }
            return false;
        });
        return markerIndex;
    };
    var renderMarker = useMemo(function () {
        if (Map_1.default.map) {
            MarkerSelector.map = Map_1.default.map;
            var markerOverlays = MarkerSelector.map.getAllOverlays('marker');
            MarkerSelector.map.remove(markerOverlays);
            // (MarkerSelector as any).map.clearMap();
            // setTimeout(() => {
            //   (MarkerSelector as any).map.setFitView();
            // }, 1000);
            return markers.map(function (marker, mIndex) {
                var markerContent = unSelectedMarker;
                if (marker.station_type === 1) {
                    // 仓库
                    markerContent = warehouseMarker;
                }
                else if (marker.isSelected) {
                    // 选中
                    markerContent = selectedMarker(hasSelected(marker));
                }
                return React.createElement(Marker_1.default, { key: mIndex, markerOptions: {
                        position: [Number(marker.lng), Number(marker.lat)],
                        content: markerContent,
                        label: marker.station_name || '',
                        offset: new AMap.Pixel(-10, -21),
                    }, isCanSelect: marker.isCanSelect || false, events: {
                        click: function () { return onSelect(marker); },
                    } });
            });
        }
    }, [JSON.stringify(markers), Map_1.default.map]);
    return (React.createElement("div", { style: mapProps && mapProps.style ? mapProps.style : '' },
        React.createElement(Map_1.default, __assign({ mapOptions: { mapStyle: 'amap://styles/whitesmoke' }, fullScreen: true }, mapProps), renderMarker)));
}
exports.default = MarkerSelector;
//# sourceMappingURL=index.js.map