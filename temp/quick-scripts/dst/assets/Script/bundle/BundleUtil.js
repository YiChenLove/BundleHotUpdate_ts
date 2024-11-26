
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/bundle/BundleUtil.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvYnVuZGxlL0J1bmRsZVV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBb0M7QUFFcEMsSUFBWSxRQU1YO0FBTkQsV0FBWSxRQUFRO0lBQ2hCLHlDQUE2QixDQUFBO0lBQzdCLG1EQUF1QyxDQUFBO0lBQ3ZDLHFDQUF5QixDQUFBO0lBQ3pCLDJDQUErQixDQUFBO0lBQy9CLHFEQUF5QyxDQUFBO0FBQzdDLENBQUMsRUFOVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQU1uQjtBQUVEO0lBQXdDLDhCQUFTO0lBQWpEOztJQW1JQSxDQUFDO0lBaklHLCtDQUErQztJQUMvQyxnQ0FBVyxHQUFYLFVBQVksSUFBSTtRQUVQLElBQUEsT0FBTyxHQUFtQixJQUFJLFFBQXZCLEVBQUUsR0FBRyxHQUFjLElBQUksSUFBbEIsRUFBRSxRQUFRLEdBQUksSUFBSSxTQUFSLENBQVE7UUFDbkMsSUFBSSxPQUFPLEdBQVEsRUFBRSxDQUFBO1FBRXJCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQTtRQUNsQixJQUFJLEdBQUcsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQy9CLEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxHQUFHLENBQUMsa0JBQWtCLEdBQUc7WUFDckIsSUFBSSxHQUFHLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEVBQUU7Z0JBQ2hFLElBQUcsQ0FBQyxPQUFPLEVBQUM7b0JBQUUsT0FBTTtpQkFBRTtnQkFBQyxDQUFDO2dCQUFDLE9BQU8sR0FBRyxLQUFLLENBQUE7Z0JBQ3hDLElBQUksU0FBUyxH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QUFOLFVBQU0sRUFBTixxQkFBTSxFQUFOLElBQU07WUFBTiw0QkFBTTs7UUFDbkMsRUFBRSxDQUFDLEdBQUcsT0FBTixFQUFFLGtCQUFLLEtBQUcsR0FBRyxDQUFDLFFBQVEsRUFBSSxHQUFJLEdBQUcsR0FBRztJQUN4QyxDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQW5JQSxBQW1JQyxDQW5JdUMsbUJBQVMsR0FtSWhEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNpbmdsZUlucyBmcm9tIFwiLi9TaW5nbGVJbnNcIjtcblxuZXhwb3J0IGVudW0gQ29kZVR5cGUge1xuICAgIEJ1bmRsZU1vZHVsZSA9IFwiQnVuZGxlTW9kdWxlXCIsXG4gICAgQnVuZGxlSG90VUlIZWxwZXIgPSBcIkJ1bmRsZUhvdFVJSGVscGVyXCIsXG4gICAgQnVuZGxlVXRpbCA9IFwiQnVuZGxlVXRpbFwiLFxuICAgIEJ1bmRsZU1hbmFnZXIgPSBcIkJ1bmRsZU1hbmFnZXJcIixcbiAgICBCdW5kbGVVbnBhY2tIZWxwZXIgPSBcIkJ1bmRsZVVucGFja0hlbHBlclwiLFxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdW5kbGVVdGlsIGV4dGVuZHMgU2luZ2xlSW5ze1xuXG4gICAgLy8gbWFrZVhNTEh0dHAoe3VybDogLCBjYWxsYmFjazoocmV0SW5mbyk9Pnt9fSlcbiAgICBtYWtlWE1MSHR0cChhcmdzKXtcblxuICAgICAgICBsZXQge3RpbWVvdXQsIHVybCwgY2FsbGJhY2t9ID0gYXJnc1xuICAgICAgICBsZXQgcmV0SW5mbzogYW55ID0ge31cblxuICAgICAgICBsZXQgaXNWYWxpZCA9IHRydWVcbiAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4aHIudGltZW91dCA9IE1hdGguY2VpbCgodGltZW91dCB8fCA2KSoxMDAwKTtcbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHsgXG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDQwMCkpIHtcbiAgICAgICAgICAgICAgICBpZighaXNWYWxpZCl7IHJldHVybiB9IDsgaXNWYWxpZCA9IGZhbHNlIFxuICAgICAgICAgICAgICAgIHZhciBodHRwRGF0YXMgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpOyBcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh7cmV0RGF0YTpodHRwRGF0YXN9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiB4aHIuc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgICAgICBpZighaXNWYWxpZCl7IHJldHVybiB9IDsgaXNWYWxpZCA9IGZhbHNlICBcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh7ZmFpbDp0cnVlfSlcblxuICAgICAgICAgICAgfWVsc2UgaWYgKHhoci5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgICAgICAgICBpZighaXNWYWxpZCl7IHJldHVybiB9IDsgaXNWYWxpZCA9IGZhbHNlICBcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh7ZmFpbDp0cnVlfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwsIHRydWUpOyBcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLTgnKTsgXG4gICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZighaXNWYWxpZCl7IHJldHVybiB9IDsgaXNWYWxpZCA9IGZhbHNlICBcbiAgICAgICAgICAgIGNhbGxiYWNrKHtpc1RpbWVvdXQ6dHJ1ZX0pXG4gICAgICAgIH07IFxuICAgICAgICByZXRJbmZvLmFib3J0ID0gKCk9PntcbiAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZVxuICAgICAgICAgICAgeGhyLmFib3J0KClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0SW5mb1xuICAgIH1cblxuICAgIC8v5bm26KGM5Lu75YqhIHJldHVybiA6IHthZGRNaXM6ICwgb25GaW5pc2g6fSAgXG4gICAgLy8gbGV0IHBNaXMgPSBBcHBDb21GdW5jLnBhcmFsbGVsTWlzKGNhbGxiYWNrKTsgXG4gICAgLy8gcE1pcy5hZGRNaXMoKTtcbiAgICAvLyBwTWlzLnN0YXJ0KCk7XG4gICAgLy8gcE1pcy5vbkZpbmlzaFxuICAgIHBhcmFsbGVsTWlzKGNhbGxiYWNrKXtcbiAgICAgICAgbGV0IGNvID0gMDtcbiAgICAgICAgbGV0IHJldDogYW55ID0ge307XG4gICAgICAgIGNvID0gY28rMTtcbiAgICAgICAgbGV0IGlzVmFsaWQgPSB0cnVlXG4gICAgICAgIGxldCByZXRBcmdzID0ge31cbiAgICAgICAgbGV0IG9uRmluaXNoIDpGdW5jdGlvbiA9IGZ1bmN0aW9uKGFyZ3Mpe1xuICAgICAgICAgICAgaWYoIWlzVmFsaWQpeyByZXR1cm4gfVxuICAgICAgICAgICAgY28gPSBjby0xO1xuICAgICAgICAgICAgaWYoYXJncyl7XG4gICAgICAgICAgICAgICAgcmV0QXJncyA9IE9iamVjdC5hc3NpZ24ocmV0QXJncywgYXJncylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGNvPD0wKXtcbiAgICAgICAgICAgICAgICBpZihjYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJldEFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXQub25GaW5pc2ggPSBvbkZpbmlzaDtcbiAgICAgICAgcmV0LmFkZE1pcyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjbyA9IGNvKzE7XG4gICAgICAgICAgICByZXR1cm4gb25GaW5pc2g7XG4gICAgICAgIH1cbiAgICAgICAgcmV0LnN0YXJ0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIG9uRmluaXNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0LmNsb3NlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgLy/pobrluo/ku7vliqEgaWR4OjB+TiwgIEFwcENvbUZ1bmMuc2VxdWVuY2VNaXMobWlzQXJyLCBvbkFsbEZvbGRlckRldGVjdEZpbmlzaCwgKGN1ck1pcywgaWR4LCBvbkV4ZWMpPT57IH0pXG4gICAgc2VxdWVuY2VNaXMobWlzQXJyLCBvbkFsbEV4ZWMsIGV4ZWNGdW5jKXtcbiAgICAgICAgY2MubG9nKFwic2VxdWVuY2VNaXNfX2VudGVyXzpcIilcbiAgICAgICAgbGV0IGNvID0gMFxuICAgICAgICBsZXQgZXhlY01pcyA7XG4gICAgICAgIGV4ZWNNaXMgPSAoKT0+e1xuICAgICAgICAgICAgaWYoY28+PW1pc0Fyci5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIG9uQWxsRXhlYygpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG1pcyA9IG1pc0Fycltjb11cbiAgICAgICAgICAgIGxldCBjdXJDbyA9IGNvXG4gICAgICAgICAgICBjbz1jbysxIFxuICAgICAgICAgICAgZXhlY0Z1bmMobWlzLCBjdXJDbywgZXhlY01pcylcbiAgICAgICAgfSBcbiAgICAgICAgZXhlY01pcygpIFxuICAgIH1cblxuICAgIC8vIGNvbVZlcnNpb24obG9jYWxWZXIsIHJvbW90ZVZlcilcbiAgICAvLyDlr7nmr5TniYjmnKzlj7csIC0xOuacrOWcsOeJiOacrOavlOi+g+aXpywgMDrnm7jnrYksIDE65pys5Zyw54mI5pys5q+U6L6D5pawXG4gICAgY29tVmVyc2lvbihsb2NhbFZlciwgcm9tb3RlVmVyKXtcbiAgICAgICAgbGV0IHZlclNwbGl0X2xvY2FsICA9IGxvY2FsVmVyLnNwbGl0KCcuJylcbiAgICAgICAgbGV0IHZlclNwbGl0X3JlbW90ZSA9IHJvbW90ZVZlci5zcGxpdCgnLicpXG4gICAgICAgIGxldCBsb2NhbENvICA9IHZlclNwbGl0X2xvY2FsLmxlbmd0aFxuICAgICAgICBsZXQgcmVtb3RlQ28gPSB2ZXJTcGxpdF9yZW1vdGUubGVuZ3RoXG4gICAgICAgIGxldCBtYXhDbyA9IGxvY2FsQ28+cmVtb3RlQ28/bG9jYWxDbyA6IHJlbW90ZUNvXG4gICAgICAgIFxuICAgICAgICBmb3IobGV0IGk9MDtpPG1heENvO2krKyl7XG4gICAgICAgICAgICBsZXQgbl9sb2NhbCA9IHBhcnNlSW50KHZlclNwbGl0X2xvY2FsW2ldLCAxMCk7IFxuICAgICAgICAgICAgbGV0IG5fcmVtb3RlID0gcGFyc2VJbnQodmVyU3BsaXRfcmVtb3RlW2ldLCAxMCk7IFxuXG4gICAgICAgICAgICBpZihpPGxvY2FsQ28gJiYgaT49cmVtb3RlQ28peyByZXR1cm4gMSB9XG4gICAgICAgICAgICBlbHNlIGlmKGk+PWxvY2FsQ28gJiYgaTxyZW1vdGVDbykgeyByZXR1cm4gLTF9IFxuICAgICAgICAgICAgZWxzZSBpZihuX2xvY2FsPm5fcmVtb3RlKXsgcmV0dXJuIDF9XG4gICAgICAgICAgICBlbHNlIGlmKG5fbG9jYWw8bl9yZW1vdGUpeyByZXR1cm4gLTF9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDBcbiAgICB9XG5cbiAgICBjcmVhdGVVVUlEKCl7XG4gICAgICAgIHZhciBjaGFycyA9ICcwMTIzNDU2Nzg5QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eicuc3BsaXQoJycpOyBcbiAgICAgICAgdmFyIHV1aWQgPSBbXTsgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgdXVpZFtpXSA9IGNoYXJzWzAgfCBNYXRoLnJhbmRvbSgpKjM2XTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdWlkID0gdXVpZC5qb2luKCcnKTtcbiAgICAgICAgdWlkID0gTnVtYmVyKERhdGUubm93KCkpLnRvU3RyaW5nKDM2KSArIHVpZCBcbiAgICAgICAgcmV0dXJuIHVpZFxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgTE9HIChrZXk6IENvZGVUeXBlLC4uLmFyZyl7IFxuICAgICAgICBjYy5sb2coYCR7a2V5LnRvU3RyaW5nKCl9YCwuLi5hcmcpIDsgXG4gICAgfVxufVxuIl19