"use strict";
cc._RF.push(module, '14cf784PnhNqrEvlJBkv7ES', 'SingleIns');
// Script/bundle/SingleIns.ts

"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var SingleIns = /** @class */ (function () {
    function SingleIns() {
        this.intervalIds = [];
        this.intervalIds = [];
    }
    SingleIns.getInstance = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var Class = this;
        if (!Class._instance) {
            Class._instance = new (Class.bind.apply(Class, __spreadArrays([void 0], args)))();
        }
        return Class._instance;
    };
    SingleIns.prototype.intervalSchedule = function (callback, interval) {
        if (interval === void 0) { interval = 0; }
        var intervalId = setInterval(function () {
            callback();
        }, interval * 1000); // interval is in seconds
        this.intervalIds.push(intervalId);
    };
    SingleIns.prototype.unIntervalSchedule = function () {
        var timeoutIds = this.intervalIds;
        timeoutIds.forEach(function (id) { return clearInterval(id); });
        this.intervalIds = [];
    };
    return SingleIns;
}());
exports.default = SingleIns;

cc._RF.pop();