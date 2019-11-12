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
var useEffect = React.useEffect, useContext = React.useContext;
function Navigate(props) {
    var path = props.path, type = props.type, navigateOptions = props.navigateOptions;
    var map = useContext(Map_1.MapContext);
    useEffect(function () {
        if (!map || !path) {
            return;
        }
        var type2Plugin = {
            Driving: 'AMap.Driving',
            Transfer: 'AMap.Transfer',
            Walking: 'AMap.Walking',
            Riding: 'AMap.Riding',
            TruckDriving: 'AMap.TruckDriving',
        };
        AMap.plugin([type2Plugin[type]], function () {
            var driving = new AMap[type](__assign({ 
                // policy: (AMap as any).DrivingPolicy.LEAST_TIME,
                map: map }, navigateOptions));
            var points = path;
            var searchCallback = function (status, result) {
                if (status === 'complete') {
                    console.log('绘制路线完成', result);
                }
                else {
                    console.log('获取规划数据失败：' + status);
                }
            };
            if (type === 'TruckDriving') {
                if (!navigateOptions || !navigateOptions.size) {
                    console.log('error，TruckDriving navigateOptions.size is null');
                    return;
                }
                points = path.map(function (item) { return ({
                    lnglat: item,
                }); });
                driving.search(points, searchCallback);
            }
            else {
                driving.search.apply(driving, points.concat([searchCallback]));
            }
        });
    }, [map, path, type]);
    return null;
}
exports.default = Navigate;
//# sourceMappingURL=index.js.map