"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 自定义hook，定时器
var React = require("react");
var useRef = React.useRef, useEffect = React.useEffect;
function useInterval(callback, time) {
    if (time === void 0) { time = 300; }
    var intervalFn = useRef({});
    useEffect(function () {
        intervalFn.current.fn = callback;
    });
    useEffect(function () {
        intervalFn.current.timer = setInterval(function () {
            intervalFn.current.fn();
        }, time);
        return function () {
            clearInterval(intervalFn.current.timer);
        };
    }, []);
    return intervalFn.current.timer;
}
;
exports.default = useInterval;
//# sourceMappingURL=useInterval.js.map