"use strict";
cc._RF.push(module, '2161bQyOEBLz6RQ7cDhO2yO', 'LobbyRoot');
// ABLobby/root/Script/LobbyRoot.ts

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
var BundleManager_1 = require("../../../Script/bundle/BundleManager");
var JS_LOG = function () {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    cc.log.apply(cc, __spreadArrays(["[LobbyRoot]"], arg));
};
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LobbyRoot = /** @class */ (function (_super) {
    __extends(LobbyRoot, _super);
    function LobbyRoot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LobbyRoot.prototype.initModule = function () {
        JS_LOG("initModule");
    };
    LobbyRoot.prototype.onBtn_loadGame_1 = function () {
        var _this = this;
        JS_LOG("onBtn_loadGame_1");
        this.removeGame_1();
        this.loadSubGame("ABSubGame1", function (moduleObj) {
            var abObj = moduleObj.getABObj();
            abObj.load('root/Scene/SubGame1', cc.Prefab, function (err, prefab) {
                JS_LOG("load_game1_prefab_:", JSON.stringify(err));
                var _node = cc.instantiate(prefab);
                _this.node.addChild(_node, 100);
                _this._game1 = _node;
                _node.getComponent("SubGame_1").initModule({ lobbyRoot: _this });
            });
        });
        // 模块内加载自身资源
        // let module = _G_bundleMgr.getModule("ABLobby")
        // let assetBundle = module.getABObj()
        // assetBundle.load('root/Scene/xxx', cc.Prefab, (err, prefab)=>{    
        //     //...
        // }) 
    };
    LobbyRoot.prototype.removeGame_1 = function () {
        if (this._game1) {
            this._game1.destroy();
        }
        this._game1 = null;
    };
    LobbyRoot.prototype.onBtn_loadGame_2 = function () {
        var _this = this;
        JS_LOG("onBtn_loadGame_2");
        this.removeGame_2();
        this.loadSubGame("ABSubGame2", function (moduleObj) {
            var abObj = moduleObj.getABObj();
            abObj.load('root/Scene/SubGame2', cc.Prefab, function (err, prefab) {
                JS_LOG("load_game2_prefab_:", JSON.stringify(err));
                var _node = cc.instantiate(prefab);
                _this.node.addChild(_node, 100);
                _this._game2 = _node;
                _node.getComponent("SubGame_2").initModule({ lobbyRoot: _this });
            });
        });
    };
    LobbyRoot.prototype.removeGame_2 = function () {
        if (this._game2) {
            this._game2.destroy();
        }
        this._game2 = null;
    };
    LobbyRoot.prototype.loadSubGame = function (abName, callback) {
        BundleManager_1.default.getInstance().hotUpdateMultiModule([abName], function () {
            BundleManager_1.default.getInstance().addModule(abName, function (moduleObj) {
                callback(moduleObj);
            });
        });
    };
    LobbyRoot = __decorate([
        ccclass
    ], LobbyRoot);
    return LobbyRoot;
}(cc.Component));
exports.default = LobbyRoot;

cc._RF.pop();