"use strict";
cc._RF.push(module, '25367lGxkNE6IbIXmU1c0uT', 'SubGame_1');
// ABSubGame1/root/Script/SubGame_1.ts

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
    cc.log.apply(cc, __spreadArrays(["[SubGame_1]"], arg));
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
        this._lobbyRoot.removeGame_1();
    };
    SubGame_2 = __decorate([
        ccclass
    ], SubGame_2);
    return SubGame_2;
}(cc.Component));
exports.default = SubGame_2;

cc._RF.pop();