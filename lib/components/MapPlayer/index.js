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
var Player_1 = require("../Player");
var Map_1 = require("../Map");
var useState = React.useState, useEffect = React.useEffect;
function MapPlayer(props) {
    var data = props.data, children = props.children, mapProps = props.mapProps, onFrameChange = props.onFrameChange, playerProps = __rest(props, ["data", "children", "mapProps", "onFrameChange"]);
    // 帧数据
    var _a = useState([]), frameData = _a[0], setFrameData = _a[1];
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    // 缓存上次渲染数据，提高渲染性能；
    var _c = useState(''), preTime = _c[0], setPreTime = _c[1];
    useEffect(function () {
        if (data && Object.keys(data).length) {
            setLoading(false);
        }
    }, [data]);
    var onPlay = function (current) {
        var timeArray = Object.keys(data);
        var nearestTime = timeArray.find(function (item, index) {
            return current >= parseInt(item, 10) && current < parseInt(timeArray[index + 1], 10);
        });
        if (nearestTime && nearestTime !== preTime) {
            setFrameData(data[nearestTime]);
            setPreTime(nearestTime);
            Map_1.default.map.setFitView();
            if (props.onFrameChange) {
                props.onFrameChange(current, nearestTime, data[nearestTime]);
            }
        }
        if (props.onPlay) {
            props.onPlay(current);
        }
    };
    return (React.createElement("div", null,
        React.createElement(Map_1.default, __assign({}, mapProps), props.children({ frameData: frameData, preTime: preTime })),
        React.createElement(Player_1.default, __assign({}, playerProps, { onPlay: onPlay, loading: loading }))));
}
exports.default = MapPlayer;
//# sourceMappingURL=index.js.map