
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