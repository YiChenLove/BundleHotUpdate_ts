
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