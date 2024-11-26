
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvYnVuZGxlL0J1bmRsZU1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUFvRDtBQUNwRCxpQ0FBc0M7QUFFdEM7SUFBQTtJQW9KQSxDQUFDO0lBN0lHLDJCQUFJLEdBQUosVUFBSyxNQUFNLEVBQUUsWUFBWTtRQUN0QixvQkFBVSxDQUFDLEdBQUcsQ0FBQyxxQkFBUSxDQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQTtRQUVuRCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQTtRQUNyQixJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQTtRQUNqQyxPQUFPLElBQUksQ0FBQTtJQUNmLENBQUM7SUFFRCwrQkFBUSxHQUFSO1FBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFBO0lBQ3RCLENBQUM7SUFFRCxvQ0FBYSxHQUFiO1FBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3ZCLENBQUM7SUFFRCw2QkFBTSxHQUFOLFVBQU8sRUFBRSxFQUFFLE9BQVE7UUFBbkIsaUJBOEJDO1FBN0JHLHNCQUFzQjtRQUN0QixJQUFJLE9BQU8sR0FBUSxFQUFFLENBQUE7UUFDckIsSUFBRyxPQUFPLEVBQUM7WUFDUCxPQUFPLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtTQUM1QjtRQUNELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQTtRQUNsQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFBO1FBRXhCLElBQUcsSUFBSSxDQUFDLGFBQWEsRUFBQztZQUNsQiwwQ0FBMEM7WUFDMUMsS0FBSyxHQUFHLG1CQUFXLENBQUMsTUFBTSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFBO1NBQ3hEO1FBQ0Qsb0JBQVUsQ0FBQyxHQUFHLENBQUMscUJBQVEsQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFHLENB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LFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxFQUFVLElBQUssT0FBQSxZQUFZLENBQUMsRUFBRSxDQUFDLEVBQWhCLENBQWdCLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUwsbUJBQUM7QUFBRCxDQXBKQSxBQW9KQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJ1bmRsZVV0aWwsIHsgQ29kZVR5cGUgfSBmcm9tIFwiLi9CdW5kbGVVdGlsXCI7XG5pbXBvcnQgeyBNb2R1bGVDb25zdCB9IGZyb20gXCIuL0NvbnN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1bmRsZU1vZHVsZSB7XG5cbiAgICBfQUJOYW1lOiBzdHJpbmc7XG4gICAgX3VzZUhvdFVwZGF0ZTogYW55O1xuICAgIF9hYk9iajogYW55O1xuICAgIF90aW1lT3V0SWRzOiBudW1iZXJbXTtcblxuICAgIGluaXQoQUJOYW1lLCB1c2VIb3RVcGRhdGUpe1xuICAgICAgIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZU1vZHVsZSwgXCJtb2R1bGVfaW5pdFwiKVxuICAgICAgICBcbiAgICAgICAgdGhpcy5fQUJOYW1lID0gQUJOYW1lXG4gICAgICAgIHRoaXMuX3VzZUhvdFVwZGF0ZSA9IHVzZUhvdFVwZGF0ZVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIGdldEFCT2JqKCl7XG4gICAgICAgIHJldHVybiB0aGlzLl9hYk9iaiBcbiAgICB9XG4gICAgXG4gICAgZ2V0TW9kdWxlTmFtZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5fQUJOYW1lXG4gICAgfVxuXG4gICAgbG9hZEFCKGNiLCB2ZXJzaW9uPyl7XG4gICAgICAgIC8vIHt2ZXJzaW9uOiAnZmJjMDcnfSxcbiAgICAgICAgbGV0IGxvYWRBcmc6IGFueSA9IHt9XG4gICAgICAgIGlmKHZlcnNpb24pe1xuICAgICAgICAgICAgbG9hZEFyZy52ZXJzaW9uID0gdmVyc2lvblxuICAgICAgICB9XG4gICAgICAgIGxldCBpc1ZhbGlkID0gdHJ1ZSBcbiAgICAgICAgbGV0IGFiVXJsID0gdGhpcy5fQUJOYW1lIFxuXG4gICAgICAgIGlmKHRoaXMuX3VzZUhvdFVwZGF0ZSl7XG4gICAgICAgICAgICAvLyDlpoLmnpzluIzmnJvkvb/nlKhjcmVhdG9y5p6E5bu65pe25aGr55qE6LWE5rqQ5pyN5Yqh5Zmo5Zyw5Z2ALOWwhuS4i+mdoui/meihjOS7o+eggeazqOmHiuaOieWNs+WPry5cbiAgICAgICAgICAgIGFiVXJsID0gTW9kdWxlQ29uc3QuaG90VXJsICsgXCJyZW1vdGUvXCIgKyB0aGlzLl9BQk5hbWVcbiAgICAgICAgfVxuICAgICAgICBCdW5kbGVVdGlsLkxPRyhDb2RlVHlwZS5CdW5kbGVNb2R1bGUsIFwibG9hZEFCXzpcIiwgdGhpcy5fQUJOYW1lLCBhYlVybCAgKVxuICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZEJ1bmRsZShhYlVybCwgIGxvYWRBcmcsIChlcnIsIGJ1bmRsZSk9PiB7XG4gICAgICAgICAgICBpZighaXNWYWxpZCl7IHJldHVybiB9IDsgIGlzVmFsaWQgPSBmYWxzZSA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKCFlcnIpe1xuICAgICAgICAgICAgICAgIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZU1vZHVsZSwgXCJsb2FkQUJfT0tfOlwiLCB0aGlzLl9BQk5hbWUgKVxuICAgICAgICAgICAgICAgIHRoaXMuX2FiT2JqID0gYnVuZGxlIFxuXG4gICAgICAgICAgICAgICAgY2IoKVxuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZU1vZHVsZSwgXCJsb2FkX2FiX0Vycl86XCIsIHRoaXMuX0FCTmFtZSwgSlNPTi5zdHJpbmdpZnkoZXJyKSkgXG4gICAgICAgICAgICAgICAgLy8g6ZSZ6K+v6YeN6K+VXG4gICAgICAgICAgICAgICAgdGhpcy5pbnRlcnZhbFNjaGVkdWxlT25jZSgoKT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRBQihjYiwgdmVyc2lvbilcbiAgICAgICAgICAgICAgICB9LCAzKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG5cbiAgICAvLyDkuIvovb3otYTmupBcbiAgICBwcmVsb2FkTW9kdWxlKG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUpe1xuICAgICAgICBsZXQgaXNfVmFsaWQgPSB0cnVlXG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgbGV0IGF1dG9BdGxhcyA9IFtdXG4gICAgICAgIGxldCByZXNNYXAgPSB0aGlzLl9hYk9iai5fY29uZmlnLmFzc2V0SW5mb3MuX21hcFxuICAgICAgICBmb3IobGV0IGlkeCBpbiByZXNNYXApe1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSByZXNNYXBbaWR4XVxuICAgICAgICAgICAgaWYoIWl0ZW0ucGF0aCAmJiBpdGVtLm5hdGl2ZVZlcil7XG4gICAgICAgICAgICAgICAgbGV0IHVybGwgPSBjYy5hc3NldE1hbmFnZXIudXRpbHMuZ2V0VXJsV2l0aFV1aWQoaXRlbS51dWlkLCB7XG4gICAgICAgICAgICAgICAgICAgIF9fbmF0aXZlTmFtZV9fOiBcIi5wbmdcIixcbiAgICAgICAgICAgICAgICAgICAgbmF0aXZlRXh0OiBjYy5wYXRoLmV4dG5hbWUoXCIucG5nXCIpLFxuICAgICAgICAgICAgICAgICAgICBpc05hdGl2ZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pOyBcbiAgICAgICAgICAgICAgICBpZih1cmxsKXtcbiAgICAgICAgICAgICAgICAgICAgYXV0b0F0bGFzLnB1c2godXJsbClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBCdW5kbGVVdGlsLkxPRyhDb2RlVHlwZS5CdW5kbGVNb2R1bGUsIFwiYXV0b2F0bGFzX3VybF9hcnJfOlwiLCBKU09OLnN0cmluZ2lmeShhdXRvQXRsYXMpKVxuICAgICAgICBsZXQgZXh0TnVtID0gYXV0b0F0bGFzLmxlbmd0aCBcbiAgICAgICAgbGV0IGZpbmlzaE51bSA9IDBcbiAgICAgICAgbGV0IGlzXzJWYWxpZCA9IHRydWVcbiAgICAgICAgbGV0IHByZWxvYWRBdXRvQXRsYXMgPSAoKT0+e1xuICAgICAgICAgICAgaWYoYXV0b0F0bGFzLmxlbmd0aCA9PSAwICl7IFxuICAgICAgICAgICAgICAgIGlmKCFpc18yVmFsaWQpeyByZXR1cm47IH07IGlzXzJWYWxpZCA9IGZhbHNlIDtcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFJlcXVlc3RUeXBlLlVSTCA9ICd1cmwnIFxuICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLnByZWxvYWRBbnkoYXV0b0F0bGFzLCB7IF9fcmVxdWVzdFR5cGVfXzogJ3VybCcsIHR5cGU6IG51bGwsIGJ1bmRsZTogdGhpcy5fYWJPYmoubmFtZSB9LCBcbiAgICAgICAgICAgICAgICAoZmluaXNoLCB0b3RhbCwgaXRlbSk9PntcbiAgICAgICAgICAgICAgICAgICAgaWYoIWlzXzJWYWxpZCl7IHJldHVybjsgfTsgXG4gICAgICAgICAgICAgICAgICAgIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZU1vZHVsZSwgXCJsb2FkX2F1dG9hdGxhc19wcm9ncmVzc186XCIsdGhpcy5fYWJPYmoubmFtZSwgZmluaXNoLCB0b3RhbCApXG4gICAgICAgICAgICAgICAgICAgIG9uUHJvZ3Jlc3MgJiYgb25Qcm9ncmVzcyhmaW5pc2grZmluaXNoTnVtLCB0b3RhbCtmaW5pc2hOdW0sIGl0ZW0pO1xuICAgICAgICAgICAgICAgIH0sIChlcnJvciwgaXRlbXMpPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKCFpc18yVmFsaWQpeyByZXR1cm47IH07IGlzXzJWYWxpZCA9IGZhbHNlIDtcbiAgICAgICAgICAgICAgICAgICAgaWYoIWVycm9yKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgQnVuZGxlVXRpbC5MT0coQ29kZVR5cGUuQnVuZGxlTW9kdWxlLCBcInByZWxvYWRBdXRvQXRsYXNfZXJyb3I6XCIsIEpTT04uc3RyaW5naWZ5KGVycm9yKSApXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmludGVydmFsU2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVsb2FkTW9kdWxlKG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gICBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gXG5cbiAgICAgICAgdGhpcy5fYWJPYmoucHJlbG9hZERpcihcInJvb3RcIiwgKGZpbmlzaCwgdG90YWwsIGl0ZW0pPT57XG4gICAgICAgICAgICBpZighaXNfVmFsaWQpeyByZXR1cm47IH07XG4gICAgICAgICAgICBmaW5pc2hOdW0gPSB0b3RhbFxuICAgICAgICAgICAgb25Qcm9ncmVzcyAmJiBvblByb2dyZXNzKGZpbmlzaCwgdG90YWwgKyBleHROdW0sIGl0ZW0pO1xuICAgICAgICB9LCAoZXJyb3IsIGl0ZW1zKT0+e1xuICAgICAgICAgICAgaWYoIWlzX1ZhbGlkKXsgcmV0dXJuOyB9OyBpc19WYWxpZCA9IGZhbHNlIDtcbiAgICAgICAgICAgIGlmKCFlcnJvcil7XG4gICAgICAgICAgICAgICAgLy8gb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKGl0ZW1zKTtcbiAgICAgICAgICAgICAgICBwcmVsb2FkQXV0b0F0bGFzKClcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmludGVydmFsU2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJlbG9hZE1vZHVsZShvblByb2dyZXNzLCBvbkNvbXBsZXRlKTtcbiAgICAgICAgICAgICAgICB9LCAzKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgcmVsZWFzZUFCKCl7XG4gICAgICAgIHRoaXMudW5JbnRlcnZhbFNjaGVkdWxlKCk7XG4gICAgICAgIGlmKCF0aGlzLl9hYk9iaiApeyByZXR1cm4gfVxuICAgICAgICBCdW5kbGVVdGlsLkxPRyhDb2RlVHlwZS5CdW5kbGVNb2R1bGUsIFwicmVsZWFzZV9hYl9fXCIpIFxuICAgICAgICBjYy5hc3NldE1hbmFnZXIucmVtb3ZlQnVuZGxlKHRoaXMuX2FiT2JqKTtcbiAgICAgICAgdGhpcy5fYWJPYmogPSBudWxsXG4gICAgfVxuXG4gICAgaW50ZXJ2YWxTY2hlZHVsZU9uY2UoY2FsbGJhY2s6IEZ1bmN0aW9uLCBkZWxheTogbnVtYmVyKSB7XG4gICAgICAgbGV0IGlkOiBudW1iZXIgPSBzZXRUaW1lb3V0KGNhbGxiYWNrLCBkZWxheSAqIDEwMDApOyAvLyBBc3N1bWluZyBkZWxheSBpcyBpbiBzZWNvbmRzXG4gICAgICAgdGhpcy5fdGltZU91dElkcy5wdXNoKGlkKTtcbiAgICB9XG5cbiAgICB1bkludGVydmFsU2NoZWR1bGUoKSB7XG4gICAgICAgIC8vIEFzc3VtaW5nIHdlIGhhdmUgYSB3YXkgdG8gdHJhY2sgYWxsIHRpbWVvdXRzXG4gICAgICAgIGNvbnN0IHRpbWVvdXRJZHMgPSB0aGlzLl90aW1lT3V0SWRzO1xuICAgICAgICB0aW1lb3V0SWRzLmZvckVhY2goKGlkOiBudW1iZXIpID0+IGNsZWFyVGltZW91dChpZCkpO1xuICAgICAgICB0aGlzLl90aW1lT3V0SWRzID0gW107XG4gICAgfVxuXG59XG5cbiJdfQ==