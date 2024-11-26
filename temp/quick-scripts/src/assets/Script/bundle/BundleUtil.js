"use strict";
cc._RF.push(module, 'f71a9cN+AlL4aLKHsUO+4C7', 'BundleUtil');
// Script/bundle/BundleUtil.ts

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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeType = void 0;
var SingleIns_1 = require("./SingleIns");
var CodeType;
(function (CodeType) {
    CodeType["BundleModule"] = "BundleModule";
    CodeType["BundleHotUIHelper"] = "BundleHotUIHelper";
    CodeType["BundleUtil"] = "BundleUtil";
    CodeType["BundleManager"] = "BundleManager";
    CodeType["BundleUnpackHelper"] = "BundleUnpackHelper";
})(CodeType = exports.CodeType || (exports.CodeType = {}));
var BundleUtil = /** @class */ (function (_super) {
    __extends(BundleUtil, _super);
    function BundleUtil() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // makeXMLHttp({url: , callback:(retInfo)=>{}})
    BundleUtil.prototype.makeXMLHttp = function (args) {
        var timeout = args.timeout, url = args.url, callback = args.callback;
        var retInfo = {};
        var isValid = true;
        var xhr = new XMLHttpRequest();
        xhr.timeout = Math.ceil((timeout || 6) * 1000);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                if (!isValid) {
                    return;
                }
                ;
                isValid = false;
                var httpDatas = JSON.parse(xhr.responseText);
                callback({ retData: httpDatas });
            }
            else if (xhr.readyState == 4 && xhr.status == 0) {
                if (!isValid) {
                    return;
                }
                ;
                isValid = false;
                callback({ fail: true });
            }
            else if (xhr.readyState == 4) {
                if (!isValid) {
                    return;
                }
                ;
                isValid = false;
                callback({ fail: true });
            }
        };
        xhr.open('GET', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send();
        xhr.ontimeout = function () {
            if (!isValid) {
                return;
            }
            ;
            isValid = false;
            callback({ isTimeout: true });
        };
        retInfo.abort = function () {
            isValid = false;
            xhr.abort();
        };
        return retInfo;
    };
    //并行任务 return : {addMis: , onFinish:}  
    // let pMis = AppComFunc.parallelMis(callback); 
    // pMis.addMis();
    // pMis.start();
    // pMis.onFinish
    BundleUtil.prototype.parallelMis = function (callback) {
        var co = 0;
        var ret = {};
        co = co + 1;
        var isValid = true;
        var retArgs = {};
        var onFinish = function (args) {
            if (!isValid) {
                return;
            }
            co = co - 1;
            if (args) {
                retArgs = Object.assign(retArgs, args);
            }
            if (co <= 0) {
                if (callback) {
                    callback(retArgs);
                }
            }
        };
        ret.onFinish = onFinish;
        ret.addMis = function () {
            co = co + 1;
            return onFinish;
        };
        ret.start = function () {
            onFinish();
        };
        ret.close = function () {
            isValid = false;
        };
        return ret;
    };
    //顺序任务 idx:0~N,  AppComFunc.sequenceMis(misArr, onAllFolderDetectFinish, (curMis, idx, onExec)=>{ })
    BundleUtil.prototype.sequenceMis = function (misArr, onAllExec, execFunc) {
        cc.log("sequenceMis__enter_:");
        var co = 0;
        var execMis;
        execMis = function () {
            if (co >= misArr.length) {
                onAllExec();
                return;
            }
            var mis = misArr[co];
            var curCo = co;
            co = co + 1;
            execFunc(mis, curCo, execMis);
        };
        execMis();
    };
    // comVersion(localVer, romoteVer)
    // 对比版本号, -1:本地版本比较旧, 0:相等, 1:本地版本比较新
    BundleUtil.prototype.comVersion = function (localVer, romoteVer) {
        var verSplit_local = localVer.split('.');
        var verSplit_remote = romoteVer.split('.');
        var localCo = verSplit_local.length;
        var remoteCo = verSplit_remote.length;
        var maxCo = localCo > remoteCo ? localCo : remoteCo;
        for (var i = 0; i < maxCo; i++) {
            var n_local = parseInt(verSplit_local[i], 10);
            var n_remote = parseInt(verSplit_remote[i], 10);
            if (i < localCo && i >= remoteCo) {
                return 1;
            }
            else if (i >= localCo && i < remoteCo) {
                return -1;
            }
            else if (n_local > n_remote) {
                return 1;
            }
            else if (n_local < n_remote) {
                return -1;
            }
        }
        return 0;
    };
    BundleUtil.prototype.createUUID = function () {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [];
        for (var i = 0; i < 4; i++) {
            uuid[i] = chars[0 | Math.random() * 36];
        }
        var uid = uuid.join('');
        uid = Number(Date.now()).toString(36) + uid;
        return uid;
    };
    BundleUtil.LOG = function (key) {
        var arg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            arg[_i - 1] = arguments[_i];
        }
        cc.log.apply(cc, __spreadArrays(["" + key.toString()], arg));
    };
    return BundleUtil;
}(SingleIns_1.default));
exports.default = BundleUtil;

cc._RF.pop();