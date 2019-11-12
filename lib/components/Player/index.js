"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var antd_1 = require("antd");
var styled_components_1 = require("styled-components");
var utils_1 = require("./utils");
var Player = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: 50px;\n  background: rgba(0, 0, 0, 0.5);\n  position: absolute;\n  bottom: 0px;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  .anticon {\n    color: #ccc;\n    font-size: 30px;\n    margin: 0 10px;\n  }\n  .controller__toolbar {\n    width: 70px;\n    display: flex;\n    align-items: center;\n  }\n  .controller__timeline {\n    height: 1px;\n    width: 100px;\n    flex-grow: 1;\n    background: #ccc;\n    margin: 0 10px;\n    position: relative;\n  }\n  .controller__timeline__ball {\n    width: 10px;\n    height: 10px;\n    background: #1890FF;\n    border-radius: 10px;\n    position: absolute;\n    top: -5px;\n    left: ", ";\n    .current-time {\n      position: absolute;\n      width: 200px;\n      font-size: 12px;\n      top: -10px;\n    }\n  }\n"], ["\n  height: 50px;\n  background: rgba(0, 0, 0, 0.5);\n  position: absolute;\n  bottom: 0px;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  .anticon {\n    color: #ccc;\n    font-size: 30px;\n    margin: 0 10px;\n  }\n  .controller__toolbar {\n    width: 70px;\n    display: flex;\n    align-items: center;\n  }\n  .controller__timeline {\n    height: 1px;\n    width: 100px;\n    flex-grow: 1;\n    background: #ccc;\n    margin: 0 10px;\n    position: relative;\n  }\n  .controller__timeline__ball {\n    width: 10px;\n    height: 10px;\n    background: #1890FF;\n    border-radius: 10px;\n    position: absolute;\n    top: -5px;\n    left: ", ";\n    .current-time {\n      position: absolute;\n      width: 200px;\n      font-size: 12px;\n      top: -10px;\n    }\n  }\n"])), function (props) { return props.left + "%"; });
var useState = React.useState, useRef = React.useRef, useEffect = React.useEffect;
function PlayController(props) {
    var range = props.range, frequency = props.frequency, onPlay = props.onPlay, onPause = props.onPause, onStop = props.onStop, loading = props.loading;
    var currentTime = useRef(0);
    var _a = useState(0), left = _a[0], setLeft = _a[1];
    var _b = useState('stop'), playState = _b[0], setPlayState = _b[1];
    var _c = useState(1), speed = _c[0], setSpeed = _c[1];
    var _d = useState(null), timer = _d[0], setTimer = _d[1];
    var interval = Math.floor(12000 / frequency);
    var stopRun = function () {
        clearInterval(timer);
        setTimer(null);
    };
    var reset = function () {
        currentTime.current = range[0];
        setLeft(0);
    };
    function getLeftByCurrentTime(current) {
        if (range && range.length === 2) {
            return (current - range[0]) / (range[1] - range[0]) * 100;
        }
        return 0;
    }
    useEffect(function () {
        if (range && range[0]) {
            currentTime.current = range[0];
        }
    }, [range.join()]);
    useEffect(function () {
        if (loading) {
            stopRun();
        }
        else {
            if (playState === 'playing') {
                stopRun();
                var playTimer = setInterval(function () {
                    var nextTime = currentTime.current + speed * interval;
                    currentTime.current = nextTime;
                    setLeft(getLeftByCurrentTime(nextTime));
                    if (onPlay) {
                        onPlay(nextTime);
                    }
                }, interval);
                setTimer(playTimer);
            }
            if (playState === 'pause') {
                stopRun();
                if (onPause) {
                    onPause(currentTime.current);
                }
            }
            if (playState === 'stop') {
                stopRun();
                reset();
                if (onStop) {
                    onStop(currentTime.current);
                }
            }
        }
        return stopRun;
    }, [playState, speed, loading]);
    return (React.createElement(Player, { left: left },
        React.createElement("div", { className: "controller__toolbar" },
            (playState === 'stop' || playState === 'pause') &&
                React.createElement(antd_1.Icon, { type: "caret-right", onClick: function () { return setPlayState('playing'); } }),
            playState === 'playing' &&
                React.createElement(antd_1.Icon, { type: "pause", onClick: function () { return setPlayState('pause'); } }),
            (playState === 'playing' || playState === 'pause') &&
                React.createElement("div", { style: { width: 15, height: 15, background: '#ccc' }, onClick: function () { return setPlayState('stop'); } })),
        React.createElement("div", { className: "controller__timeline" },
            React.createElement("div", { className: "controller__timeline--passed" }),
            React.createElement("div", { className: "controller__timeline__ball" },
                React.createElement("div", { className: "current-time" }, utils_1.secondToDatetime(currentTime.current)))),
        React.createElement("div", { style: { position: 'absolute', top: -70 } },
            React.createElement("div", null,
                "\u5F00\u59CB\u65F6\u95F4\uFF1A",
                utils_1.secondToDatetime(range[0])),
            React.createElement("div", null,
                "\u7ED3\u675F\u65F6\u95F4\uFF1A",
                utils_1.secondToDatetime(range[1])),
            React.createElement("div", null, loading ? 'loading' : 'ready')),
        React.createElement("div", null,
            React.createElement("span", { onClick: function () { return setSpeed(1); } }, "1.x"),
            React.createElement("span", { onClick: function () { return setSpeed(2); } }, "2.x"),
            React.createElement("span", { onClick: function () { return setSpeed(4); } }, "4.x"))));
}
exports.default = PlayController;
var templateObject_1;
//# sourceMappingURL=index.js.map