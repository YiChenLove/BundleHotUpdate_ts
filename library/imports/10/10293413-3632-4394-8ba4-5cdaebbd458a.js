"use strict";
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