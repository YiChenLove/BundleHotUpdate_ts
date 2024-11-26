
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ABLobby/root/Script/LobbyRoot.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2161bQyOEBLz6RQ7cDhO2yO', 'LobbyRoot');
// ABLobby/root/Script/LobbyRoot.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var BundleManager_1 = require("../../../Script/bundle/BundleManager");
var JS_LOG = function () {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    cc.log.apply(cc, __spreadArrays(["[LobbyRoot]"], arg));
};
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LobbyRoot = /** @class */ (function (_super) {
    __extends(LobbyRoot, _super);
    function LobbyRoot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LobbyRoot.prototype.initModule = function () {
        JS_LOG("initModule");
    };
    LobbyRoot.prototype.onBtn_loadGame_1 = function () {
        var _this = this;
        JS_LOG("onBtn_loadGame_1");
        this.removeGame_1();
        this.loadSubGame("ABSubGame1", function (moduleObj) {
            var abObj = moduleObj.getABObj();
            abObj.load('root/Scene/SubGame1', cc.Prefab, function (err, prefab) {
                JS_LOG("load_game1_prefab_:", JSON.stringify(err));
                var _node = cc.instantiate(prefab);
                _this.node.addChild(_node, 100);
                _this._game1 = _node;
                _node.getComponent("SubGame_1").initModule({ lobbyRoot: _this });
            });
        });
        // 模块内加载自身资源
        // let module = _G_bundleMgr.getModule("ABLobby")
        // let assetBundle = module.getABObj()
        // assetBundle.load('root/Scene/xxx', cc.Prefab, (err, prefab)=>{    
        //     //...
        // }) 
    };
    LobbyRoot.prototype.removeGame_1 = function () {
        if (this._game1) {
            this._game1.destroy();
        }
        this._game1 = null;
    };
    LobbyRoot.prototype.onBtn_loadGame_2 = function () {
        var _this = this;
        JS_LOG("onBtn_loadGame_2");
        this.removeGame_2();
        this.loadSubGame("ABSubGame2", function (moduleObj) {
            var abObj = moduleObj.getABObj();
            abObj.load('root/Scene/SubGame2', cc.Prefab, function (err, prefab) {
                JS_LOG("load_game2_prefab_:", JSON.stringify(err));
                var _node = cc.instantiate(prefab);
                _this.node.addChild(_node, 100);
                _this._game2 = _node;
                _node.getComponent("SubGame_2").initModule({ lobbyRoot: _this });
            });
        });
    };
    LobbyRoot.prototype.removeGame_2 = function () {
        if (this._game2) {
            this._game2.destroy();
        }
        this._game2 = null;
    };
    LobbyRoot.prototype.loadSubGame = function (abName, callback) {
        BundleManager_1.default.getInstance().hotUpdateMultiModule([abName], function () {
            BundleManager_1.default.getInstance().addModule(abName, function (moduleObj) {
                callback(moduleObj);
            });
        });
    };
    LobbyRoot = __decorate([
        ccclass
    ], LobbyRoot);
    return LobbyRoot;
}(cc.Component));
exports.default = LobbyRoot;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9BQkxvYmJ5L3Jvb3QvU2NyaXB0L0xvYmJ5Um9vdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQWlFO0FBRWpFLElBQUksTUFBTSxHQUFHO0lBQVMsYUFBTTtTQUFOLFVBQU0sRUFBTixxQkFBTSxFQUFOLElBQU07UUFBTix3QkFBTTs7SUFDeEIsRUFBRSxDQUFDLEdBQUcsT0FBTixFQUFFLGtCQUFLLGFBQWEsR0FBSSxHQUFHLEdBQUc7QUFDbEMsQ0FBQyxDQUFBO0FBQ0ssSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBdUMsNkJBQVk7SUFBbkQ7O0lBZ0ZBLENBQUM7SUEzRUcsOEJBQVUsR0FBVjtRQUNDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUNyQixDQUFDO0lBRUQsb0NBQWdCLEdBQWhCO1FBQUEsaUJBMEJDO1FBekJBLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO1FBQzFCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtRQUVuQixJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxVQUFDLFNBQVM7WUFDeEMsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFBO1lBRTFCLEtBQUssQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLEdBQUcsRUFBRSxNQUFNO2dCQUNyRCxNQUFNLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBRSxDQUFBO2dCQUNuRCxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUNsQyxLQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUE7Z0JBQzlCLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO2dCQUNuQixLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFDLFNBQVMsRUFBQyxLQUFJLEVBQUMsQ0FBQyxDQUFBO1lBRWhFLENBQUMsQ0FBQyxDQUFBO1FBQ1QsQ0FBQyxDQUFDLENBQUE7UUFJQyxZQUFZO1FBQ1osaURBQWlEO1FBQ2pELHNDQUFzQztRQUN0QyxxRUFBcUU7UUFDckUsWUFBWTtRQUNaLE1BQU07SUFFVixDQUFDO0lBRUQsZ0NBQVksR0FBWjtRQUNDLElBQUcsSUFBSSxDQUFDLE1BQU0sRUFBQztZQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUE7U0FDckI7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtJQUNuQixDQUFDO0lBR0Qsb0NBQWdCLEdBQWhCO1FBQUEsaUJBZ0JDO1FBZkEsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUE7UUFDMUIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFBO1FBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLFVBQUMsU0FBUztZQUN4QyxJQUFJLEtBQUssR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUE7WUFFMUIsS0FBSyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUMsR0FBRyxFQUFFLE1BQU07Z0JBQ3JELE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFFLENBQUE7Z0JBQ25ELElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUE7Z0JBQ2xDLEtBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQTtnQkFDOUIsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7Z0JBQ25CLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUMsU0FBUyxFQUFDLEtBQUksRUFBQyxDQUFDLENBQUE7WUFFaEUsQ0FBQyxDQUFDLENBQUE7UUFDVCxDQUFDLENBQUMsQ0FBQTtJQUVILENBQUM7SUFDRCxnQ0FBWSxHQUFaO1FBQ0MsSUFBRyxJQUFJLENBQUMsTUFBTSxFQUFDO1lBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtTQUNyQjtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO0lBRW5CLENBQUM7SUFHRCwrQkFBVyxHQUFYLFVBQVksTUFBTSxFQUFFLFFBQVE7UUFDeEIsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFDO1lBRXRELHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxVQUFDLFNBQVM7Z0JBQ3BELFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUN2QixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQTlFZ0IsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQWdGN0I7SUFBRCxnQkFBQztDQWhGRCxBQWdGQyxDQWhGc0MsRUFBRSxDQUFDLFNBQVMsR0FnRmxEO2tCQWhGb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCdW5kbGVNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9TY3JpcHQvYnVuZGxlL0J1bmRsZU1hbmFnZXJcIjtcblxubGV0IEpTX0xPRyA9IGZ1bmN0aW9uKC4uLmFyZyl7IFxuICAgIGNjLmxvZyhcIltMb2JieVJvb3RdXCIsLi4uYXJnKSA7IFxufVxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2JieVJvb3QgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAgIF9nYW1lMTogYW55O1xuICAgIF9nYW1lMjogYW55O1xuXG5cbiAgICBpbml0TW9kdWxlKCl7XG4gICAgXHRKU19MT0coXCJpbml0TW9kdWxlXCIpXG4gICAgfVxuXG4gICAgb25CdG5fbG9hZEdhbWVfMSgpe1xuICAgIFx0SlNfTE9HKFwib25CdG5fbG9hZEdhbWVfMVwiKVxuICAgIFx0dGhpcy5yZW1vdmVHYW1lXzEoKVxuXG4gICAgXHR0aGlzLmxvYWRTdWJHYW1lKFwiQUJTdWJHYW1lMVwiLCAobW9kdWxlT2JqKT0+e1xuICAgIFx0XHRsZXQgYWJPYmogPSBtb2R1bGVPYmouZ2V0QUJPYmooKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgYWJPYmoubG9hZCgncm9vdC9TY2VuZS9TdWJHYW1lMScsIGNjLlByZWZhYiwgKGVyciwgcHJlZmFiKT0+e1xuICAgICAgICAgICAgICAgIEpTX0xPRyhcImxvYWRfZ2FtZTFfcHJlZmFiXzpcIiwgSlNPTi5zdHJpbmdpZnkoZXJyKSApIFxuICAgICAgICAgICAgICAgIGxldCBfbm9kZSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYikgXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKF9ub2RlLCAxMDApXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2FtZTEgPSBfbm9kZVxuICAgICAgICAgICAgICAgIF9ub2RlLmdldENvbXBvbmVudChcIlN1YkdhbWVfMVwiKS5pbml0TW9kdWxlKHtsb2JieVJvb3Q6dGhpc30pICAgIFxuXG4gICAgICAgICAgICB9KSBcbiAgICBcdH0pXG5cblxuXG4gICAgICAgIC8vIOaooeWdl+WGheWKoOi9veiHqui6q+i1hOa6kFxuICAgICAgICAvLyBsZXQgbW9kdWxlID0gX0dfYnVuZGxlTWdyLmdldE1vZHVsZShcIkFCTG9iYnlcIilcbiAgICAgICAgLy8gbGV0IGFzc2V0QnVuZGxlID0gbW9kdWxlLmdldEFCT2JqKClcbiAgICAgICAgLy8gYXNzZXRCdW5kbGUubG9hZCgncm9vdC9TY2VuZS94eHgnLCBjYy5QcmVmYWIsIChlcnIsIHByZWZhYik9PnsgICAgXG4gICAgICAgIC8vICAgICAvLy4uLlxuICAgICAgICAvLyB9KSBcblxuICAgIH1cblxuICAgIHJlbW92ZUdhbWVfMSgpe1xuICAgIFx0aWYodGhpcy5fZ2FtZTEpe1xuICAgIFx0XHR0aGlzLl9nYW1lMS5kZXN0cm95KClcbiAgICBcdH1cbiAgICBcdHRoaXMuX2dhbWUxID0gbnVsbFxuICAgIH1cblxuXG4gICAgb25CdG5fbG9hZEdhbWVfMigpe1xuICAgIFx0SlNfTE9HKFwib25CdG5fbG9hZEdhbWVfMlwiKVxuICAgIFx0dGhpcy5yZW1vdmVHYW1lXzIoKVxuICAgIFx0dGhpcy5sb2FkU3ViR2FtZShcIkFCU3ViR2FtZTJcIiwgKG1vZHVsZU9iaik9PntcbiAgICBcdFx0bGV0IGFiT2JqID0gbW9kdWxlT2JqLmdldEFCT2JqKClcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGFiT2JqLmxvYWQoJ3Jvb3QvU2NlbmUvU3ViR2FtZTInLCBjYy5QcmVmYWIsIChlcnIsIHByZWZhYik9PntcbiAgICAgICAgICAgICAgICBKU19MT0coXCJsb2FkX2dhbWUyX3ByZWZhYl86XCIsIEpTT04uc3RyaW5naWZ5KGVycikgKSBcbiAgICAgICAgICAgICAgICBsZXQgX25vZGUgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWIpIFxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChfbm9kZSwgMTAwKVxuICAgICAgICAgICAgICAgIHRoaXMuX2dhbWUyID0gX25vZGVcbiAgICAgICAgICAgICAgICBfbm9kZS5nZXRDb21wb25lbnQoXCJTdWJHYW1lXzJcIikuaW5pdE1vZHVsZSh7bG9iYnlSb290OnRoaXN9KSAgICBcblxuICAgICAgICAgICAgfSkgXG4gICAgXHR9KVxuXG4gICAgfVxuICAgIHJlbW92ZUdhbWVfMigpe1xuICAgIFx0aWYodGhpcy5fZ2FtZTIpe1xuICAgIFx0XHR0aGlzLl9nYW1lMi5kZXN0cm95KClcbiAgICBcdH1cbiAgICBcdHRoaXMuX2dhbWUyID0gbnVsbFxuXG4gICAgfVxuXG5cbiAgICBsb2FkU3ViR2FtZShhYk5hbWUsIGNhbGxiYWNrKXsgXG4gICAgICAgIEJ1bmRsZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ob3RVcGRhdGVNdWx0aU1vZHVsZShbYWJOYW1lXSwoKT0+e1xuXG4gICAgICAgICAgICBCdW5kbGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkTW9kdWxlKGFiTmFtZSwgKG1vZHVsZU9iaik9PntcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhtb2R1bGVPYmopXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxufSJdfQ==