"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var utils_1 = require("./utils");
// tslint:disable-next-line: no-var-requires
require('./index.less');
var useState = React.useState, useRef = React.useRef, useEffect = React.useEffect;
function PlayController(props) {
    var range = props.range, frequency = props.frequency, onPlay = props.onPlay, onPause = props.onPause, onStop = props.onStop, loading = props.loading, beforeStart = props.beforeStart;
    var currentTime = useRef(0);
    var _a = useState(0), left = _a[0], setLeft = _a[1];
    var _b = useState(false), isStart = _b[0], setIsStart = _b[1];
    var _c = useState('stop'), playState = _c[0], setPlayState = _c[1];
    var _d = useState(1), speed = _d[0], setSpeed = _d[1];
    var _e = useState(1), speedTimes = _e[0], setSpeedTimes = _e[1];
    var _f = useState(null), timer = _f[0], setTimer = _f[1];
    var interval = Math.floor(12000 / frequency);
    var stopRun = function () {
        clearInterval(timer);
        setTimer(null);
    };
    var reset = function () {
        currentTime.current = range[0];
        setLeft(0);
        setSpeed(1);
    };
    var overPlay = function () {
        currentTime.current = range[1];
        setLeft(100);
        clearInterval(timer);
        setTimer(null);
        if (onPlay) {
            onPlay(range[1]);
        }
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
                    if (currentTime.current <= range[1]) {
                        var nextTime = currentTime.current + speed * interval;
                        if (nextTime > range[1]) {
                            setPlayState('over');
                        }
                        else {
                            currentTime.current = nextTime;
                            setLeft(getLeftByCurrentTime(nextTime));
                            if (onPlay) {
                                onPlay(nextTime);
                            }
                        }
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
            if (playState === 'over') {
                stopRun();
                overPlay();
                if (onStop) {
                    onStop(currentTime.current);
                }
            }
        }
        return stopRun;
    }, [playState, speed, loading]);
    var handleStart = function () {
        setIsStart(true);
        setPlayState('playing');
        if (beforeStart) {
            beforeStart();
        }
    };
    var handleSpeed = function () {
        var arr = [1, 2, 4, 8, 16];
        setSpeed(arr[(speedTimes) % 5]);
        setSpeedTimes(speedTimes + 1);
    };
    return (React.createElement("div", null, isStart ?
        React.createElement("div", { className: 'player_container' },
            React.createElement("div", { className: "controller__toolbar" },
                (playState === 'playing' || playState === 'pause' || playState === 'over') &&
                    React.createElement("div", { onClick: function () { return setPlayState('stop'); }, className: 'stop_btn small_btn' }),
                (playState === 'stop' || playState === 'pause' || playState === 'over') &&
                    React.createElement("div", { onClick: function () { return setPlayState('playing'); }, className: 'btn pause_btn' },
                        React.createElement("div", { className: 'player_tranggle' }),
                        React.createElement("div", { className: 'player_triangle' })),
                playState === 'playing' &&
                    React.createElement("div", { onClick: function () { return setPlayState('pause'); }, className: 'btn playing_btn' }),
                (playState === 'playing' || playState === 'pause' || playState === 'over') &&
                    React.createElement("div", { className: 'speed_btn small_btn', onClick: handleSpeed },
                        React.createElement("div", { className: 'player_tranggle player_tranggle_0' }),
                        React.createElement("div", { className: 'player_triangle player_triangle_0' }),
                        React.createElement("div", { className: 'player_tranggle player_tranggle_1' }),
                        React.createElement("div", { className: 'player_triangle player_triangle_1' })),
                speed > 1 ? React.createElement("span", { className: 'speed_text' },
                    speed,
                    "x") : React.createElement("span", { className: 'speed_text' })),
            React.createElement("div", { className: "controller__timePart" },
                React.createElement("div", { className: 'time' }, utils_1.secondToMinutetime(range[0], currentTime.current)),
                React.createElement("div", { className: "controller__timeline" },
                    React.createElement("div", { className: "controller__timeline--passed" }),
                    React.createElement("div", { className: "controller__timeline__ball", style: { left: left + '%' } })),
                React.createElement("div", { className: 'time' }, utils_1.secondToMinutetime(range[0], range[1]))))
        :
            React.createElement("div", { onClick: handleStart, className: 'start_btn' },
                React.createElement("div", { className: 'player_tranggle' }),
                React.createElement("div", { className: 'player_triangle' }))));
}
exports.default = PlayController;
//# sourceMappingURL=index.js.map