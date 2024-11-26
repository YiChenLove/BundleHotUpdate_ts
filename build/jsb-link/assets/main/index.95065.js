window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  BundleHotUIHelper: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "027c4KROQBNNadKO3ofmUTM", "BundleHotUIHelper");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BundleUtil_1 = require("./BundleUtil");
    var SingleIns_1 = require("./SingleIns");
    var BundleHotUIHelper = function(_super) {
      __extends(BundleHotUIHelper, _super);
      function BundleHotUIHelper() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      BundleHotUIHelper.prototype.hideUpdating = function(callback) {
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleHotUIHelper, "hideUpdating");
        callback && callback();
      };
      BundleHotUIHelper.prototype.onProgress = function(curMis, totalMis, finish, total) {
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleHotUIHelper, "onProgress : curMis_" + curMis + ",totalMis_" + totalMis + ",finish_" + finish + ",total_" + total);
      };
      BundleHotUIHelper.prototype.showUpdating = function(curMis, totalMis) {};
      BundleHotUIHelper.prototype.showHotAlert = function(isNeedRestart, callback) {
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleHotUIHelper, "showHotAlert");
        callback && callback();
      };
      BundleHotUIHelper.prototype.showAlertClientTooOld = function() {
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleHotUIHelper, "showAlertClientTooOld");
      };
      BundleHotUIHelper.prototype.onBtn_ClientTooOld = function() {
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleHotUIHelper, "onBtn_ClientTooOld");
        cc.game.end();
      };
      BundleHotUIHelper.prototype.unpackageShow = function() {
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleHotUIHelper, "unpackageShow");
      };
      BundleHotUIHelper.prototype.unpackageUpdateProgress = function(finish, total) {
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleHotUIHelper, "unpackageUpdateProgress_:", finish, total);
      };
      BundleHotUIHelper.prototype.unpackageFinish = function() {
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleHotUIHelper, "unpackageFinish");
      };
      BundleHotUIHelper.prototype.checkNewVersionShow = function() {
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleHotUIHelper, "checkNewVersionShow");
      };
      BundleHotUIHelper.prototype.checkNewVersionHide = function() {
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleHotUIHelper, "checkNewVersionHide");
      };
      return BundleHotUIHelper;
    }(SingleIns_1.default);
    exports.default = BundleHotUIHelper;
    cc._RF.pop();
  }, {
    "./BundleUtil": "BundleUtil",
    "./SingleIns": "SingleIns"
  } ],
  BundleManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f75e8QejphEfbSl1SdLT/5f", "BundleManager");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BundleModule_1 = require("./BundleModule");
    var SingleIns_1 = require("./SingleIns");
    var BundleHotUIHelper_1 = require("./BundleHotUIHelper");
    var BundleUtil_1 = require("./BundleUtil");
    var BundleUnpackHelper_1 = require("./BundleUnpackHelper");
    var Const_1 = require("./Const");
    var BundleManager = function(_super) {
      __extends(BundleManager, _super);
      function BundleManager() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.modules = {};
        _this._timeOutIds = [];
        return _this;
      }
      BundleManager.prototype.initCom = function(args) {
        this._bundleUtil = BundleUtil_1.default.getInstance();
        this._unpackage = BundleUnpackHelper_1.default.getInstance();
        this._bundleHotUIHelper = BundleHotUIHelper_1.default.getInstance();
        this._nativeRootPath = args.assetPath;
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleManager, "_nativeRootPath:", this._nativeRootPath);
        this._lastReq_VersionInfoTime = 0;
        this._detectNewVersionInterval = 30;
        this.modules = {};
        this._local_data_key = Const_1.ModuleConst.localVersionConfigKey;
        var versionData = cc.sys.localStorage.getItem(this._local_data_key);
        versionData = versionData ? JSON.parse(versionData) : this.createDefaultVersionData();
        this._local_Version = versionData;
        this._romoteVersion = this.createDefaultVersionData();
        this._useHotUpdate = args;
        this._unpackage.initCom(args);
      };
      BundleManager.prototype.execUnpackage = function(onComplate) {
        this._unpackage.execUnpackage(onComplate);
      };
      BundleManager.prototype.getNativePath = function() {
        return this._nativeRootPath;
      };
      BundleManager.prototype.reqLoopVersionInfo = function() {
        var _this = this;
        if (this._useHotUpdate) {
          if (this._reqLoopHandler) return;
          this._reqLoopHandler = function() {
            _this.reqVersionInfo();
          };
          this.intervalSchedule(this._reqLoopHandler, this._detectNewVersionInterval);
        }
      };
      BundleManager.prototype.setLocalAbVersion = function(verObj) {
        var localMap = this._local_Version;
        for (var abName in verObj) {
          var verStr = verObj[abName];
          localMap.modules[abName] || (localMap.modules[abName] = {});
          localMap.modules[abName].resVersion = verStr;
        }
        cc.sys.localStorage.setItem(this._local_data_key, JSON.stringify(this._local_Version));
      };
      BundleManager.prototype.get_LocalVersion = function() {
        return this._local_Version;
      };
      BundleManager.prototype.get_RomoteVersion = function() {
        return this._romoteVersion;
      };
      BundleManager.prototype.createDefaultVersionData = function() {
        var ret = {
          clientMin: "1.0.0",
          modules: {}
        };
        return ret;
      };
      BundleManager.prototype.hotUpdateAllModule = function(callback, isShowHotDetectAlert) {
        var _this = this;
        if (!this._useHotUpdate) {
          callback && callback();
          return false;
        }
        isShowHotDetectAlert && this._bundleHotUIHelper.checkNewVersionShow();
        return this.hotUpdateMultiModule(Object.keys(this._romoteVersion.modules), function() {
          _this._bundleHotUIHelper.checkNewVersionHide();
          callback();
        });
      };
      BundleManager.prototype.hotUpdateMultiModule = function(moduleNameArr, callback) {
        var _this = this;
        this.isNeedReq_versionInfo() ? this.reqVersionInfo(function() {
          _this._doHotUpdateMulti(moduleNameArr, callback);
        }) : this._doHotUpdateMulti(moduleNameArr, callback);
      };
      BundleManager.prototype._doHotUpdateMulti = function(moduleNameArr, callback) {
        var _this = this;
        if (!this._useHotUpdate) {
          callback && callback();
          return false;
        }
        if (-1 == this._bundleUtil.comVersion(Const_1.GlobalConst.Client_Version, this._romoteVersion.clientMin)) {
          this._bundleHotUIHelper.showAlertClientTooOld();
          return;
        }
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleManager, "moduleName_ori:", JSON.stringify(moduleNameArr));
        moduleNameArr = this.getDependModule(moduleNameArr);
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleManager, "moduleName_dep:", JSON.stringify(moduleNameArr));
        var need_Update = false;
        var need_Restart = false;
        var onAllModuleHotFinish = function() {
          BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleManager, "hot_update_-AllHot_Finish");
          cc.sys.localStorage.setItem(_this._local_data_key, JSON.stringify(_this._local_Version));
          need_Restart ? setTimeout(function() {
            cc.game.restart();
          }, 100) : callback && callback();
        };
        var needUpdateNames = [];
        var preloadDir = function() {
          _this._bundleUtil.sequenceMis(needUpdateNames, function() {
            BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleManager, "hot_update_-allPreloadFinish");
            _this._bundleHotUIHelper.hideUpdating(onAllModuleHotFinish);
          }, function(curMis, idx, onExec) {
            var curMisIdx = idx + 1;
            var totalMis = needUpdateNames.length;
            var moduleObj = _this.modules[needUpdateNames[idx]];
            moduleObj.preloadModule(function(finish, total, item) {
              _this._bundleHotUIHelper.onProgress(curMisIdx, totalMis, finish, total);
            }, function(items) {
              BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleManager, "hot_update_-preloadOK_:", needUpdateNames[idx]);
              onExec();
            });
          });
        };
        this._bundleUtil.sequenceMis(moduleNameArr, function() {
          if (need_Update) {
            _this._bundleHotUIHelper.showUpdating(1, needUpdateNames.length);
            _this._bundleHotUIHelper.showHotAlert(need_Restart, function() {
              preloadDir();
            });
          } else onAllModuleHotFinish();
        }, function(curMis, idx, onExec) {
          var moduleName = moduleNameArr[idx];
          var retTemp = {};
          retTemp = _this._hotUpdateModule(moduleName, function(hot_ret) {
            var haveNewVer = hot_ret.haveNewVer, needRestart = hot_ret.needRestart;
            if (haveNewVer) {
              need_Update = true;
              needUpdateNames.push(moduleName);
            }
            needRestart && (need_Restart = true);
            onExec();
          });
        });
      };
      BundleManager.prototype.getDependModule = function(names, h) {
        h = h || 1;
        var rms = this._romoteVersion.modules;
        var ret = {};
        for (var idx in names) {
          var n_1 = names[idx];
          ret[n_1] = {
            name: n_1,
            priority: rms[n_1].priority
          };
          var depends = this.getDependModule(rms[n_1].depend || [], h + 1);
          for (var j in depends) {
            var n_2 = depends[j];
            ret[n_2] = {
              name: n_2,
              priority: rms[n_2].priority
            };
          }
        }
        if (1 == h) {
          var minfos = Object.values(ret);
          minfos.sort(function(a, b) {
            if (a.priority > b.priority) return -1;
            return 1;
          });
          ret = {};
          for (var idx in minfos) ret[minfos[idx].name] = 1;
        }
        return Object.keys(ret);
      };
      BundleManager.prototype._hotUpdateModule = function(moduleName, callback) {
        var _this = this;
        if (!this._useHotUpdate) {
          var ret_1 = {
            haveNewVer: false,
            needRestart: false
          };
          callback && callback(ret_1);
          return ret_1;
        }
        var local_Ver = this._local_Version.modules[moduleName].resVersion;
        var romoteVer = this._romoteVersion.modules[moduleName].resVersion;
        var moduleObj = this.modules[moduleName];
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleManager, "version_info_data_-local:", JSON.stringify(this._local_Version));
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleManager, "version_info_data_-remote:", JSON.stringify(this._romoteVersion));
        var ret = {
          haveNewVer: local_Ver != romoteVer,
          needRestart: false
        };
        var loadVerFunc = function(mObj, ver, cb) {
          mObj.loadAB(function() {
            if (local_Ver != romoteVer) {
              _this._local_Version.modules[moduleName].resVersion = romoteVer;
              _this._local_Version.modules[moduleName].showVer = _this._romoteVersion.modules[moduleName].showVer;
            }
            cb && cb();
          }, ver);
        };
        if (moduleObj) if (local_Ver == romoteVer) callback && callback(ret); else {
          ret.needRestart = true;
          loadVerFunc(moduleObj, romoteVer, function() {
            callback && callback(ret);
          });
        } else {
          moduleObj = new BundleModule_1.default();
          loadVerFunc(moduleObj.init(moduleName), romoteVer, function() {
            _this.modules[moduleName] = moduleObj;
            callback && callback(ret);
          });
        }
        return ret;
      };
      BundleManager.prototype.getBundle = function(moduleName) {
        return this.modules[moduleName]._abObj;
      };
      BundleManager.prototype.getModule = function(moduleName) {
        return this.modules[moduleName];
      };
      BundleManager.prototype.addModule = function(moduleName, cb) {
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
        moduleObj.init(moduleName, this._useHotUpdate).loadAB(function() {
          _this.modules[moduleName] = moduleObj;
          cb && cb(moduleObj);
        });
      };
      BundleManager.prototype.removeModule = function(moduleName) {
        var moduleObj = this.modules[moduleName];
        if (!moduleObj) return;
        moduleObj.releaseAB();
        delete this.modules[moduleName];
      };
      BundleManager.prototype.isNeedReq_versionInfo = function() {
        if (Const_1.ModuleConst.reqVersionImmediately) return true;
        var curTime = new Date().getTime();
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleManager, "is_need_req_ver_:", curTime, this._lastReq_VersionInfoTime);
        if (curTime - this._lastReq_VersionInfoTime > 1e3 * this._detectNewVersionInterval) return true;
        return false;
      };
      BundleManager.prototype.reqVersionInfo = function(callback) {
        var _this = this;
        if (!this._useHotUpdate) {
          callback && callback();
          return false;
        }
        this._httpReqHandler && this._httpReqHandler.abort();
        var verUrl = Const_1.ModuleConst.hotUrl + "verconfig.json?renew=" + this._bundleUtil.createUUID();
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleManager, "req_version_url_:", verUrl);
        this._httpReqHandler = this._bundleUtil.makeXMLHttp({
          url: verUrl,
          callback: function(_args) {
            var httpData = _args.retData;
            if (!httpData) return;
            _this._httpReqHandler = null;
            _this._romoteVersion = httpData;
            BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleManager, "onReqVersion_Info_:", JSON.stringify(httpData));
            var localMap = _this._local_Version;
            var remoteMap = httpData;
            var needSave = false;
            for (var moduleName in remoteMap.modules) {
              localMap.modules[moduleName] || (localMap.modules[moduleName] = {});
              if (!localMap.modules[moduleName].showVer) {
                needSave = true;
                localMap.modules[moduleName].showVer = remoteMap.modules[moduleName].showVer;
              }
            }
            needSave && cc.sys.localStorage.setItem(_this._local_data_key, JSON.stringify(_this._local_Version));
            _this._lastReq_VersionInfoTime = new Date().getTime();
            callback && callback();
          }
        });
      };
      return BundleManager;
    }(SingleIns_1.default);
    exports.default = BundleManager;
    cc._RF.pop();
  }, {
    "./BundleHotUIHelper": "BundleHotUIHelper",
    "./BundleModule": "BundleModule",
    "./BundleUnpackHelper": "BundleUnpackHelper",
    "./BundleUtil": "BundleUtil",
    "./Const": "Const",
    "./SingleIns": "SingleIns"
  } ],
  BundleModule: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0782enB7X5F/6eaTV1X6gbi", "BundleModule");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BundleUtil_1 = require("./BundleUtil");
    var Const_1 = require("./Const");
    var BundleModule = function() {
      function BundleModule() {}
      BundleModule.prototype.init = function(ABName, useHotUpdate) {
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleModule, "module_init");
        this._ABName = ABName;
        this._useHotUpdate = useHotUpdate;
        return this;
      };
      BundleModule.prototype.getABObj = function() {
        return this._abObj;
      };
      BundleModule.prototype.getModuleName = function() {
        return this._ABName;
      };
      BundleModule.prototype.loadAB = function(cb, version) {
        var _this = this;
        var loadArg = {};
        version && (loadArg.version = version);
        var isValid = true;
        var abUrl = this._ABName;
        this._useHotUpdate && (abUrl = Const_1.ModuleConst.hotUrl + "remote/" + this._ABName);
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleModule, "loadAB_:", this._ABName, abUrl);
        cc.assetManager.loadBundle(abUrl, loadArg, function(err, bundle) {
          if (!isValid) return;
          isValid = false;
          if (err) {
            BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleModule, "load_ab_Err_:", _this._ABName, JSON.stringify(err));
            _this.intervalScheduleOnce(function() {
              _this.loadAB(cb, version);
            }, 3);
          } else {
            BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleModule, "loadAB_OK_:", _this._ABName);
            _this._abObj = bundle;
            cb();
          }
        });
      };
      BundleModule.prototype.preloadModule = function(onProgress, onComplete) {
        var _this = this;
        var is_Valid = true;
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
            urll && autoAtlas.push(urll);
          }
        }
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleModule, "autoatlas_url_arr_:", JSON.stringify(autoAtlas));
        var extNum = autoAtlas.length;
        var finishNum = 0;
        var is_2Valid = true;
        var preloadAutoAtlas = function() {
          if (0 == autoAtlas.length) {
            if (!is_2Valid) return;
            is_2Valid = false;
            onComplete && onComplete();
            return;
          }
          cc.assetManager.preloadAny(autoAtlas, {
            __requestType__: "url",
            type: null,
            bundle: _this._abObj.name
          }, function(finish, total, item) {
            if (!is_2Valid) return;
            BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleModule, "load_autoatlas_progress_:", _this._abObj.name, finish, total);
            onProgress && onProgress(finish + finishNum, total + finishNum, item);
          }, function(error, items) {
            if (!is_2Valid) return;
            is_2Valid = false;
            if (error) {
              BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleModule, "preloadAutoAtlas_error:", JSON.stringify(error));
              _this.intervalScheduleOnce(function() {
                _this.preloadModule(onProgress, onComplete);
              }, 3);
            } else onComplete && onComplete();
          });
        };
        this._abObj.preloadDir("root", function(finish, total, item) {
          if (!is_Valid) return;
          finishNum = total;
          onProgress && onProgress(finish, total + extNum, item);
        }, function(error, items) {
          if (!is_Valid) return;
          is_Valid = false;
          error ? _this.intervalScheduleOnce(function() {
            _this.preloadModule(onProgress, onComplete);
          }, 3) : preloadAutoAtlas();
        });
      };
      BundleModule.prototype.releaseAB = function() {
        this.unIntervalSchedule();
        if (!this._abObj) return;
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleModule, "release_ab__");
        cc.assetManager.removeBundle(this._abObj);
        this._abObj = null;
      };
      BundleModule.prototype.intervalScheduleOnce = function(callback, delay) {
        var id = setTimeout(callback, 1e3 * delay);
        this._timeOutIds.push(id);
      };
      BundleModule.prototype.unIntervalSchedule = function() {
        var timeoutIds = this._timeOutIds;
        timeoutIds.forEach(function(id) {
          return clearTimeout(id);
        });
        this._timeOutIds = [];
      };
      return BundleModule;
    }();
    exports.default = BundleModule;
    cc._RF.pop();
  }, {
    "./BundleUtil": "BundleUtil",
    "./Const": "Const"
  } ],
  BundleUnpackHelper: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "10293QTNjJDlIukXNrrvUWK", "BundleUnpackHelper");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var SingleIns_1 = require("./SingleIns");
    var BundleHotUIHelper_1 = require("./BundleHotUIHelper");
    var BundleUtil_1 = require("./BundleUtil");
    var BundleManager_1 = require("./BundleManager");
    var Const_1 = require("./Const");
    var BundleUnpackHelper = function(_super) {
      __extends(BundleUnpackHelper, _super);
      function BundleUnpackHelper() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      BundleUnpackHelper.prototype.initCom = function(arg) {
        this._bundleMgr = BundleManager_1.default.getInstance();
        this._bundleUtil = BundleUtil_1.default.getInstance();
        this._bundleHotUIHelper = BundleHotUIHelper_1.default.getInstance();
      };
      BundleUnpackHelper.prototype.execUnpackage = function(onComplete) {
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
        var nativeRoot = this._bundleMgr.getNativePath();
        var path_native_1 = nativeRoot + "PKgamecaches/";
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleUnpackHelper, "unpackage_res_:", path_native_1, path_cache);
        if (!jsb.fileUtils.isDirectoryExist(path_native_1)) {
          BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleUnpackHelper, "PKgamecaches_not_exist");
          cc.sys.localStorage.setItem(Const_1.ModuleConst.localClientVer, Const_1.GlobalConst.Client_Version);
          onComplete();
          return;
        }
        var cacheMag_1 = cc.assetManager.cacheManager;
        var coverCachelist_1 = function() {
          var fileStr = jsb.fileUtils.getStringFromFile(path_native_1 + "cacheList.json");
          var abVersion = {};
          var cache_d_Map = JSON.parse(fileStr);
          if (cache_d_Map) {
            var files = cache_d_Map.files;
            for (var id in files) {
              var info = files[id];
              cacheMag_1.cacheFile(id, info.url, info.bundle);
              if (-1 != id.indexOf("/index.")) {
                var splitRet = id.split(".");
                abVersion[info.bundle] = splitRet[splitRet.length - 2];
              }
            }
          }
          BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleUnpackHelper, "abVersion__:", JSON.stringify(abVersion));
          cacheMag_1.writeCacheFile(function() {
            BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleUnpackHelper, "writeCache_File_ok");
            _this._bundleMgr.setLocalAbVersion(abVersion);
            cc.sys.localStorage.setItem(Const_1.ModuleConst.localClientVer, Const_1.GlobalConst.Client_Version);
            onComplete();
          });
        };
        this._bundleHotUIHelper.unpackageShow();
        this.copyFoldTo(path_native_1, path_cache, function(finish, total) {
          _this._bundleHotUIHelper.unpackageUpdateProgress(finish, total);
        }, function() {
          _this._bundleHotUIHelper.unpackageFinish();
          coverCachelist_1();
        });
      };
      BundleUnpackHelper.prototype.getFileListFromDir = function(dir, filelist) {
        var co = 1;
        if (cc.sys.os == cc.sys.OS_ANDROID) {
          var cacheJson = jsb.fileUtils.getStringFromFile(dir + "cacheList.json");
          var cacheMap = JSON.parse(cacheJson);
          var files = cacheMap.files;
          for (var url in files) {
            var item = files[url];
            var fullpath = this._bundleMgr.getNativePath() + "PKgamecaches/" + item.url;
            filelist.push(fullpath);
            co < 3 && console.log("get_file_list_full_:", fullpath);
            co += 1;
          }
        } else jsb.fileUtils.listFilesRecursively(dir, filelist);
      };
      BundleUnpackHelper.prototype.copyFoldTo = function(oriRoot, copyTo, onProgress, onComplate) {
        var _this = this;
        var eachFrameCopyNum = 5;
        if ("undefined" == typeof jsb || !jsb.fileUtils.isDirectoryExist(oriRoot)) {
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
          "/" != path.substr(path.length - 1) && realFileArr.push(path);
        }
        var totalLen = realFileArr.length;
        if (0 == totalLen) {
          cc.log("totalLen_is_0:", oriRoot);
          onComplate();
          return;
        }
        var curMisIndex = 0;
        var schHandler = function() {
          for (var i = curMisIndex; i < curMisIndex + eachFrameCopyNum; i++) {
            if (i >= totalLen) {
              _this.unIntervalSchedule();
              onComplate();
              return;
            }
            var path = realFileArr[i];
            var subPath = path.substr(oriRoot.length);
            var fileName = path.substr(path.lastIndexOf("/") + 1);
            var targetPath = copyTo + subPath;
            var newFold = targetPath.substr(0, targetPath.lastIndexOf("/") + 1);
            jsb.fileUtils.isDirectoryExist(newFold) || jsb.fileUtils.createDirectory(newFold);
            var fileData = jsb.fileUtils.getDataFromFile(path);
            var saveRet = jsb.fileUtils.writeDataToFile(fileData, targetPath);
            if (!saveRet) {
              _this.unIntervalSchedule();
              return;
            }
          }
          curMisIndex += eachFrameCopyNum;
          onProgress(curMisIndex <= totalLen ? curMisIndex : totalLen, totalLen);
        };
        this.intervalSchedule(schHandler, 0);
      };
      return BundleUnpackHelper;
    }(SingleIns_1.default);
    exports.default = BundleUnpackHelper;
    cc._RF.pop();
  }, {
    "./BundleHotUIHelper": "BundleHotUIHelper",
    "./BundleManager": "BundleManager",
    "./BundleUtil": "BundleUtil",
    "./Const": "Const",
    "./SingleIns": "SingleIns"
  } ],
  BundleUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f71a9cN+AlL4aLKHsUO+4C7", "BundleUtil");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __spreadArrays = this && this.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
      k++) r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.CodeType = void 0;
    var SingleIns_1 = require("./SingleIns");
    var CodeType;
    (function(CodeType) {
      CodeType["BundleModule"] = "BundleModule";
      CodeType["BundleHotUIHelper"] = "BundleHotUIHelper";
      CodeType["BundleUtil"] = "BundleUtil";
      CodeType["BundleManager"] = "BundleManager";
      CodeType["BundleUnpackHelper"] = "BundleUnpackHelper";
    })(CodeType = exports.CodeType || (exports.CodeType = {}));
    var BundleUtil = function(_super) {
      __extends(BundleUtil, _super);
      function BundleUtil() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      BundleUtil.prototype.makeXMLHttp = function(args) {
        var timeout = args.timeout, url = args.url, callback = args.callback;
        var retInfo = {};
        var isValid = true;
        var xhr = new XMLHttpRequest();
        xhr.timeout = Math.ceil(1e3 * (timeout || 6));
        xhr.onreadystatechange = function() {
          if (4 == xhr.readyState && xhr.status >= 200 && xhr.status < 400) {
            if (!isValid) return;
            isValid = false;
            var httpDatas = JSON.parse(xhr.responseText);
            callback({
              retData: httpDatas
            });
          } else if (4 == xhr.readyState && 0 == xhr.status) {
            if (!isValid) return;
            isValid = false;
            callback({
              fail: true
            });
          } else if (4 == xhr.readyState) {
            if (!isValid) return;
            isValid = false;
            callback({
              fail: true
            });
          }
        };
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send();
        xhr.ontimeout = function() {
          if (!isValid) return;
          isValid = false;
          callback({
            isTimeout: true
          });
        };
        retInfo.abort = function() {
          isValid = false;
          xhr.abort();
        };
        return retInfo;
      };
      BundleUtil.prototype.parallelMis = function(callback) {
        var co = 0;
        var ret = {};
        co += 1;
        var isValid = true;
        var retArgs = {};
        var onFinish = function(args) {
          if (!isValid) return;
          co -= 1;
          args && (retArgs = Object.assign(retArgs, args));
          co <= 0 && callback && callback(retArgs);
        };
        ret.onFinish = onFinish;
        ret.addMis = function() {
          co += 1;
          return onFinish;
        };
        ret.start = function() {
          onFinish();
        };
        ret.close = function() {
          isValid = false;
        };
        return ret;
      };
      BundleUtil.prototype.sequenceMis = function(misArr, onAllExec, execFunc) {
        cc.log("sequenceMis__enter_:");
        var co = 0;
        var execMis;
        execMis = function() {
          if (co >= misArr.length) {
            onAllExec();
            return;
          }
          var mis = misArr[co];
          var curCo = co;
          co += 1;
          execFunc(mis, curCo, execMis);
        };
        execMis();
      };
      BundleUtil.prototype.comVersion = function(localVer, romoteVer) {
        var verSplit_local = localVer.split(".");
        var verSplit_remote = romoteVer.split(".");
        var localCo = verSplit_local.length;
        var remoteCo = verSplit_remote.length;
        var maxCo = localCo > remoteCo ? localCo : remoteCo;
        for (var i = 0; i < maxCo; i++) {
          var n_local = parseInt(verSplit_local[i], 10);
          var n_remote = parseInt(verSplit_remote[i], 10);
          if (i < localCo && i >= remoteCo) return 1;
          if (i >= localCo && i < remoteCo) return -1;
          if (n_local > n_remote) return 1;
          if (n_local < n_remote) return -1;
        }
        return 0;
      };
      BundleUtil.prototype.createUUID = function() {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
        var uuid = [];
        for (var i = 0; i < 4; i++) uuid[i] = chars[0 | 36 * Math.random()];
        var uid = uuid.join("");
        uid = Number(Date.now()).toString(36) + uid;
        return uid;
      };
      BundleUtil.LOG = function(key) {
        var arg = [];
        for (var _i = 1; _i < arguments.length; _i++) arg[_i - 1] = arguments[_i];
        cc.log.apply(cc, __spreadArrays([ "" + key.toString() ], arg));
      };
      return BundleUtil;
    }(SingleIns_1.default);
    exports.default = BundleUtil;
    cc._RF.pop();
  }, {
    "./SingleIns": "SingleIns"
  } ],
  Const: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e7a84J0hoNDBpL3SyQ9aLhg", "Const");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.GlobalConst = exports.ModuleConst = void 0;
    exports.ModuleConst = {
      hotUrl: "http://192.168.20.196:8000/hotRes/",
      localVersionConfigKey: "_local_gameVersionData1",
      localClientVer: "__sv_loacal_client_ver",
      reqVersionImmediately: true
    };
    exports.GlobalConst = {
      Client_Version: "1.0.0"
    };
    cc._RF.pop();
  }, {} ],
  HelloWorld: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3e4ccTMSlRFRqoHl6xXc+LA", "HelloWorld");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __spreadArrays = this && this.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
      k++) r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BundleManager_1 = require("./bundle/BundleManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SubGame_2 = function(_super) {
      __extends(SubGame_2, _super);
      function SubGame_2() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.moduleLayer = null;
        _this.asset1 = null;
        _this.asset2 = null;
        _this._lobbyRootNode = null;
        return _this;
      }
      SubGame_2.prototype.onDestroy = function() {};
      SubGame_2.prototype.onLoad = function() {
        var _this = this;
        this.hackSysLog();
        cc.sys.isBrowser || cc.log("[HelloWorld] jsb_writable_:", jsb.fileUtils.getWritablePath());
        var assetPath = "";
        if ("undefined" != typeof jsb) {
          var absPath1 = jsb.fileUtils.fullPathForFilename(this.asset1.nativeUrl).replace("//", "/");
          var absPath2 = jsb.fileUtils.fullPathForFilename(this.asset2.nativeUrl).replace("//", "/");
          var testLen = absPath1.length > absPath2.length ? absPath2.length : absPath1.length;
          for (var i = 0; i < testLen; i++) if (absPath1[i] != absPath2[i]) {
            assetPath = absPath1.substring(0, i);
            break;
          }
          cc.log("absFile_path:", assetPath);
        }
        BundleManager_1.default.getInstance().initCom({
          useHotUpdate: true,
          assetPath: assetPath
        });
        BundleManager_1.default.getInstance().execUnpackage(function() {
          BundleManager_1.default.getInstance().reqVersionInfo(function() {
            _this.reloadLobbyRoot();
          });
        });
        BundleManager_1.default.getInstance().reqLoopVersionInfo();
      };
      SubGame_2.prototype.reloadLobbyRoot = function() {
        var _this = this;
        var loadAb = [ "ABLobby" ];
        BundleManager_1.default.getInstance().hotUpdateMultiModule(loadAb, function() {
          BundleManager_1.default.getInstance().addModule("ABLobby", function(moduleObj) {
            var abObj = moduleObj.getABObj();
            abObj.load("root/Scene/LobbyRoot", cc.Prefab, function(err, prefab) {
              cc.log("[HelloWorld] load_lobby_prefab_ err:", JSON.stringify(err));
              _this._lobbyRootNode && _this._lobbyRootNode.destroy();
              var lobbyRoot = cc.instantiate(prefab);
              _this._lobbyRootNode = lobbyRoot;
              _this.moduleLayer.addChild(lobbyRoot, 100);
              lobbyRoot.getComponent("LobbyRoot").initModule();
            });
          });
        });
      };
      SubGame_2.prototype.hackSys_Log_Save = function() {
        if (!this._logArr) return;
        var totalLen = this._logArr.length;
        var reportCo = 2e3;
        var beginIdx = totalLen - reportCo;
        beginIdx = beginIdx >= 0 ? beginIdx : 0;
        var arrTemp = [];
        for (var i = beginIdx; i < totalLen; i++) arrTemp.push(this._logArr[i]);
        var retMsg = arrTemp.join("\n");
        if (cc.sys.isNative) {
          var path = jsb.fileUtils.getWritablePath();
          jsb.fileUtils.writeStringToFile(retMsg, path + "alogRecord.txt");
        }
      };
      SubGame_2.prototype.hackSysLog = function() {
        var _a;
        if (this._initHackLog) return;
        this._initHackLog = true;
        var _logArr = [];
        this._logArr = _logArr;
        var MAX_STR_LEN = 1300;
        var excludeStr = (_a = {}, _a["Can't find letter definition in texture"] = 1, _a);
        var push_log = function() {
          var arg = [];
          for (var _i = 0; _i < arguments.length; _i++) arg[_i] = arguments[_i];
          var ignore = false;
          var logStr = arg.join(" ");
          var strLen = logStr.length;
          for (var idx = 0; idx < strLen; ) {
            var endIdx = idx + MAX_STR_LEN;
            var splitStr = logStr.slice(idx, endIdx);
            for (var excStr in excludeStr) if (0 == splitStr.indexOf(excStr, 0)) {
              ignore = true;
              break;
            }
            ignore || _logArr.push("_" + _logArr.length + "_=> " + splitStr + (endIdx < strLen ? "--\x3e" : ""));
            idx = endIdx;
          }
          return ignore;
        };
        var logDef = function() {
          var _a;
          var arg = [];
          for (var _i = 0; _i < arguments.length; _i++) arg[_i] = arguments[_i];
          var ignore = push_log.apply(void 0, arg);
          ignore || (_a = cc["_sv_log_2_Ori"]).call.apply(_a, __spreadArrays([ cc ], arg));
        };
        var consoleLogDef = function() {
          var _a;
          var arg = [];
          for (var _i = 0; _i < arguments.length; _i++) arg[_i] = arguments[_i];
          var ignore = push_log.apply(void 0, arg);
          ignore || cc["_sv_console_log_2_Ori"] && (_a = cc["_sv_console_log_2_Ori"]).call.apply(_a, __spreadArrays([ console ], arg));
        };
        cc["_sv_log_2_Ori"] || (cc["_sv_log_2_Ori"] = cc.log);
        cc["_sv_console_log_2_Ori"] || (cc["_sv_console_log_2_Ori"] = console.log);
        cc.log = logDef;
        console.log = consoleLogDef;
      };
      __decorate([ property(cc.Node) ], SubGame_2.prototype, "moduleLayer", void 0);
      __decorate([ property(cc.Asset) ], SubGame_2.prototype, "asset1", void 0);
      __decorate([ property(cc.Asset) ], SubGame_2.prototype, "asset2", void 0);
      SubGame_2 = __decorate([ ccclass ], SubGame_2);
      return SubGame_2;
    }(cc.Component);
    exports.default = SubGame_2;
    cc._RF.pop();
  }, {
    "./bundle/BundleManager": "BundleManager"
  } ],
  SingleIns: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "14cf784PnhNqrEvlJBkv7ES", "SingleIns");
    "use strict";
    var __spreadArrays = this && this.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
      k++) r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var SingleIns = function() {
      function SingleIns() {
        this.intervalIds = [];
        this.intervalIds = [];
      }
      SingleIns.getInstance = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        var Class = this;
        Class._instance || (Class._instance = new (Class.bind.apply(Class, __spreadArrays([ void 0 ], args)))());
        return Class._instance;
      };
      SingleIns.prototype.intervalSchedule = function(callback, interval) {
        void 0 === interval && (interval = 0);
        var intervalId = setInterval(function() {
          callback();
        }, 1e3 * interval);
        this.intervalIds.push(intervalId);
      };
      SingleIns.prototype.unIntervalSchedule = function() {
        var timeoutIds = this.intervalIds;
        timeoutIds.forEach(function(id) {
          return clearInterval(id);
        });
        this.intervalIds = [];
      };
      return SingleIns;
    }();
    exports.default = SingleIns;
    cc._RF.pop();
  }, {} ]
}, {}, [ "HelloWorld", "BundleHotUIHelper", "BundleManager", "BundleModule", "BundleUnpackHelper", "BundleUtil", "Const", "SingleIns" ]);