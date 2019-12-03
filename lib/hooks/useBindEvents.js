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
// 自定义hook，完成地图组件对事件的统一处理逻辑
var React = require("react");
var useEffect = React.useEffect;
/**
 *
 * @param overlay 覆盖物
 * @param events 事件对象
 */
function useBindEvents(overlay, events) {
    useEffect(function () {
        console.log('useBindEvents');
        if (!overlay || !events) {
            return;
        }
        Object.keys(events).forEach(function (eventName) {
            // 这里可以对事件进行特殊的处理
            overlay.on(eventName, function (e) {
                var newEvent = __assign(__assign({}, e), { target: overlay });
                events[eventName](newEvent);
            });
        });
    }, [overlay, events]);
}
exports.default = useBindEvents;
//# sourceMappingURL=useBindEvents.js.map