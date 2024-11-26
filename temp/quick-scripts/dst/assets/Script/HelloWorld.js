
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