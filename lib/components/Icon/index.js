"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require('./iconfont.js');
require('./iconfont.css');
function Icon(props) {
    return (React.createElement("svg", { className: "icon", "aria-hidden": "true" },
        React.createElement("use", { xlinkHref: "#icon-" + props.type })));
}
function iconStr(type, props) {
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
exports.iconStr = iconStr;
exports.default = Icon;
//# sourceMappingURL=index.js.map