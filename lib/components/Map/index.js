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
// tslint:disable-next-line: no-var-requires
require('./map.css');
var useEffect = React.useEffect, useState = React.useState, useRef = React.useRef;
exports.setAMapVersion = function (version) {
    window.AMapVersion = version;
};
exports.getAMapVerion = function () { return window.AMapVersion; };
exports.setAMapKey = function (key) {
    window.AMapKey = key;
};
exports.getAMapKey = function () { return window.AMapKey; };
function requireMap(callback) {
    // 如果不存在全局的AMap对象，则按需引入
    if (!window.AMap) {
        if (!window.AMapVersion || !window.AMapKey) {
            throw new Error('Please use method setAMapVersion、setAMapKey, set AMap Version and Key!');
        }
        var url = "https://webapi.amap.com/maps?v=" + exports.getAMapVerion() + "&key=" + exports.getAMapKey();
        var jsapi = document.createElement('script');
        jsapi.addEventListener('load', function (e) {
            callback();
        });
        jsapi.charset = 'utf-8';
        jsapi.src = url;
        document.head.appendChild(jsapi);
    }
    else {
        callback();
    }
}
exports.MapContext = React.createContext(null);
function Map(props) {
    var plugins = props.plugins, style = props.style, mapOptions = props.mapOptions, fullScreen = props.fullScreen, name = props.name;
    var _a = useState(null), map = _a[0], setMap = _a[1];
    var _b = useState(false), scriptLoaded = _b[0], setScriptLoaded = _b[1];
    var mapContainer = useRef(null);
    var _c = useState(false), isFullScreen = _c[0], setIsFullScreen = _c[1];
    // 加载地图脚本
    useEffect(function () {
        requireMap(function () {
            setScriptLoaded(true);
        });
    }, []);
    // 初始化地图
    useEffect(function () {
        if (!scriptLoaded || !window.AMap) {
            return;
        }
        // 初始化地图
        var mapEntity = new AMap.Map(mapContainer.current, __assign({ center: [116.39, 39.9], zoom: 11 }, mapOptions));
        window.superMap++;
        // 加载插件
        AMap.plugin(([
            'AMap.ToolBar',
        ].concat(plugins ? plugins : [])), function () {
            // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
            (mapEntity).addControl(new AMap.ToolBar({
                // 简易缩放模式，默认为 false
                liteStyle: true,
            }));
        });
        setMap(mapEntity);
        if (name) {
            Map.map = Map.map || {};
            Map.map[name] = mapEntity;
        }
        else {
            Map.map = mapEntity;
        }
        // 销毁地图
        return function () {
            if (map) {
                map.destroy();
            }
        };
    }, [window.AMap, scriptLoaded]);
    var containerStyle = {
        width: '100%',
        height: '100%',
        background: '#ff9900',
    };
    var fullMapStyle = {
        width: window.innerWidth + "px",
        height: window.innerHeight + "px",
    };
    var handleFullScreen = function () {
        isFullScreen ? setIsFullScreen(false) : setIsFullScreen(true);
    };
    var handleFitView = function () {
        if (Map.map) {
            Map.map.setFitView();
        }
    };
    return (React.createElement("div", { className: isFullScreen ? 'fullMapContainer mapContainer' : 'mapContainer', style: isFullScreen ? fullMapStyle : __assign({}, style) },
        React.createElement(exports.MapContext.Provider, { value: map },
            React.createElement("div", { style: containerStyle, ref: mapContainer }, "Map is Loading"),
            props.children),
        fullScreen &&
            React.createElement("div", { className: isFullScreen ? 'fullBtn fullfix' : 'fullBtn', onClick: function () { return handleFullScreen(); } }),
        React.createElement("div", { className: isFullScreen ? 'fitViewBtn fullFitViewBtn' : 'fitViewBtn', onClick: function () { return handleFitView(); } })));
}
exports.default = Map;
//# sourceMappingURL=index.js.map