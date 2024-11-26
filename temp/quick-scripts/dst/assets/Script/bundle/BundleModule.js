
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