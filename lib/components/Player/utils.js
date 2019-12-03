"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 时间戳转换
 * @param {String} date eg: 1234567890
 * @return {String} 2017-07-27 10:10:10
 * @author zhangning
 */
function secondToDatetime(timestap) {
    if (!timestap) {
        return '';
    }
    var date = new Date(timestap);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
    var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
}
exports.secondToDatetime = secondToDatetime;
function secondToMinutetime(statTime, endTime) {
    if (!statTime || !endTime || statTime > endTime) {
        return '';
    }
    var difference = Math.round((endTime - statTime) / 1000);
    var h = 0;
    var i = 0;
    var s = parseInt(difference, 10);
    if (s > 60) {
        i = parseInt((s / 60), 10);
        s = parseInt((s % 60), 10);
        if (i > 60) {
            h = parseInt((i / 60), 10);
            i = parseInt((i % 60), 10);
        }
    }
    // 补零
    var zero = function (v) { return v >= 0 && v < 10 ? "0" + v : v; };
    var h2 = zero(h);
    var i2 = zero(i);
    var s2 = zero(s);
    var differenceRange = "";
    if (h2 <= 0) {
        differenceRange = [i2, s2].join(":");
    }
    else {
        differenceRange = [h2, i2, s2].join(":");
    }
    return differenceRange;
}
exports.secondToMinutetime = secondToMinutetime;
//# sourceMappingURL=utils.js.map