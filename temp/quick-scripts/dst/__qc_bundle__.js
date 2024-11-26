
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/ABLobby/root/Script/LobbyRoot');
require('./assets/ABSubGame1/root/Script/SubGame_1');
require('./assets/ABSubGame2/root/Script/SubGame_2');
require('./assets/Script/HelloWorld');
require('./assets/Script/bundle/BundleHotUIHelper');
require('./assets/Script/bundle/BundleManager');
require('./assets/Script/bundle/BundleModule');
require('./assets/Script/bundle/BundleUnpackHelper');
require('./assets/Script/bundle/BundleUtil');
require('./assets/Script/bundle/Const');
require('./assets/Script/bundle/SingleIns');

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/HelloWorld.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvSGVsbG9Xb3JsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQW1EO0FBRTdDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBc0pDO1FBcEpHLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRTVCLFlBQU0sR0FBYSxJQUFJLENBQUM7UUFFeEIsWUFBTSxHQUFhLElBQUksQ0FBQztRQUV4QixvQkFBYyxHQUFZLElBQUksQ0FBQzs7SUE4SW5DLENBQUM7SUF6SUcsNkJBQVMsR0FBVDtJQUNBLENBQUM7SUFFRCwwQkFBTSxHQUFOO1FBQUEsaUJBc0NDO1FBckNHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUNqQixJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUU7WUFDbkIsRUFBRSxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxDQUFFLENBQUE7U0FDMUU7UUFFRCxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBRyxPQUFNLENBQUMsR0FBRyxDQUFDLElBQUUsV0FBVyxFQUFDO1lBQ3hCLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3pGLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3pG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O1lBQzdCLElBQUcsQ0FBQyxNQUFNLEVBQUM7Z0JBQ1AsSUFBRyxFQUFFLENBQUMsdUJBQXVCLENBQUMsRUFBRTtvQkFBRSxDQUFBLEtBQUEsRUFBRSxDQUFDLHVCQUF1QixDQUFDLENBQUEsQ0FBQyxJQUFJLDJCQUFDLE9BQU8sR0FBSSxHQUFHLEdBQUU7aUJBQUU7YUFDeEY7UUFDTCxDQUFDLENBQUE7UUFDRCxJQUFHLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxFQUFDO1lBQUUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUE7U0FBRztRQUN6RCxJQUFHLENBQUMsRUFBRSxDQUFDLHVCQUF1QixDQUFDLEVBQUM7WUFBRSxFQUFFLENBQUMsdUJBQXVCLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFBO1NBQUc7UUFDOUUsRUFBRSxDQUFDLEdBQUcsR0FBUSxNQUFNLENBQUE7UUFDcEIsT0FBTyxDQUFDLEdBQUcsR0FBRyxhQUFhLENBQUE7SUFDL0IsQ0FBQztJQWpKRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNVO0lBRTVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7NkNBQ0s7SUFFeEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs2Q0FDSztJQU5QLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0FzSjdCO0lBQUQsZ0JBQUM7Q0F0SkQsQUFzSkMsQ0F0SnNDLEVBQUUsQ0FBQyxTQUFTLEdBc0psRDtrQkF0Sm9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQnVuZGxlTWFuYWdlciBmcm9tIFwiLi9idW5kbGUvQnVuZGxlTWFuYWdlclwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1YkdhbWVfMiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbW9kdWxlTGF5ZXI6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Bc3NldClcbiAgICBhc3NldDE6IGNjLkFzc2V0ID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuQXNzZXQpXG4gICAgYXNzZXQyOiBjYy5Bc3NldCA9IG51bGw7XG5cbiAgICBfbG9iYnlSb290Tm9kZTogY2MuTm9kZSA9IG51bGw7XG4gICAgX2xvZ0FycjogYW55O1xuICAgIF9pbml0SGFja0xvZzogYW55O1xuXG5cbiAgICBvbkRlc3Ryb3kgKCkgeyBcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7ICBcbiAgICAgICAgdGhpcy5oYWNrU3lzTG9nKClcbiAgICAgICAgaWYgKCFjYy5zeXMuaXNCcm93c2VyKSB7XG4gICAgICAgICAgICBjYy5sb2coXCJbSGVsbG9Xb3JsZF0ganNiX3dyaXRhYmxlXzpcIiwganNiLmZpbGVVdGlscy5nZXRXcml0YWJsZVBhdGgoKSApXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYXNzZXRQYXRoID0gXCJcIjtcbiAgICAgICAgaWYodHlwZW9mKGpzYikhPVwidW5kZWZpbmVkXCIpe1xuICAgICAgICAgICAgbGV0IGFic1BhdGgxID0ganNiLmZpbGVVdGlscy5mdWxsUGF0aEZvckZpbGVuYW1lKHRoaXMuYXNzZXQxLm5hdGl2ZVVybCkucmVwbGFjZShcIi8vXCIsXCIvXCIpXG4gICAgICAgICAgICBsZXQgYWJzUGF0aDIgPSBqc2IuZmlsZVV0aWxzLmZ1bGxQYXRoRm9yRmlsZW5hbWUodGhpcy5hc3NldDIubmF0aXZlVXJsKS5yZXBsYWNlKFwiLy9cIixcIi9cIilcbiAgICAgICAgICAgIGxldCB0ZXN0TGVuID0gYWJzUGF0aDEubGVuZ3RoPmFic1BhdGgyLmxlbmd0aD8gYWJzUGF0aDIubGVuZ3RoIDogYWJzUGF0aDEubGVuZ3RoIFxuICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0ZXN0TGVuO2krKyl7XG4gICAgICAgICAgICAgICAgaWYoYWJzUGF0aDFbaV0gIT0gYWJzUGF0aDJbaV0pe1xuICAgICAgICAgICAgICAgICAgICBhc3NldFBhdGggPSBhYnNQYXRoMS5zdWJzdHJpbmcoMCwgaSlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgY2MubG9nKFwiYWJzRmlsZV9wYXRoOlwiLCBhc3NldFBhdGggKVxuICAgICAgICB9XG5cbiAgICAgICAgQnVuZGxlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmluaXRDb20oe1xuICAgICAgICAgICAgdXNlSG90VXBkYXRlIDogdHJ1ZSAsICAgICAvLyDmmK/lkKblkK/nlKjng63mm7TmlrAgXG4gICAgICAgICAgICBhc3NldFBhdGg6IGFzc2V0UGF0aCxcbiAgICAgICAgfSkgXG4gICAgICAgIFxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvLyDlpI3liLbljIXlhoXmqKHlnZfliLDlj6/or7vlhpnot6/lvoTkuIss6YG/5YWN6aaW5qyh5Yqg6L295qih5Z2X5pe25LuO6L+c56iL5a6M5pW05ouJ5Y+WXG4gICAgICAgIEJ1bmRsZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5leGVjVW5wYWNrYWdlKCgpPT57XG5cbiAgICAgICAgICAgIEJ1bmRsZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZXFWZXJzaW9uSW5mbygoKT0+eyAvLyDojrflj5bmnIDmlrDniYjmnKxcbiAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZExvYmJ5Um9vdCgpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgICAgIC8vIOWumuaXtuajgOa1i+abtOaWsFxuICAgICAgICBCdW5kbGVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVxTG9vcFZlcnNpb25JbmZvKCkgXG5cbiAgICB9XG5cbiAgICByZWxvYWRMb2JieVJvb3QoKXtcblxuICAgICAgICBsZXQgbG9hZEFiID0gW1wiQUJMb2JieVwiXVxuICAgICAgICAvLyBsb2FkQWIgPSBbXCJBQkxvYmJ5XCIsIFwiQUJTdWJHYW1lMVwiLCBcIkFCU3ViR2FtZTJcIl1cbiAgICAgICAgQnVuZGxlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmhvdFVwZGF0ZU11bHRpTW9kdWxlKGxvYWRBYiwoKT0+eyAvLyDmm7TmlrDmqKHlnZfliLDmnIDmlrDniYjmnKxcblxuICAgICAgICAgICAgQnVuZGxlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZE1vZHVsZShcIkFCTG9iYnlcIiwgKG1vZHVsZU9iaik9PnsgLy8g5Yqg6L295qih5Z2XXG5cbiAgICAgICAgICAgICAgICBsZXQgYWJPYmogPSBtb2R1bGVPYmouZ2V0QUJPYmooKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGFiT2JqLmxvYWQoJ3Jvb3QvU2NlbmUvTG9iYnlSb290JywgY2MuUHJlZmFiLCAoZXJyLCBwcmVmYWIpPT57ICAvLyDkvb/nlKjmqKHlnZfotYTmupAgXG5cbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwiW0hlbGxvV29ybGRdIGxvYWRfbG9iYnlfcHJlZmFiXyBlcnI6XCIsIEpTT04uc3RyaW5naWZ5KGVycikgKVxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLl9sb2JieVJvb3ROb2RlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYmJ5Um9vdE5vZGUuZGVzdHJveSgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IGxvYmJ5Um9vdCA9IGNjLmluc3RhbnRpYXRlKHByZWZhYikgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYmJ5Um9vdE5vZGUgPSBsb2JieVJvb3RcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2R1bGVMYXllci5hZGRDaGlsZChsb2JieVJvb3QsIDEwMClcbiAgICAgICAgICAgICAgICAgICAgbG9iYnlSb290LmdldENvbXBvbmVudChcIkxvYmJ5Um9vdFwiKS5pbml0TW9kdWxlKCkgICAgXG4gICAgICAgICAgICAgICAgfSkgXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGhhY2tTeXNfTG9nX1NhdmUoKXtcbiAgICAgICAgaWYoIXRoaXMuX2xvZ0Fycil7IHJldHVybiA7IH07XG5cbiAgICAgICAgbGV0IHRvdGFsTGVuID0gdGhpcy5fbG9nQXJyLmxlbmd0aFxuICAgICAgICBsZXQgcmVwb3J0Q28gPSAyMDAwXG4gICAgICAgIGxldCBiZWdpbklkeCA9IHRvdGFsTGVuLXJlcG9ydENvXG4gICAgICAgIGJlZ2luSWR4ID0gYmVnaW5JZHg+PTA/YmVnaW5JZHg6MFxuICAgICAgICBsZXQgYXJyVGVtcCA9IFtdXG5cbiAgICAgICAgZm9yKGxldCBpPWJlZ2luSWR4OyBpPHRvdGFsTGVuOyBpKyspe1xuICAgICAgICAgICAgYXJyVGVtcC5wdXNoKHRoaXMuX2xvZ0FycltpXSlcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXRNc2cgPSBhcnJUZW1wLmpvaW4oXCJcXG5cIilcbiAgICAgICAgaWYoY2Muc3lzLmlzTmF0aXZlKXtcbiAgICAgICAgICAgIGxldCBwYXRoID0ganNiLmZpbGVVdGlscy5nZXRXcml0YWJsZVBhdGgoKVxuICAgICAgICAgICAganNiLmZpbGVVdGlscy53cml0ZVN0cmluZ1RvRmlsZShyZXRNc2csIHBhdGggKyBcImFsb2dSZWNvcmQudHh0XCIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYWNrU3lzTG9nKCl7XG5cbiAgICAgICAgaWYodGhpcy5faW5pdEhhY2tMb2cpeyByZXR1cm4gOyB9IDsgdGhpcy5faW5pdEhhY2tMb2cgPSB0cnVlIDsgXG4gICAgICAgIGxldCBfbG9nQXJyID0gW11cbiAgICAgICAgdGhpcy5fbG9nQXJyID0gX2xvZ0FyciBcbiAgICAgICAgbGV0IE1BWF9TVFJfTEVOID0gMTMwMCBcbiAgICAgICAgbGV0IGV4Y2x1ZGVTdHIgPSB7IFtcIkNhbid0IGZpbmQgbGV0dGVyIGRlZmluaXRpb24gaW4gdGV4dHVyZVwiXToxIH0gXG4gICAgICAgIGxldCBwdXNoX2xvZyA9IGZ1bmN0aW9uKC4uLmFyZyl7ICBcbiAgICAgICAgICAgIGxldCBpZ25vcmUgPSBmYWxzZVxuICAgICAgICAgICAgbGV0IGxvZ1N0ciA9IGFyZy5qb2luKFwiIFwiKVxuICAgICAgICAgICAgbGV0IHN0ckxlbiA9IGxvZ1N0ci5sZW5ndGhcbiAgICAgICAgICAgIGZvcihsZXQgaWR4ID0gMDtpZHg8c3RyTGVuOyl7XG4gICAgICAgICAgICAgICAgbGV0IGVuZElkeCA9IGlkeCtNQVhfU1RSX0xFTlxuXG4gICAgICAgICAgICAgICAgbGV0IHNwbGl0U3RyID0gbG9nU3RyLnNsaWNlKGlkeCwgZW5kSWR4KVxuICAgICAgICAgICAgICAgIGZvcihsZXQgZXhjU3RyIGluICBleGNsdWRlU3RyKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoIHNwbGl0U3RyLmluZGV4T2YoZXhjU3RyLCAwKSA9PSAwICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZ25vcmUgPSB0cnVlIFxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoICFpZ25vcmUgKXtcbiAgICAgICAgICAgICAgICAgICAgX2xvZ0Fyci5wdXNoKFwiX1wiK19sb2dBcnIubGVuZ3RoK1wiXz0+IFwiKyBzcGxpdFN0ciArKGVuZElkeDxzdHJMZW4/XCItLT5cIjpcIlwiKSkgXG4gICAgICAgICAgICAgICAgfSBcblxuICAgICAgICAgICAgICAgIGlkeCA9IGVuZElkeFxuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIHJldHVybiBpZ25vcmVcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsb2dEZWYgPSBmdW5jdGlvbiguLi5hcmcpeyBcbiAgICAgICAgICAgIGxldCBpZ25vcmUgPSBwdXNoX2xvZyguLi5hcmcpXG4gICAgICAgICAgICBpZighaWdub3JlKXtcbiAgICAgICAgICAgICAgICBjY1tcIl9zdl9sb2dfMl9PcmlcIl0uY2FsbChjYywgLi4uYXJnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBjb25zb2xlTG9nRGVmID0gZnVuY3Rpb24oLi4uYXJnKXsgXG4gICAgICAgICAgICBsZXQgaWdub3JlID0gcHVzaF9sb2coLi4uYXJnKSBcbiAgICAgICAgICAgIGlmKCFpZ25vcmUpe1xuICAgICAgICAgICAgICAgIGlmKGNjW1wiX3N2X2NvbnNvbGVfbG9nXzJfT3JpXCJdKSB7IGNjW1wiX3N2X2NvbnNvbGVfbG9nXzJfT3JpXCJdLmNhbGwoY29uc29sZSwuLi5hcmcgKSB9XG4gICAgICAgICAgICB9IFxuICAgICAgICB9XG4gICAgICAgIGlmKCFjY1tcIl9zdl9sb2dfMl9PcmlcIl0peyBjY1tcIl9zdl9sb2dfMl9PcmlcIl0gPSBjYy5sb2cgIH1cbiAgICAgICAgaWYoIWNjW1wiX3N2X2NvbnNvbGVfbG9nXzJfT3JpXCJdKXsgY2NbXCJfc3ZfY29uc29sZV9sb2dfMl9PcmlcIl0gPSBjb25zb2xlLmxvZyAgfVxuICAgICAgICBjYy5sb2cgICAgICA9IGxvZ0RlZlxuICAgICAgICBjb25zb2xlLmxvZyA9IGNvbnNvbGVMb2dEZWZcbiAgICB9XG5cblxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ABSubGame1/root/Script/SubGame_1.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9BQlN1YkdhbWUxL3Jvb3QvU2NyaXB0L1N1YkdhbWVfMS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSSxNQUFNLEdBQUc7SUFBUyxhQUFNO1NBQU4sVUFBTSxFQUFOLHFCQUFNLEVBQU4sSUFBTTtRQUFOLHdCQUFNOztJQUN4QixFQUFFLENBQUMsR0FBRyxPQUFOLEVBQUUsa0JBQUssYUFBYSxHQUFJLEdBQUcsR0FBRztBQUNsQyxDQUFDLENBQUE7QUFFSyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF1Qyw2QkFBWTtJQUFuRDs7SUFjQSxDQUFDO0lBWEcsOEJBQVUsR0FBVixVQUFXLElBQUk7UUFDZCxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDZCxJQUFBLFNBQVMsR0FBSyxJQUFJLFVBQVQsQ0FBUztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQTtJQUM1QixDQUFDO0lBRUQsK0JBQVcsR0FBWDtRQUNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFBO0lBQy9CLENBQUM7SUFaZ0IsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQWM3QjtJQUFELGdCQUFDO0NBZEQsQUFjQyxDQWRzQyxFQUFFLENBQUMsU0FBUyxHQWNsRDtrQkFkb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5sZXQgSlNfTE9HID0gZnVuY3Rpb24oLi4uYXJnKXsgXG4gICAgY2MubG9nKFwiW1N1YkdhbWVfMV1cIiwuLi5hcmcpIDsgXG59XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ViR2FtZV8yIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgICBfbG9iYnlSb290OiBhbnk7XG5cbiAgICBpbml0TW9kdWxlKGFyZ3Mpe1xuICAgIFx0SlNfTE9HKFwiaW5pdE1vZHVsZVwiKVxuICAgIFx0bGV0IHsgbG9iYnlSb290IH0gPSBhcmdzXG4gICAgXHR0aGlzLl9sb2JieVJvb3QgPSBsb2JieVJvb3RcbiAgICB9XG5cbiAgICBvbkJ0bl9jbG9zZSgpe1xuICAgIFx0SlNfTE9HKFwiYnRuX2Nsb3NlXCIpXG4gICAgXHR0aGlzLl9sb2JieVJvb3QucmVtb3ZlR2FtZV8xKClcbiAgICB9XG5cbn0gXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ABLobby/root/Script/LobbyRoot.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9BQkxvYmJ5L3Jvb3QvU2NyaXB0L0xvYmJ5Um9vdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQWlFO0FBRWpFLElBQUksTUFBTSxHQUFHO0lBQVMsYUFBTTtTQUFOLFVBQU0sRUFBTixxQkFBTSxFQUFOLElBQU07UUFBTix3QkFBTTs7SUFDeEIsRUFBRSxDQUFDLEdBQUcsT0FBTixFQUFFLGtCQUFLLGFBQWEsR0FBSSxHQUFHLEdBQUc7QUFDbEMsQ0FBQyxDQUFBO0FBQ0ssSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBdUMsNkJBQVk7SUFBbkQ7O0lBZ0ZBLENBQUM7SUEzRUcsOEJBQVUsR0FBVjtRQUNDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUNyQixDQUFDO0lBRUQsb0NBQWdCLEdBQWhCO1FBQUEsaUJBMEJDO1FBekJBLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO1FBQzFCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtRQUVuQixJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxVQUFDLFNBQVM7WUFDeEMsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFBO1lBRTFCLEtBQUssQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLEdBQUcsRUFBRSxNQUFNO2dCQUNyRCxNQUFNLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBRSxDQUFBO2dCQUNuRCxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUNsQyxLQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUE7Z0JBQzlCLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO2dCQUNuQixLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFDLFNBQVMsRUFBQyxLQUFJLEVBQUMsQ0FBQyxDQUFBO1lBRWhFLENBQUMsQ0FBQyxDQUFBO1FBQ1QsQ0FBQyxDQUFDLENBQUE7UUFJQyxZQUFZO1FBQ1osaURBQWlEO1FBQ2pELHNDQUFzQztRQUN0QyxxRUFBcUU7UUFDckUsWUFBWTtRQUNaLE1BQU07SUFFVixDQUFDO0lBRUQsZ0NBQVksR0FBWjtRQUNDLElBQUcsSUFBSSxDQUFDLE1BQU0sRUFBQztZQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUE7U0FDckI7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtJQUNuQixDQUFDO0lBR0Qsb0NBQWdCLEdBQWhCO1FBQUEsaUJBZ0JDO1FBZkEsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUE7UUFDMUIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFBO1FBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLFVBQUMsU0FBUztZQUN4QyxJQUFJLEtBQUssR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUE7WUFFMUIsS0FBSyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUMsR0FBRyxFQUFFLE1BQU07Z0JBQ3JELE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFFLENBQUE7Z0JBQ25ELElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUE7Z0JBQ2xDLEtBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQTtnQkFDOUIsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7Z0JBQ25CLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUMsU0FBUyxFQUFDLEtBQUksRUFBQyxDQUFDLENBQUE7WUFFaEUsQ0FBQyxDQUFDLENBQUE7UUFDVCxDQUFDLENBQUMsQ0FBQTtJQUVILENBQUM7SUFDRCxnQ0FBWSxHQUFaO1FBQ0MsSUFBRyxJQUFJLENBQUMsTUFBTSxFQUFDO1lBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtTQUNyQjtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO0lBRW5CLENBQUM7SUFHRCwrQkFBVyxHQUFYLFVBQVksTUFBTSxFQUFFLFFBQVE7UUFDeEIsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFDO1lBRXRELHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxVQUFDLFNBQVM7Z0JBQ3BELFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUN2QixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQTlFZ0IsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQWdGN0I7SUFBRCxnQkFBQztDQWhGRCxBQWdGQyxDQWhGc0MsRUFBRSxDQUFDLFNBQVMsR0FnRmxEO2tCQWhGb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCdW5kbGVNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9TY3JpcHQvYnVuZGxlL0J1bmRsZU1hbmFnZXJcIjtcblxubGV0IEpTX0xPRyA9IGZ1bmN0aW9uKC4uLmFyZyl7IFxuICAgIGNjLmxvZyhcIltMb2JieVJvb3RdXCIsLi4uYXJnKSA7IFxufVxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2JieVJvb3QgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAgIF9nYW1lMTogYW55O1xuICAgIF9nYW1lMjogYW55O1xuXG5cbiAgICBpbml0TW9kdWxlKCl7XG4gICAgXHRKU19MT0coXCJpbml0TW9kdWxlXCIpXG4gICAgfVxuXG4gICAgb25CdG5fbG9hZEdhbWVfMSgpe1xuICAgIFx0SlNfTE9HKFwib25CdG5fbG9hZEdhbWVfMVwiKVxuICAgIFx0dGhpcy5yZW1vdmVHYW1lXzEoKVxuXG4gICAgXHR0aGlzLmxvYWRTdWJHYW1lKFwiQUJTdWJHYW1lMVwiLCAobW9kdWxlT2JqKT0+e1xuICAgIFx0XHRsZXQgYWJPYmogPSBtb2R1bGVPYmouZ2V0QUJPYmooKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgYWJPYmoubG9hZCgncm9vdC9TY2VuZS9TdWJHYW1lMScsIGNjLlByZWZhYiwgKGVyciwgcHJlZmFiKT0+e1xuICAgICAgICAgICAgICAgIEpTX0xPRyhcImxvYWRfZ2FtZTFfcHJlZmFiXzpcIiwgSlNPTi5zdHJpbmdpZnkoZXJyKSApIFxuICAgICAgICAgICAgICAgIGxldCBfbm9kZSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYikgXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKF9ub2RlLCAxMDApXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2FtZTEgPSBfbm9kZVxuICAgICAgICAgICAgICAgIF9ub2RlLmdldENvbXBvbmVudChcIlN1YkdhbWVfMVwiKS5pbml0TW9kdWxlKHtsb2JieVJvb3Q6dGhpc30pICAgIFxuXG4gICAgICAgICAgICB9KSBcbiAgICBcdH0pXG5cblxuXG4gICAgICAgIC8vIOaooeWdl+WGheWKoOi9veiHqui6q+i1hOa6kFxuICAgICAgICAvLyBsZXQgbW9kdWxlID0gX0dfYnVuZGxlTWdyLmdldE1vZHVsZShcIkFCTG9iYnlcIilcbiAgICAgICAgLy8gbGV0IGFzc2V0QnVuZGxlID0gbW9kdWxlLmdldEFCT2JqKClcbiAgICAgICAgLy8gYXNzZXRCdW5kbGUubG9hZCgncm9vdC9TY2VuZS94eHgnLCBjYy5QcmVmYWIsIChlcnIsIHByZWZhYik9PnsgICAgXG4gICAgICAgIC8vICAgICAvLy4uLlxuICAgICAgICAvLyB9KSBcblxuICAgIH1cblxuICAgIHJlbW92ZUdhbWVfMSgpe1xuICAgIFx0aWYodGhpcy5fZ2FtZTEpe1xuICAgIFx0XHR0aGlzLl9nYW1lMS5kZXN0cm95KClcbiAgICBcdH1cbiAgICBcdHRoaXMuX2dhbWUxID0gbnVsbFxuICAgIH1cblxuXG4gICAgb25CdG5fbG9hZEdhbWVfMigpe1xuICAgIFx0SlNfTE9HKFwib25CdG5fbG9hZEdhbWVfMlwiKVxuICAgIFx0dGhpcy5yZW1vdmVHYW1lXzIoKVxuICAgIFx0dGhpcy5sb2FkU3ViR2FtZShcIkFCU3ViR2FtZTJcIiwgKG1vZHVsZU9iaik9PntcbiAgICBcdFx0bGV0IGFiT2JqID0gbW9kdWxlT2JqLmdldEFCT2JqKClcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGFiT2JqLmxvYWQoJ3Jvb3QvU2NlbmUvU3ViR2FtZTInLCBjYy5QcmVmYWIsIChlcnIsIHByZWZhYik9PntcbiAgICAgICAgICAgICAgICBKU19MT0coXCJsb2FkX2dhbWUyX3ByZWZhYl86XCIsIEpTT04uc3RyaW5naWZ5KGVycikgKSBcbiAgICAgICAgICAgICAgICBsZXQgX25vZGUgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWIpIFxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChfbm9kZSwgMTAwKVxuICAgICAgICAgICAgICAgIHRoaXMuX2dhbWUyID0gX25vZGVcbiAgICAgICAgICAgICAgICBfbm9kZS5nZXRDb21wb25lbnQoXCJTdWJHYW1lXzJcIikuaW5pdE1vZHVsZSh7bG9iYnlSb290OnRoaXN9KSAgICBcblxuICAgICAgICAgICAgfSkgXG4gICAgXHR9KVxuXG4gICAgfVxuICAgIHJlbW92ZUdhbWVfMigpe1xuICAgIFx0aWYodGhpcy5fZ2FtZTIpe1xuICAgIFx0XHR0aGlzLl9nYW1lMi5kZXN0cm95KClcbiAgICBcdH1cbiAgICBcdHRoaXMuX2dhbWUyID0gbnVsbFxuXG4gICAgfVxuXG5cbiAgICBsb2FkU3ViR2FtZShhYk5hbWUsIGNhbGxiYWNrKXsgXG4gICAgICAgIEJ1bmRsZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ob3RVcGRhdGVNdWx0aU1vZHVsZShbYWJOYW1lXSwoKT0+e1xuXG4gICAgICAgICAgICBCdW5kbGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkTW9kdWxlKGFiTmFtZSwgKG1vZHVsZU9iaik9PntcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhtb2R1bGVPYmopXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxufSJdfQ==
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/bundle/BundleManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f75e8QejphEfbSl1SdLT/5f', 'BundleManager');
// Script/bundle/BundleManager.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var BundleModule_1 = require("./BundleModule");
var SingleIns_1 = require("./SingleIns");
var BundleHotUIHelper_1 = require("./BundleHotUIHelper");
var BundleUtil_1 = require("./BundleUtil");
var BundleUnpackHelper_1 = require("./BundleUnpackHelper");
var Const_1 = require("./Const");
var BundleManager = /** @class */ (function (_super) {
    __extends(BundleManager, _super);
    function BundleManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.modules = {};
        _this._timeOutIds = [];
        return _this;
        //-------------------------------------------------------------------<< 查询新版本
    }
    BundleManager.prototype.initCom = function (args) {
        this._bundleUtil = BundleUtil_1.default.getInstance();
        this._unpackage = BundleUnpackHelper_1.default.getInstance();
        this._bundleHotUIHelper = BundleHotUIHelper_1.default.getInstance();
        // jsb.fileUtils.getDefaultResourceRootPath()
        this._nativeRootPath = args.assetPath;
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleManager, "_nativeRootPath:", this._nativeRootPath);
        this._lastReq_VersionInfoTime = 0; //(new Date()).getTime()  // 最后一次检测版本时间
        this._detectNewVersionInterval = 30; // 自动检测版本间隔
        this.modules = {};
        this._local_data_key = Const_1.ModuleConst.localVersionConfigKey; //"_local_gameVersionData1"
        var versionData = cc.sys.localStorage.getItem(this._local_data_key);
        if (!versionData) {
            versionData = this.createDefaultVersionData();
        }
        else {
            versionData = JSON.parse(versionData);
        }
        this._local_Version = versionData;
        this._romoteVersion = this.createDefaultVersionData();
        this._useHotUpdate = args;
        this._unpackage.initCom(args);
    };
    BundleManager.prototype.execUnpackage = function (onComplate) {
        this._unpackage.execUnpackage(onComplate);
    };
    BundleManager.prototype.getNativePath = function () {
        return this._nativeRootPath;
    };
    BundleManager.prototype.reqLoopVersionInfo = function () {
        var _this = this;
        if (this._useHotUpdate) {
            if (this._reqLoopHandler) {
                return;
            }
            this._reqLoopHandler = function () {
                _this.reqVersionInfo();
            };
            this.intervalSchedule(this._reqLoopHandler, this._detectNewVersionInterval);
        }
    };
    // 更新AB版本号 , 新包安装解压资源后覆盖版本号
    BundleManager.prototype.setLocalAbVersion = function (verObj) {
        var localMap = this._local_Version;
        for (var abName in verObj) {
            var verStr = verObj[abName];
            if (!localMap.modules[abName]) { // 运营中新增模块
                localMap.modules[abName] = {};
            }
            localMap.modules[abName].resVersion = verStr;
        }
        cc.sys.localStorage.setItem(this._local_data_key, JSON.stringify(this._local_Version));
    };
    BundleManager.prototype.get_LocalVersion = function () {
        return this._local_Version;
    };
    BundleManager.prototype.get_RomoteVersion = function () {
        return this._romoteVersion;
    };
    BundleManager.prototype.createDefaultVersionData = function () {
        var ret = {
            clientMin: "1.0.0",
            modules: {}
        };
        return ret;
    };
    // 更新所有模块
    BundleManager.prototype.hotUpdateAllModule = function (callback, isShowHotDetectAlert) {
        var _this = this;
        if (!this._useHotUpdate) {
            callback && callback();
            return false;
        }
        // 显示正在检测更新提示
        if (isShowHotDetectAlert) {
            this._bundleHotUIHelper.checkNewVersionShow();
        }
        return this.hotUpdateMultiModule(Object.keys(this._romoteVersion.modules), function () {
            _this._bundleHotUIHelper.checkNewVersionHide();
            callback();
        });
    };
    // 置顶更新模块
    BundleManager.prototype.hotUpdateMultiModule = function (moduleNameArr, callback) {
        var _this = this;
        if (this.isNeedReq_versionInfo()) {
            this.reqVersionInfo(function () {
                _this._doHotUpdateMulti(moduleNameArr, callback);
            });
        }
        else {
            this._doHotUpdateMulti(moduleNameArr, callback);
        }
    };
    BundleManager.prototype._doHotUpdateMulti = function (moduleNameArr, callback) {
        var _this = this;
        if (!this._useHotUpdate) {
            callback && callback();
            return false;
        }
        // 大版本太旧
        if (-1 == this._bundleUtil.comVersion(Const_1.GlobalConst.Client_Version, this._romoteVersion.clientMin)) {
            this._bundleHotUIHelper.showAlertClientTooOld();
            return;
        }
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleManager, "moduleName_ori:", JSON.stringify(moduleNameArr));
        moduleNameArr = this.getDependModule(moduleNameArr);
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleManager, "moduleName_dep:", JSON.stringify(moduleNameArr));
        // isShowHotUI 
        var need_Update = false;
        var need_Restart = false;
        // 所有module更新完成
        var onAllModuleHotFinish = function () {
            BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleManager, "hot_update_-AllHot_Finish");
            cc.sys.localStorage.setItem(_this._local_data_key, JSON.stringify(_this._local_Version));
            if (need_Restart) {
                // this.scheduleOnce(()=>{ 
                //     // cc.sys.restartVM() 
                //     cc.game.restart();
                // }, 0.1)
                setTimeout(function () {
                    cc.game.restart();
                }, 100);
            }
            else {
                callback && callback();
            }
        };
        // 下载 assets bundle 资源
        var needUpdateNames = [];
        var preloadDir = function () {
            _this._bundleUtil.sequenceMis(needUpdateNames, function () {
                BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleManager, "hot_update_-allPreloadFinish");
                // 所有任务完成
                _this._bundleHotUIHelper.hideUpdating(onAllModuleHotFinish);
            }, function (curMis, idx, onExec) {
                // 每个预加载任务
                var curMisIdx = idx + 1;
                var totalMis = needUpdateNames.length;
                var moduleObj = _this.modules[needUpdateNames[idx]];
                moduleObj.preloadModule(function (finish, total, item) {
                    // BundleUtil.LOG(CodeType.BundleManager, "hot_update_-onProgress_info_:", curMisIdx, finish, total, item.url )
                    _this._bundleHotUIHelper.onProgress(curMisIdx, totalMis, finish, total);
                }, function (items) {
                    BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleManager, "hot_update_-preloadOK_:", needUpdateNames[idx]);
                    onExec();
                });
            });
        };
        // ------------------------------------------- 顺序下载配置 
        this._bundleUtil.sequenceMis(moduleNameArr, function () {
            // 所有配置下载完成
            if (need_Update) {
                _this._bundleHotUIHelper.showUpdating(1, needUpdateNames.length);
                _this._bundleHotUIHelper.showHotAlert(need_Restart, function () {
                    preloadDir();
                });
            }
            else {
                onAllModuleHotFinish();
            }
        }, function (curMis, idx, onExec) {
            // 每个预加载任务
            var moduleName = moduleNameArr[idx];
            var retTemp = {};
            retTemp = _this._hotUpdateModule(moduleName, function (hot_ret) {
                var haveNewVer = hot_ret.haveNewVer, needRestart = hot_ret.needRestart;
                if (haveNewVer) {
                    need_Update = true;
                    needUpdateNames.push(moduleName);
                }
                if (needRestart) {
                    need_Restart = true;
                }
                onExec();
            });
            // ------------------------------------------ 
        });
    };
    // 获取依赖模块, 并排序
    BundleManager.prototype.getDependModule = function (names, h) {
        h = h || 1;
        var rms = this._romoteVersion.modules;
        var ret = {};
        for (var idx in names) {
            var n_1 = names[idx];
            ret[n_1] = { name: n_1, priority: rms[n_1].priority };
            var depends = this.getDependModule(rms[n_1].depend || [], h + 1);
            for (var j in depends) {
                var n_2 = depends[j];
                ret[n_2] = { name: n_2, priority: rms[n_2].priority };
            }
        }
        //排序, 优先级高的先更新 
        if (h == 1) {
            var minfos = Object.values(ret);
            minfos.sort(function (a, b) {
                if (a.priority > b.priority) {
                    return -1;
                }
                return 1;
            });
            ret = {};
            for (var idx in minfos) {
                ret[minfos[idx].name] = 1;
            }
        }
        return Object.keys(ret);
    };
    // 更新到最新版本 
    BundleManager.prototype._hotUpdateModule = function (moduleName, callback) {
        var _this = this;
        if (!this._useHotUpdate) {
            var ret_1 = { haveNewVer: false, needRestart: false };
            callback && callback(ret_1);
            return ret_1;
        }
        var local_Ver = this._local_Version.modules[moduleName].resVersion;
        var romoteVer = this._romoteVersion.modules[moduleName].resVersion;
        var moduleObj = this.modules[moduleName];
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleManager, "version_info_data_-local:", JSON.stringify(this._local_Version));
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleManager, "version_info_data_-remote:", JSON.stringify(this._romoteVersion));
        var ret = { haveNewVer: (local_Ver != romoteVer), needRestart: false };
        var loadVerFunc = function (mObj, ver, cb) {
            mObj.loadAB(function () {
                if (local_Ver != romoteVer) {
                    _this._local_Version.modules[moduleName].resVersion = romoteVer;
                    _this._local_Version.modules[moduleName].showVer = _this._romoteVersion.modules[moduleName].showVer;
                }
                cb && cb();
            }, ver);
        };
        if (!moduleObj) {
            // 未加载过, 更新后不需要重启
            moduleObj = new BundleModule_1.default();
            loadVerFunc(moduleObj.init(moduleName), romoteVer, function () {
                _this.modules[moduleName] = moduleObj;
                callback && callback(ret);
            });
        }
        else {
            // 已加载, 若有更新则更新后重启
            if (local_Ver == romoteVer) {
                callback && callback(ret);
            }
            else {
                ret.needRestart = true;
                loadVerFunc(moduleObj, romoteVer, function () {
                    callback && callback(ret);
                });
            }
        }
        return ret;
    };
    // ------------------------------------------------------------
    BundleManager.prototype.getBundle = function (moduleName) {
        // BundleUtil.LOG(CodeType.BundleManager, "ModuleMag_getbundle__:", moduleName)
        return this.modules[moduleName]._abObj;
    };
    BundleManager.prototype.getModule = function (moduleName) {
        return this.modules[moduleName];
    };
    BundleManager.prototype.addModule = function (moduleName, cb) {
        var _this = this;
        var module = this.modules[moduleName];
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleManager, "module_mag-addMOdule:", moduleName, module);
        if (module) {
            cb(module);
            return module;
        }
        this.removeModule(moduleName);
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleManager, "load_AB____:", moduleName);
        var moduleObj = new BundleModule_1.default();
        moduleObj.init(moduleName, this._useHotUpdate).loadAB(function () {
            _this.modules[moduleName] = moduleObj;
            cb && cb(moduleObj);
        });
    };
    BundleManager.prototype.removeModule = function (moduleName) {
        var moduleObj = this.modules[moduleName];
        if (!moduleObj) {
            return;
        }
        moduleObj.releaseAB();
        delete this.modules[moduleName];
    };
    //------------------------------------------------------------------->> 查询新版本
    BundleManager.prototype.isNeedReq_versionInfo = function () {
        if (Const_1.ModuleConst.reqVersionImmediately) {
            return true;
        }
        var curTime = (new Date()).getTime();
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleManager, "is_need_req_ver_:", curTime, this._lastReq_VersionInfoTime);
        if (curTime - this._lastReq_VersionInfoTime > this._detectNewVersionInterval * 1000) {
            return true;
        }
        return false;
    };
    BundleManager.prototype.reqVersionInfo = function (callback) {
        var _this = this;
        if (!this._useHotUpdate) {
            callback && callback();
            return false;
        }
        if (this._httpReqHandler) {
            this._httpReqHandler.abort();
        }
        var verUrl = Const_1.ModuleConst.hotUrl + "verconfig.json" + "?renew=" + this._bundleUtil.createUUID();
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleManager, "req_version_url_:", verUrl);
        this._httpReqHandler = this._bundleUtil.makeXMLHttp({ url: verUrl, callback: function (_args) {
                var httpData = _args.retData;
                if (!httpData) {
                    return;
                }
                _this._httpReqHandler = null;
                _this._romoteVersion = httpData;
                BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleManager, "onReqVersion_Info_:", JSON.stringify(httpData));
                var localMap = _this._local_Version;
                var remoteMap = httpData;
                var needSave = false;
                for (var moduleName in remoteMap.modules) {
                    if (!localMap.modules[moduleName]) { // 运营中新增模块
                        localMap.modules[moduleName] = {};
                    }
                    if (!localMap.modules[moduleName].showVer) {
                        needSave = true;
                        localMap.modules[moduleName].showVer = (remoteMap.modules[moduleName].showVer);
                    }
                }
                if (needSave) {
                    cc.sys.localStorage.setItem(_this._local_data_key, JSON.stringify(_this._local_Version));
                }
                _this._lastReq_VersionInfoTime = (new Date()).getTime();
                callback && callback();
            } });
    };
    return BundleManager;
}(SingleIns_1.default));
exports.default = BundleManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvYnVuZGxlL0J1bmRsZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQTBDO0FBQzFDLHlDQUFvQztBQUNwQyx5REFBb0Q7QUFDcEQsMkNBQW9EO0FBQ3BELDJEQUFzRDtBQUN0RCxpQ0FBbUQ7QUFFbkQ7SUFBMkMsaUNBQVM7SUFBcEQ7UUFBQSxxRUE2WUM7UUFyWUcsYUFBTyxHQUFPLEVBQUUsQ0FBQztRQU1qQixpQkFBVyxHQUFZLEVBQUUsQ0FBQzs7UUE2WDFCLDZFQUE2RTtJQUVqRixDQUFDO0lBN1hHLCtCQUFPLEdBQVAsVUFBUSxJQUFJO1FBQ1IsSUFBSSxDQUFDLFdBQVcsR0FBTyxvQkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyxVQUFVLEdBQU8sNEJBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkQsSUFBSSxDQUFDLGtCQUFrQixHQUFLLDJCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRTVELDZDQUE2QztRQUM3QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDdEMsb0JBQVUsQ0FBQyxHQUFHLENBQUMscUJBQVEsQ0FBQyxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBRSxDQUFBO1FBRWpGLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxDQUFDLENBQUEsQ0FBQyx1Q0FBdUM7UUFDekUsSUFBSSxDQUFDLHlCQUF5QixHQUFHLEVBQUUsQ0FBQSxDQUFFLFdBQVc7UUFFaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUE7UUFFakIsSUFBSSxDQUFDLGVBQWUsR0FBRyxtQkFBVyxDQUFDLHFCQUFxQixDQUFBLENBQUMsMkJBQTJCO1FBQ3BGLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJ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LENBQUE7Z0JBRXBCLEtBQUksSUFBSSxVQUFVLElBQUksU0FBUyxDQUFDLE9BQU8sRUFBQztvQkFFcEMsSUFBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUMsRUFBSSxVQUFVO3dCQUMzQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtxQkFDcEM7b0JBQ0QsSUFBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxFQUFDO3dCQUNyQyxRQUFRLEdBQUcsSUFBSSxDQUFBO3dCQUNmLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtxQkFDakY7aUJBQ0o7Z0JBRUQsSUFBRyxRQUFRLEVBQUM7b0JBQ1IsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQTtpQkFDekY7Z0JBRUQsS0FBSSxDQUFDLHdCQUF3QixHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO2dCQUN0RCxRQUFRLElBQUksUUFBUSxFQUFFLENBQUM7WUFDM0IsQ0FBQyxFQUFDLENBQUMsQ0FBQTtJQUVQLENBQUM7SUFLTCxvQkFBQztBQUFELENBN1lBLEFBNllDLENBN1kwQyxtQkFBUyxHQTZZbkQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQnVuZGxlTW9kdWxlIGZyb20gXCIuL0J1bmRsZU1vZHVsZVwiO1xuaW1wb3J0IFNpbmdsZUlucyBmcm9tIFwiLi9TaW5nbGVJbnNcIjtcbmltcG9ydCBCdW5kbGVIb3RVSUhlbHBlciBmcm9tIFwiLi9CdW5kbGVIb3RVSUhlbHBlclwiO1xuaW1wb3J0IEJ1bmRsZVV0aWwsIHsgQ29kZVR5cGUgfSBmcm9tIFwiLi9CdW5kbGVVdGlsXCI7XG5pbXBvcnQgQnVuZGxlVW5wYWNrSGVscGVyIGZyb20gXCIuL0J1bmRsZVVucGFja0hlbHBlclwiO1xuaW1wb3J0IHsgTW9kdWxlQ29uc3QsIEdsb2JhbENvbnN0IH0gZnJvbSBcIi4vQ29uc3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVuZGxlTWFuYWdlciBleHRlbmRzIFNpbmdsZUluc3tcbiAgICBfYnVuZGxlVXRpbDogQnVuZGxlVXRpbDtcbiAgICBfdW5wYWNrYWdlOiBCdW5kbGVVbnBhY2tIZWxwZXI7XG4gICAgX2J1bmRsZUhvdFVJSGVscGVyOiBCdW5kbGVIb3RVSUhlbHBlcjtcbiAgICBfbmF0aXZlUm9vdFBhdGg6IHN0cmluZztcbiAgICBfdXNlSG90VXBkYXRlOiBhbnk7XG4gICAgX2xhc3RSZXFfVmVyc2lvbkluZm9UaW1lOiBudW1iZXI7XG4gICAgX2RldGVjdE5ld1ZlcnNpb25JbnRlcnZhbDogbnVtYmVyO1xuICAgIG1vZHVsZXM6YW55ID0ge307XG4gICAgX2xvY2FsX2RhdGFfa2V5OiBzdHJpbmc7XG4gICAgX2xvY2FsX1ZlcnNpb246IGFueTtcbiAgICBfcm9tb3RlVmVyc2lvbjogeyBjbGllbnRNaW46IHN0cmluZzsgbW9kdWxlczoge307IH07XG4gICAgX3JlcUxvb3BIYW5kbGVyOiBhbnk7XG4gICAgX2h0dHBSZXFIYW5kbGVyOiBhbnk7XG4gICAgX3RpbWVPdXRJZHM6bnVtYmVyW10gPSBbXTtcblxuICAgIGluaXRDb20oYXJncyl7XG4gICAgICAgIHRoaXMuX2J1bmRsZVV0aWwgICAgID0gQnVuZGxlVXRpbC5nZXRJbnN0YW5jZSgpO1xuICAgICAgICB0aGlzLl91bnBhY2thZ2UgICAgID0gQnVuZGxlVW5wYWNrSGVscGVyLmdldEluc3RhbmNlKCk7XG4gICAgICAgIHRoaXMuX2J1bmRsZUhvdFVJSGVscGVyICAgPSBCdW5kbGVIb3RVSUhlbHBlci5nZXRJbnN0YW5jZSgpO1xuXG4gICAgICAgIC8vIGpzYi5maWxlVXRpbHMuZ2V0RGVmYXVsdFJlc291cmNlUm9vdFBhdGgoKVxuICAgICAgICB0aGlzLl9uYXRpdmVSb290UGF0aCA9IGFyZ3MuYXNzZXRQYXRoO1xuICAgICAgICBCdW5kbGVVdGlsLkxPRyhDb2RlVHlwZS5CdW5kbGVNYW5hZ2VyLCBcIl9uYXRpdmVSb290UGF0aDpcIiwgdGhpcy5fbmF0aXZlUm9vdFBhdGggKVxuXG4gICAgICAgIHRoaXMuX2xhc3RSZXFfVmVyc2lvbkluZm9UaW1lID0gMCAvLyhuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgIC8vIOacgOWQjuS4gOasoeajgOa1i+eJiOacrOaXtumXtFxuICAgICAgICB0aGlzLl9kZXRlY3ROZXdWZXJzaW9uSW50ZXJ2YWwgPSAzMCAgLy8g6Ieq5Yqo5qOA5rWL54mI5pys6Ze06ZqUXG5cbiAgICAgICAgdGhpcy5tb2R1bGVzID0ge31cblxuICAgICAgICB0aGlzLl9sb2NhbF9kYXRhX2tleSA9IE1vZHVsZUNvbnN0LmxvY2FsVmVyc2lvbkNvbmZpZ0tleSAvL1wiX2xvY2FsX2dhbWVWZXJzaW9uRGF0YTFcIlxuICAgICAgICBsZXQgdmVyc2lvbkRhdGEgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5fbG9jYWxfZGF0YV9rZXkpXG4gICAgICAgIGlmKCF2ZXJzaW9uRGF0YSl7IFxuICAgICAgICAgICAgdmVyc2lvbkRhdGEgPSB0aGlzLmNyZWF0ZURlZmF1bHRWZXJzaW9uRGF0YSgpIFxuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICB2ZXJzaW9uRGF0YSA9IEpTT04ucGFyc2UodmVyc2lvbkRhdGEpXG4gICAgICAgIH0gXG4gICAgICAgIHRoaXMuX2xvY2FsX1ZlcnNpb24gPSB2ZXJzaW9uRGF0YVxuXG4gICAgICAgIHRoaXMuX3JvbW90ZVZlcnNpb24gPSB0aGlzLmNyZWF0ZURlZmF1bHRWZXJzaW9uRGF0YSgpXG5cbiAgICAgICAgdGhpcy5fdXNlSG90VXBkYXRlID0gYXJnc1xuICAgICAgICB0aGlzLl91bnBhY2thZ2UuaW5pdENvbShhcmdzKVxuICAgIH1cblxuICAgIGV4ZWNVbnBhY2thZ2Uob25Db21wbGF0ZSl7XG4gICAgICAgIHRoaXMuX3VucGFja2FnZS5leGVjVW5wYWNrYWdlKG9uQ29tcGxhdGUpXG4gICAgfVxuXG4gICAgZ2V0TmF0aXZlUGF0aCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5fbmF0aXZlUm9vdFBhdGhcbiAgICB9XG5cbiAgICByZXFMb29wVmVyc2lvbkluZm8oKXtcbiAgICAgICAgaWYodGhpcy5fdXNlSG90VXBkYXRlKXtcbiAgICAgICAgICAgIGlmKHRoaXMuX3JlcUxvb3BIYW5kbGVyKXsgcmV0dXJuIH1cbiAgICAgICAgICAgIHRoaXMuX3JlcUxvb3BIYW5kbGVyID0gKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLnJlcVZlcnNpb25JbmZvKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWxTY2hlZHVsZSh0aGlzLl9yZXFMb29wSGFuZGxlciwgdGhpcy5fZGV0ZWN0TmV3VmVyc2lvbkludGVydmFsKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8g5pu05pawQULniYjmnKzlj7cgLCDmlrDljIXlronoo4Xop6PljovotYTmupDlkI7opobnm5bniYjmnKzlj7dcbiAgICBzZXRMb2NhbEFiVmVyc2lvbih2ZXJPYmope1xuXG4gICAgICAgIGxldCBsb2NhbE1hcCA9IHRoaXMuX2xvY2FsX1ZlcnNpb25cbiAgICAgICAgZm9yKGxldCBhYk5hbWUgaW4gdmVyT2JqKXtcbiAgICAgICAgICAgIGxldCB2ZXJTdHIgPSB2ZXJPYmpbYWJOYW1lXVxuXG4gICAgICAgICAgICBpZighbG9jYWxNYXAubW9kdWxlc1thYk5hbWVdKXsgICAvLyDov5DokKXkuK3mlrDlop7mqKHlnZdcbiAgICAgICAgICAgICAgICBsb2NhbE1hcC5tb2R1bGVzW2FiTmFtZV0gPSB7fVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9jYWxNYXAubW9kdWxlc1thYk5hbWVdLnJlc1ZlcnNpb24gPSB2ZXJTdHIgXG4gICAgICAgIH0gXG5cbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuX2xvY2FsX2RhdGFfa2V5LCBKU09OLnN0cmluZ2lmeSh0aGlzLl9sb2NhbF9WZXJzaW9uKSlcbiAgICB9XG5cbiAgICBnZXRfTG9jYWxWZXJzaW9uKCl7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhbF9WZXJzaW9uXG4gICAgfVxuXG4gICAgZ2V0X1JvbW90ZVZlcnNpb24oKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JvbW90ZVZlcnNpb25cbiAgICB9XG5cbiAgICBjcmVhdGVEZWZhdWx0VmVyc2lvbkRhdGEoKXtcbiAgICAgICAgbGV0IHJldCA9IHtcbiAgICAgICAgICAgIGNsaWVudE1pbiA6IFwiMS4wLjBcIiAsIFxuICAgICAgICAgICAgbW9kdWxlcyA6IHt9XG4gICAgICAgIH0gICBcbiAgICAgICAgcmV0dXJuIHJldCBcbiAgICB9XG4gICAgXG4gICAgLy8g5pu05paw5omA5pyJ5qih5Z2XXG4gICAgaG90VXBkYXRlQWxsTW9kdWxlKGNhbGxiYWNrLCBpc1Nob3dIb3REZXRlY3RBbGVydCl7XG4gICAgICAgIGlmKCF0aGlzLl91c2VIb3RVcGRhdGUpe1xuICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOaYvuekuuato+WcqOajgOa1i+abtOaWsOaPkOekulxuICAgICAgICBpZihpc1Nob3dIb3REZXRlY3RBbGVydCl7XG4gICAgICAgICAgICB0aGlzLl9idW5kbGVIb3RVSUhlbHBlci5jaGVja05ld1ZlcnNpb25TaG93KClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmhvdFVwZGF0ZU11bHRpTW9kdWxlKE9iamVjdC5rZXlzKHRoaXMuX3JvbW90ZVZlcnNpb24ubW9kdWxlcyksICgpPT57IFxuICAgICAgICAgICAgdGhpcy5fYnVuZGxlSG90VUlIZWxwZXIuY2hlY2tOZXdWZXJzaW9uSGlkZSgpXG4gICAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICAvLyDnva7pobbmm7TmlrDmqKHlnZdcbiAgICBwdWJsaWMgaG90VXBkYXRlTXVsdGlNb2R1bGUobW9kdWxlTmFtZUFyciwgY2FsbGJhY2spe1xuICAgICAgICBpZih0aGlzLmlzTmVlZFJlcV92ZXJzaW9uSW5mbygpKXtcbiAgICAgICAgICAgIHRoaXMucmVxVmVyc2lvbkluZm8oKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLl9kb0hvdFVwZGF0ZU11bHRpKG1vZHVsZU5hbWVBcnIsIGNhbGxiYWNrKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZG9Ib3RVcGRhdGVNdWx0aShtb2R1bGVOYW1lQXJyLCBjYWxsYmFjaylcbiAgICAgICAgfSBcbiAgICB9XG5cbiAgICBfZG9Ib3RVcGRhdGVNdWx0aShtb2R1bGVOYW1lQXJyLCBjYWxsYmFjayl7XG4gICAgICAgIGlmKCF0aGlzLl91c2VIb3RVcGRhdGUpe1xuICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOWkp+eJiOacrOWkquaXp1xuICAgICAgICBpZigtMSA9PSB0aGlzLl9idW5kbGVVdGlsLmNvbVZlcnNpb24oR2xvYmFsQ29uc3QuQ2xpZW50X1ZlcnNpb24sIHRoaXMuX3JvbW90ZVZlcnNpb24uY2xpZW50TWluICkpe1xuICAgICAgICAgICAgdGhpcy5fYnVuZGxlSG90VUlIZWxwZXIuc2hvd0FsZXJ0Q2xpZW50VG9vT2xkKClcbiAgICAgICAgICAgIHJldHVybiBcbiAgICAgICAgfVxuICAgICAgICBCdW5kbGVVdGlsLkxPRyhDb2RlVHlwZS5CdW5kbGVNYW5hZ2VyLCBcIm1vZHVsZU5hbWVfb3JpOlwiLCBKU09OLnN0cmluZ2lmeShtb2R1bGVOYW1lQXJyKSApXG4gICAgICAgIG1vZHVsZU5hbWVBcnIgPSB0aGlzLmdldERlcGVuZE1vZHVsZShtb2R1bGVOYW1lQXJyKVxuICAgICAgICBCdW5kbGVVdGlsLkxPRyhDb2RlVHlwZS5CdW5kbGVNYW5hZ2VyLCBcIm1vZHVsZU5hbWVfZGVwOlwiLCBKU09OLnN0cmluZ2lmeShtb2R1bGVOYW1lQXJyKSApXG5cbiAgICAgICAgLy8gaXNTaG93SG90VUkgXG4gICAgICAgIGxldCBuZWVkX1VwZGF0ZSAgPSBmYWxzZSBcbiAgICAgICAgbGV0IG5lZWRfUmVzdGFydCA9IGZhbHNlIFxuXG4gICAgICAgIC8vIOaJgOaciW1vZHVsZeabtOaWsOWujOaIkFxuICAgICAgICBsZXQgb25BbGxNb2R1bGVIb3RGaW5pc2ggPSAoKT0+e1xuICAgICAgICAgICAgQnVuZGxlVXRpbC5MT0coQ29kZVR5cGUuQnVuZGxlTWFuYWdlciwgXCJob3RfdXBkYXRlXy1BbGxIb3RfRmluaXNoXCIpXG4gICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5fbG9jYWxfZGF0YV9rZXksIEpTT04uc3RyaW5naWZ5KHRoaXMuX2xvY2FsX1ZlcnNpb24pKVxuICAgICAgICAgICAgaWYobmVlZF9SZXN0YXJ0KXtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZSgoKT0+eyBcbiAgICAgICAgICAgICAgICAvLyAgICAgLy8gY2Muc3lzLnJlc3RhcnRWTSgpIFxuICAgICAgICAgICAgICAgIC8vICAgICBjYy5nYW1lLnJlc3RhcnQoKTtcbiAgICAgICAgICAgICAgICAvLyB9LCAwLjEpXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IFxuICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLnJlc3RhcnQoKTtcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyDkuIvovb0gYXNzZXRzIGJ1bmRsZSDotYTmupBcbiAgICAgICAgbGV0IG5lZWRVcGRhdGVOYW1lcyA9IFtdXG4gICAgICAgIGxldCBwcmVsb2FkRGlyID0gKCk9PntcbiAgICAgICAgICAgIHRoaXMuX2J1bmRsZVV0aWwuc2VxdWVuY2VNaXMobmVlZFVwZGF0ZU5hbWVzLCAoKT0+e1xuICAgICAgICAgICAgICAgIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZU1hbmFnZXIsIFwiaG90X3VwZGF0ZV8tYWxsUHJlbG9hZEZpbmlzaFwiKVxuICAgICAgICAgICAgICAgIC8vIOaJgOacieS7u+WKoeWujOaIkFxuICAgICAgICAgICAgICAgIHRoaXMuX2J1bmRsZUhvdFVJSGVscGVyLmhpZGVVcGRhdGluZyhvbkFsbE1vZHVsZUhvdEZpbmlzaClcblxuICAgICAgICAgICAgfSwgKGN1ck1pcywgaWR4LCBvbkV4ZWMpPT57IFxuICAgICAgICAgICAgICAgIC8vIOavj+S4qumihOWKoOi9veS7u+WKoVxuICAgICAgICAgICAgICAgIGxldCBjdXJNaXNJZHggPSBpZHgrMVxuICAgICAgICAgICAgICAgIGxldCB0b3RhbE1pcyA9IG5lZWRVcGRhdGVOYW1lcy5sZW5ndGhcbiAgICAgICAgICAgICAgICBsZXQgbW9kdWxlT2JqID0gdGhpcy5tb2R1bGVzW25lZWRVcGRhdGVOYW1lc1tpZHhdXVxuICAgICAgICAgICAgICAgIG1vZHVsZU9iai5wcmVsb2FkTW9kdWxlKChmaW5pc2gsIHRvdGFsLCBpdGVtKT0+e1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZU1hbmFnZXIsIFwiaG90X3VwZGF0ZV8tb25Qcm9ncmVzc19pbmZvXzpcIiwgY3VyTWlzSWR4LCBmaW5pc2gsIHRvdGFsLCBpdGVtLnVybCApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1bmRsZUhvdFVJSGVscGVyLm9uUHJvZ3Jlc3MoIGN1ck1pc0lkeCwgdG90YWxNaXMsIGZpbmlzaCwgdG90YWwpXG4gICAgICAgICAgICAgICAgfSwgKGl0ZW1zKT0+e1xuXG4gICAgICAgICAgICAgICAgICAgIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZU1hbmFnZXIsIFwiaG90X3VwZGF0ZV8tcHJlbG9hZE9LXzpcIiwgbmVlZFVwZGF0ZU5hbWVzW2lkeF0gKVxuICAgICAgICAgICAgICAgICAgICBvbkV4ZWMoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cblxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIOmhuuW6j+S4i+i9vemFjee9riBcbiAgICAgICAgdGhpcy5fYnVuZGxlVXRpbC5zZXF1ZW5jZU1pcyhtb2R1bGVOYW1lQXJyLCAoKT0+e1xuICAgICAgICAgICAgLy8g5omA5pyJ6YWN572u5LiL6L295a6M5oiQXG4gICAgICAgICAgICBpZihuZWVkX1VwZGF0ZSl7XG4gICAgICAgICAgICAgICAgdGhpcy5fYnVuZGxlSG90VUlIZWxwZXIuc2hvd1VwZGF0aW5nKDEsIG5lZWRVcGRhdGVOYW1lcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgdGhpcy5fYnVuZGxlSG90VUlIZWxwZXIuc2hvd0hvdEFsZXJ0KG5lZWRfUmVzdGFydCwgKCk9PntcbiAgICAgICAgICAgICAgICAgICAgcHJlbG9hZERpcigpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICBvbkFsbE1vZHVsZUhvdEZpbmlzaCgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfSwgKGN1ck1pcywgaWR4LCBvbkV4ZWMpPT57IFxuICAgICAgICAgICAgLy8g5q+P5Liq6aKE5Yqg6L295Lu75YqhXG4gICAgICAgICAgICBsZXQgbW9kdWxlTmFtZSA9IG1vZHVsZU5hbWVBcnJbaWR4XVxuICAgICAgICAgICAgbGV0IHJldFRlbXAgPSB7fVxuICAgICAgICAgICAgcmV0VGVtcCA9IHRoaXMuX2hvdFVwZGF0ZU1vZHVsZShtb2R1bGVOYW1lLCAoaG90X3JldCk9PntcbiAgICAgICAgICAgICAgICBsZXQge2hhdmVOZXdWZXIsIG5lZWRSZXN0YXJ0fSA9IGhvdF9yZXRcbiAgICAgICAgICAgICAgICBpZihoYXZlTmV3VmVyKSB7IFxuICAgICAgICAgICAgICAgICAgICBuZWVkX1VwZGF0ZSA9IHRydWUgXG4gICAgICAgICAgICAgICAgICAgIG5lZWRVcGRhdGVOYW1lcy5wdXNoKG1vZHVsZU5hbWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKG5lZWRSZXN0YXJ0KSB7IG5lZWRfUmVzdGFydCA9IHRydWUgfVxuICAgICAgICAgICAgICAgIG9uRXhlYygpXG4gICAgICAgICAgICB9KSBcbiAgICAgICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgfVxuXG4gICAgLy8g6I635Y+W5L6d6LWW5qih5Z2XLCDlubbmjpLluo9cbiAgICBnZXREZXBlbmRNb2R1bGUobmFtZXMsIGg/KXtcbiAgICAgICAgaCA9IGggfHwgMVxuICAgICAgICBsZXQgcm1zID0gdGhpcy5fcm9tb3RlVmVyc2lvbi5tb2R1bGVzIFxuICAgICAgICBsZXQgcmV0OmFueSA9IHt9XG4gICAgICAgIGZvcihsZXQgaWR4IGluIG5hbWVzKXtcbiAgICAgICAgICAgIGxldCBuXzEgPSBuYW1lc1tpZHhdXG4gICAgICAgICAgICByZXRbbl8xXSA9IHsgbmFtZTpuXzEsIHByaW9yaXR5OnJtc1tuXzFdLnByaW9yaXR5fVxuXG4gICAgICAgICAgICBsZXQgZGVwZW5kcyA9IHRoaXMuZ2V0RGVwZW5kTW9kdWxlKHJtc1tuXzFdLmRlcGVuZCB8fCBbXSwgaCsxKVxuICAgICAgICAgICAgZm9yKGxldCBqIGluIGRlcGVuZHMpe1xuICAgICAgICAgICAgICAgIGxldCBuXzIgPSBkZXBlbmRzW2pdXG4gICAgICAgICAgICAgICAgcmV0W25fMl0gPSB7IG5hbWU6bl8yLCBwcmlvcml0eTpybXNbbl8yXS5wcmlvcml0eX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL+aOkuW6jywg5LyY5YWI57qn6auY55qE5YWI5pu05pawIFxuICAgICAgICBpZihoPT0xKXtcbiAgICAgICAgICAgIGxldCBtaW5mb3MgOiBhbnkgPSBPYmplY3QudmFsdWVzKHJldClcbiAgICAgICAgICAgIG1pbmZvcy5zb3J0KGZ1bmN0aW9uKGEgOiBhbnksYiA6IGFueSl7ICBcbiAgICAgICAgICAgICAgICBpZihhLnByaW9yaXR5ID4gYi5wcmlvcml0eSl7IHJldHVybiAtMX1cbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXQgPSB7fVxuICAgICAgICAgICAgZm9yKGxldCBpZHggaW4gIG1pbmZvcyl7XG4gICAgICAgICAgICAgICAgcmV0W21pbmZvc1tpZHhdLm5hbWVdID0gMVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHJldClcbiAgICB9XG5cbiAgICAvLyDmm7TmlrDliLDmnIDmlrDniYjmnKwgXG4gICAgX2hvdFVwZGF0ZU1vZHVsZShtb2R1bGVOYW1lLCBjYWxsYmFjayl7XG4gICAgICAgIGlmKCF0aGlzLl91c2VIb3RVcGRhdGUpe1xuICAgICAgICAgICAgbGV0IHJldCA9IHsgaGF2ZU5ld1ZlcjpmYWxzZSwgbmVlZFJlc3RhcnQ6ZmFsc2UgfTtcbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHJldCk7XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxvY2FsX1ZlciA9IHRoaXMuX2xvY2FsX1ZlcnNpb24ubW9kdWxlc1ttb2R1bGVOYW1lXS5yZXNWZXJzaW9uXG4gICAgICAgIGxldCByb21vdGVWZXIgPSB0aGlzLl9yb21vdGVWZXJzaW9uLm1vZHVsZXNbbW9kdWxlTmFtZV0ucmVzVmVyc2lvblxuICAgICAgICBsZXQgbW9kdWxlT2JqID0gdGhpcy5tb2R1bGVzW21vZHVsZU5hbWVdXG5cbiAgICAgICAgQnVuZGxlVXRpbC5MT0coQ29kZVR5cGUuQnVuZGxlTWFuYWdlciwgXCJ2ZXJzaW9uX2luZm9fZGF0YV8tbG9jYWw6XCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuX2xvY2FsX1ZlcnNpb24pIClcbiAgICAgICAgQnVuZGxlVXRpbC5MT0coQ29kZVR5cGUuQnVuZGxlTWFuYWdlciwgXCJ2ZXJzaW9uX2luZm9fZGF0YV8tcmVtb3RlOlwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLl9yb21vdGVWZXJzaW9uKSApXG5cbiAgICAgICAgbGV0IHJldCA9IHsgaGF2ZU5ld1ZlcjogKGxvY2FsX1ZlciAhPSByb21vdGVWZXIpLCBuZWVkUmVzdGFydDpmYWxzZSB9XG5cbiAgICAgICAgbGV0IGxvYWRWZXJGdW5jID0gKG1PYmosIHZlciwgY2IpPT57XG4gICAgICAgICAgICBtT2JqLmxvYWRBQigoKT0+e1xuICAgICAgICAgICAgICAgIGlmKGxvY2FsX1ZlciAhPSByb21vdGVWZXIpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2NhbF9WZXJzaW9uLm1vZHVsZXNbbW9kdWxlTmFtZV0ucmVzVmVyc2lvbiA9IHJvbW90ZVZlclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2NhbF9WZXJzaW9uLm1vZHVsZXNbbW9kdWxlTmFtZV0uc2hvd1ZlciA9IHRoaXMuX3JvbW90ZVZlcnNpb24ubW9kdWxlc1ttb2R1bGVOYW1lXS5zaG93VmVyXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYiAmJiBjYigpO1xuICAgICAgICAgICAgfSwgdmVyKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoIW1vZHVsZU9iail7XG4gICAgICAgICAgICAvLyDmnKrliqDovb3ov4csIOabtOaWsOWQjuS4jemcgOimgemHjeWQr1xuICAgICAgICAgICAgbW9kdWxlT2JqID0gbmV3IEJ1bmRsZU1vZHVsZSgpO1xuICAgICAgICAgICAgbG9hZFZlckZ1bmMoIG1vZHVsZU9iai5pbml0KG1vZHVsZU5hbWUpLCByb21vdGVWZXIsICgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5tb2R1bGVzW21vZHVsZU5hbWVdID0gbW9kdWxlT2JqXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2socmV0KTtcbiAgICAgICAgICAgIH0pIFxuXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIC8vIOW3suWKoOi9vSwg6Iul5pyJ5pu05paw5YiZ5pu05paw5ZCO6YeN5ZCvXG4gICAgICAgICAgICBpZihsb2NhbF9WZXIgPT0gcm9tb3RlVmVyKXtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhyZXQpO1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIHJldC5uZWVkUmVzdGFydCA9IHRydWUgXG4gICAgICAgICAgICAgICAgbG9hZFZlckZ1bmMobW9kdWxlT2JqLCByb21vdGVWZXIsICgpPT57XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHJldCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0XG5cbiAgICB9XG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgZ2V0QnVuZGxlKG1vZHVsZU5hbWUpe1xuICAgICAgICAvLyBCdW5kbGVVdGlsLkxPRyhDb2RlVHlwZS5CdW5kbGVNYW5hZ2VyLCBcIk1vZHVsZU1hZ19nZXRidW5kbGVfXzpcIiwgbW9kdWxlTmFtZSlcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kdWxlc1ttb2R1bGVOYW1lXS5fYWJPYmpcbiAgICB9XG5cbiAgICBnZXRNb2R1bGUobW9kdWxlTmFtZSl7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZHVsZXNbbW9kdWxlTmFtZV1cbiAgICB9XG5cbiAgICBhZGRNb2R1bGUobW9kdWxlTmFtZSwgY2Ipe1xuICAgICAgICBsZXQgbW9kdWxlID0gdGhpcy5tb2R1bGVzW21vZHVsZU5hbWVdXG4gICAgICAgIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZU1hbmFnZXIsIFwibW9kdWxlX21hZy1hZGRNT2R1bGU6XCIsIG1vZHVsZU5hbWUsIG1vZHVsZSApXG4gICAgICAgIGlmKG1vZHVsZSl7IFxuICAgICAgICAgICAgY2IobW9kdWxlKVxuICAgICAgICAgICAgcmV0dXJuIG1vZHVsZVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlTW9kdWxlKG1vZHVsZU5hbWUpXG5cbiAgICAgICAgQnVuZGxlVXRpbC5MT0coQ29kZVR5cGUuQnVuZGxlTWFuYWdlciwgXCJsb2FkX0FCX19fXzpcIiwgbW9kdWxlTmFtZSlcblxuICAgICAgICBsZXQgbW9kdWxlT2JqID0gbmV3IEJ1bmRsZU1vZHVsZSgpO1xuICAgICAgICBtb2R1bGVPYmouaW5pdChtb2R1bGVOYW1lLCB0aGlzLl91c2VIb3RVcGRhdGUpLmxvYWRBQigoKT0+e1xuICAgICAgICAgICAgdGhpcy5tb2R1bGVzW21vZHVsZU5hbWVdID0gbW9kdWxlT2JqXG4gICAgICAgICAgICBjYiAmJiBjYihtb2R1bGVPYmopXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICByZW1vdmVNb2R1bGUobW9kdWxlTmFtZSl7XG4gICAgICAgIGxldCBtb2R1bGVPYmogPSB0aGlzLm1vZHVsZXNbbW9kdWxlTmFtZV1cbiAgICAgICAgaWYoIW1vZHVsZU9iail7IHJldHVybiB9XG4gICAgICAgIG1vZHVsZU9iai5yZWxlYXNlQUIoKVxuICAgICAgICBkZWxldGUgdGhpcy5tb2R1bGVzW21vZHVsZU5hbWVdO1xuICAgIH1cblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT4+IOafpeivouaWsOeJiOacrFxuICAgIGlzTmVlZFJlcV92ZXJzaW9uSW5mbygpe1xuICAgICAgICBpZihNb2R1bGVDb25zdC5yZXFWZXJzaW9uSW1tZWRpYXRlbHkpe1xuICAgICAgICAgICAgcmV0dXJuIHRydWUgXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY3VyVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgIFxuICAgICAgICBCdW5kbGVVdGlsLkxPRyhDb2RlVHlwZS5CdW5kbGVNYW5hZ2VyLCBcImlzX25lZWRfcmVxX3Zlcl86XCIsIGN1clRpbWUgLCB0aGlzLl9sYXN0UmVxX1ZlcnNpb25JbmZvVGltZSlcbiAgICAgICAgaWYoY3VyVGltZSAtIHRoaXMuX2xhc3RSZXFfVmVyc2lvbkluZm9UaW1lID4gdGhpcy5fZGV0ZWN0TmV3VmVyc2lvbkludGVydmFsKjEwMDApeyBcbiAgICAgICAgICAgIHJldHVybiB0cnVlIFxuICAgICAgICB9IFxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICByZXFWZXJzaW9uSW5mbyhjYWxsYmFjaz86IEZ1bmN0aW9uKXtcbiAgICAgICAgaWYoIXRoaXMuX3VzZUhvdFVwZGF0ZSl7XG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuX2h0dHBSZXFIYW5kbGVyKXtcbiAgICAgICAgICAgIHRoaXMuX2h0dHBSZXFIYW5kbGVyLmFib3J0KClcbiAgICAgICAgfVxuICAgICAgICBsZXQgdmVyVXJsID0gTW9kdWxlQ29uc3QuaG90VXJsICsgXCJ2ZXJjb25maWcuanNvblwiICsgXCI/cmVuZXc9XCIgKyB0aGlzLl9idW5kbGVVdGlsLmNyZWF0ZVVVSUQoKSBcbiAgICAgICAgQnVuZGxlVXRpbC5MT0coQ29kZVR5cGUuQnVuZGxlTWFuYWdlciwgXCJyZXFfdmVyc2lvbl91cmxfOlwiLCB2ZXJVcmwpXG5cbiAgICAgICAgdGhpcy5faHR0cFJlcUhhbmRsZXIgPSB0aGlzLl9idW5kbGVVdGlsLm1ha2VYTUxIdHRwKHt1cmw6IHZlclVybCwgY2FsbGJhY2s6KF9hcmdzKT0+e1xuXG4gICAgICAgICAgICBsZXQgaHR0cERhdGEgPSBfYXJncy5yZXREYXRhXG4gICAgICAgICAgICBpZighaHR0cERhdGEpe1xuICAgICAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9odHRwUmVxSGFuZGxlciA9IG51bGxcbiAgICAgICAgICAgIHRoaXMuX3JvbW90ZVZlcnNpb24gPSBodHRwRGF0YVxuXG4gICAgICAgICAgICBCdW5kbGVVdGlsLkxPRyhDb2RlVHlwZS5CdW5kbGVNYW5hZ2VyLCBcIm9uUmVxVmVyc2lvbl9JbmZvXzpcIiwgSlNPTi5zdHJpbmdpZnkoaHR0cERhdGEpIClcbiAgICAgICAgICAgIGxldCBsb2NhbE1hcCA9IHRoaXMuX2xvY2FsX1ZlcnNpb25cbiAgICAgICAgICAgIGxldCByZW1vdGVNYXAgPSBodHRwRGF0YVxuICAgICAgICAgICAgbGV0IG5lZWRTYXZlID0gZmFsc2UgXG5cbiAgICAgICAgICAgIGZvcihsZXQgbW9kdWxlTmFtZSBpbiByZW1vdGVNYXAubW9kdWxlcyl7IFxuXG4gICAgICAgICAgICAgICAgaWYoIWxvY2FsTWFwLm1vZHVsZXNbbW9kdWxlTmFtZV0peyAgIC8vIOi/kOiQpeS4reaWsOWinuaooeWdl1xuICAgICAgICAgICAgICAgICAgICBsb2NhbE1hcC5tb2R1bGVzW21vZHVsZU5hbWVdID0ge31cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoIWxvY2FsTWFwLm1vZHVsZXNbbW9kdWxlTmFtZV0uc2hvd1Zlcil7XG4gICAgICAgICAgICAgICAgICAgIG5lZWRTYXZlID0gdHJ1ZSBcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxNYXAubW9kdWxlc1ttb2R1bGVOYW1lXS5zaG93VmVyID0gKHJlbW90ZU1hcC5tb2R1bGVzW21vZHVsZU5hbWVdLnNob3dWZXIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihuZWVkU2F2ZSl7XG4gICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuX2xvY2FsX2RhdGFfa2V5LCBKU09OLnN0cmluZ2lmeSh0aGlzLl9sb2NhbF9WZXJzaW9uKSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fbGFzdFJlcV9WZXJzaW9uSW5mb1RpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpXG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgICAgICB9fSkgXG4gICAgICAgIFxuICAgIH1cbiAgICBcblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLTw8IOafpeivouaWsOeJiOacrFxuXG59XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/bundle/BundleModule.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0782enB7X5F/6eaTV1X6gbi', 'BundleModule');
// Script/bundle/BundleModule.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BundleUtil_1 = require("./BundleUtil");
var Const_1 = require("./Const");
var BundleModule = /** @class */ (function () {
    function BundleModule() {
    }
    BundleModule.prototype.init = function (ABName, useHotUpdate) {
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleModule, "module_init");
        this._ABName = ABName;
        this._useHotUpdate = useHotUpdate;
        return this;
    };
    BundleModule.prototype.getABObj = function () {
        return this._abObj;
    };
    BundleModule.prototype.getModuleName = function () {
        return this._ABName;
    };
    BundleModule.prototype.loadAB = function (cb, version) {
        var _this = this;
        // {version: 'fbc07'},
        var loadArg = {};
        if (version) {
            loadArg.version = version;
        }
        var isValid = true;
        var abUrl = this._ABName;
        if (this._useHotUpdate) {
            // 如果希望使用creator构建时填的资源服务器地址,将下面这行代码注释掉即可.
            abUrl = Const_1.ModuleConst.hotUrl + "remote/" + this._ABName;
        }
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleModule, "loadAB_:", this._ABName, abUrl);
        cc.assetManager.loadBundle(abUrl, loadArg, function (err, bundle) {
            if (!isValid) {
                return;
            }
            ;
            isValid = false;
            if (!err) {
                BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleModule, "loadAB_OK_:", _this._ABName);
                _this._abObj = bundle;
                cb();
            }
            else {
                BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleModule, "load_ab_Err_:", _this._ABName, JSON.stringify(err));
                // 错误重试
                _this.intervalScheduleOnce(function () {
                    _this.loadAB(cb, version);
                }, 3);
            }
        });
    };
    // 下载资源
    BundleModule.prototype.preloadModule = function (onProgress, onComplete) {
        var _this = this;
        var is_Valid = true;
        //---------------------------------------------------------
        var autoAtlas = [];
        var resMap = this._abObj._config.assetInfos._map;
        for (var idx in resMap) {
            var item = resMap[idx];
            if (!item.path && item.nativeVer) {
                var urll = cc.assetManager.utils.getUrlWithUuid(item.uuid, {
                    __nativeName__: ".png",
                    nativeExt: cc.path.extname(".png"),
                    isNative: true
                });
                if (urll) {
                    autoAtlas.push(urll);
                }
            }
        }
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleModule, "autoatlas_url_arr_:", JSON.stringify(autoAtlas));
        var extNum = autoAtlas.length;
        var finishNum = 0;
        var is_2Valid = true;
        var preloadAutoAtlas = function () {
            if (autoAtlas.length == 0) {
                if (!is_2Valid) {
                    return;
                }
                ;
                is_2Valid = false;
                onComplete && onComplete();
                return;
            }
            // RequestType.URL = 'url' 
            cc.assetManager.preloadAny(autoAtlas, { __requestType__: 'url', type: null, bundle: _this._abObj.name }, function (finish, total, item) {
                if (!is_2Valid) {
                    return;
                }
                ;
                BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleModule, "load_autoatlas_progress_:", _this._abObj.name, finish, total);
                onProgress && onProgress(finish + finishNum, total + finishNum, item);
            }, function (error, items) {
                if (!is_2Valid) {
                    return;
                }
                ;
                is_2Valid = false;
                if (!error) {
                    onComplete && onComplete();
                }
                else {
                    BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleModule, "preloadAutoAtlas_error:", JSON.stringify(error));
                    _this.intervalScheduleOnce(function () {
                        _this.preloadModule(onProgress, onComplete);
                    }, 3);
                }
            });
        };
        //--------------------------------------------------------- 
        this._abObj.preloadDir("root", function (finish, total, item) {
            if (!is_Valid) {
                return;
            }
            ;
            finishNum = total;
            onProgress && onProgress(finish, total + extNum, item);
        }, function (error, items) {
            if (!is_Valid) {
                return;
            }
            ;
            is_Valid = false;
            if (!error) {
                // onComplete && onComplete(items);
                preloadAutoAtlas();
            }
            else {
                _this.intervalScheduleOnce(function () {
                    _this.preloadModule(onProgress, onComplete);
                }, 3);
            }
        });
    };
    BundleModule.prototype.releaseAB = function () {
        this.unIntervalSchedule();
        if (!this._abObj) {
            return;
        }
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleModule, "release_ab__");
        cc.assetManager.removeBundle(this._abObj);
        this._abObj = null;
    };
    BundleModule.prototype.intervalScheduleOnce = function (callback, delay) {
        var id = setTimeout(callback, delay * 1000); // Assuming delay is in seconds
        this._timeOutIds.push(id);
    };
    BundleModule.prototype.unIntervalSchedule = function () {
        // Assuming we have a way to track all timeouts
        var timeoutIds = this._timeOutIds;
        timeoutIds.forEach(function (id) { return clearTimeout(id); });
        this._timeOutIds = [];
    };
    return BundleModule;
}());
exports.default = BundleModule;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvYnVuZGxlL0J1bmRsZU1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUFvRDtBQUNwRCxpQ0FBc0M7QUFFdEM7SUFBQTtJQW9KQSxDQUFDO0lBN0lHLDJCQUFJLEdBQUosVUFBSyxNQUFNLEVBQUUsWUFBWTtRQUN0QixvQkFBVSxDQUFDLEdBQUcsQ0FBQyxxQkFBUSxDQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQTtRQUVuRCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQTtRQUNyQixJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQTtRQUNqQyxPQUFPLElBQUksQ0FBQTtJQUNmLENBQUM7SUFFRCwrQkFBUSxHQUFSO1FBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFBO0lBQ3RCLENBQUM7SUFFRCxvQ0FBYSxHQUFiO1FBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3ZCLENBQUM7SUFFRCw2QkFBTSxHQUFOLFVBQU8sRUFBRSxFQUFFLE9BQVE7UUFBbkIsaUJBOEJDO1FBN0JHLHNCQUFzQjtRQUN0QixJQUFJLE9BQU8sR0FBUSxFQUFFLENBQUE7UUFDckIsSUFBRyxPQUFPLEVBQUM7WUFDUCxPQUFPLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtTQUM1QjtRQUNELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQTtRQUNsQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFBO1FBRXhCLElBQUcsSUFBSSxDQUFDLGFBQWEsRUFBQztZQUNsQiwwQ0FBMEM7WUFDMUMsS0FBSyxHQUFHLG1CQUFXLENBQUMsTUFBTSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFBO1NBQ3hEO1FBQ0Qsb0JBQVUsQ0FBQyxHQUFHLENBQUMscUJBQVEsQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFHLENBQUE7UUFDeEUsRUFBRSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFHLE9BQU8sRUFBRSxVQUFDLEdBQUcsRUFBRSxNQUFNO1lBQ3BELElBQUcsQ0FBQyxPQUFPLEVBQUM7Z0JBQUUsT0FBTTthQUFFO1lBQUMsQ0FBQztZQUFFLE9BQU8sR0FBRyxLQUFLLENBQUU7WUFFM0MsSUFBRyxDQUFDLEdBQUcsRUFBQztnQkFDSixvQkFBVSxDQUFDLEdBQUcsQ0FBQyxxQkFBUSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsS0FBSSxDQUFDLE9BQU8sQ0FBRSxDQUFBO2dCQUNuRSxLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtnQkFFcEIsRUFBRSxFQUFFLENBQUE7YUFDUDtpQkFBSztnQkFDRixvQkFBVSxDQUFDLEdBQUcsQ0FBQyxxQkFBUSxDQUFDLFlBQVksRUFBRSxlQUFlLEVBQUUsS0FBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7Z0JBQ3pGLE9BQU87Z0JBQ1AsS0FBSSxDQUFDLG9CQUFvQixDQUFDO29CQUN0QixLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQTtnQkFDNUIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO2FBQ1I7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFHRCxPQUFPO0lBQ1Asb0NBQWEsR0FBYixVQUFjLFVBQVUsRUFBRSxVQUFVO1FBQXBDLGlCQXFFQztRQXBFRyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUE7UUFFbkIsMkRBQTJEO1FBQzNELElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQTtRQUNsQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFBO1FBQ2hELEtBQUksSUFBSSxHQUFHLElBQUksTUFBTSxFQUFDO1lBQ2xCLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUN0QixJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFDO2dCQUM1QixJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDdkQsY0FBYyxFQUFFLE1BQU07b0JBQ3RCLFNBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7b0JBQ2xDLFFBQVEsRUFBRSxJQUFJO2lCQUNqQixDQUFDLENBQUM7Z0JBQ0gsSUFBRyxJQUFJLEVBQUM7b0JBQ0osU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtpQkFDdkI7YUFDSjtTQUNKO1FBRUQsb0JBQVUsQ0FBQyxHQUFHLENBQUMscUJBQVEsQ0FBQyxZQUFZLEVBQUUscUJBQXFCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBO1FBQ3ZGLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUE7UUFDN0IsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFBO1FBQ2pCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQTtRQUNwQixJQUFJLGdCQUFnQixHQUFHO1lBQ25CLElBQUcsU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQ3RCLElBQUcsQ0FBQyxTQUFTLEVBQUM7b0JBQUUsT0FBTztpQkFBRTtnQkFBQSxDQUFDO2dCQUFDLFNBQVMsR0FBRyxLQUFLLENBQUU7Z0JBQzlDLFVBQVUsSUFBSSxVQUFVLEVBQUUsQ0FBQztnQkFDM0IsT0FBTTthQUNUO1lBRUQsMkJBQTJCO1lBQzNCLEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFDbEcsVUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUk7Z0JBQ2hCLElBQUcsQ0FBQyxTQUFTLEVBQUM7b0JBQUUsT0FBTztpQkFBRTtnQkFBQSxDQUFDO2dCQUMxQixvQkFBVSxDQUFDLEdBQUcsQ0FBQyxxQkFBUSxDQUFDLFlBQVksRUFBRSwyQkFBMkIsRUFBQyxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFFLENBQUE7Z0JBQ25HLFVBQVUsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFDLFNBQVMsRUFBRSxLQUFLLEdBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3RFLENBQUMsRUFBRSxVQUFDLEtBQUssRUFBRSxLQUFLO2dCQUNaLElBQUcsQ0FBQyxTQUFTLEVBQUM7b0JBQUUsT0FBTztpQkFBRTtnQkFBQSxDQUFDO2dCQUFDLFNBQVMsR0FBRyxLQUFLLENBQUU7Z0JBQzlDLElBQUcsQ0FBQyxLQUFLLEVBQUM7b0JBQ04sVUFBVSxJQUFJLFVBQVUsRUFBRSxDQUFDO2lCQUM5QjtxQkFBSztvQkFDRixvQkFBVSxDQUFDLEdBQUcsQ0FBQyxxQkFBUSxDQUFDLFlBQVksRUFBRSx5QkFBeUIsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFFLENBQUE7b0JBQ3hGLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQzt3QkFDdEIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7b0JBQy9DLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtpQkFDUjtZQUNMLENBQUMsQ0FDSixDQUFDO1FBRU4sQ0FBQyxDQUFBO1FBQ0QsNERBQTREO1FBRTVELElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxVQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSTtZQUMvQyxJQUFHLENBQUMsUUFBUSxFQUFDO2dCQUFFLE9BQU87YUFBRTtZQUFBLENBQUM7WUFDekIsU0FBUyxHQUFHLEtBQUssQ0FBQTtZQUNqQixVQUFVLElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRSxLQUFLLEdBQUcsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNELENBQUMsRUFBRSxVQUFDLEtBQUssRUFBRSxLQUFLO1lBQ1osSUFBRyxDQUFDLFFBQVEsRUFBQztnQkFBRSxPQUFPO2FBQUU7WUFBQSxDQUFDO1lBQUMsUUFBUSxHQUFHLEtBQUssQ0FBRTtZQUM1QyxJQUFHLENBQUMsS0FBSyxFQUFDO2dCQUNOLG1DQUFtQztnQkFDbkMsZ0JBQWdCLEVBQUUsQ0FBQTthQUNyQjtpQkFBSztnQkFDRixLQUFJLENBQUMsb0JBQW9CLENBQUM7b0JBQ3RCLEtBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUMvQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7YUFDUjtRQUNMLENBQUMsQ0FBQyxDQUFBO0lBRU4sQ0FBQztJQUVELGdDQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUFFLE9BQU07U0FBRTtRQUMzQixvQkFBVSxDQUFDLEdBQUcsQ0FBQyxxQkFBUSxDQUFDLFlBQVksRUFBRSxjQUFjLENBQUMsQ0FBQTtRQUNyRCxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7SUFDdEIsQ0FBQztJQUVELDJDQUFvQixHQUFwQixVQUFxQixRQUFrQixFQUFFLEtBQWE7UUFDbkQsSUFBSSxFQUFFLEdBQVcsVUFBVSxDQUFDLFFBQVEsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQywrQkFBK0I7UUFDcEYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELHlDQUFrQixHQUFsQjtRQUNJLCtDQUErQztRQUMvQyxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3BDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxFQUFVLElBQUssT0FBQSxZQUFZLENBQUMsRUFBRSxDQUFDLEVBQWhCLENBQWdCLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUwsbUJBQUM7QUFBRCxDQXBKQSxBQW9KQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJ1bmRsZVV0aWwsIHsgQ29kZVR5cGUgfSBmcm9tIFwiLi9CdW5kbGVVdGlsXCI7XG5pbXBvcnQgeyBNb2R1bGVDb25zdCB9IGZyb20gXCIuL0NvbnN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1bmRsZU1vZHVsZSB7XG5cbiAgICBfQUJOYW1lOiBzdHJpbmc7XG4gICAgX3VzZUhvdFVwZGF0ZTogYW55O1xuICAgIF9hYk9iajogYW55O1xuICAgIF90aW1lT3V0SWRzOiBudW1iZXJbXTtcblxuICAgIGluaXQoQUJOYW1lLCB1c2VIb3RVcGRhdGUpe1xuICAgICAgIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZU1vZHVsZSwgXCJtb2R1bGVfaW5pdFwiKVxuICAgICAgICBcbiAgICAgICAgdGhpcy5fQUJOYW1lID0gQUJOYW1lXG4gICAgICAgIHRoaXMuX3VzZUhvdFVwZGF0ZSA9IHVzZUhvdFVwZGF0ZVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIGdldEFCT2JqKCl7XG4gICAgICAgIHJldHVybiB0aGlzLl9hYk9iaiBcbiAgICB9XG4gICAgXG4gICAgZ2V0TW9kdWxlTmFtZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5fQUJOYW1lXG4gICAgfVxuXG4gICAgbG9hZEFCKGNiLCB2ZXJzaW9uPyl7XG4gICAgICAgIC8vIHt2ZXJzaW9uOiAnZmJjMDcnfSxcbiAgICAgICAgbGV0IGxvYWRBcmc6IGFueSA9IHt9XG4gICAgICAgIGlmKHZlcnNpb24pe1xuICAgICAgICAgICAgbG9hZEFyZy52ZXJzaW9uID0gdmVyc2lvblxuICAgICAgICB9XG4gICAgICAgIGxldCBpc1ZhbGlkID0gdHJ1ZSBcbiAgICAgICAgbGV0IGFiVXJsID0gdGhpcy5fQUJOYW1lIFxuXG4gICAgICAgIGlmKHRoaXMuX3VzZUhvdFVwZGF0ZSl7XG4gICAgICAgICAgICAvLyDlpoLmnpzluIzmnJvkvb/nlKhjcmVhdG9y5p6E5bu65pe25aGr55qE6LWE5rqQ5pyN5Yqh5Zmo5Zyw5Z2ALOWwhuS4i+mdoui/meihjOS7o+eggeazqOmHiuaOieWNs+WPry5cbiAgICAgICAgICAgIGFiVXJsID0gTW9kdWxlQ29uc3QuaG90VXJsICsgXCJyZW1vdGUvXCIgKyB0aGlzLl9BQk5hbWVcbiAgICAgICAgfVxuICAgICAgICBCdW5kbGVVdGlsLkxPRyhDb2RlVHlwZS5CdW5kbGVNb2R1bGUsIFwibG9hZEFCXzpcIiwgdGhpcy5fQUJOYW1lLCBhYlVybCAgKVxuICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZEJ1bmRsZShhYlVybCwgIGxvYWRBcmcsIChlcnIsIGJ1bmRsZSk9PiB7XG4gICAgICAgICAgICBpZighaXNWYWxpZCl7IHJldHVybiB9IDsgIGlzVmFsaWQgPSBmYWxzZSA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKCFlcnIpe1xuICAgICAgICAgICAgICAgIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZU1vZHVsZSwgXCJsb2FkQUJfT0tfOlwiLCB0aGlzLl9BQk5hbWUgKVxuICAgICAgICAgICAgICAgIHRoaXMuX2FiT2JqID0gYnVuZGxlIFxuXG4gICAgICAgICAgICAgICAgY2IoKVxuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZU1vZHVsZSwgXCJsb2FkX2FiX0Vycl86XCIsIHRoaXMuX0FCTmFtZSwgSlNPTi5zdHJpbmdpZnkoZXJyKSkgXG4gICAgICAgICAgICAgICAgLy8g6ZSZ6K+v6YeN6K+VXG4gICAgICAgICAgICAgICAgdGhpcy5pbnRlcnZhbFNjaGVkdWxlT25jZSgoKT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRBQihjYiwgdmVyc2lvbilcbiAgICAgICAgICAgICAgICB9LCAzKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG5cbiAgICAvLyDkuIvovb3otYTmupBcbiAgICBwcmVsb2FkTW9kdWxlKG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUpe1xuICAgICAgICBsZXQgaXNfVmFsaWQgPSB0cnVlXG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgbGV0IGF1dG9BdGxhcyA9IFtdXG4gICAgICAgIGxldCByZXNNYXAgPSB0aGlzLl9hYk9iai5fY29uZmlnLmFzc2V0SW5mb3MuX21hcFxuICAgICAgICBmb3IobGV0IGlkeCBpbiByZXNNYXApe1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSByZXNNYXBbaWR4XVxuICAgICAgICAgICAgaWYoIWl0ZW0ucGF0aCAmJiBpdGVtLm5hdGl2ZVZlcil7XG4gICAgICAgICAgICAgICAgbGV0IHVybGwgPSBjYy5hc3NldE1hbmFnZXIudXRpbHMuZ2V0VXJsV2l0aFV1aWQoaXRlbS51dWlkLCB7XG4gICAgICAgICAgICAgICAgICAgIF9fbmF0aXZlTmFtZV9fOiBcIi5wbmdcIixcbiAgICAgICAgICAgICAgICAgICAgbmF0aXZlRXh0OiBjYy5wYXRoLmV4dG5hbWUoXCIucG5nXCIpLFxuICAgICAgICAgICAgICAgICAgICBpc05hdGl2ZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pOyBcbiAgICAgICAgICAgICAgICBpZih1cmxsKXtcbiAgICAgICAgICAgICAgICAgICAgYXV0b0F0bGFzLnB1c2godXJsbClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBCdW5kbGVVdGlsLkxPRyhDb2RlVHlwZS5CdW5kbGVNb2R1bGUsIFwiYXV0b2F0bGFzX3VybF9hcnJfOlwiLCBKU09OLnN0cmluZ2lmeShhdXRvQXRsYXMpKVxuICAgICAgICBsZXQgZXh0TnVtID0gYXV0b0F0bGFzLmxlbmd0aCBcbiAgICAgICAgbGV0IGZpbmlzaE51bSA9IDBcbiAgICAgICAgbGV0IGlzXzJWYWxpZCA9IHRydWVcbiAgICAgICAgbGV0IHByZWxvYWRBdXRvQXRsYXMgPSAoKT0+e1xuICAgICAgICAgICAgaWYoYXV0b0F0bGFzLmxlbmd0aCA9PSAwICl7IFxuICAgICAgICAgICAgICAgIGlmKCFpc18yVmFsaWQpeyByZXR1cm47IH07IGlzXzJWYWxpZCA9IGZhbHNlIDtcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFJlcXVlc3RUeXBlLlVSTCA9ICd1cmwnIFxuICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLnByZWxvYWRBbnkoYXV0b0F0bGFzLCB7IF9fcmVxdWVzdFR5cGVfXzogJ3VybCcsIHR5cGU6IG51bGwsIGJ1bmRsZTogdGhpcy5fYWJPYmoubmFtZSB9LCBcbiAgICAgICAgICAgICAgICAoZmluaXNoLCB0b3RhbCwgaXRlbSk9PntcbiAgICAgICAgICAgICAgICAgICAgaWYoIWlzXzJWYWxpZCl7IHJldHVybjsgfTsgXG4gICAgICAgICAgICAgICAgICAgIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZU1vZHVsZSwgXCJsb2FkX2F1dG9hdGxhc19wcm9ncmVzc186XCIsdGhpcy5fYWJPYmoubmFtZSwgZmluaXNoLCB0b3RhbCApXG4gICAgICAgICAgICAgICAgICAgIG9uUHJvZ3Jlc3MgJiYgb25Qcm9ncmVzcyhmaW5pc2grZmluaXNoTnVtLCB0b3RhbCtmaW5pc2hOdW0sIGl0ZW0pO1xuICAgICAgICAgICAgICAgIH0sIChlcnJvciwgaXRlbXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKCFpc18yVmFsaWQpeyByZXR1cm47IH07IGlzXzJWYWxpZCA9IGZhbHNlIDtcbiAgICAgICAgICAgICAgICAgICAgaWYoIWVycm9yKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgQnVuZGxlVXRpbC5MT0coQ29kZVR5cGUuQnVuZGxlTW9kdWxlLCBcInByZWxvYWRBdXRvQXRsYXNfZXJyb3I6XCIsIEpTT04uc3RyaW5naWZ5KGVycm9yKSApXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmludGVydmFsU2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVsb2FkTW9kdWxlKG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gICBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gXG5cbiAgICAgICAgdGhpcy5fYWJPYmoucHJlbG9hZERpcihcInJvb3RcIiwgKGZpbmlzaCwgdG90YWwsIGl0ZW0pPT57XG4gICAgICAgICAgICBpZighaXNfVmFsaWQpeyByZXR1cm47IH07XG4gICAgICAgICAgICBmaW5pc2hOdW0gPSB0b3RhbFxuICAgICAgICAgICAgb25Qcm9ncmVzcyAmJiBvblByb2dyZXNzKGZpbmlzaCwgdG90YWwgKyBleHROdW0sIGl0ZW0pO1xuICAgICAgICB9LCAoZXJyb3IsIGl0ZW1zKT0+e1xuICAgICAgICAgICAgaWYoIWlzX1ZhbGlkKXsgcmV0dXJuOyB9OyBpc19WYWxpZCA9IGZhbHNlIDtcbiAgICAgICAgICAgIGlmKCFlcnJvcil7XG4gICAgICAgICAgICAgICAgLy8gb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKGl0ZW1zKTtcbiAgICAgICAgICAgICAgICBwcmVsb2FkQXV0b0F0bGFzKClcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmludGVydmFsU2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJlbG9hZE1vZHVsZShvblByb2dyZXNzLCBvbkNvbXBsZXRlKTtcbiAgICAgICAgICAgICAgICB9LCAzKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgcmVsZWFzZUFCKCl7XG4gICAgICAgIHRoaXMudW5JbnRlcnZhbFNjaGVkdWxlKCk7XG4gICAgICAgIGlmKCF0aGlzLl9hYk9iaiApeyByZXR1cm4gfVxuICAgICAgICBCdW5kbGVVdGlsLkxPRyhDb2RlVHlwZS5CdW5kbGVNb2R1bGUsIFwicmVsZWFzZV9hYl9fXCIpIFxuICAgICAgICBjYy5hc3NldE1hbmFnZXIucmVtb3ZlQnVuZGxlKHRoaXMuX2FiT2JqKTtcbiAgICAgICAgdGhpcy5fYWJPYmogPSBudWxsXG4gICAgfVxuXG4gICAgaW50ZXJ2YWxTY2hlZHVsZU9uY2UoY2FsbGJhY2s6IEZ1bmN0aW9uLCBkZWxheTogbnVtYmVyKSB7XG4gICAgICAgbGV0IGlkOiBudW1iZXIgPSBzZXRUaW1lb3V0KGNhbGxiYWNrLCBkZWxheSAqIDEwMDApOyAvLyBBc3N1bWluZyBkZWxheSBpcyBpbiBzZWNvbmRzXG4gICAgICAgdGhpcy5fdGltZU91dElkcy5wdXNoKGlkKTtcbiAgICB9XG5cbiAgICB1bkludGVydmFsU2NoZWR1bGUoKSB7XG4gICAgICAgIC8vIEFzc3VtaW5nIHdlIGhhdmUgYSB3YXkgdG8gdHJhY2sgYWxsIHRpbWVvdXRzXG4gICAgICAgIGNvbnN0IHRpbWVvdXRJZHMgPSB0aGlzLl90aW1lT3V0SWRzO1xuICAgICAgICB0aW1lb3V0SWRzLmZvckVhY2goKGlkOiBudW1iZXIpID0+IGNsZWFyVGltZW91dChpZCkpO1xuICAgICAgICB0aGlzLl90aW1lT3V0SWRzID0gW107XG4gICAgfVxuXG59XG5cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/bundle/BundleHotUIHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '027c4KROQBNNadKO3ofmUTM', 'BundleHotUIHelper');
// Script/bundle/BundleHotUIHelper.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
// BundleHotUIHelper  热更新的一些界面提示
var BundleUtil_1 = require("./BundleUtil");
var SingleIns_1 = require("./SingleIns");
var BundleHotUIHelper = /** @class */ (function (_super) {
    __extends(BundleHotUIHelper, _super);
    function BundleHotUIHelper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BundleHotUIHelper.prototype.hideUpdating = function (callback) {
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleHotUIHelper, "hideUpdating");
        callback && callback();
    };
    // 下载进度
    BundleHotUIHelper.prototype.onProgress = function (curMis, totalMis, finish, total) {
        // this.misNum.string = curMis + "/" + totalMis
        // this.update_proBar.progress = 1.0*finish/total
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleHotUIHelper, "onProgress : curMis_" + curMis + ",totalMis_" + totalMis + ",finish_" + finish + ",total_" + total);
    };
    BundleHotUIHelper.prototype.showUpdating = function (curMis, totalMis) {
        // this.node.active = true  
    };
    BundleHotUIHelper.prototype.showHotAlert = function (isNeedRestart, callback) {
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleHotUIHelper, "showHotAlert");
        callback && callback();
    };
    BundleHotUIHelper.prototype.showAlertClientTooOld = function () {
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleHotUIHelper, "showAlertClientTooOld");
    };
    BundleHotUIHelper.prototype.onBtn_ClientTooOld = function () {
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleHotUIHelper, "onBtn_ClientTooOld");
        cc.game.end();
    };
    //--------------------------------------------------------->> 解压资源
    BundleHotUIHelper.prototype.unpackageShow = function () {
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleHotUIHelper, "unpackageShow");
    };
    BundleHotUIHelper.prototype.unpackageUpdateProgress = function (finish, total) {
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleHotUIHelper, "unpackageUpdateProgress_:", finish, total);
    };
    BundleHotUIHelper.prototype.unpackageFinish = function () {
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleHotUIHelper, "unpackageFinish");
    };
    //---------------------------------------------------------<< 解压资源
    //--------------------------------------------------------->> 获取新版本号提示
    BundleHotUIHelper.prototype.checkNewVersionShow = function () {
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleHotUIHelper, "checkNewVersionShow");
    };
    BundleHotUIHelper.prototype.checkNewVersionHide = function () {
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleHotUIHelper, "checkNewVersionHide");
    };
    return BundleHotUIHelper;
}(SingleIns_1.default));
exports.default = BundleHotUIHelper;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvYnVuZGxlL0J1bmRsZUhvdFVJSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLGdDQUFnQztBQUNoQywyQ0FBb0Q7QUFDcEQseUNBQW9DO0FBR3BDO0lBQStDLHFDQUFTO0lBQXhEOztJQTBEQSxDQUFDO0lBeERHLHdDQUFZLEdBQVosVUFBYSxRQUFRO1FBQ2pCLG9CQUFVLENBQUMsR0FBRyxDQUFDLHFCQUFRLENBQUMsaUJBQWlCLEVBQUUsY0FBYyxDQUFDLENBQUE7UUFDMUQsUUFBUSxJQUFJLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxPQUFPO0lBQ1Asc0NBQVUsR0FBVixVQUFXLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUs7UUFDdEMsK0NBQStDO1FBQy9DLGlEQUFpRDtRQUNqRCxvQkFBVSxDQUFDLEdBQUcsQ0FBQyxxQkFBUSxDQUFDLGlCQUFpQixFQUFFLHlCQUF1QixNQUFNLGtCQUFhLFFBQVEsZ0JBQVcsTUFBTSxlQUFVLEtBQU8sQ0FBQyxDQUFBO0lBQ3BJLENBQUM7SUFFRCx3Q0FBWSxHQUFaLFVBQWEsTUFBTSxFQUFFLFFBQVE7UUFFekIsNEJBQTRCO0lBRWhDLENBQUM7SUFFRCx3Q0FBWSxHQUFaLFVBQWEsYUFBYSxFQUFFLFFBQVE7UUFDaEMsb0JBQVUsQ0FBQyxHQUFHLENBQUMscUJBQVEsQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLENBQUMsQ0FBQTtRQUMxRCxRQUFRLElBQUksUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELGlEQUFxQixHQUFyQjtRQUNJLG9CQUFVLENBQUMsR0FBRyxDQUFDLHFCQUFRLENBQUMsaUJBQWlCLEVBQUUsdUJBQXVCLENBQUMsQ0FBQTtJQUN2RSxDQUFDO0lBRUQsOENBQWtCLEdBQWxCO1FBQ0ksb0JBQVUsQ0FBQyxHQUFHLENBQUMscUJBQVEsQ0FBQyxpQkFBaUIsRUFBRSxvQkFBb0IsQ0FBQyxDQUFBO1FBQ2hFLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7SUFDakIsQ0FBQztJQUdELGtFQUFrRTtJQUNsRSx5Q0FBYSxHQUFiO1FBQ0ksb0JBQVUsQ0FBQyxHQUFHLENBQUMscUJBQVEsQ0FBQyxpQkFBaUIsRUFBRSxlQUFlLENBQUMsQ0FBQTtJQUMvRCxDQUFDO0lBRUQsbURBQXVCLEdBQXZCLFVBQXdCLE1BQU0sRUFBRSxLQUFLO1FBQ2pDLG9CQUFVLENBQUMsR0FBRyxDQUFDLHFCQUFRLENBQUMsaUJBQWlCLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQzFGLENBQUM7SUFDRCwyQ0FBZSxHQUFmO1FBQ0ksb0JBQVUsQ0FBQyxHQUFHLENBQUMscUJBQVEsQ0FBQyxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFBO0lBQ2pFLENBQUM7SUFFRCxrRUFBa0U7SUFFbEUsc0VBQXNFO0lBQ3RFLCtDQUFtQixHQUFuQjtRQUNJLG9CQUFVLENBQUMsR0FBRyxDQUFDLHFCQUFRLENBQUMsaUJBQWlCLEVBQUUscUJBQXFCLENBQUMsQ0FBQTtJQUNyRSxDQUFDO0lBRUQsK0NBQW1CLEdBQW5CO1FBQ0ksb0JBQVUsQ0FBQyxHQUFHLENBQUMscUJBQVEsQ0FBQyxpQkFBaUIsRUFBRSxxQkFBcUIsQ0FBQyxDQUFBO0lBQ3JFLENBQUM7SUFFTCx3QkFBQztBQUFELENBMURBLEFBMERDLENBMUQ4QyxtQkFBUyxHQTBEdkQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcblxuXG5cbi8vIEJ1bmRsZUhvdFVJSGVscGVyICDng63mm7TmlrDnmoTkuIDkupvnlYzpnaLmj5DnpLpcbmltcG9ydCBCdW5kbGVVdGlsLCB7IENvZGVUeXBlIH0gZnJvbSBcIi4vQnVuZGxlVXRpbFwiO1xuaW1wb3J0IFNpbmdsZUlucyBmcm9tIFwiLi9TaW5nbGVJbnNcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdW5kbGVIb3RVSUhlbHBlciBleHRlbmRzIFNpbmdsZUluc3tcblxuICAgIGhpZGVVcGRhdGluZyhjYWxsYmFjayl7XG4gICAgICAgIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZUhvdFVJSGVscGVyLCBcImhpZGVVcGRhdGluZ1wiKVxuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgIH1cblxuICAgIC8vIOS4i+i9vei/m+W6plxuICAgIG9uUHJvZ3Jlc3MoY3VyTWlzLCB0b3RhbE1pcywgZmluaXNoLCB0b3RhbCl7IFxuICAgICAgICAvLyB0aGlzLm1pc051bS5zdHJpbmcgPSBjdXJNaXMgKyBcIi9cIiArIHRvdGFsTWlzXG4gICAgICAgIC8vIHRoaXMudXBkYXRlX3Byb0Jhci5wcm9ncmVzcyA9IDEuMCpmaW5pc2gvdG90YWxcbiAgICAgICAgQnVuZGxlVXRpbC5MT0coQ29kZVR5cGUuQnVuZGxlSG90VUlIZWxwZXIsIGBvblByb2dyZXNzIDogY3VyTWlzXyR7Y3VyTWlzfSx0b3RhbE1pc18ke3RvdGFsTWlzfSxmaW5pc2hfJHtmaW5pc2h9LHRvdGFsXyR7dG90YWx9YClcbiAgICB9XG5cbiAgICBzaG93VXBkYXRpbmcoY3VyTWlzLCB0b3RhbE1pcyl7XG5cbiAgICAgICAgLy8gdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWUgIFxuXG4gICAgfVxuXG4gICAgc2hvd0hvdEFsZXJ0KGlzTmVlZFJlc3RhcnQsIGNhbGxiYWNrKXtcbiAgICAgICAgQnVuZGxlVXRpbC5MT0coQ29kZVR5cGUuQnVuZGxlSG90VUlIZWxwZXIsIFwic2hvd0hvdEFsZXJ0XCIpXG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7IFxuICAgIH1cblxuICAgIHNob3dBbGVydENsaWVudFRvb09sZCgpeyBcbiAgICAgICAgQnVuZGxlVXRpbC5MT0coQ29kZVR5cGUuQnVuZGxlSG90VUlIZWxwZXIsIFwic2hvd0FsZXJ0Q2xpZW50VG9vT2xkXCIpXG4gICAgfVxuXG4gICAgb25CdG5fQ2xpZW50VG9vT2xkKCl7XG4gICAgICAgIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZUhvdFVJSGVscGVyLCBcIm9uQnRuX0NsaWVudFRvb09sZFwiKVxuICAgICAgICBjYy5nYW1lLmVuZCgpXG4gICAgfVxuXG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT4+IOino+WOi+i1hOa6kFxuICAgIHVucGFja2FnZVNob3coKXtcbiAgICAgICAgQnVuZGxlVXRpbC5MT0coQ29kZVR5cGUuQnVuZGxlSG90VUlIZWxwZXIsIFwidW5wYWNrYWdlU2hvd1wiKVxuICAgIH1cbiAgICBcbiAgICB1bnBhY2thZ2VVcGRhdGVQcm9ncmVzcyhmaW5pc2gsIHRvdGFsKXsgXG4gICAgICAgIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZUhvdFVJSGVscGVyLCBcInVucGFja2FnZVVwZGF0ZVByb2dyZXNzXzpcIiwgZmluaXNoLCB0b3RhbClcbiAgICB9XG4gICAgdW5wYWNrYWdlRmluaXNoKCl7XG4gICAgICAgIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZUhvdFVJSGVscGVyLCBcInVucGFja2FnZUZpbmlzaFwiKVxuICAgIH1cblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPDwg6Kej5Y6L6LWE5rqQXG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT4+IOiOt+WPluaWsOeJiOacrOWPt+aPkOekulxuICAgIGNoZWNrTmV3VmVyc2lvblNob3coKXtcbiAgICAgICAgQnVuZGxlVXRpbC5MT0coQ29kZVR5cGUuQnVuZGxlSG90VUlIZWxwZXIsIFwiY2hlY2tOZXdWZXJzaW9uU2hvd1wiKVxuICAgIH1cblxuICAgIGNoZWNrTmV3VmVyc2lvbkhpZGUoKXsgXG4gICAgICAgIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZUhvdFVJSGVscGVyLCBcImNoZWNrTmV3VmVyc2lvbkhpZGVcIilcbiAgICB9XG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS08PCDojrflj5bmlrDniYjmnKzlj7fmj5DnpLpcbn1cblxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/bundle/BundleUtil.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f71a9cN+AlL4aLKHsUO+4C7', 'BundleUtil');
// Script/bundle/BundleUtil.ts

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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeType = void 0;
var SingleIns_1 = require("./SingleIns");
var CodeType;
(function (CodeType) {
    CodeType["BundleModule"] = "BundleModule";
    CodeType["BundleHotUIHelper"] = "BundleHotUIHelper";
    CodeType["BundleUtil"] = "BundleUtil";
    CodeType["BundleManager"] = "BundleManager";
    CodeType["BundleUnpackHelper"] = "BundleUnpackHelper";
})(CodeType = exports.CodeType || (exports.CodeType = {}));
var BundleUtil = /** @class */ (function (_super) {
    __extends(BundleUtil, _super);
    function BundleUtil() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // makeXMLHttp({url: , callback:(retInfo)=>{}})
    BundleUtil.prototype.makeXMLHttp = function (args) {
        var timeout = args.timeout, url = args.url, callback = args.callback;
        var retInfo = {};
        var isValid = true;
        var xhr = new XMLHttpRequest();
        xhr.timeout = Math.ceil((timeout || 6) * 1000);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                if (!isValid) {
                    return;
                }
                ;
                isValid = false;
                var httpDatas = JSON.parse(xhr.responseText);
                callback({ retData: httpDatas });
            }
            else if (xhr.readyState == 4 && xhr.status == 0) {
                if (!isValid) {
                    return;
                }
                ;
                isValid = false;
                callback({ fail: true });
            }
            else if (xhr.readyState == 4) {
                if (!isValid) {
                    return;
                }
                ;
                isValid = false;
                callback({ fail: true });
            }
        };
        xhr.open('GET', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send();
        xhr.ontimeout = function () {
            if (!isValid) {
                return;
            }
            ;
            isValid = false;
            callback({ isTimeout: true });
        };
        retInfo.abort = function () {
            isValid = false;
            xhr.abort();
        };
        return retInfo;
    };
    //并行任务 return : {addMis: , onFinish:}  
    // let pMis = AppComFunc.parallelMis(callback); 
    // pMis.addMis();
    // pMis.start();
    // pMis.onFinish
    BundleUtil.prototype.parallelMis = function (callback) {
        var co = 0;
        var ret = {};
        co = co + 1;
        var isValid = true;
        var retArgs = {};
        var onFinish = function (args) {
            if (!isValid) {
                return;
            }
            co = co - 1;
            if (args) {
                retArgs = Object.assign(retArgs, args);
            }
            if (co <= 0) {
                if (callback) {
                    callback(retArgs);
                }
            }
        };
        ret.onFinish = onFinish;
        ret.addMis = function () {
            co = co + 1;
            return onFinish;
        };
        ret.start = function () {
            onFinish();
        };
        ret.close = function () {
            isValid = false;
        };
        return ret;
    };
    //顺序任务 idx:0~N,  AppComFunc.sequenceMis(misArr, onAllFolderDetectFinish, (curMis, idx, onExec)=>{ })
    BundleUtil.prototype.sequenceMis = function (misArr, onAllExec, execFunc) {
        cc.log("sequenceMis__enter_:");
        var co = 0;
        var execMis;
        execMis = function () {
            if (co >= misArr.length) {
                onAllExec();
                return;
            }
            var mis = misArr[co];
            var curCo = co;
            co = co + 1;
            execFunc(mis, curCo, execMis);
        };
        execMis();
    };
    // comVersion(localVer, romoteVer)
    // 对比版本号, -1:本地版本比较旧, 0:相等, 1:本地版本比较新
    BundleUtil.prototype.comVersion = function (localVer, romoteVer) {
        var verSplit_local = localVer.split('.');
        var verSplit_remote = romoteVer.split('.');
        var localCo = verSplit_local.length;
        var remoteCo = verSplit_remote.length;
        var maxCo = localCo > remoteCo ? localCo : remoteCo;
        for (var i = 0; i < maxCo; i++) {
            var n_local = parseInt(verSplit_local[i], 10);
            var n_remote = parseInt(verSplit_remote[i], 10);
            if (i < localCo && i >= remoteCo) {
                return 1;
            }
            else if (i >= localCo && i < remoteCo) {
                return -1;
            }
            else if (n_local > n_remote) {
                return 1;
            }
            else if (n_local < n_remote) {
                return -1;
            }
        }
        return 0;
    };
    BundleUtil.prototype.createUUID = function () {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [];
        for (var i = 0; i < 4; i++) {
            uuid[i] = chars[0 | Math.random() * 36];
        }
        var uid = uuid.join('');
        uid = Number(Date.now()).toString(36) + uid;
        return uid;
    };
    BundleUtil.LOG = function (key) {
        var arg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            arg[_i - 1] = arguments[_i];
        }
        cc.log.apply(cc, __spreadArrays(["" + key.toString()], arg));
    };
    return BundleUtil;
}(SingleIns_1.default));
exports.default = BundleUtil;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvYnVuZGxlL0J1bmRsZVV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBb0M7QUFFcEMsSUFBWSxRQU1YO0FBTkQsV0FBWSxRQUFRO0lBQ2hCLHlDQUE2QixDQUFBO0lBQzdCLG1EQUF1QyxDQUFBO0lBQ3ZDLHFDQUF5QixDQUFBO0lBQ3pCLDJDQUErQixDQUFBO0lBQy9CLHFEQUF5QyxDQUFBO0FBQzdDLENBQUMsRUFOVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQU1uQjtBQUVEO0lBQXdDLDhCQUFTO0lBQWpEOztJQW1JQSxDQUFDO0lBaklHLCtDQUErQztJQUMvQyxnQ0FBVyxHQUFYLFVBQVksSUFBSTtRQUVQLElBQUEsT0FBTyxHQUFtQixJQUFJLFFBQXZCLEVBQUUsR0FBRyxHQUFjLElBQUksSUFBbEIsRUFBRSxRQUFRLEdBQUksSUFBSSxTQUFSLENBQVE7UUFDbkMsSUFBSSxPQUFPLEdBQVEsRUFBRSxDQUFBO1FBRXJCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQTtRQUNsQixJQUFJLEdBQUcsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQy9CLEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxHQUFHLENBQUMsa0JBQWtCLEdBQUc7WUFDckIsSUFBSSxHQUFHLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEVBQUU7Z0JBQ2hFLElBQUcsQ0FBQyxPQUFPLEVBQUM7b0JBQUUsT0FBTTtpQkFBRTtnQkFBQyxDQUFDO2dCQUFDLE9BQU8sR0FBRyxLQUFLLENBQUE7Z0JBQ3hDLElBQUksU0FBUyxH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QUFOLFVBQU0sRUFBTixxQkFBTSxFQUFOLElBQU07WUFBTiw0QkFBTTs7UUFDbkMsRUFBRSxDQUFDLEdBQUcsT0FBTixFQUFFLGtCQUFLLEtBQUcsR0FBRyxDQUFDLFFBQVEsRUFBSSxHQUFJLEdBQUcsR0FBRztJQUN4QyxDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQW5JQSxBQW1JQyxDQW5JdUMsbUJBQVMsR0FtSWhEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNpbmdsZUlucyBmcm9tIFwiLi9TaW5nbGVJbnNcIjtcblxuZXhwb3J0IGVudW0gQ29kZVR5cGUge1xuICAgIEJ1bmRsZU1vZHVsZSA9IFwiQnVuZGxlTW9kdWxlXCIsXG4gICAgQnVuZGxlSG90VUlIZWxwZXIgPSBcIkJ1bmRsZUhvdFVJSGVscGVyXCIsXG4gICAgQnVuZGxlVXRpbCA9IFwiQnVuZGxlVXRpbFwiLFxuICAgIEJ1bmRsZU1hbmFnZXIgPSBcIkJ1bmRsZU1hbmFnZXJcIixcbiAgICBCdW5kbGVVbnBhY2tIZWxwZXIgPSBcIkJ1bmRsZVVucGFja0hlbHBlclwiLFxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdW5kbGVVdGlsIGV4dGVuZHMgU2luZ2xlSW5ze1xuXG4gICAgLy8gbWFrZVhNTEh0dHAoe3VybDogLCBjYWxsYmFjazoocmV0SW5mbyk9Pnt9fSlcbiAgICBtYWtlWE1MSHR0cChhcmdzKXtcblxuICAgICAgICBsZXQge3RpbWVvdXQsIHVybCwgY2FsbGJhY2t9ID0gYXJnc1xuICAgICAgICBsZXQgcmV0SW5mbzogYW55ID0ge31cblxuICAgICAgICBsZXQgaXNWYWxpZCA9IHRydWVcbiAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4aHIudGltZW91dCA9IE1hdGguY2VpbCgodGltZW91dCB8fCA2KSoxMDAwKTtcbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHsgXG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDQwMCkpIHtcbiAgICAgICAgICAgICAgICBpZighaXNWYWxpZCl7IHJldHVybiB9IDsgaXNWYWxpZCA9IGZhbHNlIFxuICAgICAgICAgICAgICAgIHZhciBodHRwRGF0YXMgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpOyBcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh7cmV0RGF0YTpodHRwRGF0YXN9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiB4aHIuc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgICAgICBpZighaXNWYWxpZCl7IHJldHVybiB9IDsgaXNWYWxpZCA9IGZhbHNlICBcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh7ZmFpbDp0cnVlfSlcblxuICAgICAgICAgICAgfWVsc2UgaWYgKHhoci5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgICAgICAgICBpZighaXNWYWxpZCl7IHJldHVybiB9IDsgaXNWYWxpZCA9IGZhbHNlICBcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh7ZmFpbDp0cnVlfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwsIHRydWUpOyBcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLTgnKTsgXG4gICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZighaXNWYWxpZCl7IHJldHVybiB9IDsgaXNWYWxpZCA9IGZhbHNlICBcbiAgICAgICAgICAgIGNhbGxiYWNrKHtpc1RpbWVvdXQ6dHJ1ZX0pXG4gICAgICAgIH07IFxuICAgICAgICByZXRJbmZvLmFib3J0ID0gKCk9PntcbiAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZVxuICAgICAgICAgICAgeGhyLmFib3J0KClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0SW5mb1xuICAgIH1cblxuICAgIC8v5bm26KGM5Lu75YqhIHJldHVybiA6IHthZGRNaXM6ICwgb25GaW5pc2g6fSAgXG4gICAgLy8gbGV0IHBNaXMgPSBBcHBDb21GdW5jLnBhcmFsbGVsTWlzKGNhbGxiYWNrKTsgXG4gICAgLy8gcE1pcy5hZGRNaXMoKTtcbiAgICAvLyBwTWlzLnN0YXJ0KCk7XG4gICAgLy8gcE1pcy5vbkZpbmlzaFxuICAgIHBhcmFsbGVsTWlzKGNhbGxiYWNrKXtcbiAgICAgICAgbGV0IGNvID0gMDtcbiAgICAgICAgbGV0IHJldDogYW55ID0ge307XG4gICAgICAgIGNvID0gY28rMTtcbiAgICAgICAgbGV0IGlzVmFsaWQgPSB0cnVlXG4gICAgICAgIGxldCByZXRBcmdzID0ge31cbiAgICAgICAgbGV0IG9uRmluaXNoIDpGdW5jdGlvbiA9IGZ1bmN0aW9uKGFyZ3Mpe1xuICAgICAgICAgICAgaWYoIWlzVmFsaWQpeyByZXR1cm4gfVxuICAgICAgICAgICAgY28gPSBjby0xO1xuICAgICAgICAgICAgaWYoYXJncyl7XG4gICAgICAgICAgICAgICAgcmV0QXJncyA9IE9iamVjdC5hc3NpZ24ocmV0QXJncywgYXJncylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGNvPD0wKXtcbiAgICAgICAgICAgICAgICBpZihjYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJldEFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXQub25GaW5pc2ggPSBvbkZpbmlzaDtcbiAgICAgICAgcmV0LmFkZE1pcyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjbyA9IGNvKzE7XG4gICAgICAgICAgICByZXR1cm4gb25GaW5pc2g7XG4gICAgICAgIH1cbiAgICAgICAgcmV0LnN0YXJ0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIG9uRmluaXNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0LmNsb3NlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgLy/pobrluo/ku7vliqEgaWR4OjB+TiwgIEFwcENvbUZ1bmMuc2VxdWVuY2VNaXMobWlzQXJyLCBvbkFsbEZvbGRlckRldGVjdEZpbmlzaCwgKGN1ck1pcywgaWR4LCBvbkV4ZWMpPT57IH0pXG4gICAgc2VxdWVuY2VNaXMobWlzQXJyLCBvbkFsbEV4ZWMsIGV4ZWNGdW5jKXtcbiAgICAgICAgY2MubG9nKFwic2VxdWVuY2VNaXNfX2VudGVyXzpcIilcbiAgICAgICAgbGV0IGNvID0gMFxuICAgICAgICBsZXQgZXhlY01pcyA7XG4gICAgICAgIGV4ZWNNaXMgPSAoKT0+e1xuICAgICAgICAgICAgaWYoY28+PW1pc0Fyci5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIG9uQWxsRXhlYygpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG1pcyA9IG1pc0Fycltjb11cbiAgICAgICAgICAgIGxldCBjdXJDbyA9IGNvXG4gICAgICAgICAgICBjbz1jbysxIFxuICAgICAgICAgICAgZXhlY0Z1bmMobWlzLCBjdXJDbywgZXhlY01pcylcbiAgICAgICAgfSBcbiAgICAgICAgZXhlY01pcygpIFxuICAgIH1cblxuICAgIC8vIGNvbVZlcnNpb24obG9jYWxWZXIsIHJvbW90ZVZlcilcbiAgICAvLyDlr7nmr5TniYjmnKzlj7csIC0xOuacrOWcsOeJiOacrOavlOi+g+aXpywgMDrnm7jnrYksIDE65pys5Zyw54mI5pys5q+U6L6D5pawXG4gICAgY29tVmVyc2lvbihsb2NhbFZlciwgcm9tb3RlVmVyKXtcbiAgICAgICAgbGV0IHZlclNwbGl0X2xvY2FsICA9IGxvY2FsVmVyLnNwbGl0KCcuJylcbiAgICAgICAgbGV0IHZlclNwbGl0X3JlbW90ZSA9IHJvbW90ZVZlci5zcGxpdCgnLicpXG4gICAgICAgIGxldCBsb2NhbENvICA9IHZlclNwbGl0X2xvY2FsLmxlbmd0aFxuICAgICAgICBsZXQgcmVtb3RlQ28gPSB2ZXJTcGxpdF9yZW1vdGUubGVuZ3RoXG4gICAgICAgIGxldCBtYXhDbyA9IGxvY2FsQ28+cmVtb3RlQ28/bG9jYWxDbyA6IHJlbW90ZUNvXG4gICAgICAgIFxuICAgICAgICBmb3IobGV0IGk9MDtpPG1heENvO2krKyl7XG4gICAgICAgICAgICBsZXQgbl9sb2NhbCA9IHBhcnNlSW50KHZlclNwbGl0X2xvY2FsW2ldLCAxMCk7IFxuICAgICAgICAgICAgbGV0IG5fcmVtb3RlID0gcGFyc2VJbnQodmVyU3BsaXRfcmVtb3RlW2ldLCAxMCk7IFxuXG4gICAgICAgICAgICBpZihpPGxvY2FsQ28gJiYgaT49cmVtb3RlQ28peyByZXR1cm4gMSB9XG4gICAgICAgICAgICBlbHNlIGlmKGk+PWxvY2FsQ28gJiYgaTxyZW1vdGVDbykgeyByZXR1cm4gLTF9IFxuICAgICAgICAgICAgZWxzZSBpZihuX2xvY2FsPm5fcmVtb3RlKXsgcmV0dXJuIDF9XG4gICAgICAgICAgICBlbHNlIGlmKG5fbG9jYWw8bl9yZW1vdGUpeyByZXR1cm4gLTF9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDBcbiAgICB9XG5cbiAgICBjcmVhdGVVVUlEKCl7XG4gICAgICAgIHZhciBjaGFycyA9ICcwMTIzNDU2Nzg5QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eicuc3BsaXQoJycpOyBcbiAgICAgICAgdmFyIHV1aWQgPSBbXTsgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgdXVpZFtpXSA9IGNoYXJzWzAgfCBNYXRoLnJhbmRvbSgpKjM2XTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdWlkID0gdXVpZC5qb2luKCcnKTtcbiAgICAgICAgdWlkID0gTnVtYmVyKERhdGUubm93KCkpLnRvU3RyaW5nKDM2KSArIHVpZCBcbiAgICAgICAgcmV0dXJuIHVpZFxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgTE9HIChrZXk6IENvZGVUeXBlLC4uLmFyZyl7IFxuICAgICAgICBjYy5sb2coYCR7a2V5LnRvU3RyaW5nKCl9YCwuLi5hcmcpIDsgXG4gICAgfVxufVxuIl19
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/bundle/BundleUnpackHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '10293QTNjJDlIukXNrrvUWK', 'BundleUnpackHelper');
// Script/bundle/BundleUnpackHelper.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var SingleIns_1 = require("./SingleIns");
var BundleHotUIHelper_1 = require("./BundleHotUIHelper");
var BundleUtil_1 = require("./BundleUtil");
var BundleManager_1 = require("./BundleManager");
var Const_1 = require("./Const");
var BundleUnpackHelper = /** @class */ (function (_super) {
    __extends(BundleUnpackHelper, _super);
    function BundleUnpackHelper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BundleUnpackHelper.prototype.initCom = function (arg) {
        this._bundleMgr = BundleManager_1.default.getInstance();
        this._bundleUtil = BundleUtil_1.default.getInstance();
        this._bundleHotUIHelper = BundleHotUIHelper_1.default.getInstance();
    };
    BundleUnpackHelper.prototype.execUnpackage = function (onComplete) {
        var _this = this;
        if (!(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.OS_WINDOWS)) {
            BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleUnpackHelper, "ignore_unpackage");
            onComplete();
            return;
        }
        var localClientVer = cc.sys.localStorage.getItem(Const_1.ModuleConst.localClientVer);
        var writablePath = jsb.fileUtils.getWritablePath();
        var path_cache = writablePath + "gamecaches/";
        if (Const_1.GlobalConst.Client_Version == localClientVer && jsb.fileUtils.isFileExist(path_cache + "cacheList.json")) {
            BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleUnpackHelper, "Unpackage_not_exec");
            onComplete();
            return;
        }
        else {
            // 第一次启动该版本
            var nativeRoot = this._bundleMgr.getNativePath(); //  
            var path_native_1 = nativeRoot + "PKgamecaches/";
            BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleUnpackHelper, "unpackage_res_:", path_native_1, path_cache);
            if (!jsb.fileUtils.isDirectoryExist(path_native_1)) {
                BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleUnpackHelper, "PKgamecaches_not_exist");
                cc.sys.localStorage.setItem(Const_1.ModuleConst.localClientVer, Const_1.GlobalConst.Client_Version);
                onComplete();
                return;
            }
            //-------------------------------------------------->>  替换 cacheManager 数据
            var cacheMag_1 = cc.assetManager.cacheManager;
            // cacheMag.clearCache()
            var coverCachelist_1 = function () {
                var fileStr = jsb.fileUtils.getStringFromFile(path_native_1 + "cacheList.json");
                var abVersion = {};
                var cache_d_Map = JSON.parse(fileStr);
                if (cache_d_Map) {
                    var files = cache_d_Map.files;
                    for (var id in files) {
                        var info = files[id];
                        // BundleUtil.LOG(CodeType.BundleUnpackHelper, "call_cacheFile_:", id, info.url, info.bundle )
                        cacheMag_1.cacheFile(id, info.url, info.bundle);
                        // 查找版本号
                        if (id.indexOf("/index.") != -1) {
                            var splitRet = id.split('.');
                            abVersion[info.bundle] = splitRet[splitRet.length - 2];
                        }
                    }
                }
                // 覆盖本地资源版本号 
                BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleUnpackHelper, "abVersion__:", JSON.stringify(abVersion));
                cacheMag_1.writeCacheFile(function () {
                    BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleUnpackHelper, "writeCache_File_ok");
                    _this._bundleMgr.setLocalAbVersion(abVersion);
                    cc.sys.localStorage.setItem(Const_1.ModuleConst.localClientVer, Const_1.GlobalConst.Client_Version);
                    onComplete();
                });
            };
            //--------------------------------------------------<<  替换 cacheManager 数据
            this._bundleHotUIHelper.unpackageShow();
            this.copyFoldTo(path_native_1, path_cache, function (finish, total) {
                _this._bundleHotUIHelper.unpackageUpdateProgress(finish, total);
                // BundleUtil.LOG(CodeType.BundleUnpackHelper, "copy_file_:", finish, total)
            }, function () {
                // 完成 
                _this._bundleHotUIHelper.unpackageFinish();
                coverCachelist_1();
            });
        }
    };
    BundleUnpackHelper.prototype.getFileListFromDir = function (dir, filelist) {
        var co = 1;
        if (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.OS_WINDOWS) {
            var cacheJson = jsb.fileUtils.getStringFromFile(dir + "cacheList.json");
            var cacheMap = JSON.parse(cacheJson);
            var files = cacheMap.files;
            for (var url in files) {
                var item = files[url];
                var fullpath = this._bundleMgr.getNativePath() + "PKgamecaches/" + item.url;
                filelist.push(fullpath);
                if (co < 3) {
                    console.log("get_file_list_full_:", fullpath);
                }
                co = co + 1;
            }
        }
        else {
            jsb.fileUtils.listFilesRecursively(dir, filelist);
        }
    };
    // 拷贝文件夹到 copyFoldTo("/path1/src/", "/path2/src/") 
    BundleUnpackHelper.prototype.copyFoldTo = function (oriRoot, copyTo, onProgress, onComplate) {
        var _this = this;
        var eachFrameCopyNum = 5; // 每帧复制文件数
        if ((typeof (jsb) == "undefined") || !jsb.fileUtils.isDirectoryExist(oriRoot)) {
            cc.log("ori_folder_not_exist_:", oriRoot);
            onComplate();
            return;
        }
        var filelist = [];
        this.getFileListFromDir(oriRoot, filelist);
        cc.log("file_ori_arr_:", oriRoot, filelist.length);
        var realFileArr = [];
        for (var i = 0; i < filelist.length; i++) {
            var path = filelist[i];
            if (path.substr(path.length - 1) != "/") {
                realFileArr.push(path);
            }
        }
        var totalLen = realFileArr.length;
        if (totalLen == 0) {
            cc.log("totalLen_is_0:", oriRoot);
            onComplate();
            return;
        }
        var curMisIndex = 0;
        var schHandler = function () {
            for (var i = curMisIndex; i < curMisIndex + eachFrameCopyNum; i++) {
                if (i >= totalLen) {
                    _this.unIntervalSchedule();
                    onComplate();
                    return;
                }
                var path = realFileArr[i];
                var subPath = path.substr(oriRoot.length); // 后半部分路径 import/00/00.7871f.json
                var fileName = path.substr(path.lastIndexOf("\/") + 1); // 文件名 00.7871f.json
                var targetPath = copyTo + subPath; // 目标完整路径
                var newFold = targetPath.substr(0, targetPath.lastIndexOf("\/") + 1); // 目标文件夹
                if (!jsb.fileUtils.isDirectoryExist(newFold)) { // 文件夹不存在则创建 
                    jsb.fileUtils.createDirectory(newFold);
                }
                var fileData = jsb.fileUtils.getDataFromFile(path);
                var saveRet = jsb.fileUtils.writeDataToFile(fileData, targetPath);
                if (!saveRet) {
                    _this.unIntervalSchedule();
                    return;
                }
            }
            curMisIndex = curMisIndex + eachFrameCopyNum;
            onProgress((curMisIndex <= totalLen ? curMisIndex : totalLen), totalLen);
        };
        this.intervalSchedule(schHandler, 0);
    };
    return BundleUnpackHelper;
}(SingleIns_1.default));
exports.default = BundleUnpackHelper;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvYnVuZGxlL0J1bmRsZVVucGFja0hlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSx5Q0FBb0M7QUFDcEMseURBQW9EO0FBQ3BELDJDQUFvRDtBQUNwRCxpREFBNEM7QUFDNUMsaUNBQW1EO0FBR25EO0lBQWdELHNDQUFTO0lBQXpEOztJQTRMQSxDQUFDO0lBdExHLG9DQUFPLEdBQVAsVUFBUSxHQUFHO1FBQ1AsSUFBSSxDQUFDLFVBQVUsR0FBRyx1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlDLElBQUksQ0FBQyxXQUFXLEdBQUcsb0JBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsMkJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDOUQsQ0FBQztJQUVELDBDQUFhLEdBQWIsVUFBYyxVQUFVO1FBQXhCLGlCQW1GQztRQWpGRyxJQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFHO1lBQ3JHLG9CQUFVLENBQUMsR0FBRyxDQUFDLHFCQUFRLENBQUMsa0JBQWtCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQTtZQUMvRCxVQUFVLEVBQUUsQ0FBQztZQUNiLE9BQU07U0FDVDtRQUVELElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxtQkFBVyxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBQzVFLElBQUksWUFBWSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsZUFBZSxF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R0FBRyxPQUFPLENBQUEsQ0FBQyxTQUFTO2dCQUMzQyxJQUFJLE9BQU8sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBRSxDQUFBLENBQUMsUUFBUTtnQkFFN0UsSUFBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEVBQUMsRUFBRSxhQUFhO29CQUN2RCxHQUFHLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtpQkFDekM7Z0JBRUQsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25ELElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDbEUsSUFBRyxDQUFDLE9BQU8sRUFBQztvQkFFUixLQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztvQkFDMUIsT0FBUTtpQkFDWDthQUVKO1lBQ0QsV0FBVyxHQUFHLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQTtZQUU1QyxVQUFVLENBQUUsQ0FBQyxXQUFXLElBQUUsUUFBUSxDQUFBLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBRTFFLENBQUMsQ0FBQTtRQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0E1TEEsQUE0TEMsQ0E1TCtDLG1CQUFTLEdBNEx4RCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQgU2luZ2xlSW5zIGZyb20gXCIuL1NpbmdsZUluc1wiO1xuaW1wb3J0IEJ1bmRsZUhvdFVJSGVscGVyIGZyb20gXCIuL0J1bmRsZUhvdFVJSGVscGVyXCI7XG5pbXBvcnQgQnVuZGxlVXRpbCwgeyBDb2RlVHlwZSB9IGZyb20gXCIuL0J1bmRsZVV0aWxcIjtcbmltcG9ydCBCdW5kbGVNYW5hZ2VyIGZyb20gXCIuL0J1bmRsZU1hbmFnZXJcIjtcbmltcG9ydCB7IE1vZHVsZUNvbnN0LCBHbG9iYWxDb25zdCB9IGZyb20gXCIuL0NvbnN0XCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVuZGxlVW5wYWNrSGVscGVyIGV4dGVuZHMgU2luZ2xlSW5ze1xuICAgIF9idW5kbGVNZ3I6IEJ1bmRsZU1hbmFnZXI7XG4gICAgX2J1bmRsZVV0aWw6IEJ1bmRsZVV0aWw7XG4gICAgX2J1bmRsZUhvdFVJSGVscGVyOiBCdW5kbGVIb3RVSUhlbHBlcjtcbiAgICBfdGltZU91dElkczogbnVtYmVyW107XG5cbiAgICBpbml0Q29tKGFyZykge1xuICAgICAgICB0aGlzLl9idW5kbGVNZ3IgPSBCdW5kbGVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XG4gICAgICAgIHRoaXMuX2J1bmRsZVV0aWwgPSBCdW5kbGVVdGlsLmdldEluc3RhbmNlKCk7XG4gICAgICAgIHRoaXMuX2J1bmRsZUhvdFVJSGVscGVyID0gQnVuZGxlSG90VUlIZWxwZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICB9XG5cbiAgICBleGVjVW5wYWNrYWdlKG9uQ29tcGxldGUpe1xuXG4gICAgICAgIGlmICggIShjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQgfHwgY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MgfHwgY2Muc3lzLm9zID09IGNjLnN5cy5PU19XSU5ET1dTKSApIHtcbiAgICAgICAgICAgIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZVVucGFja0hlbHBlciwgXCJpZ25vcmVfdW5wYWNrYWdlXCIpXG4gICAgICAgICAgICBvbkNvbXBsZXRlKCk7XG4gICAgICAgICAgICByZXR1cm4gXG4gICAgICAgIH0gXG5cbiAgICAgICAgbGV0IGxvY2FsQ2xpZW50VmVyID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKE1vZHVsZUNvbnN0LmxvY2FsQ2xpZW50VmVyKVxuICAgICAgICBsZXQgd3JpdGFibGVQYXRoID0ganNiLmZpbGVVdGlscy5nZXRXcml0YWJsZVBhdGgoKSBcbiAgICAgICAgbGV0IHBhdGhfY2FjaGUgID0gd3JpdGFibGVQYXRoICsgXCJnYW1lY2FjaGVzL1wiIFxuICAgICAgICBcbiAgICAgICAgaWYoIEdsb2JhbENvbnN0LkNsaWVudF9WZXJzaW9uID09IGxvY2FsQ2xpZW50VmVyICYmIGpzYi5maWxlVXRpbHMuaXNGaWxlRXhpc3QocGF0aF9jYWNoZStcImNhY2hlTGlzdC5qc29uXCIpKXtcbiAgICAgICAgICAgIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZVVucGFja0hlbHBlciwgXCJVbnBhY2thZ2Vfbm90X2V4ZWNcIilcbiAgICAgICAgICAgIG9uQ29tcGxldGUoKVxuICAgICAgICAgICAgcmV0dXJuIDsgXG5cbiAgICAgICAgfWVsc2UgeyBcbiAgICAgICAgICAgIC8vIOesrOS4gOasoeWQr+WKqOivpeeJiOacrFxuICAgICAgICAgICAgbGV0IG5hdGl2ZVJvb3QgPSB0aGlzLl9idW5kbGVNZ3IuZ2V0TmF0aXZlUGF0aCgpIC8vICBcblxuICAgICAgICAgICAgbGV0IHBhdGhfbmF0aXZlID0gbmF0aXZlUm9vdCArIFwiUEtnYW1lY2FjaGVzL1wiXG4gICAgICAgICAgICBCdW5kbGVVdGlsLkxPRyhDb2RlVHlwZS5CdW5kbGVVbnBhY2tIZWxwZXIsIFwidW5wYWNrYWdlX3Jlc186XCIsIHBhdGhfbmF0aXZlLCBwYXRoX2NhY2hlIClcblxuICAgICAgICAgICAgaWYoIWpzYi5maWxlVXRpbHMuaXNEaXJlY3RvcnlFeGlzdChwYXRoX25hdGl2ZSkpe1xuICAgICAgICAgICAgICAgIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZVVucGFja0hlbHBlciwgXCJQS2dhbWVjYWNoZXNfbm90X2V4aXN0XCIpXG4gICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKE1vZHVsZUNvbnN0LmxvY2FsQ2xpZW50VmVyLCBHbG9iYWxDb25zdC5DbGllbnRfVmVyc2lvbiApXG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZSgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIDsgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPj4gIOabv+aNoiBjYWNoZU1hbmFnZXIg5pWw5o2uXG4gICAgICAgICAgICBsZXQgY2FjaGVNYWcgPSBjYy5hc3NldE1hbmFnZXIuY2FjaGVNYW5hZ2VyXG4gICAgICAgICAgICAvLyBjYWNoZU1hZy5jbGVhckNhY2hlKClcblxuICAgICAgICAgICAgbGV0IGNvdmVyQ2FjaGVsaXN0ID0gKCk9PntcbiAgICAgICAgICAgICAgICBsZXQgZmlsZVN0ciA9IGpzYi5maWxlVXRpbHMuZ2V0U3RyaW5nRnJvbUZpbGUocGF0aF9uYXRpdmUgKyBcImNhY2hlTGlzdC5qc29uXCIpICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgYWJWZXJzaW9uID0ge30gXG5cbiAgICAgICAgICAgICAgICB2YXIgY2FjaGVfZF9NYXAgPSBKU09OLnBhcnNlKGZpbGVTdHIpXG4gICAgICAgICAgICAgICAgaWYoY2FjaGVfZF9NYXApe1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZXMgPSBjYWNoZV9kX01hcC5maWxlc1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGlkIGluICBmaWxlcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5mbyA9IGZpbGVzW2lkXVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQnVuZGxlVXRpbC5MT0coQ29kZVR5cGUuQnVuZGxlVW5wYWNrSGVscGVyLCBcImNhbGxfY2FjaGVGaWxlXzpcIiwgaWQsIGluZm8udXJsLCBpbmZvLmJ1bmRsZSApXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWNoZU1hZy5jYWNoZUZpbGUoaWQsIGluZm8udXJsLCBpbmZvLmJ1bmRsZSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5p+l5om+54mI5pys5Y+3XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpZC5pbmRleE9mKFwiL2luZGV4LlwiKSAhPSAtMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwbGl0UmV0ID0gaWQuc3BsaXQoJy4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFiVmVyc2lvbltpbmZvLmJ1bmRsZV0gPSBzcGxpdFJldFtzcGxpdFJldC5sZW5ndGgtMl1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIOimhuebluacrOWcsOi1hOa6kOeJiOacrOWPtyBcbiAgICAgICAgICAgICAgICBCdW5kbGVVdGlsLkxPRyhDb2RlVHlwZS5CdW5kbGVVbnBhY2tIZWxwZXIsIFwiYWJWZXJzaW9uX186XCIsIEpTT04uc3RyaW5naWZ5KGFiVmVyc2lvbikgKVxuXG4gICAgICAgICAgICAgICAgY2FjaGVNYWcud3JpdGVDYWNoZUZpbGUoKCk9PntcblxuICAgICAgICAgICAgICAgICAgICBCdW5kbGVVdGlsLkxPRyhDb2RlVHlwZS5CdW5kbGVVbnBhY2tIZWxwZXIsIFwid3JpdGVDYWNoZV9GaWxlX29rXCIpXG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVuZGxlTWdyLnNldExvY2FsQWJWZXJzaW9uKGFiVmVyc2lvbilcblxuXG4gICAgICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShNb2R1bGVDb25zdC5sb2NhbENsaWVudFZlciwgR2xvYmFsQ29uc3QuQ2xpZW50X1ZlcnNpb24gKVxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlKClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLTw8ICDmm7/mjaIgY2FjaGVNYW5hZ2VyIOaVsOaNrlxuXG4gICAgICAgICAgICB0aGlzLl9idW5kbGVIb3RVSUhlbHBlci51bnBhY2thZ2VTaG93KClcbiAgICAgICAgICAgIHRoaXMuY29weUZvbGRUbyhwYXRoX25hdGl2ZSwgcGF0aF9jYWNoZSwgKGZpbmlzaCwgdG90YWwpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5fYnVuZGxlSG90VUlIZWxwZXIudW5wYWNrYWdlVXBkYXRlUHJvZ3Jlc3MoZmluaXNoLCB0b3RhbClcbiAgICAgICAgICAgICAgICAvLyBCdW5kbGVVdGlsLkxPRyhDb2RlVHlwZS5CdW5kbGVVbnBhY2tIZWxwZXIsIFwiY29weV9maWxlXzpcIiwgZmluaXNoLCB0b3RhbClcbiAgICAgICAgICAgIH0sKCk9PntcbiAgICAgICAgICAgICAgICAvLyDlrozmiJAgXG4gICAgICAgICAgICAgICAgdGhpcy5fYnVuZGxlSG90VUlIZWxwZXIudW5wYWNrYWdlRmluaXNoKCkgIFxuICAgICAgICAgICAgICAgIGNvdmVyQ2FjaGVsaXN0KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG5cbiAgICBnZXRGaWxlTGlzdEZyb21EaXIoZGlyLCBmaWxlbGlzdCl7XG4gICAgICAgIGxldCBjbyA9IDFcbiAgICAgICAgaWYoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEIHx8IGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfSU9TIHx8IGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfV0lORE9XUyl7XG4gICAgICAgICAgICBsZXQgY2FjaGVKc29uID0ganNiLmZpbGVVdGlscy5nZXRTdHJpbmdGcm9tRmlsZShkaXIgKyBcImNhY2hlTGlzdC5qc29uXCIpXG4gICAgICAgICAgICBsZXQgY2FjaGVNYXAgPSBKU09OLnBhcnNlKGNhY2hlSnNvbilcbiAgICAgICAgICAgIGxldCBmaWxlcyA9IGNhY2hlTWFwLmZpbGVzXG4gICAgICAgICAgICBmb3IobGV0IHVybCBpbiBmaWxlcyl7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBmaWxlc1t1cmxdXG4gICAgICAgICAgICAgICAgbGV0IGZ1bGxwYXRoID0gdGhpcy5fYnVuZGxlTWdyLmdldE5hdGl2ZVBhdGgoKStcIlBLZ2FtZWNhY2hlcy9cIitpdGVtLnVybFxuICAgICAgICAgICAgICAgIGZpbGVsaXN0LnB1c2goZnVsbHBhdGgpXG4gICAgICAgICAgICAgICAgaWYoY288Myl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0X2ZpbGVfbGlzdF9mdWxsXzpcIiwgZnVsbHBhdGggKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjbyA9IGNvKzFcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGpzYi5maWxlVXRpbHMubGlzdEZpbGVzUmVjdXJzaXZlbHkoZGlyLCBmaWxlbGlzdClcbiAgICAgICAgfSBcbiAgICB9XG5cbiAgICAvLyDmi7fotJ3mlofku7blpLnliLAgY29weUZvbGRUbyhcIi9wYXRoMS9zcmMvXCIsIFwiL3BhdGgyL3NyYy9cIikgXG4gICAgY29weUZvbGRUbyhvcmlSb290LCBjb3B5VG8sIG9uUHJvZ3Jlc3MsIG9uQ29tcGxhdGUpe1xuXG4gICAgICAgIGxldCBlYWNoRnJhbWVDb3B5TnVtID0gNSAgLy8g5q+P5bin5aSN5Yi25paH5Lu25pWwXG5cbiAgICAgICAgaWYoICh0eXBlb2YoanNiKT09XCJ1bmRlZmluZWRcIikgfHwgIWpzYi5maWxlVXRpbHMuaXNEaXJlY3RvcnlFeGlzdChvcmlSb290KSl7XG4gICAgICAgICAgICBjYy5sb2coXCJvcmlfZm9sZGVyX25vdF9leGlzdF86XCIsIG9yaVJvb3QgKVxuICAgICAgICAgICAgb25Db21wbGF0ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIFxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZpbGVsaXN0ID0gW11cbiAgICAgICAgdGhpcy5nZXRGaWxlTGlzdEZyb21EaXIob3JpUm9vdCwgZmlsZWxpc3QpIFxuXG4gICAgICAgIGNjLmxvZyhcImZpbGVfb3JpX2Fycl86XCIsb3JpUm9vdCwgZmlsZWxpc3QubGVuZ3RoKTtcblxuICAgICAgICBsZXQgcmVhbEZpbGVBcnIgPSBbXVxuICAgICAgICBmb3IobGV0IGk9MDtpPGZpbGVsaXN0Lmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgbGV0IHBhdGggPSBmaWxlbGlzdFtpXVxuICAgICAgICAgICAgaWYocGF0aC5zdWJzdHIoIHBhdGgubGVuZ3RoLTEgKSE9XCIvXCIpe1xuICAgICAgICAgICAgICAgIHJlYWxGaWxlQXJyLnB1c2gocGF0aClcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdG90YWxMZW4gPSByZWFsRmlsZUFyci5sZW5ndGhcblxuICAgICAgICBpZih0b3RhbExlbj09MCl7XG4gICAgICAgICAgICBjYy5sb2coXCJ0b3RhbExlbl9pc18wOlwiLCBvcmlSb290IClcbiAgICAgICAgICAgIG9uQ29tcGxhdGUoKTtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY3VyTWlzSW5kZXggPSAwXG5cbiAgICAgICAgbGV0IHNjaEhhbmRsZXIgPSAoKT0+e1xuXG4gICAgICAgICAgICBmb3IobGV0IGk9Y3VyTWlzSW5kZXg7IGk8Y3VyTWlzSW5kZXgrZWFjaEZyYW1lQ29weU51bTsgaSsrKXsgXG5cbiAgICAgICAgICAgICAgICBpZihpPj10b3RhbExlbil7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5JbnRlcnZhbFNjaGVkdWxlKCk7XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxhdGUoKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgcGF0aCA9IHJlYWxGaWxlQXJyW2ldIFxuICAgIFxuICAgICAgICAgICAgICAgIGxldCBzdWJQYXRoID0gcGF0aC5zdWJzdHIoIG9yaVJvb3QubGVuZ3RoICkgIC8vIOWQjuWNiumDqOWIhui3r+W+hCBpbXBvcnQvMDAvMDAuNzg3MWYuanNvblxuICAgICAgICAgICAgICAgIGxldCBmaWxlTmFtZSA9IHBhdGguc3Vic3RyKCBwYXRoLmxhc3RJbmRleE9mKFwiXFwvXCIpKzEpIC8vIOaWh+S7tuWQjSAwMC43ODcxZi5qc29uXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldFBhdGggPSBjb3B5VG8gKyBzdWJQYXRoIC8vIOebruagh+WujOaVtOi3r+W+hFxuICAgICAgICAgICAgICAgIGxldCBuZXdGb2xkID0gdGFyZ2V0UGF0aC5zdWJzdHIoIDAsIHRhcmdldFBhdGgubGFzdEluZGV4T2YoXCJcXC9cIikrMSApIC8vIOebruagh+aWh+S7tuWkuVxuICAgIFxuICAgICAgICAgICAgICAgIGlmKCFqc2IuZmlsZVV0aWxzLmlzRGlyZWN0b3J5RXhpc3QobmV3Rm9sZCkpeyAvLyDmlofku7blpLnkuI3lrZjlnKjliJnliJvlu7ogXG4gICAgICAgICAgICAgICAgICAgIGpzYi5maWxlVXRpbHMuY3JlYXRlRGlyZWN0b3J5KG5ld0ZvbGQpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGZpbGVEYXRhID0ganNiLmZpbGVVdGlscy5nZXREYXRhRnJvbUZpbGUocGF0aCk7IFxuICAgICAgICAgICAgICAgIGxldCBzYXZlUmV0ID0ganNiLmZpbGVVdGlscy53cml0ZURhdGFUb0ZpbGUoZmlsZURhdGEsIHRhcmdldFBhdGgpO1xuICAgICAgICAgICAgICAgIGlmKCFzYXZlUmV0KXtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuSW50ZXJ2YWxTY2hlZHVsZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICAgICAgICAgIH0gIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGN1ck1pc0luZGV4ID0gY3VyTWlzSW5kZXggKyBlYWNoRnJhbWVDb3B5TnVtXG5cbiAgICAgICAgICAgIG9uUHJvZ3Jlc3MoIChjdXJNaXNJbmRleDw9dG90YWxMZW4/IGN1ck1pc0luZGV4IDogdG90YWxMZW4pLCB0b3RhbExlbilcblxuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW50ZXJ2YWxTY2hlZHVsZShzY2hIYW5kbGVyLCAwKVxuICAgIH1cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/bundle/Const.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e7a84J0hoNDBpL3SyQ9aLhg', 'Const');
// Script/bundle/Const.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalConst = exports.ModuleConst = void 0;
exports.ModuleConst = {
    hotUrl: "http://192.168.20.196:8000/hotRes/",
    localVersionConfigKey: "_local_gameVersionData1",
    localClientVer: "__sv_loacal_client_ver",
    reqVersionImmediately: true,
};
exports.GlobalConst = {
    Client_Version: "1.0.0",
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvYnVuZGxlL0NvbnN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9hLFFBQUEsV0FBVyxHQUFvQjtJQUN4QyxNQUFNLEVBQUUsb0NBQW9DO0lBQzVDLHFCQUFxQixFQUFFLHlCQUF5QjtJQUNoRCxjQUFjLEVBQUUsd0JBQXdCO0lBQ3hDLHFCQUFxQixFQUFFLElBQUk7Q0FDOUIsQ0FBQTtBQU1ZLFFBQUEsV0FBVyxHQUFvQjtJQUN4QyxjQUFjLEVBQUUsT0FBTztDQUMxQixDQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW50ZXJmYWNlIE1vZHVsZUNvbnN0VHlwZSB7XG4gICAgaG90VXJsOiBzdHJpbmc7XG4gICAgbG9jYWxWZXJzaW9uQ29uZmlnS2V5OiBzdHJpbmc7XG4gICAgbG9jYWxDbGllbnRWZXI6IHN0cmluZztcbiAgICByZXFWZXJzaW9uSW1tZWRpYXRlbHk6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjb25zdCBNb2R1bGVDb25zdDogTW9kdWxlQ29uc3RUeXBlID0ge1xuICAgIGhvdFVybDogXCJodHRwOi8vMTkyLjE2OC4yMC4xOTY6ODAwMC9ob3RSZXMvXCIsIC8vIOeDreabtOaWsOWcsOWdgCwg5Lul5pac5p2g57uT5bC+XG4gICAgbG9jYWxWZXJzaW9uQ29uZmlnS2V5OiBcIl9sb2NhbF9nYW1lVmVyc2lvbkRhdGExXCIsXG4gICAgbG9jYWxDbGllbnRWZXI6IFwiX19zdl9sb2FjYWxfY2xpZW50X3ZlclwiLFxuICAgIHJlcVZlcnNpb25JbW1lZGlhdGVseTogdHJ1ZSxcbn1cblxuaW50ZXJmYWNlIEdsb2JhbENvbnN0VHlwZSB7XG4gICAgQ2xpZW50X1ZlcnNpb246IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IEdsb2JhbENvbnN0OiBHbG9iYWxDb25zdFR5cGUgPSB7XG4gICAgQ2xpZW50X1ZlcnNpb246IFwiMS4wLjBcIixcbn1cblxuXG5cbiJdfQ==
//------QC-SOURCE-SPLIT------
