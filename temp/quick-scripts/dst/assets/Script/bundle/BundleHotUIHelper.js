
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/bundle/BundleHotUIHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvYnVuZGxlL0J1bmRsZUhvdFVJSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLGdDQUFnQztBQUNoQywyQ0FBb0Q7QUFDcEQseUNBQW9DO0FBR3BDO0lBQStDLHFDQUFTO0lBQXhEOztJQTBEQSxDQUFDO0lBeERHLHdDQUFZLEdBQVosVUFBYSxRQUFRO1FBQ2pCLG9CQUFVLENBQUMsR0FBRyxDQUFDLHFCQUFRLENBQUMsaUJBQWlCLEVBQUUsY0FBYyxDQUFDLENBQUE7UUFDMUQsUUFBUSxJQUFJLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxPQUFPO0lBQ1Asc0NBQVUsR0FBVixVQUFXLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUs7UUFDdEMsK0NBQStDO1FBQy9DLGlEQUFpRDtRQUNqRCxvQkFBVSxDQUFDLEdBQUcsQ0FBQyxxQkFBUSxDQUFDLGlCQUFpQixFQUFFLHlCQUF1QixNQUFNLGtCQUFhLFFBQVEsZ0JBQVcsTUFBTSxlQUFVLEtBQU8sQ0FBQyxDQUFBO0lBQ3BJLENBQUM7SUFFRCx3Q0FBWSxHQUFaLFVBQWEsTUFBTSxFQUFFLFFBQVE7UUFFekIsNEJBQTRCO0lBRWhDLENBQUM7SUFFRCx3Q0FBWSxHQUFaLFVBQWEsYUFBYSxFQUFFLFFBQVE7UUFDaEMsb0JBQVUsQ0FBQyxHQUFHLENBQUMscUJBQVEsQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLENBQUMsQ0FBQTtRQUMxRCxRQUFRLElBQUksUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELGlEQUFxQixHQUFyQjtRQUNJLG9CQUFVLENBQUMsR0FBRyxDQUFDLHFCQUFRLENBQUMsaUJBQWlCLEVBQUUsdUJBQXVCLENBQUMsQ0FBQTtJQUN2RSxDQUFDO0lBRUQsOENBQWtCLEdBQWxCO1FBQ0ksb0JBQVUsQ0FBQyxHQUFHLENBQUMscUJBQVEsQ0FBQyxpQkFBaUIsRUFBRSxvQkFBb0IsQ0FBQyxDQUFBO1FBQ2hFLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7SUFDakIsQ0FBQztJQUdELGtFQUFrRTtJQUNsRSx5Q0FBYSxHQUFiO1FBQ0ksb0JBQVUsQ0FBQyxHQUFHLENBQUMscUJBQVEsQ0FBQyxpQkFBaUIsRUFBRSxlQUFlLENBQUMsQ0FBQTtJQUMvRCxDQUFDO0lBRUQsbURBQXVCLEdBQXZCLFVBQXdCLE1BQU0sRUFBRSxLQUFLO1FBQ2pDLG9CQUFVLENBQUMsR0FBRyxDQUFDLHFCQUFRLENBQUMsaUJBQWlCLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQzFGLENBQUM7SUFDRCwyQ0FBZSxHQUFmO1FBQ0ksb0JBQVUsQ0FBQyxHQUFHLENBQUMscUJBQVEsQ0FBQyxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFBO0lBQ2pFLENBQUM7SUFFRCxrRUFBa0U7SUFFbEUsc0VBQXNFO0lBQ3RFLCtDQUFtQixHQUFuQjtRQUNJLG9CQUFVLENBQUMsR0FBRyxDQUFDLHFCQUFRLENBQUMsaUJBQWlCLEVBQUUscUJBQXFCLENBQUMsQ0FBQTtJQUNyRSxDQUFDO0lBRUQsK0NBQW1CLEdBQW5CO1FBQ0ksb0JBQVUsQ0FBQyxHQUFHLENBQUMscUJBQVEsQ0FBQyxpQkFBaUIsRUFBRSxxQkFBcUIsQ0FBQyxDQUFBO0lBQ3JFLENBQUM7SUFFTCx3QkFBQztBQUFELENBMURBLEFBMERDLENBMUQ4QyxtQkFBUyxHQTBEdkQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcblxuXG5cbi8vIEJ1bmRsZUhvdFVJSGVscGVyICDng63mm7TmlrDnmoTkuIDkupvnlYzpnaLmj5DnpLpcbmltcG9ydCBCdW5kbGVVdGlsLCB7IENvZGVUeXBlIH0gZnJvbSBcIi4vQnVuZGxlVXRpbFwiO1xuaW1wb3J0IFNpbmdsZUlucyBmcm9tIFwiLi9TaW5nbGVJbnNcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdW5kbGVIb3RVSUhlbHBlciBleHRlbmRzIFNpbmdsZUluc3tcblxuICAgIGhpZGVVcGRhdGluZyhjYWxsYmFjayl7XG4gICAgICAgIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZUhvdFVJSGVscGVyLCBcImhpZGVVcGRhdGluZ1wiKVxuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgIH1cblxuICAgIC8vIOS4i+i9vei/m+W6plxuICAgIG9uUHJvZ3Jlc3MoY3VyTWlzLCB0b3RhbE1pcywgZmluaXNoLCB0b3RhbCl7IFxuICAgICAgICAvLyB0aGlzLm1pc051bS5zdHJpbmcgPSBjdXJNaXMgKyBcIi9cIiArIHRvdGFsTWlzXG4gICAgICAgIC8vIHRoaXMudXBkYXRlX3Byb0Jhci5wcm9ncmVzcyA9IDEuMCpmaW5pc2gvdG90YWxcbiAgICAgICAgQnVuZGxlVXRpbC5MT0coQ29kZVR5cGUuQnVuZGxlSG90VUlIZWxwZXIsIGBvblByb2dyZXNzIDogY3VyTWlzXyR7Y3VyTWlzfSx0b3RhbE1pc18ke3RvdGFsTWlzfSxmaW5pc2hfJHtmaW5pc2h9LHRvdGFsXyR7dG90YWx9YClcbiAgICB9XG5cbiAgICBzaG93VXBkYXRpbmcoY3VyTWlzLCB0b3RhbE1pcyl7XG5cbiAgICAgICAgLy8gdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWUgIFxuXG4gICAgfVxuXG4gICAgc2hvd0hvdEFsZXJ0KGlzTmVlZFJlc3RhcnQsIGNhbGxiYWNrKXtcbiAgICAgICAgQnVuZGxlVXRpbC5MT0coQ29kZVR5cGUuQnVuZGxlSG90VUlIZWxwZXIsIFwic2hvd0hvdEFsZXJ0XCIpXG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7IFxuICAgIH1cblxuICAgIHNob3dBbGVydENsaWVudFRvb09sZCgpeyBcbiAgICAgICAgQnVuZGxlVXRpbC5MT0coQ29kZVR5cGUuQnVuZGxlSG90VUlIZWxwZXIsIFwic2hvd0FsZXJ0Q2xpZW50VG9vT2xkXCIpXG4gICAgfVxuXG4gICAgb25CdG5fQ2xpZW50VG9vT2xkKCl7XG4gICAgICAgIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZUhvdFVJSGVscGVyLCBcIm9uQnRuX0NsaWVudFRvb09sZFwiKVxuICAgICAgICBjYy5nYW1lLmVuZCgpXG4gICAgfVxuXG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT4+IOino+WOi+i1hOa6kFxuICAgIHVucGFja2FnZVNob3coKXtcbiAgICAgICAgQnVuZGxlVXRpbC5MT0coQ29kZVR5cGUuQnVuZGxlSG90VUlIZWxwZXIsIFwidW5wYWNrYWdlU2hvd1wiKVxuICAgIH1cbiAgICBcbiAgICB1bnBhY2thZ2VVcGRhdGVQcm9ncmVzcyhmaW5pc2gsIHRvdGFsKXsgXG4gICAgICAgIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZUhvdFVJSGVscGVyLCBcInVucGFja2FnZVVwZGF0ZVByb2dyZXNzXzpcIiwgZmluaXNoLCB0b3RhbClcbiAgICB9XG4gICAgdW5wYWNrYWdlRmluaXNoKCl7XG4gICAgICAgIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZUhvdFVJSGVscGVyLCBcInVucGFja2FnZUZpbmlzaFwiKVxuICAgIH1cblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPDwg6Kej5Y6L6LWE5rqQXG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT4+IOiOt+WPluaWsOeJiOacrOWPt+aPkOekulxuICAgIGNoZWNrTmV3VmVyc2lvblNob3coKXtcbiAgICAgICAgQnVuZGxlVXRpbC5MT0coQ29kZVR5cGUuQnVuZGxlSG90VUlIZWxwZXIsIFwiY2hlY2tOZXdWZXJzaW9uU2hvd1wiKVxuICAgIH1cblxuICAgIGNoZWNrTmV3VmVyc2lvbkhpZGUoKXsgXG4gICAgICAgIEJ1bmRsZVV0aWwuTE9HKENvZGVUeXBlLkJ1bmRsZUhvdFVJSGVscGVyLCBcImNoZWNrTmV3VmVyc2lvbkhpZGVcIilcbiAgICB9XG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS08PCDojrflj5bmlrDniYjmnKzlj7fmj5DnpLpcbn1cblxuIl19