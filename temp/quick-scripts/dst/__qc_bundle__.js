
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
            loadVerFunc(moduleObj.init(moduleName, false), romoteVer, function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvYnVuZGxlL0J1bmRsZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQTBDO0FBQzFDLHlDQUFvQztBQUNwQyx5REFBb0Q7QUFDcEQsMkNBQW9EO0FBQ3BELDJEQUFzRDtBQUN0RCxpQ0FBbUQ7QUFFbkQ7SUFBMkMsaUNBQVM7SUFBcEQ7UUFBQSxxRUE2WUM7UUFyWUcsYUFBTyxHQUFPLEVBQUUsQ0FBQztRQU1qQixpQkFBVyxHQUFZLEVBQUUsQ0FBQzs7UUE2WDFCLDZFQUE2RTtJQUVqRixDQUFDO0lBN1hHLCtCQUFPLEdBQVAsVUFBUSxJQUFJO1FBQ1IsSUFBSSxDQUFDLFdBQVcsR0FBTyxvQkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyxVQUFVLEdBQU8sNEJBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkQsSUFBSSxDQUFDLGtCQUFrQixHQUFLLDJCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRTVELDZDQUE2QztRQUM3QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDdEMsb0JBQVUsQ0FBQyxHQUFHLENBQUMscUJBQVEsQ0FBQyxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBRSxDQUFBO1FBRWpGLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxDQUFDLENBQUEsQ0FBQyx1Q0FBdUM7UUFDekUsSUFBSSxDQUFDLHlCQUF5QixHQUFHLEVBQUUsQ0FBQSxDQUFFLFdBQVc7UUFFaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUE7UUFFakIsSUFBSSxDQUFDLGVBQWUsR0FBRyxtQkFBVyxDQUFDLHFCQUFxQixDQUFBLENBQUMsMkJBQTJCO1FBQ3BGLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJ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LEdBQUcsS0FBSyxDQUFBO2dCQUVwQixLQUFJLElBQUksVUFBVSxJQUFJLFNBQVMsQ0FBQyxPQUFPLEVBQUM7b0JBRXBDLElBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFDLEVBQUksVUFBVTt3QkFDM0MsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUE7cUJBQ3BDO29CQUNELElBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sRUFBQzt3QkFDckMsUUFBUSxHQUFHLElBQUksQ0FBQTt3QkFDZixRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7cUJBQ2pGO2lCQUNKO2dCQUVELElBQUcsUUFBUSxFQUFDO29CQUNSLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUE7aUJBQ3pGO2dCQUVELEtBQUksQ0FBQyx3QkFBd0IsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtnQkFDdEQsUUFBUSxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQzNCLENBQUMsRUFBQyxDQUFDLENBQUE7SUFFUCxDQUFDO0lBS0wsb0JBQUM7QUFBRCxDQTdZQSxBQTZZQyxDQTdZMEMsbUJBQVMsR0E2WW5EIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJ1bmRsZU1vZHVsZSBmcm9tIFwiLi9CdW5kbGVNb2R1bGVcIjtcbmltcG9ydCBTaW5nbGVJbnMgZnJvbSBcIi4vU2luZ2xlSW5zXCI7XG5pbXBvcnQgQnVuZGxlSG90VUlIZWxwZXIgZnJvbSBcIi4vQnVuZGxlSG90VUlIZWxwZXJcIjtcbmltcG9ydCBCdW5kbGVVdGlsLCB7IENvZGVUeXBlIH0gZnJvbSBcIi4vQnVuZGxlVXRpbFwiO1xuaW1wb3J0IEJ1bmRsZVVucGFja0hlbHBlciBmcm9tIFwiLi9CdW5kbGVVbnBhY2tIZWxwZXJcIjtcbmltcG9ydCB7IE1vZHVsZUNvbnN0LCBHbG9iYWxDb25zdCB9IGZyb20gXCIuL0NvbnN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1bmRsZU1hbmFnZXIgZXh0ZW5kcyBTaW5nbGVJbnN7XG4gICAgX2J1bmRsZVV0aWw6IEJ1bmRsZVV0aWw7XG4gICAgX3VucGFja2FnZTogQnVuZGxlVW5wYWNrSGVscGVyO1xuICAgIF9idW5kbGVIb3RVSUhlbHBlcjogQnVuZGxlSG90VUlIZWxwZXI7XG4gICAgX25hdGl2ZVJvb3RQYXRoOiBzdHJpbmc7XG4gICAgX3VzZUhvdFVwZGF0ZTogYW55O1xuICAgIF9sYXN0UmVxX1ZlcnNpb25JbmZvVGltZTogbnVtYmVyO1xuICAgIF9kZXRlY3ROZXdWZXJzaW9uSW50ZXJ2YWw6IG51bWJlcjtcbiAgICBtb2R1bGVzOmFueSA9IHt9O1xuICAgIF9sb2NhbF9kYXRhX2tleTogc3RyaW5nO1xuICAgIF9sb2NhbF9WZXJzaW9uOiBhbnk7XG4gICAgX3JvbW90ZVZlcnNpb246IHsgY2xpZW50TWluOiBzdHJpbmc7IG1vZHVsZXM6IHt9OyB9O1xuICAgIF9yZXFMb29wSGFuZGxlcjogYW55O1xuICAgIF9odHRwUmVxSGFuZGxlcjogYW55O1xuICAgIF90aW1lT3V0SWRzOm51bWJlcltdID0gW107XG5cbiAgICBpbml0Q29tKGFyZ3Mpe1xuICAgICAgICB0aGlzLl9idW5kbGVVdGlsICAgICA9IEJ1bmRsZVV0aWwuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgdGhpcy5fdW5wYWNrYWdlICAgICA9IEJ1bmRsZVVucGFja0hlbHBlci5nZXRJbnN0YW5jZSgpO1xuICAgICAgICB0aGlzLl9idW5kbGVIb3RVSUhlbHBlciAgID0gQnVuZGxlSG90VUlIZWxwZXIuZ2V0SW5zdGFuY2UoKTtcblxuICAgICAgICAvLyBqc2IuZmlsZVV0aWxzLmdldERlZmF1bHRSZXNvdXJjZVJvb3RQYXRoKClcbiAgICAgICAgdGhpcy5fbmF0aXZlUm9vdFBhdGggPSBhcmdzLmFzc2V0UGF0aDtcbiAgICAgICAgQnVuZGxlVXRpbC5MT0coQ29kZVR5cGUuQnVuZGxlTWFuYWdlciwgXCJfbmF0aXZlUm9vdFBhdGg6XCIsIHRoaXMuX25hdGl2ZVJvb3RQYXRoIClcblxuICAgICAgICB0aGlzLl9sYXN0UmVxX1ZlcnNpb25JbmZvVGltZSA9IDAgLy8obmV3IERhdGUoKSkuZ2V0VGltZSgpICAvLyDmnIDlkI7kuIDmrKHmo4DmtYvniYjmnKzml7bpl7RcbiAgICAgICAgdGhpcy5fZGV0ZWN0TmV3VmVyc2lvbkludGVydmFsID0gMzAgIC8vIOiHquWKqOajgOa1i+eJiOacrOmXtOmalFxuXG4gICAgICAgIHRoaXMubW9kdWxlcyA9IHt9XG5cbiAgICAgICAgdGhpcy5fbG9jYWxfZGF0YV9rZXkgPSBNb2R1bGVDb25zdC5sb2NhbFZlcnNpb25Db25maWdLZXkgLy9cIl9sb2NhbF9nYW1lVmVyc2lvbkRhdGExXCJcbiAgICAgICAgbGV0IHZlcnNpb25EYXRhID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuX2xvY2FsX2RhdGFfa2V5KVxuICAgICAgICBpZighdmVyc2lvbkRhdGEpeyBcbiAgICAgICAgICAgIHZlcnNpb25EYXRhID0gdGhpcy5jcmVhdGVEZWZhdWx0VmVyc2lvbkRhdGEoKSBcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgdmVyc2lvbkRhdGEgPSBKU09OLnBhcnNlKHZlcnNpb25EYXRhKVxuICAgICAgICB9IFxuICAgICAgICB0aGlzLl9sb2NhbF9WZXJzaW9uID0gdmVyc2lvbkRhdGFcblxuICAgICAgICB0aGlzLl9yb21vdGVWZXJzaW9uID0gdGhpcy5jcmVhdGVEZWZhdWx0VmVyc2lvbkRhdGEoKVxuXG4gICAgICAgIHRoaXMuX3VzZUhvdFVwZGF0ZSA9IGFyZ3NcbiAgICAgICAgdGhpcy5fdW5wYWNrYWdlLmluaXRDb20oYXJncylcbiAgICB9XG5cbiAgICBleGVjVW5wYWNrYWdlKG9uQ29tcGxhdGUpe1xuICAgICAgICB0aGlzLl91bnBhY2thZ2UuZXhlY1VucGFja2FnZShvbkNvbXBsYXRlKVxuICAgIH1cblxuICAgIGdldE5hdGl2ZVBhdGgoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hdGl2ZVJvb3RQYXRoXG4gICAgfVxuXG4gICAgcmVxTG9vcFZlcnNpb25JbmZvKCl7XG4gICAgICAgIGlmKHRoaXMuX3VzZUhvdFVwZGF0ZSl7XG4gICAgICAgICAgICBpZih0aGlzLl9yZXFMb29wSGFuZGxlcil7IHJldHVybiB9XG4gICAgICAgICAgICB0aGlzLl9yZXFMb29wSGFuZGxlciA9ICgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5yZXFWZXJzaW9uSW5mbygpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmludGVydmFsU2NoZWR1bGUodGhpcy5fcmVxTG9vcEhhbmRsZXIsIHRoaXMuX2RldGVjdE5ld1ZlcnNpb25JbnRlcnZhbClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIOabtOaWsEFC54mI5pys5Y+3ICwg5paw5YyF5a6J6KOF6Kej5Y6L6LWE5rqQ5ZCO6KaG55uW54mI5pys5Y+3XG4gICAgc2V0TG9jYWxBYlZlcnNpb24odmVyT2JqKXtcblxuICAgICAgICBsZXQgbG9jYWxNYXAgPSB0aGlzLl9sb2NhbF9WZXJzaW9uXG4gICAgICAgIGZvcihsZXQgYWJOYW1lIGluIHZlck9iail7XG4gICAgICAgICAgICBsZXQgdmVyU3RyID0gdmVyT2JqW2FiTmFtZV1cblxuICAgICAgICAgICAgaWYoIWxvY2FsTWFwLm1vZHVsZXNbYWJOYW1lXSl7ICAgLy8g6L+Q6JCl5Lit5paw5aKe5qih5Z2XXG4gICAgICAgICAgICAgICAgbG9jYWxNYXAubW9kdWxlc1thYk5hbWVdID0ge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvY2FsTWFwLm1vZHVsZXNbYWJOYW1lXS5yZXNWZXJzaW9uID0gdmVyU3RyIFxuICAgICAgICB9IFxuXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLl9sb2NhbF9kYXRhX2tleSwgSlNPTi5zdHJpbmdpZnkodGhpcy5fbG9jYWxfVmVyc2lvbikpXG4gICAgfVxuXG4gICAgZ2V0X0xvY2FsVmVyc2lvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxfVmVyc2lvblxuICAgIH1cblxuICAgIGdldF9Sb21vdGVWZXJzaW9uKCl7XG4gICAgICAgIHJldHVybiB0aGlzLl9yb21vdGVWZXJzaW9uXG4gICAgfVxuXG4gICAgY3JlYXRlRGVmYXVsdFZlcnNpb25EYXRhKCl7XG4gICAgICAgIGxldCByZXQgPSB7XG4gICAgICAgICAgICBjbGllbnRNaW4gOiBcIjEuMC4wXCIgLCBcbiAgICAgICAgICAgIG1vZHVsZXMgOiB7fVxuICAgICAgICB9ICAgXG4gICAgICAgIHJldHVybiByZXQgXG4gICAgfVxuICAgIFxuICAgIC8vIOabtOaWsOaJgOacieaooeWdl1xuICAgIGhvdFVwZGF0ZUFsbE1vZHVsZShjYWxsYmFjaywgaXNTaG93SG90RGV0ZWN0QWxlcnQpe1xuICAgICAgICBpZighdGhpcy5fdXNlSG90VXBkYXRlKXtcbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDmmL7npLrmraPlnKjmo4DmtYvmm7TmlrDmj5DnpLpcbiAgICAgICAgaWYoaXNTaG93SG90RGV0ZWN0QWxlcnQpe1xuICAgICAgICAgICAgdGhpcy5fYnVuZGxlSG90VUlIZWxwZXIuY2hlY2tOZXdWZXJzaW9uU2hvdygpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5ob3RVcGRhdGVNdWx0aU1vZHVsZShPYmplY3Qua2V5cyh0aGlzLl9yb21vdGVWZXJzaW9uLm1vZHVsZXMpLCAoKT0+eyBcbiAgICAgICAgICAgIHRoaXMuX2J1bmRsZUhvdFVJSGVscGVyLmNoZWNrTmV3VmVyc2lvbkhpZGUoKVxuICAgICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgLy8g572u6aG25pu05paw5qih5Z2XXG4gICAgcHVibGljIGhvdFVwZGF0ZU11bHRpTW9kdWxlKG1vZHVsZU5hbWVBcnIsIGNhbGxiYWNrKXtcbiAgICAgICAgaWYodGhpcy5pc05lZWRSZXFfdmVyc2lvbkluZm8oKSl7XG4gICAgICAgICAgICB0aGlzLnJlcVZlcnNpb25JbmZvKCgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5fZG9Ib3RVcGRhdGVNdWx0aShtb2R1bGVOYW1lQXJyLCBjYWxsYmFjaylcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2RvSG90VXBkYXRlTXVsdGkobW9kdWxlTmFtZUFyciwgY2FsbGJhY2spXG4gICAgICAgIH0gXG4gICAgfVxuXG4gICAgX2RvSG90VXBkYXRlTXVsdGkobW9kdWxlTmFtZUFyciwgY2FsbGJhY2spe1xuICAgICAgICBpZighdGhpcy5fdXNlSG90VXBkYXRlKXtcbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDlpKfniYjmnKzlpKrml6dcbiAgICAgICAgaWYoLTEgPT0gdGhpcy5fYnVuZGxlVXRpbC5jb21WZXJzaW9uKEdsb2JhbENvbnN0LkNsaWVudF9WZXJzaW9uLCB0aGlzLl9yb21vdGVWZXJzaW9uLmNsaWVudE1pbiApKXtcbiAgICAgICAgICAgIHRoaXMuX2J1bmRsZUhvdFVJSGVscGVyLnNob3dBbGVydENsaWVudFRvb09sZCgpXG4gICAgICAgICAgICByZXR1cm4gXG4gICAgICAgIH1cbiAgICAgICAgQnVuZGxlVXRpbC5MT0coQ29kZVR5cGUuQnVuZGxlTWFuYWdlciwgXCJtb2R1bGVOYW1lX29yaTpcIiwgSlNPTi5zdHJpbmdpZnkobW9kdWxlTmFtZUFycikgKVxuICAgICAgICBtb2R1bGVOYW1lQXJyID0gdGhpcy5nZXREZXBlbmRNb2R1bGUobW9kdWxlTmFtZUFycilcbiAgICAgICAgQnVuZGxlVXRpbC5MT0coQ29kZVR5cGUuQnVuZGxlTWFuYWdlciwgXCJtb2R1bGVOYW1lX2RlcDpcIiwgSlNPTi5zdHJpbmdpZnkobW9kdWxlTmFtZUFycikgKVxuXG4gICAgICAgIC8vIGlzU2hvd0hvdFVJIFxuICAgICAgICBsZXQgbmVlZF9VcGRhdGUgID0gZmFsc2UgXG4gICAgICAgIGxldCBuZWVkX1Jlc3RhcnQgPSBmYWxzZSBcblxuICAgICAgICAvLyDmiYDmnIltb2R1bGXmm7TmlrDlrozmiJBcbiAgICAgICAgbGV0IG9uQWxsTW9kdWxlSG90RmluaXNoID0gKCk9PntcbiAgICAgICAgICAgIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZU1hbmFnZXIsIFwiaG90X3VwZGF0ZV8tQWxsSG90X0ZpbmlzaFwiKVxuICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuX2xvY2FsX2RhdGFfa2V5LCBKU09OLnN0cmluZ2lmeSh0aGlzLl9sb2NhbF9WZXJzaW9uKSlcbiAgICAgICAgICAgIGlmKG5lZWRfUmVzdGFydCl7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5zY2hlZHVsZU9uY2UoKCk9PnsgXG4gICAgICAgICAgICAgICAgLy8gICAgIC8vIGNjLnN5cy5yZXN0YXJ0Vk0oKSBcbiAgICAgICAgICAgICAgICAvLyAgICAgY2MuZ2FtZS5yZXN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgLy8gfSwgMC4xKVxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBcbiAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5yZXN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8g5LiL6L29IGFzc2V0cyBidW5kbGUg6LWE5rqQXG4gICAgICAgIGxldCBuZWVkVXBkYXRlTmFtZXMgPSBbXVxuICAgICAgICBsZXQgcHJlbG9hZERpciA9ICgpPT57XG4gICAgICAgICAgICB0aGlzLl9idW5kbGVVdGlsLnNlcXVlbmNlTWlzKG5lZWRVcGRhdGVOYW1lcywgKCk9PntcbiAgICAgICAgICAgICAgICBCdW5kbGVVdGlsLkxPRyhDb2RlVHlwZS5CdW5kbGVNYW5hZ2VyLCBcImhvdF91cGRhdGVfLWFsbFByZWxvYWRGaW5pc2hcIilcbiAgICAgICAgICAgICAgICAvLyDmiYDmnInku7vliqHlrozmiJBcbiAgICAgICAgICAgICAgICB0aGlzLl9idW5kbGVIb3RVSUhlbHBlci5oaWRlVXBkYXRpbmcob25BbGxNb2R1bGVIb3RGaW5pc2gpXG5cbiAgICAgICAgICAgIH0sIChjdXJNaXMsIGlkeCwgb25FeGVjKT0+eyBcbiAgICAgICAgICAgICAgICAvLyDmr4/kuKrpooTliqDovb3ku7vliqFcbiAgICAgICAgICAgICAgICBsZXQgY3VyTWlzSWR4ID0gaWR4KzFcbiAgICAgICAgICAgICAgICBsZXQgdG90YWxNaXMgPSBuZWVkVXBkYXRlTmFtZXMubGVuZ3RoXG4gICAgICAgICAgICAgICAgbGV0IG1vZHVsZU9iaiA9IHRoaXMubW9kdWxlc1tuZWVkVXBkYXRlTmFtZXNbaWR4XV1cbiAgICAgICAgICAgICAgICBtb2R1bGVPYmoucHJlbG9hZE1vZHVsZSgoZmluaXNoLCB0b3RhbCwgaXRlbSk9PntcblxuICAgICAgICAgICAgICAgICAgICAvLyBCdW5kbGVVdGlsLkxPRyhDb2RlVHlwZS5CdW5kbGVNYW5hZ2VyLCBcImhvdF91cGRhdGVfLW9uUHJvZ3Jlc3NfaW5mb186XCIsIGN1ck1pc0lkeCwgZmluaXNoLCB0b3RhbCwgaXRlbS51cmwgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idW5kbGVIb3RVSUhlbHBlci5vblByb2dyZXNzKCBjdXJNaXNJZHgsIHRvdGFsTWlzLCBmaW5pc2gsIHRvdGFsKVxuICAgICAgICAgICAgICAgIH0sIChpdGVtcyk9PntcblxuICAgICAgICAgICAgICAgICAgICBCdW5kbGVVdGlsLkxPRyhDb2RlVHlwZS5CdW5kbGVNYW5hZ2VyLCBcImhvdF91cGRhdGVfLXByZWxvYWRPS186XCIsIG5lZWRVcGRhdGVOYW1lc1tpZHhdIClcbiAgICAgICAgICAgICAgICAgICAgb25FeGVjKClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSDpobrluo/kuIvovb3phY3nva4gXG4gICAgICAgIHRoaXMuX2J1bmRsZVV0aWwuc2VxdWVuY2VNaXMobW9kdWxlTmFtZUFyciwgKCk9PntcbiAgICAgICAgICAgIC8vIOaJgOaciemFjee9ruS4i+i9veWujOaIkFxuICAgICAgICAgICAgaWYobmVlZF9VcGRhdGUpe1xuICAgICAgICAgICAgICAgIHRoaXMuX2J1bmRsZUhvdFVJSGVscGVyLnNob3dVcGRhdGluZygxLCBuZWVkVXBkYXRlTmFtZXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHRoaXMuX2J1bmRsZUhvdFVJSGVscGVyLnNob3dIb3RBbGVydChuZWVkX1Jlc3RhcnQsICgpPT57XG4gICAgICAgICAgICAgICAgICAgIHByZWxvYWREaXIoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgb25BbGxNb2R1bGVIb3RGaW5pc2goKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0sIChjdXJNaXMsIGlkeCwgb25FeGVjKT0+eyBcbiAgICAgICAgICAgIC8vIOavj+S4qumihOWKoOi9veS7u+WKoVxuICAgICAgICAgICAgbGV0IG1vZHVsZU5hbWUgPSBtb2R1bGVOYW1lQXJyW2lkeF1cbiAgICAgICAgICAgIGxldCByZXRUZW1wID0ge31cbiAgICAgICAgICAgIHJldFRlbXAgPSB0aGlzLl9ob3RVcGRhdGVNb2R1bGUobW9kdWxlTmFtZSwgKGhvdF9yZXQpPT57XG4gICAgICAgICAgICAgICAgbGV0IHtoYXZlTmV3VmVyLCBuZWVkUmVzdGFydH0gPSBob3RfcmV0XG4gICAgICAgICAgICAgICAgaWYoaGF2ZU5ld1ZlcikgeyBcbiAgICAgICAgICAgICAgICAgICAgbmVlZF9VcGRhdGUgPSB0cnVlIFxuICAgICAgICAgICAgICAgICAgICBuZWVkVXBkYXRlTmFtZXMucHVzaChtb2R1bGVOYW1lKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihuZWVkUmVzdGFydCkgeyBuZWVkX1Jlc3RhcnQgPSB0cnVlIH1cbiAgICAgICAgICAgICAgICBvbkV4ZWMoKVxuICAgICAgICAgICAgfSkgXG4gICAgICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gXG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgIH1cblxuICAgIC8vIOiOt+WPluS+nei1luaooeWdlywg5bm25o6S5bqPXG4gICAgZ2V0RGVwZW5kTW9kdWxlKG5hbWVzLCBoPyl7XG4gICAgICAgIGggPSBoIHx8IDFcbiAgICAgICAgbGV0IHJtcyA9IHRoaXMuX3JvbW90ZVZlcnNpb24ubW9kdWxlcyBcbiAgICAgICAgbGV0IHJldDphbnkgPSB7fVxuICAgICAgICBmb3IobGV0IGlkeCBpbiBuYW1lcyl7XG4gICAgICAgICAgICBsZXQgbl8xID0gbmFtZXNbaWR4XVxuICAgICAgICAgICAgcmV0W25fMV0gPSB7IG5hbWU6bl8xLCBwcmlvcml0eTpybXNbbl8xXS5wcmlvcml0eX1cblxuICAgICAgICAgICAgbGV0IGRlcGVuZHMgPSB0aGlzLmdldERlcGVuZE1vZHVsZShybXNbbl8xXS5kZXBlbmQgfHwgW10sIGgrMSlcbiAgICAgICAgICAgIGZvcihsZXQgaiBpbiBkZXBlbmRzKXtcbiAgICAgICAgICAgICAgICBsZXQgbl8yID0gZGVwZW5kc1tqXVxuICAgICAgICAgICAgICAgIHJldFtuXzJdID0geyBuYW1lOm5fMiwgcHJpb3JpdHk6cm1zW25fMl0ucHJpb3JpdHl9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy/mjpLluo8sIOS8mOWFiOe6p+mrmOeahOWFiOabtOaWsCBcbiAgICAgICAgaWYoaD09MSl7XG4gICAgICAgICAgICBsZXQgbWluZm9zIDogYW55ID0gT2JqZWN0LnZhbHVlcyhyZXQpXG4gICAgICAgICAgICBtaW5mb3Muc29ydChmdW5jdGlvbihhIDogYW55LGIgOiBhbnkpeyAgXG4gICAgICAgICAgICAgICAgaWYoYS5wcmlvcml0eSA+IGIucHJpb3JpdHkpeyByZXR1cm4gLTF9XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0ID0ge31cbiAgICAgICAgICAgIGZvcihsZXQgaWR4IGluICBtaW5mb3Mpe1xuICAgICAgICAgICAgICAgIHJldFttaW5mb3NbaWR4XS5uYW1lXSA9IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhyZXQpXG4gICAgfVxuXG4gICAgLy8g5pu05paw5Yiw5pyA5paw54mI5pysIFxuICAgIF9ob3RVcGRhdGVNb2R1bGUobW9kdWxlTmFtZSwgY2FsbGJhY2spe1xuICAgICAgICBpZighdGhpcy5fdXNlSG90VXBkYXRlKXtcbiAgICAgICAgICAgIGxldCByZXQgPSB7IGhhdmVOZXdWZXI6ZmFsc2UsIG5lZWRSZXN0YXJ0OmZhbHNlIH07XG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhyZXQpO1xuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsb2NhbF9WZXIgPSB0aGlzLl9sb2NhbF9WZXJzaW9uLm1vZHVsZXNbbW9kdWxlTmFtZV0ucmVzVmVyc2lvblxuICAgICAgICBsZXQgcm9tb3RlVmVyID0gdGhpcy5fcm9tb3RlVmVyc2lvbi5tb2R1bGVzW21vZHVsZU5hbWVdLnJlc1ZlcnNpb25cbiAgICAgICAgbGV0IG1vZHVsZU9iaiA9IHRoaXMubW9kdWxlc1ttb2R1bGVOYW1lXVxuXG4gICAgICAgIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZU1hbmFnZXIsIFwidmVyc2lvbl9pbmZvX2RhdGFfLWxvY2FsOlwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLl9sb2NhbF9WZXJzaW9uKSApXG4gICAgICAgIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZU1hbmFnZXIsIFwidmVyc2lvbl9pbmZvX2RhdGFfLXJlbW90ZTpcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5fcm9tb3RlVmVyc2lvbikgKVxuXG4gICAgICAgIGxldCByZXQgPSB7IGhhdmVOZXdWZXI6IChsb2NhbF9WZXIgIT0gcm9tb3RlVmVyKSwgbmVlZFJlc3RhcnQ6ZmFsc2UgfVxuXG4gICAgICAgIGxldCBsb2FkVmVyRnVuYyA9IChtT2JqLCB2ZXIsIGNiKT0+e1xuICAgICAgICAgICAgbU9iai5sb2FkQUIoKCk9PntcbiAgICAgICAgICAgICAgICBpZihsb2NhbF9WZXIgIT0gcm9tb3RlVmVyKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9jYWxfVmVyc2lvbi5tb2R1bGVzW21vZHVsZU5hbWVdLnJlc1ZlcnNpb24gPSByb21vdGVWZXJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9jYWxfVmVyc2lvbi5tb2R1bGVzW21vZHVsZU5hbWVdLnNob3dWZXIgPSB0aGlzLl9yb21vdGVWZXJzaW9uLm1vZHVsZXNbbW9kdWxlTmFtZV0uc2hvd1ZlclxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2IgJiYgY2IoKTtcbiAgICAgICAgICAgIH0sIHZlcilcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFtb2R1bGVPYmope1xuICAgICAgICAgICAgLy8g5pyq5Yqg6L296L+HLCDmm7TmlrDlkI7kuI3pnIDopoHph43lkK9cbiAgICAgICAgICAgIG1vZHVsZU9iaiA9IG5ldyBCdW5kbGVNb2R1bGUoKTtcbiAgICAgICAgICAgIGxvYWRWZXJGdW5jKCBtb2R1bGVPYmouaW5pdChtb2R1bGVOYW1lLCBmYWxzZSksIHJvbW90ZVZlciwgKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLm1vZHVsZXNbbW9kdWxlTmFtZV0gPSBtb2R1bGVPYmpcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhyZXQpO1xuICAgICAgICAgICAgfSkgXG5cbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgLy8g5bey5Yqg6L29LCDoi6XmnInmm7TmlrDliJnmm7TmlrDlkI7ph43lkK9cbiAgICAgICAgICAgIGlmKGxvY2FsX1ZlciA9PSByb21vdGVWZXIpe1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHJldCk7XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0Lm5lZWRSZXN0YXJ0ID0gdHJ1ZSBcbiAgICAgICAgICAgICAgICBsb2FkVmVyRnVuYyhtb2R1bGVPYmosIHJvbW90ZVZlciwgKCk9PntcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2socmV0KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXRcblxuICAgIH1cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBnZXRCdW5kbGUobW9kdWxlTmFtZSl7XG4gICAgICAgIC8vIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZU1hbmFnZXIsIFwiTW9kdWxlTWFnX2dldGJ1bmRsZV9fOlwiLCBtb2R1bGVOYW1lKVxuICAgICAgICByZXR1cm4gdGhpcy5tb2R1bGVzW21vZHVsZU5hbWVdLl9hYk9ialxuICAgIH1cblxuICAgIGdldE1vZHVsZShtb2R1bGVOYW1lKXtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kdWxlc1ttb2R1bGVOYW1lXVxuICAgIH1cblxuICAgIGFkZE1vZHVsZShtb2R1bGVOYW1lLCBjYil7XG4gICAgICAgIGxldCBtb2R1bGUgPSB0aGlzLm1vZHVsZXNbbW9kdWxlTmFtZV1cbiAgICAgICAgQnVuZGxlVXRpbC5MT0coQ29kZVR5cGUuQnVuZGxlTWFuYWdlciwgXCJtb2R1bGVfbWFnLWFkZE1PZHVsZTpcIiwgbW9kdWxlTmFtZSwgbW9kdWxlIClcbiAgICAgICAgaWYobW9kdWxlKXsgXG4gICAgICAgICAgICBjYihtb2R1bGUpXG4gICAgICAgICAgICByZXR1cm4gbW9kdWxlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVNb2R1bGUobW9kdWxlTmFtZSlcblxuICAgICAgICBCdW5kbGVVdGlsLkxPRyhDb2RlVHlwZS5CdW5kbGVNYW5hZ2VyLCBcImxvYWRfQUJfX19fOlwiLCBtb2R1bGVOYW1lKVxuXG4gICAgICAgIGxldCBtb2R1bGVPYmogPSBuZXcgQnVuZGxlTW9kdWxlKCk7XG4gICAgICAgIG1vZHVsZU9iai5pbml0KG1vZHVsZU5hbWUsIHRoaXMuX3VzZUhvdFVwZGF0ZSkubG9hZEFCKCgpPT57XG4gICAgICAgICAgICB0aGlzLm1vZHVsZXNbbW9kdWxlTmFtZV0gPSBtb2R1bGVPYmpcbiAgICAgICAgICAgIGNiICYmIGNiKG1vZHVsZU9iailcbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIHJlbW92ZU1vZHVsZShtb2R1bGVOYW1lKXtcbiAgICAgICAgbGV0IG1vZHVsZU9iaiA9IHRoaXMubW9kdWxlc1ttb2R1bGVOYW1lXVxuICAgICAgICBpZighbW9kdWxlT2JqKXsgcmV0dXJuIH1cbiAgICAgICAgbW9kdWxlT2JqLnJlbGVhc2VBQigpXG4gICAgICAgIGRlbGV0ZSB0aGlzLm1vZHVsZXNbbW9kdWxlTmFtZV07XG4gICAgfVxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPj4g5p+l6K+i5paw54mI5pysXG4gICAgaXNOZWVkUmVxX3ZlcnNpb25JbmZvKCl7XG4gICAgICAgIGlmKE1vZHVsZUNvbnN0LnJlcVZlcnNpb25JbW1lZGlhdGVseSl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZSBcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjdXJUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKSAgXG4gICAgICAgIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZU1hbmFnZXIsIFwiaXNfbmVlZF9yZXFfdmVyXzpcIiwgY3VyVGltZSAsIHRoaXMuX2xhc3RSZXFfVmVyc2lvbkluZm9UaW1lKVxuICAgICAgICBpZihjdXJUaW1lIC0gdGhpcy5fbGFzdFJlcV9WZXJzaW9uSW5mb1RpbWUgPiB0aGlzLl9kZXRlY3ROZXdWZXJzaW9uSW50ZXJ2YWwqMTAwMCl7IFxuICAgICAgICAgICAgcmV0dXJuIHRydWUgXG4gICAgICAgIH0gXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHJlcVZlcnNpb25JbmZvKGNhbGxiYWNrPzogRnVuY3Rpb24pe1xuICAgICAgICBpZighdGhpcy5fdXNlSG90VXBkYXRlKXtcbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5faHR0cFJlcUhhbmRsZXIpe1xuICAgICAgICAgICAgdGhpcy5faHR0cFJlcUhhbmRsZXIuYWJvcnQoKVxuICAgICAgICB9XG4gICAgICAgIGxldCB2ZXJVcmwgPSBNb2R1bGVDb25zdC5ob3RVcmwgKyBcInZlcmNvbmZpZy5qc29uXCIgKyBcIj9yZW5ldz1cIiArIHRoaXMuX2J1bmRsZVV0aWwuY3JlYXRlVVVJRCgpIFxuICAgICAgICBCdW5kbGVVdGlsLkxPRyhDb2RlVHlwZS5CdW5kbGVNYW5hZ2VyLCBcInJlcV92ZXJzaW9uX3VybF86XCIsIHZlclVybClcblxuICAgICAgICB0aGlzLl9odHRwUmVxSGFuZGxlciA9IHRoaXMuX2J1bmRsZVV0aWwubWFrZVhNTEh0dHAoe3VybDogdmVyVXJsLCBjYWxsYmFjazooX2FyZ3MpPT57XG5cbiAgICAgICAgICAgIGxldCBodHRwRGF0YSA9IF9hcmdzLnJldERhdGFcbiAgICAgICAgICAgIGlmKCFodHRwRGF0YSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2h0dHBSZXFIYW5kbGVyID0gbnVsbFxuICAgICAgICAgICAgdGhpcy5fcm9tb3RlVmVyc2lvbiA9IGh0dHBEYXRhXG5cbiAgICAgICAgICAgIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZU1hbmFnZXIsIFwib25SZXFWZXJzaW9uX0luZm9fOlwiLCBKU09OLnN0cmluZ2lmeShodHRwRGF0YSkgKVxuICAgICAgICAgICAgbGV0IGxvY2FsTWFwID0gdGhpcy5fbG9jYWxfVmVyc2lvblxuICAgICAgICAgICAgbGV0IHJlbW90ZU1hcCA9IGh0dHBEYXRhXG4gICAgICAgICAgICBsZXQgbmVlZFNhdmUgPSBmYWxzZSBcblxuICAgICAgICAgICAgZm9yKGxldCBtb2R1bGVOYW1lIGluIHJlbW90ZU1hcC5tb2R1bGVzKXsgXG5cbiAgICAgICAgICAgICAgICBpZighbG9jYWxNYXAubW9kdWxlc1ttb2R1bGVOYW1lXSl7ICAgLy8g6L+Q6JCl5Lit5paw5aKe5qih5Z2XXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsTWFwLm1vZHVsZXNbbW9kdWxlTmFtZV0gPSB7fVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZighbG9jYWxNYXAubW9kdWxlc1ttb2R1bGVOYW1lXS5zaG93VmVyKXtcbiAgICAgICAgICAgICAgICAgICAgbmVlZFNhdmUgPSB0cnVlIFxuICAgICAgICAgICAgICAgICAgICBsb2NhbE1hcC5tb2R1bGVzW21vZHVsZU5hbWVdLnNob3dWZXIgPSAocmVtb3RlTWFwLm1vZHVsZXNbbW9kdWxlTmFtZV0uc2hvd1ZlcilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKG5lZWRTYXZlKXtcbiAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5fbG9jYWxfZGF0YV9rZXksIEpTT04uc3RyaW5naWZ5KHRoaXMuX2xvY2FsX1ZlcnNpb24pKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9sYXN0UmVxX1ZlcnNpb25JbmZvVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKClcbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAgICAgIH19KSBcbiAgICAgICAgXG4gICAgfVxuICAgIFxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPDwg5p+l6K+i5paw54mI5pysXG5cbn1cbiJdfQ==
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvYnVuZGxlL0J1bmRsZU1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUFvRDtBQUNwRCxpQ0FBc0M7QUFFdEM7SUFBQTtJQW9KQSxDQUFDO0lBN0lHLDJCQUFJLEdBQUosVUFBSyxNQUFjLEVBQUUsWUFBcUI7UUFDdkMsb0JBQVUsQ0FBQyxHQUFHLENBQUMscUJBQVEsQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUE7UUFFbkQsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUE7UUFDckIsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUE7UUFDakMsT0FBTyxJQUFJLENBQUE7SUFDZixDQUFDO0lBRUQsK0JBQVEsR0FBUjtRQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQTtJQUN0QixDQUFDO0lBRUQsb0NBQWEsR0FBYjtRQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUN2QixDQUFDO0lBRUQsNkJBQU0sR0FBTixVQUFPLEVBQUUsRUFBRSxPQUFRO1FBQW5CLGlCQThCQztRQTdCRyxzQkFBc0I7UUFDdEIsSUFBSSxPQUFPLEdBQVEsRUFBRSxDQUFBO1FBQ3JCLElBQUcsT0FBTyxFQUFDO1lBQ1AsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7U0FDNUI7UUFDRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUE7UUFDbEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQTtRQUV4QixJQUFHLElBQUksQ0FBQyxhQUFhLEVBQUM7WUFDbEIsMENBQTBDO1lBQzFDLEtBQUssR0FBRyxtQkFBVyxDQUFDLE1BQU0sR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQTtTQUN4RDtRQUNELG9CQUFVLENBQUMsR0FBRyxDQUFDLHFCQUFRLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBRyxD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QyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsRUFBVSxJQUFLLE9BQUEsWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFoQixDQUFnQixDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVMLG1CQUFDO0FBQUQsQ0FwSkEsQUFvSkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCdW5kbGVVdGlsLCB7IENvZGVUeXBlIH0gZnJvbSBcIi4vQnVuZGxlVXRpbFwiO1xuaW1wb3J0IHsgTW9kdWxlQ29uc3QgfSBmcm9tIFwiLi9Db25zdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdW5kbGVNb2R1bGUge1xuXG4gICAgX0FCTmFtZTogc3RyaW5nO1xuICAgIF91c2VIb3RVcGRhdGU6IGJvb2xlYW47XG4gICAgX2FiT2JqOiBhbnk7XG4gICAgX3RpbWVPdXRJZHM6IG51bWJlcltdO1xuXG4gICAgaW5pdChBQk5hbWU6IHN0cmluZywgdXNlSG90VXBkYXRlOiBib29sZWFuKXtcbiAgICAgICBCdW5kbGVVdGlsLkxPRyhDb2RlVHlwZS5CdW5kbGVNb2R1bGUsIFwibW9kdWxlX2luaXRcIilcbiAgICAgICAgXG4gICAgICAgIHRoaXMuX0FCTmFtZSA9IEFCTmFtZVxuICAgICAgICB0aGlzLl91c2VIb3RVcGRhdGUgPSB1c2VIb3RVcGRhdGVcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBnZXRBQk9iaigpe1xuICAgICAgICByZXR1cm4gdGhpcy5fYWJPYmogXG4gICAgfVxuICAgIFxuICAgIGdldE1vZHVsZU5hbWUoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX0FCTmFtZVxuICAgIH1cblxuICAgIGxvYWRBQihjYiwgdmVyc2lvbj8pe1xuICAgICAgICAvLyB7dmVyc2lvbjogJ2ZiYzA3J30sXG4gICAgICAgIGxldCBsb2FkQXJnOiBhbnkgPSB7fVxuICAgICAgICBpZih2ZXJzaW9uKXtcbiAgICAgICAgICAgIGxvYWRBcmcudmVyc2lvbiA9IHZlcnNpb25cbiAgICAgICAgfVxuICAgICAgICBsZXQgaXNWYWxpZCA9IHRydWUgXG4gICAgICAgIGxldCBhYlVybCA9IHRoaXMuX0FCTmFtZSBcblxuICAgICAgICBpZih0aGlzLl91c2VIb3RVcGRhdGUpe1xuICAgICAgICAgICAgLy8g5aaC5p6c5biM5pyb5L2/55SoY3JlYXRvcuaehOW7uuaXtuWhq+eahOi1hOa6kOacjeWKoeWZqOWcsOWdgCzlsIbkuIvpnaLov5nooYzku6PnoIHms6jph4rmjonljbPlj68uXG4gICAgICAgICAgICBhYlVybCA9IE1vZHVsZUNvbnN0LmhvdFVybCArIFwicmVtb3RlL1wiICsgdGhpcy5fQUJOYW1lXG4gICAgICAgIH1cbiAgICAgICAgQnVuZGxlVXRpbC5MT0coQ29kZVR5cGUuQnVuZGxlTW9kdWxlLCBcImxvYWRBQl86XCIsIHRoaXMuX0FCTmFtZSwgYWJVcmwgIClcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRCdW5kbGUoYWJVcmwsICBsb2FkQXJnLCAoZXJyLCBidW5kbGUpPT4ge1xuICAgICAgICAgICAgaWYoIWlzVmFsaWQpeyByZXR1cm4gfSA7ICBpc1ZhbGlkID0gZmFsc2UgO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZighZXJyKXtcbiAgICAgICAgICAgICAgICBCdW5kbGVVdGlsLkxPRyhDb2RlVHlwZS5CdW5kbGVNb2R1bGUsIFwibG9hZEFCX09LXzpcIiwgdGhpcy5fQUJOYW1lIClcbiAgICAgICAgICAgICAgICB0aGlzLl9hYk9iaiA9IGJ1bmRsZSBcblxuICAgICAgICAgICAgICAgIGNiKClcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICBCdW5kbGVVdGlsLkxPRyhDb2RlVHlwZS5CdW5kbGVNb2R1bGUsIFwibG9hZF9hYl9FcnJfOlwiLCB0aGlzLl9BQk5hbWUsIEpTT04uc3RyaW5naWZ5KGVycikpIFxuICAgICAgICAgICAgICAgIC8vIOmUmeivr+mHjeivlVxuICAgICAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWxTY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkQUIoY2IsIHZlcnNpb24pXG4gICAgICAgICAgICAgICAgfSwgMylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuXG4gICAgLy8g5LiL6L296LWE5rqQXG4gICAgcHJlbG9hZE1vZHVsZShvblByb2dyZXNzLCBvbkNvbXBsZXRlKXtcbiAgICAgICAgbGV0IGlzX1ZhbGlkID0gdHJ1ZVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIGxldCBhdXRvQXRsYXMgPSBbXVxuICAgICAgICBsZXQgcmVzTWFwID0gdGhpcy5fYWJPYmouX2NvbmZpZy5hc3NldEluZm9zLl9tYXBcbiAgICAgICAgZm9yKGxldCBpZHggaW4gcmVzTWFwKXtcbiAgICAgICAgICAgIGxldCBpdGVtID0gcmVzTWFwW2lkeF1cbiAgICAgICAgICAgIGlmKCFpdGVtLnBhdGggJiYgaXRlbS5uYXRpdmVWZXIpe1xuICAgICAgICAgICAgICAgIGxldCB1cmxsID0gY2MuYXNzZXRNYW5hZ2VyLnV0aWxzLmdldFVybFdpdGhVdWlkKGl0ZW0udXVpZCwge1xuICAgICAgICAgICAgICAgICAgICBfX25hdGl2ZU5hbWVfXzogXCIucG5nXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hdGl2ZUV4dDogY2MucGF0aC5leHRuYW1lKFwiLnBuZ1wiKSxcbiAgICAgICAgICAgICAgICAgICAgaXNOYXRpdmU6IHRydWVcbiAgICAgICAgICAgICAgICB9KTsgXG4gICAgICAgICAgICAgICAgaWYodXJsbCl7XG4gICAgICAgICAgICAgICAgICAgIGF1dG9BdGxhcy5wdXNoKHVybGwpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgQnVuZGxlVXRpbC5MT0coQ29kZVR5cGUuQnVuZGxlTW9kdWxlLCBcImF1dG9hdGxhc191cmxfYXJyXzpcIiwgSlNPTi5zdHJpbmdpZnkoYXV0b0F0bGFzKSlcbiAgICAgICAgbGV0IGV4dE51bSA9IGF1dG9BdGxhcy5sZW5ndGggXG4gICAgICAgIGxldCBmaW5pc2hOdW0gPSAwXG4gICAgICAgIGxldCBpc18yVmFsaWQgPSB0cnVlXG4gICAgICAgIGxldCBwcmVsb2FkQXV0b0F0bGFzID0gKCk9PntcbiAgICAgICAgICAgIGlmKGF1dG9BdGxhcy5sZW5ndGggPT0gMCApeyBcbiAgICAgICAgICAgICAgICBpZighaXNfMlZhbGlkKXsgcmV0dXJuOyB9OyBpc18yVmFsaWQgPSBmYWxzZSA7XG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBSZXF1ZXN0VHlwZS5VUkwgPSAndXJsJyBcbiAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5wcmVsb2FkQW55KGF1dG9BdGxhcywgeyBfX3JlcXVlc3RUeXBlX186ICd1cmwnLCB0eXBlOiBudWxsLCBidW5kbGU6IHRoaXMuX2FiT2JqLm5hbWUgfSwgXG4gICAgICAgICAgICAgICAgKGZpbmlzaCwgdG90YWwsIGl0ZW0pPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKCFpc18yVmFsaWQpeyByZXR1cm47IH07IFxuICAgICAgICAgICAgICAgICAgICBCdW5kbGVVdGlsLkxPRyhDb2RlVHlwZS5CdW5kbGVNb2R1bGUsIFwibG9hZF9hdXRvYXRsYXNfcHJvZ3Jlc3NfOlwiLHRoaXMuX2FiT2JqLm5hbWUsIGZpbmlzaCwgdG90YWwgKVxuICAgICAgICAgICAgICAgICAgICBvblByb2dyZXNzICYmIG9uUHJvZ3Jlc3MoZmluaXNoK2ZpbmlzaE51bSwgdG90YWwrZmluaXNoTnVtLCBpdGVtKTtcbiAgICAgICAgICAgICAgICB9LCAoZXJyb3IsIGl0ZW1zKT0+e1xuICAgICAgICAgICAgICAgICAgICBpZighaXNfMlZhbGlkKXsgcmV0dXJuOyB9OyBpc18yVmFsaWQgPSBmYWxzZSA7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZU1vZHVsZSwgXCJwcmVsb2FkQXV0b0F0bGFzX2Vycm9yOlwiLCBKU09OLnN0cmluZ2lmeShlcnJvcikgKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRlcnZhbFNjaGVkdWxlT25jZSgoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJlbG9hZE1vZHVsZShvblByb2dyZXNzLCBvbkNvbXBsZXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDMpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ICAgXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFxuXG4gICAgICAgIHRoaXMuX2FiT2JqLnByZWxvYWREaXIoXCJyb290XCIsIChmaW5pc2gsIHRvdGFsLCBpdGVtKT0+e1xuICAgICAgICAgICAgaWYoIWlzX1ZhbGlkKXsgcmV0dXJuOyB9O1xuICAgICAgICAgICAgZmluaXNoTnVtID0gdG90YWxcbiAgICAgICAgICAgIG9uUHJvZ3Jlc3MgJiYgb25Qcm9ncmVzcyhmaW5pc2gsIHRvdGFsICsgZXh0TnVtLCBpdGVtKTtcbiAgICAgICAgfSwgKGVycm9yLCBpdGVtcyk9PntcbiAgICAgICAgICAgIGlmKCFpc19WYWxpZCl7IHJldHVybjsgfTsgaXNfVmFsaWQgPSBmYWxzZSA7XG4gICAgICAgICAgICBpZighZXJyb3Ipe1xuICAgICAgICAgICAgICAgIC8vIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShpdGVtcyk7XG4gICAgICAgICAgICAgICAgcHJlbG9hZEF1dG9BdGxhcygpXG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnRlcnZhbFNjaGVkdWxlT25jZSgoKT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZWxvYWRNb2R1bGUob25Qcm9ncmVzcywgb25Db21wbGV0ZSk7XG4gICAgICAgICAgICAgICAgfSwgMylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIHJlbGVhc2VBQigpe1xuICAgICAgICB0aGlzLnVuSW50ZXJ2YWxTY2hlZHVsZSgpO1xuICAgICAgICBpZighdGhpcy5fYWJPYmogKXsgcmV0dXJuIH1cbiAgICAgICAgQnVuZGxlVXRpbC5MT0coQ29kZVR5cGUuQnVuZGxlTW9kdWxlLCBcInJlbGVhc2VfYWJfX1wiKSBcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLnJlbW92ZUJ1bmRsZSh0aGlzLl9hYk9iaik7XG4gICAgICAgIHRoaXMuX2FiT2JqID0gbnVsbFxuICAgIH1cblxuICAgIGludGVydmFsU2NoZWR1bGVPbmNlKGNhbGxiYWNrOiBGdW5jdGlvbiwgZGVsYXk6IG51bWJlcikge1xuICAgICAgIGxldCBpZDogbnVtYmVyID0gc2V0VGltZW91dChjYWxsYmFjaywgZGVsYXkgKiAxMDAwKTsgLy8gQXNzdW1pbmcgZGVsYXkgaXMgaW4gc2Vjb25kc1xuICAgICAgIHRoaXMuX3RpbWVPdXRJZHMucHVzaChpZCk7XG4gICAgfVxuXG4gICAgdW5JbnRlcnZhbFNjaGVkdWxlKCkge1xuICAgICAgICAvLyBBc3N1bWluZyB3ZSBoYXZlIGEgd2F5IHRvIHRyYWNrIGFsbCB0aW1lb3V0c1xuICAgICAgICBjb25zdCB0aW1lb3V0SWRzID0gdGhpcy5fdGltZU91dElkcztcbiAgICAgICAgdGltZW91dElkcy5mb3JFYWNoKChpZDogbnVtYmVyKSA9PiBjbGVhclRpbWVvdXQoaWQpKTtcbiAgICAgICAgdGhpcy5fdGltZU91dElkcyA9IFtdO1xuICAgIH1cblxufVxuXG4iXX0=
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvYnVuZGxlL0J1bmRsZVV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBb0M7QUFFcEMsSUFBWSxRQU1YO0FBTkQsV0FBWSxRQUFRO0lBQ2hCLHlDQUE2QixDQUFBO0lBQzdCLG1EQUF1QyxDQUFBO0lBQ3ZDLHFDQUF5QixDQUFBO0lBQ3pCLDJDQUErQixDQUFBO0lBQy9CLHFEQUF5QyxDQUFBO0FBQzdDLENBQUMsRUFOVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQU1uQjtBQUVEO0lBQXdDLDhCQUFTO0lBQWpEOztJQW1JQSxDQUFDO0lBaklHLCtDQUErQztJQUMvQyxnQ0FBVyxHQUFYLFVBQVksSUFBSTtRQUVQLElBQUEsT0FBTyxHQUFtQixJQUFJLFFBQXZCLEVBQUUsR0FBRyxHQUFjLElBQUksSUFBbEIsRUFBRSxRQUFRLEdBQUksSUFBSSxTQUFSLENBQVE7UUFDbkMsSUFBSSxPQUFPLEdBQVEsRUFBRSxDQUFBO1FBRXJCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQTtRQUNsQixJQUFJLEdBQUcsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQy9CLEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxHQUFHLENBQUMsa0JBQWtCLEdBQUc7WUFDckIsSUFBSSxHQUFHLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEVBQUU7Z0JBQ2hFLElBQUcsQ0FBQyxPQUFPLEVBQUM7b0JBQUUsT0FBTTtpQkFBRTtnQkFBQyxDQUFDO2dCQUFDLE9BQU8sR0FBRyxLQUFLLENBQUE7Z0JBQ3hDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUM3QyxRQUFRLENBQUMsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQTthQUNoQztpQkFDSSxJQUFJLEdBQUcsQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO2dCQUM3QyxJQUFHLENBQUMsT0FBTyxFQUFDO29CQUFFLE9BQU07aUJBQUU7Z0JBQUMsQ0FBQztnQkFBQyxPQUFPLEdBQUcsS0FBSyxDQUFBO2dCQUN4QyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQTthQUV4QjtpQkFBSyxJQUFJLEdBQUcsQ0FBQyxVQUFVLElBQUksQ0FBQyxFQUFFO2dCQUMzQixJQUFHLENBQUMsT0FBTyxFQUFDO29CQUFFLE9BQU07aUJBQUU7Z0JBQUMsQ0FBQztnQkFBQyxPQUFPLEdBQUcsS0FBSyxDQUFBO2dCQUN4QyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQTthQUN4QjtRQUNMLENBQUMsQ0FBQztRQUVGLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzQixHQUFHLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLGdDQUFnQyxDQUFDLENBQUM7UUFDdkUsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1gsR0FBRyxDQUFDLFNBQVMsR0FBRztZQUNaLElBQUcsQ0FBQyxPQUFPLEVBQUM7Z0JBQUUsT0FBTTthQUFFO1lBQUMsQ0FBQztZQUFDLE9BQU8sR0FBRyxLQUFLLENBQUE7WUFDeEMsUUFBUSxDQUFDLEVBQUMsU0FBUyxFQUFDLElBQUksRUFBQyxDQUFDLENBQUE7UUFDOUIsQ0FBQyxDQUFDO1FBQ0YsT0FBTyxDQUFDLEtBQUssR0FBRztZQUNaLE9BQU8sR0FBRyxLQUFLLENBQUE7WUFDZixHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDZixDQUFDLENBQUE7UUFDRCxPQUFPLE9BQU8sQ0FBQTtJQUNsQixDQUFDO0lBRUQsdUNBQXVDO0lBQ3ZDLGdEQUFnRDtJQUNoRCxpQkFBaUI7SUFDakIsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQixnQ0FBVyxHQUFYLFVBQVksUUFBUTtRQUNoQixJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLEdBQUcsR0FBUSxFQUFFLENBQUM7UUFDbEIsRUFBRSxHQUFHLEVBQUUsR0FBQyxDQUFDLENBQUM7UUFDVixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUE7UUFDbEIsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFBO1FBQ2hCLElBQUksUUFBUSxHQUFhLFVBQVMsSUFBSTtZQUNsQyxJQUFHLENBQUMsT0FBTyxFQUFDO2dCQUFFLE9BQU07YUFBRTtZQUN0QixFQUFFLEdBQUcsRUFBRSxHQUFDLENBQUMsQ0FBQztZQUNWLElBQUcsSUFBSSxFQUFDO2dCQUNKLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQTthQUN6QztZQUNELElBQUcsRUFBRSxJQUFFLENBQUMsRUFBQztnQkFDTCxJQUFHLFFBQVEsRUFBQztvQkFDUixRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3JCO2FBQ0o7UUFDTCxDQUFDLENBQUE7UUFDRCxHQUFHLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN4QixHQUFHLENBQUMsTUFBTSxHQUFHO1lBQ1QsRUFBRSxHQUFHLEVBQUUsR0FBQyxDQUFDLENBQUM7WUFDVixPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDLENBQUE7UUFDRCxHQUFHLENBQUMsS0FBSyxHQUFHO1lBQ1IsUUFBUSxFQUFFLENBQUM7UUFDZixDQUFDLENBQUE7UUFDRCxHQUFHLENBQUMsS0FBSyxHQUFHO1lBQ1IsT0FBTyxHQUFHLEtBQUssQ0FBQTtRQUNuQixDQUFDLENBQUE7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRCxvR0FBb0c7SUFDcEcsZ0NBQVcsR0FBWCxVQUFZLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUTtRQUNuQyxFQUFFLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUE7UUFDOUIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ1YsSUFBSSxPQUFPLENBQUU7UUFDYixPQUFPLEdBQUc7WUFDTixJQUFHLEVBQUUsSUFBRSxNQUFNLENBQUMsTUFBTSxFQUFDO2dCQUNqQixTQUFTLEVBQUUsQ0FBQTtnQkFDWCxPQUFNO2FBQ1Q7WUFDRCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDcEIsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFBO1lBQ2QsRUFBRSxHQUFDLEVBQUUsR0FBQyxDQUFDLENBQUE7WUFDUCxRQUFRLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUNqQyxDQUFDLENBQUE7UUFDRCxPQUFPLEVBQUUsQ0FBQTtJQUNiLENBQUM7SUFFRCxrQ0FBa0M7SUFDbEMscUNBQXFDO0lBQ3JDLCtCQUFVLEdBQVYsVUFBVyxRQUFRLEVBQUUsU0FBUztRQUMxQixJQUFJLGNBQWMsR0FBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3pDLElBQUksZUFBZSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDMUMsSUFBSSxPQUFPLEdBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQTtRQUNwQyxJQUFJLFFBQVEsR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFBO1FBQ3JDLElBQUksS0FBSyxHQUFHLE9BQU8sR0FBQyxRQUFRLENBQUEsQ0FBQyxDQUFBLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFBO1FBRS9DLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxLQUFLLEVBQUMsQ0FBQyxFQUFFLEVBQUM7WUFDcEIsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM5QyxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRWhELElBQUcsQ0FBQyxHQUFDLE9BQU8sSUFBSSxDQUFDLElBQUUsUUFBUSxFQUFDO2dCQUFFLE9BQU8sQ0FBQyxDQUFBO2FBQUU7aUJBQ25DLElBQUcsQ0FBQyxJQUFFLE9BQU8sSUFBSSxDQUFDLEdBQUMsUUFBUSxFQUFFO2dCQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUE7YUFBQztpQkFDekMsSUFBRyxPQUFPLEdBQUMsUUFBUSxFQUFDO2dCQUFFLE9BQU8sQ0FBQyxDQUFBO2FBQUM7aUJBQy9CLElBQUcsT0FBTyxHQUFDLFFBQVEsRUFBQztnQkFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO2FBQUM7U0FDeEM7UUFDRCxPQUFPLENBQUMsQ0FBQTtJQUNaLENBQUM7SUFFRCwrQkFBVSxHQUFWO1FBQ0ksSUFBSSxLQUFLLEdBQUcsZ0VBQWdFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZGLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3pDO1FBQ0QsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4QixHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUE7UUFDM0MsT0FBTyxHQUFHLENBQUE7SUFDZCxDQUFDO0lBRWEsY0FBRyxHQUFqQixVQUFtQixHQUFhO1FBQUMsYUFBTTthQUFOLFVBQU0sRUFBTixxQkFBTSxFQUFOLElBQU07WUFBTiw0QkFBTTs7UUFDbkMsRUFBRSxDQUFDLEdBQUcsT0FBTixFQUFFLGtCQUFLLEtBQUcsR0FBRyxDQUFDLFFBQVEsRUFBSSxHQUFJLEdBQUcsR0FBRztJQUN4QyxDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQW5JQSxBQW1JQyxDQW5JdUMsbUJBQVMsR0FtSWhEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNpbmdsZUlucyBmcm9tIFwiLi9TaW5nbGVJbnNcIjtcblxuZXhwb3J0IGVudW0gQ29kZVR5cGUge1xuICAgIEJ1bmRsZU1vZHVsZSA9IFwiQnVuZGxlTW9kdWxlXCIsXG4gICAgQnVuZGxlSG90VUlIZWxwZXIgPSBcIkJ1bmRsZUhvdFVJSGVscGVyXCIsXG4gICAgQnVuZGxlVXRpbCA9IFwiQnVuZGxlVXRpbFwiLFxuICAgIEJ1bmRsZU1hbmFnZXIgPSBcIkJ1bmRsZU1hbmFnZXJcIixcbiAgICBCdW5kbGVVbnBhY2tIZWxwZXIgPSBcIkJ1bmRsZVVucGFja0hlbHBlclwiLFxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdW5kbGVVdGlsIGV4dGVuZHMgU2luZ2xlSW5ze1xuXG4gICAgLy8gbWFrZVhNTEh0dHAoe3VybDogLCBjYWxsYmFjazoocmV0SW5mbyk9Pnt9fSlcbiAgICBtYWtlWE1MSHR0cChhcmdzKXtcblxuICAgICAgICBsZXQge3RpbWVvdXQsIHVybCwgY2FsbGJhY2t9ID0gYXJnc1xuICAgICAgICBsZXQgcmV0SW5mbzogYW55ID0ge31cblxuICAgICAgICBsZXQgaXNWYWxpZCA9IHRydWVcbiAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4aHIudGltZW91dCA9IE1hdGguY2VpbCgodGltZW91dCB8fCA2KSoxMDAwKTtcbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHsgXG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDQwMCkpIHtcbiAgICAgICAgICAgICAgICBpZighaXNWYWxpZCl7IHJldHVybiB9IDsgaXNWYWxpZCA9IGZhbHNlIFxuICAgICAgICAgICAgICAgIHZhciBodHRwRGF0YXMgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpOyBcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh7cmV0RGF0YTpodHRwRGF0YXN9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiB4aHIuc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgICAgICBpZighaXNWYWxpZCl7IHJldHVybiB9IDsgaXNWYWxpZCA9IGZhbHNlICBcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh7ZmFpbDp0cnVlfSlcblxuICAgICAgICAgICAgfWVsc2UgaWYgKHhoci5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgICAgICAgICBpZighaXNWYWxpZCl7IHJldHVybiB9IDsgaXNWYWxpZCA9IGZhbHNlICBcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh7ZmFpbDp0cnVlfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwsIHRydWUpOyBcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLTgnKTsgXG4gICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZighaXNWYWxpZCl7IHJldHVybiB9IDsgaXNWYWxpZCA9IGZhbHNlICBcbiAgICAgICAgICAgIGNhbGxiYWNrKHtpc1RpbWVvdXQ6dHJ1ZX0pXG4gICAgICAgIH07IFxuICAgICAgICByZXRJbmZvLmFib3J0ID0gKCk9PntcbiAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZVxuICAgICAgICAgICAgeGhyLmFib3J0KClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0SW5mb1xuICAgIH1cblxuICAgIC8v5bm26KGM5Lu75YqhIHJldHVybiA6IHthZGRNaXM6ICwgb25GaW5pc2g6fSAgXG4gICAgLy8gbGV0IHBNaXMgPSBBcHBDb21GdW5jLnBhcmFsbGVsTWlzKGNhbGxiYWNrKTsgXG4gICAgLy8gcE1pcy5hZGRNaXMoKTtcbiAgICAvLyBwTWlzLnN0YXJ0KCk7XG4gICAgLy8gcE1pcy5vbkZpbmlzaFxuICAgIHBhcmFsbGVsTWlzKGNhbGxiYWNrKXtcbiAgICAgICAgbGV0IGNvID0gMDtcbiAgICAgICAgbGV0IHJldDogYW55ID0ge307XG4gICAgICAgIGNvID0gY28rMTtcbiAgICAgICAgbGV0IGlzVmFsaWQgPSB0cnVlXG4gICAgICAgIGxldCByZXRBcmdzID0ge31cbiAgICAgICAgbGV0IG9uRmluaXNoIDpGdW5jdGlvbiA9IGZ1bmN0aW9uKGFyZ3Mpe1xuICAgICAgICAgICAgaWYoIWlzVmFsaWQpeyByZXR1cm4gfVxuICAgICAgICAgICAgY28gPSBjby0xO1xuICAgICAgICAgICAgaWYoYXJncyl7XG4gICAgICAgICAgICAgICAgcmV0QXJncyA9IE9iamVjdC5hc3NpZ24ocmV0QXJncywgYXJncylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGNvPD0wKXtcbiAgICAgICAgICAgICAgICBpZihjYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJldEFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXQub25GaW5pc2ggPSBvbkZpbmlzaDtcbiAgICAgICAgcmV0LmFkZE1pcyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjbyA9IGNvKzE7XG4gICAgICAgICAgICByZXR1cm4gb25GaW5pc2g7XG4gICAgICAgIH1cbiAgICAgICAgcmV0LnN0YXJ0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIG9uRmluaXNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0LmNsb3NlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgLy/pobrluo/ku7vliqEgaWR4OjB+TiwgIEFwcENvbUZ1bmMuc2VxdWVuY2VNaXMobWlzQXJyLCBvbkFsbEZvbGRlckRldGVjdEZpbmlzaCwgKGN1ck1pcywgaWR4LCBvbkV4ZWMpPT57IH0pXG4gICAgc2VxdWVuY2VNaXMobWlzQXJyLCBvbkFsbEV4ZWMsIGV4ZWNGdW5jKXtcbiAgICAgICAgY2MubG9nKFwic2VxdWVuY2VNaXNfX2VudGVyXzpcIilcbiAgICAgICAgbGV0IGNvID0gMFxuICAgICAgICBsZXQgZXhlY01pcyA7XG4gICAgICAgIGV4ZWNNaXMgPSAoKT0+e1xuICAgICAgICAgICAgaWYoY28+PW1pc0Fyci5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIG9uQWxsRXhlYygpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG1pcyA9IG1pc0Fycltjb11cbiAgICAgICAgICAgIGxldCBjdXJDbyA9IGNvXG4gICAgICAgICAgICBjbz1jbysxIFxuICAgICAgICAgICAgZXhlY0Z1bmMobWlzLCBjdXJDbywgZXhlY01pcylcbiAgICAgICAgfSBcbiAgICAgICAgZXhlY01pcygpIFxuICAgIH1cblxuICAgIC8vIGNvbVZlcnNpb24obG9jYWxWZXIsIHJvbW90ZVZlcilcbiAgICAvLyDlr7nmr5TniYjmnKzlj7csIC0xOuacrOWcsOeJiOacrOavlOi+g+aXpywgMDrnm7jnrYksIDE65pys5Zyw54mI5pys5q+U6L6D5pawXG4gICAgY29tVmVyc2lvbihsb2NhbFZlciwgcm9tb3RlVmVyKXtcbiAgICAgICAgbGV0IHZlclNwbGl0X2xvY2FsICA9IGxvY2FsVmVyLnNwbGl0KCcuJylcbiAgICAgICAgbGV0IHZlclNwbGl0X3JlbW90ZSA9IHJvbW90ZVZlci5zcGxpdCgnLicpXG4gICAgICAgIGxldCBsb2NhbENvICA9IHZlclNwbGl0X2xvY2FsLmxlbmd0aFxuICAgICAgICBsZXQgcmVtb3RlQ28gPSB2ZXJTcGxpdF9yZW1vdGUubGVuZ3RoXG4gICAgICAgIGxldCBtYXhDbyA9IGxvY2FsQ28+cmVtb3RlQ28/bG9jYWxDbyA6IHJlbW90ZUNvXG4gICAgICAgIFxuICAgICAgICBmb3IobGV0IGk9MDtpPG1heENvO2krKyl7XG4gICAgICAgICAgICBsZXQgbl9sb2NhbCA9IHBhcnNlSW50KHZlclNwbGl0X2xvY2FsW2ldLCAxMCk7IFxuICAgICAgICAgICAgbGV0IG5fcmVtb3RlID0gcGFyc2VJbnQodmVyU3BsaXRfcmVtb3RlW2ldLCAxMCk7IFxuXG4gICAgICAgICAgICBpZihpPGxvY2FsQ28gJiYgaT49cmVtb3RlQ28peyByZXR1cm4gMSB9XG4gICAgICAgICAgICBlbHNlIGlmKGk+PWxvY2FsQ28gJiYgaTxyZW1vdGVDbykgeyByZXR1cm4gLTF9IFxuICAgICAgICAgICAgZWxzZSBpZihuX2xvY2FsPm5fcmVtb3RlKXsgcmV0dXJuIDF9XG4gICAgICAgICAgICBlbHNlIGlmKG5fbG9jYWw8bl9yZW1vdGUpeyByZXR1cm4gLTF9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDBcbiAgICB9XG5cbiAgICBjcmVhdGVVVUlEKCl7XG4gICAgICAgIHZhciBjaGFycyA9ICcwMTIzNDU2Nzg5QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eicuc3BsaXQoJycpOyBcbiAgICAgICAgdmFyIHV1aWQgPSBbXTsgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgdXVpZFtpXSA9IGNoYXJzWzAgfCBNYXRoLnJhbmRvbSgpKjM2XTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdWlkID0gdXVpZC5qb2luKCcnKTtcbiAgICAgICAgdWlkID0gTnVtYmVyKERhdGUubm93KCkpLnRvU3RyaW5nKDM2KSArIHVpZCBcbiAgICAgICAgcmV0dXJuIHVpZFxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgTE9HIChrZXk6IENvZGVUeXBlLC4uLmFyZyl7IFxuICAgICAgICBjYy5sb2coYCR7a2V5LnRvU3RyaW5nKCl9YCwuLi5hcmcpIDsgXG4gICAgfVxufVxuIl19
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
