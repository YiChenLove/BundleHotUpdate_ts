
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