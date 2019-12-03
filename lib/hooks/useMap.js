"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 自定义hook，获取地图
var React = require("react");
var useEffect = React.useEffect, useState = React.useState;
/**
 * useMap
 * @param Map 地图组件或包含地图的组件
 * @param callback 获取地图后的回调
 * @param deps hook的依赖数据
 * @param name 多个地图时，需要使用name进行命名的区分
 */
function useMap(Map, callback, deps, name) {
    var _a = useState(0), count = _a[0], setCount = _a[1];
    useEffect(function () {
        if (Map.map) {
            var map = name ? Map.map[name] : Map.map;
            callback(map);
        }
        else {
            // 没有获取到map，手动重试
            setTimeout(function () {
                setCount(count + 1);
            }, 400);
        }
    }, [Map.map, count].concat(deps || []));
}
exports.default = useMap;
//# sourceMappingURL=useMap.js.map