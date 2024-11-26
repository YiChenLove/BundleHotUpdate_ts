"use strict";
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