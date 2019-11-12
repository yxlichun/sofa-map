"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Player_1 = require("../Player");
var Map_1 = require("../../components/Map");
var Polyline_1 = require("../../components/Polyline");
var useState = React.useState, useContext = React.useContext;
function EvolutionPlayer(props) {
    var map = useContext(Map_1.MapContext);
    var data = {
        1532579620000: [
            [[116.303843, 39.933412], [116.407012, 39.992093]],
            [[116.203843, 39.23412], [116.407012, 39.992093]],
            [[116.103843, 39.283412], [116.407012, 39.992093]],
        ],
        1532579621000: [
            [[116.303343, 39.923412], [116.407012, 39.992093]],
            [[116.30243, 39.983412], [116.407012, 39.992093]],
            [[116.33843, 39.63412], [116.407012, 39.992093]],
        ],
        1532579623000: [
            [[116.30243, 39.983412], [116.407012, 39.992093]],
            [[116.32843, 39.98212], [116.407012, 39.992093]],
            [[116.30343, 39.91412], [116.407012, 39.992093]],
            [[116.33843, 39.63412], [116.407012, 39.992093]],
        ],
        1532579625000: [
            [[116.303343, 39.923412], [116.407012, 39.992093]],
            [[116.403843, 39.982412], [116.407012, 39.992093]],
            [[116.32843, 39.98212], [116.407012, 39.992093]],
            [[116.30343, 39.91412], [116.407012, 39.992093]],
        ],
        1532579650000: [
            [[116.103843, 39.283412], [116.407012, 39.992093]],
            [[116.323843, 39.933412], [116.407012, 39.992093]],
            [[116.302843, 39.33412], [116.407012, 39.992093]],
            [[116.303343, 39.943412], [116.407012, 39.992093]],
        ],
        1532580620000: [
            [[116.30343, 39.91412], [116.407012, 39.992093]],
            [[116.33843, 39.63412], [116.407012, 39.992093]],
            [[116.323843, 39.583412], [116.407012, 39.992093]],
        ]
    };
    var _a = useState([]), paths = _a[0], setPaths = _a[1];
    // 缓存上次渲染数据，提高渲染性能；
    var _b = useState(''), preTime = _b[0], setPreTime = _b[1];
    var onPlay = function (current) {
        var timeArray = Object.keys(data);
        var nearestTime = timeArray.find(function (item, index) {
            return current >= parseInt(item, 10) && current < parseInt(timeArray[index + 1], 10);
        });
        if (nearestTime && nearestTime !== preTime) {
            setPaths(data[nearestTime]);
            setPreTime(nearestTime);
            Map_1.default.map.setFitView();
        }
    };
    return (React.createElement("div", { style: { width: 1000, height: 600 } },
        React.createElement(Map_1.default, { style: { width: 1000, height: 600 } }, paths.map(function (path, index) { return (React.createElement(Polyline_1.default, { key: index, polylineOptions: { path: path } })); })),
        React.createElement(Player_1.default, { range: [1532579620000, 1532580620000], frequency: 12, onPlay: onPlay })));
}
exports.default = EvolutionPlayer;
//# sourceMappingURL=index.js.map