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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Get-Process
// *Example parsing*
var str = "Handles  NPM(K)    PM(K)      WS(K)     CPU(s)     Id  SI ProcessName\n-------  ------    -----      -----     ------     --  -- -----------\n    404      25    35204       1428       0.66   3508   1 AcrobatNotificationClient\n    365      20     5400       8704       1.16  50248   1 acrotray";
var parseGetProcessLogs = function (str) {
    var _a;
    var arr = str.split('\n');
    var headers = (_a = arr === null || arr === void 0 ? void 0 : arr[0]) === null || _a === void 0 ? void 0 : _a.split(' ').filter(function (x) { return x != ''; });
    arr[0] = headers;
    arr = __spreadArray(__spreadArray([], arr.slice(0, 1), true), arr.slice(2), true);
    var rows = arr.slice(1);
    for (var row in rows) {
        rows[row] = rows[row].split(' ').filter(function (x) { return x != ''; });
    }
    // arr=[headers,...rows];
    var objVals = rows.reduce(function (stats, row) {
        return row.reduce(function (stat, entry, j) {
            var _a;
            return __assign(__assign(__assign({}, stats), stat), (_a = {}, _a[headers[j]] = __spreadArray(__spreadArray([], (stats[headers[j]] || []), true), [entry], false), _a));
        }, {});
    }, {});
    var arrVals = rows.reduce(function (stats, row, i) {
        return row.reduce(function (stat, entry, j) {
            var _a;
            return __spreadArray(__spreadArray([], stats, true), [__assign(__assign({}, stat[i]), (_a = {}, _a[headers[j]] = entry, _a))], false);
        }, {});
    }, []);
    return {
        objVals: objVals,
        arrVals: arrVals
    };
};
console.log(parseGetProcessLogs(str));
