
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/bundle/SingleIns.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvYnVuZGxlL1NpbmdsZUlucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUdDO1FBREEsZ0JBQVcsR0FBWSxFQUFFLENBQUM7UUFFekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUNnQixxQkFBVyxHQUF6QjtRQUEwQixjQUFhO2FBQWIsVUFBYSxFQUFiLHFCQUFhLEVBQWIsSUFBYTtZQUFiLHlCQUFhOztRQUN6QyxJQUFJLEtBQUssR0FBTyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7WUFDckIsS0FBSyxDQUFDLFNBQVMsUUFBTyxLQUFLLFlBQUwsS0FBSywyQkFBSSxJQUFJLEtBQUMsQ0FBQztTQUNyQztRQUNELE9BQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBR0Qsb0NBQWdCLEdBQWhCLFVBQWlCLFFBQVEsRUFBRSxRQUFZO1FBQVoseUJBQUEsRUFBQSxZQUFZO1FBQ3RDLElBQUssVUFBVSxHQUFHLFdBQVcsQ0FBQztZQUM3QixRQUFRLEVBQUUsQ0FBQztRQUNaLENBQUMsRUFBRSxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyx5QkFBeUI7UUFDOUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELHNDQUFrQixHQUFsQjtRQUNDLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDOUIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEVBQVUsSUFBSyxPQUFBLGFBQWEsQ0FBQyxFQUFFLENBQUMsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRixnQkFBQztBQUFELENBNUJBLEFBNEJDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaW5nbGVJbnMge1xuXG5cdGludGVydmFsSWRzOm51bWJlcltdID0gW107XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuaW50ZXJ2YWxJZHMgPSBbXTtcblx0fVxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoLi4uYXJnczphbnlbXSk6YW55IHtcblx0XHRsZXQgQ2xhc3M6YW55ID0gdGhpcztcblx0XHRpZiAoIUNsYXNzLl9pbnN0YW5jZSkge1xuXHRcdFx0Q2xhc3MuX2luc3RhbmNlID0gbmV3IENsYXNzKC4uLmFyZ3MpO1xuXHRcdH1cblx0XHRyZXR1cm4gQ2xhc3MuX2luc3RhbmNlO1xuXHR9XG5cblxuXHRpbnRlcnZhbFNjaGVkdWxlKGNhbGxiYWNrLCBpbnRlcnZhbCA9IDApIHtcblx0XHRsZXQgIGludGVydmFsSWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG5cdFx0XHRjYWxsYmFjaygpO1xuXHRcdH0sIGludGVydmFsICogMTAwMCk7IC8vIGludGVydmFsIGlzIGluIHNlY29uZHNcblx0XHR0aGlzLmludGVydmFsSWRzLnB1c2goaW50ZXJ2YWxJZCk7XG5cdH1cblxuXHR1bkludGVydmFsU2NoZWR1bGUoKSB7XG5cdFx0Y29uc3QgdGltZW91dElkcyA9IHRoaXMuaW50ZXJ2YWxJZHM7XG4gICAgICAgIHRpbWVvdXRJZHMuZm9yRWFjaCgoaWQ6IG51bWJlcikgPT4gY2xlYXJJbnRlcnZhbChpZCkpO1xuICAgICAgICB0aGlzLmludGVydmFsSWRzID0gW107XG5cdH1cblxufSJdfQ==