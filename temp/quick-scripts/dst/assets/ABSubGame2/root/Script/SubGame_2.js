
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ABSubGame2/root/Script/SubGame_2.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '41ac9z0xsFNn6uaqhQkOObf', 'SubGame_2');
// ABSubGame2/root/Script/SubGame_2.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var JS_LOG = function () {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    cc.log.apply(cc, __spreadArrays(["[SubGame_2]"], arg));
};
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SubGame_2 = /** @class */ (function (_super) {
    __extends(SubGame_2, _super);
    function SubGame_2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubGame_2.prototype.initModule = function (args) {
        JS_LOG("initModule");
        var lobbyRoot = args.lobbyRoot;
        this._lobbyRoot = lobbyRoot;
    };
    SubGame_2.prototype.onBtn_close = function () {
        JS_LOG("btn_close");
        this._lobbyRoot.removeGame_2();
    };
    SubGame_2 = __decorate([
        ccclass
    ], SubGame_2);
    return SubGame_2;
}(cc.Component));
exports.default = SubGame_2;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9BQlN1YkdhbWUyL3Jvb3QvU2NyaXB0L1N1YkdhbWVfMi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBSSxNQUFNLEdBQUc7SUFBUyxhQUFNO1NBQU4sVUFBTSxFQUFOLHFCQUFNLEVBQU4sSUFBTTtRQUFOLHdCQUFNOztJQUN4QixFQUFFLENBQUMsR0FBRyxPQUFOLEVBQUUsa0JBQUssYUFBYSxHQUFJLEdBQUcsR0FBRztBQUNsQyxDQUFDLENBQUE7QUFFSyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF1Qyw2QkFBWTtJQUFuRDs7SUFjQSxDQUFDO0lBWEcsOEJBQVUsR0FBVixVQUFXLElBQUk7UUFDZCxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDZCxJQUFBLFNBQVMsR0FBSyxJQUFJLFVBQVQsQ0FBUztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQTtJQUM1QixDQUFDO0lBQ0QsK0JBQVcsR0FBWDtRQUNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFBO0lBRS9CLENBQUM7SUFaZ0IsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQWM3QjtJQUFELGdCQUFDO0NBZEQsQUFjQyxDQWRzQyxFQUFFLENBQUMsU0FBUyxHQWNsRDtrQkFkb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxubGV0IEpTX0xPRyA9IGZ1bmN0aW9uKC4uLmFyZyl7IFxuICAgIGNjLmxvZyhcIltTdWJHYW1lXzJdXCIsLi4uYXJnKSA7IFxufVxuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1YkdhbWVfMiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgX2xvYmJ5Um9vdDogYW55O1xuXG4gICAgaW5pdE1vZHVsZShhcmdzKXtcbiAgICBcdEpTX0xPRyhcImluaXRNb2R1bGVcIilcbiAgICBcdGxldCB7IGxvYmJ5Um9vdCB9ID0gYXJnc1xuICAgIFx0dGhpcy5fbG9iYnlSb290ID0gbG9iYnlSb290XG4gICAgfVxuICAgIG9uQnRuX2Nsb3NlKCl7XG4gICAgXHRKU19MT0coXCJidG5fY2xvc2VcIilcbiAgICBcdHRoaXMuX2xvYmJ5Um9vdC5yZW1vdmVHYW1lXzIoKVxuXG4gICAgfVxuXG59Il19