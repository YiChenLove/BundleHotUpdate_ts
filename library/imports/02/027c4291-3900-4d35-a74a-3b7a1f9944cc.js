"use strict";
cc._RF.push(module, '027c4KROQBNNadKO3ofmUTM', 'BundleHotUIHelper');
// Script/bundle/BundleHotUIHelper.ts

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
// BundleHotUIHelper  热更新的一些界面提示
var BundleUtil_1 = require("./BundleUtil");
var SingleIns_1 = require("./SingleIns");
var BundleHotUIHelper = /** @class */ (function (_super) {
    __extends(BundleHotUIHelper, _super);
    function BundleHotUIHelper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BundleHotUIHelper.prototype.hideUpdating = function (callback) {
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleHotUIHelper, "hideUpdating");
        callback && callback();
    };
    // 下载进度
    BundleHotUIHelper.prototype.onProgress = function (curMis, totalMis, finish, total) {
        // this.misNum.string = curMis + "/" + totalMis
        // this.update_proBar.progress = 1.0*finish/total
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleHotUIHelper, "onProgress : curMis_" + curMis + ",totalMis_" + totalMis + ",finish_" + finish + ",total_" + total);
    };
    BundleHotUIHelper.prototype.showUpdating = function (curMis, totalMis) {
        // this.node.active = true  
    };
    BundleHotUIHelper.prototype.showHotAlert = function (isNeedRestart, callback) {
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleHotUIHelper, "showHotAlert");
        callback && callback();
    };
    BundleHotUIHelper.prototype.showAlertClientTooOld = function () {
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleHotUIHelper, "showAlertClientTooOld");
    };
    BundleHotUIHelper.prototype.onBtn_ClientTooOld = function () {
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleHotUIHelper, "onBtn_ClientTooOld");
        cc.game.end();
    };
    //--------------------------------------------------------->> 解压资源
    BundleHotUIHelper.prototype.unpackageShow = function () {
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleHotUIHelper, "unpackageShow");
    };
    BundleHotUIHelper.prototype.unpackageUpdateProgress = function (finish, total) {
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleHotUIHelper, "unpackageUpdateProgress_:", finish, total);
    };
    BundleHotUIHelper.prototype.unpackageFinish = function () {
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleHotUIHelper, "unpackageFinish");
    };
    //---------------------------------------------------------<< 解压资源
    //--------------------------------------------------------->> 获取新版本号提示
    BundleHotUIHelper.prototype.checkNewVersionShow = function () {
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleHotUIHelper, "checkNewVersionShow");
    };
    BundleHotUIHelper.prototype.checkNewVersionHide = function () {
        BundleUtil_1.default.LOG(BundleUtil_1.CodeType.BundleHotUIHelper, "checkNewVersionHide");
    };
    return BundleHotUIHelper;
}(SingleIns_1.default));
exports.default = BundleHotUIHelper;

cc._RF.pop();