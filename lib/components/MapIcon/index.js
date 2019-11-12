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
function MapIcon(props) {
    if (window.AMap) {
        var icon = new AMap.Icon(__assign({}, props.iconOptions));
        return icon;
    }
    return null;
}
exports.MapIcon = MapIcon;
exports.default = MapIcon;
//# sourceMappingURL=index.js.map