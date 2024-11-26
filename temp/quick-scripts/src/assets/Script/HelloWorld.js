"use strict";
cc._RF.push(module, '3e4ccTMSlRFRqoHl6xXc+LA', 'HelloWorld');
// Script/HelloWorld.ts

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
var BundleManager_1 = require("./bundle/BundleManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SubGame_2 = /** @class */ (function (_super) {
    __extends(SubGame_2, _super);
    function SubGame_2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.moduleLayer = null;
        _this.asset1 = null;
        _this.asset2 = null;
        _this._lobbyRootNode = null;
        return _this;
    }
    SubGame_2.prototype.onDestroy = function () {
    };
    SubGame_2.prototype.onLoad = function () {
        var _this = this;
        this.hackSysLog();
        if (!cc.sys.isBrowser) {
            cc.log("[HelloWorld] jsb_writable_:", jsb.fileUtils.getWritablePath());
        }
        var assetPath = "";
        if (typeof (jsb) != "undefined") {
            var absPath1 = jsb.fileUtils.fullPathForFilename(this.asset1.nativeUrl).replace("//", "/");
            var absPath2 = jsb.fileUtils.fullPathForFilename(this.asset2.nativeUrl).replace("//", "/");
            var testLen = absPath1.length > absPath2.length ? absPath2.length : absPath1.length;
            for (var i = 0; i < testLen; i++) {
                if (absPath1[i] != absPath2[i]) {
                    assetPath = absPath1.substring(0, i);
                    break;
                }
            }
            cc.log("absFile_path:", assetPath);
        }
        BundleManager_1.default.getInstance().initCom({
            useHotUpdate: true,
            assetPath: assetPath,
        });
        //-------------------
        // 复制包内模块到可读写路径下,避免首次加载模块时从远程完整拉取
        BundleManager_1.default.getInstance().execUnpackage(function () {
            BundleManager_1.default.getInstance().reqVersionInfo(function () {
                _this.reloadLobbyRoot();
            });
        });
        // 定时检测更新
        BundleManager_1.default.getInstance().reqLoopVersionInfo();
    };
    SubGame_2.prototype.reloadLobbyRoot = function () {
        var _this = this;
        var loadAb = ["ABLobby"];
        // loadAb = ["ABLobby", "ABSubGame1", "ABSubGame2"]
        BundleManager_1.default.getInstance().hotUpdateMultiModule(loadAb, function () {
            BundleManager_1.default.getInstance().addModule("ABLobby", function (moduleObj) {
                var abObj = moduleObj.getABObj();
                abObj.load('root/Scene/LobbyRoot', cc.Prefab, function (err, prefab) {
                    cc.log("[HelloWorld] load_lobby_prefab_ err:", JSON.stringify(err));
                    if (_this._lobbyRootNode) {
                        _this._lobbyRootNode.destroy();
                    }
                    var lobbyRoot = cc.instantiate(prefab);
                    _this._lobbyRootNode = lobbyRoot;
                    _this.moduleLayer.addChild(lobbyRoot, 100);
                    lobbyRoot.getComponent("LobbyRoot").initModule();
                });
            });
        });
    };
    SubGame_2.prototype.hackSys_Log_Save = function () {
        if (!this._logArr) {
            return;
        }
        ;
        var totalLen = this._logArr.length;
        var reportCo = 2000;
        var beginIdx = totalLen - reportCo;
        beginIdx = beginIdx >= 0 ? beginIdx : 0;
        var arrTemp = [];
        for (var i = beginIdx; i < totalLen; i++) {
            arrTemp.push(this._logArr[i]);
        }
        var retMsg = arrTemp.join("\n");
        if (cc.sys.isNative) {
            var path = jsb.fileUtils.getWritablePath();
            jsb.fileUtils.writeStringToFile(retMsg, path + "alogRecord.txt");
        }
    };
    SubGame_2.prototype.hackSysLog = function () {
        var _a;
        if (this._initHackLog) {
            return;
        }
        ;
        this._initHackLog = true;
        var _logArr = [];
        this._logArr = _logArr;
        var MAX_STR_LEN = 1300;
        var excludeStr = (_a = {}, _a["Can't find letter definition in texture"] = 1, _a);
        var push_log = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            var ignore = false;
            var logStr = arg.join(" ");
            var strLen = logStr.length;
            for (var idx = 0; idx < strLen;) {
                var endIdx = idx + MAX_STR_LEN;
                var splitStr = logStr.slice(idx, endIdx);
                for (var excStr in excludeStr) {
                    if (splitStr.indexOf(excStr, 0) == 0) {
                        ignore = true;
                        break;
                    }
                }
                if (!ignore) {
                    _logArr.push("_" + _logArr.length + "_=> " + splitStr + (endIdx < strLen ? "-->" : ""));
                }
                idx = endIdx;
            }
            return ignore;
        };
        var logDef = function () {
            var _a;
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            var ignore = push_log.apply(void 0, arg);
            if (!ignore) {
                (_a = cc["_sv_log_2_Ori"]).call.apply(_a, __spreadArrays([cc], arg));
            }
        };
        var consoleLogDef = function () {
            var _a;
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            var ignore = push_log.apply(void 0, arg);
            if (!ignore) {
                if (cc["_sv_console_log_2_Ori"]) {
                    (_a = cc["_sv_console_log_2_Ori"]).call.apply(_a, __spreadArrays([console], arg));
                }
            }
        };
        if (!cc["_sv_log_2_Ori"]) {
            cc["_sv_log_2_Ori"] = cc.log;
        }
        if (!cc["_sv_console_log_2_Ori"]) {
            cc["_sv_console_log_2_Ori"] = console.log;
        }
        cc.log = logDef;
        console.log = consoleLogDef;
    };
    __decorate([
        property(cc.Node)
    ], SubGame_2.prototype, "moduleLayer", void 0);
    __decorate([
        property(cc.Asset)
    ], SubGame_2.prototype, "asset1", void 0);
    __decorate([
        property(cc.Asset)
    ], SubGame_2.prototype, "asset2", void 0);
    SubGame_2 = __decorate([
        ccclass
    ], SubGame_2);
    return SubGame_2;
}(cc.Component));
exports.default = SubGame_2;

cc._RF.pop();