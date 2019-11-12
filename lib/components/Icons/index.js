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
require('./iconfont.js');
require('./iconfont.css');
function Icon(props) {
    if (window.AMap) {
        var icon = new AMap.Icon(__assign({}, props.iconOptions));
        return icon;
    }
    return null;
}
exports.default = Icon;
var defaultIconSize = [40, 50];
function imageIcon(size) {
    if (size === void 0) { size = defaultIconSize; }
    return Icon({
        iconOptions: {
            image: '//webapi.amap.com/theme/v1.3/images/newpc/way_btn2.png',
            size: size,
        }
    });
}
exports.imageIcon = imageIcon;
function iconFontContent(type, props) {
    var styleStr = '';
    var classStr = 'icon';
    if (props.size) {
        styleStr += "width: " + props.size[0] + "; height: " + props.size[1] + ";";
    }
    if (props.color) {
        styleStr += "color: " + props.color + ";";
    }
    if (styleStr.length) {
        styleStr = " style = \"" + styleStr + "\" ";
    }
    if (props.className) {
        classStr += " " + props.className + " ";
    }
    return "<svg class=\"" + classStr + "\" aria-hidden=\"true\" " + styleStr + "><use xlink:href=\"#icon" + type + "\"></use></svg>";
}
exports.iconFontContent = iconFontContent;
//# sourceMappingURL=index.js.map