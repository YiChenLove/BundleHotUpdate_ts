"use strict";
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