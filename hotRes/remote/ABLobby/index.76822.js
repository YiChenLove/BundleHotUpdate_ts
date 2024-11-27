window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  LobbyRoot: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2161bQyOEBLz6RQ7cDhO2yO", "LobbyRoot");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __spreadArrays = this && this.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
      k++) r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BundleManager_1 = require("../../../Script/bundle/BundleManager");
    var JS_LOG = function() {
      var arg = [];
      for (var _i = 0; _i < arguments.length; _i++) arg[_i] = arguments[_i];
      cc.log.apply(cc, __spreadArrays([ "[LobbyRoot]" ], arg));
    };
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LobbyRoot = function(_super) {
      __extends(LobbyRoot, _super);
      function LobbyRoot() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      LobbyRoot.prototype.initModule = function() {
        JS_LOG("initModule");
        cc.log("---------\x3edddxin");
      };
      LobbyRoot.prototype.onBtn_loadGame_1 = function() {
        var _this = this;
        JS_LOG("onBtn_loadGame_1");
        this.removeGame_1();
        this.loadSubGame("ABSubGame1", function(moduleObj) {
          var abObj = moduleObj.getABObj();
          abObj.load("root/Scene/SubGame1", cc.Prefab, function(err, prefab) {
            JS_LOG("load_game1_prefab_:", JSON.stringify(err));
            var _node = cc.instantiate(prefab);
            _this.node.addChild(_node, 100);
            _this._game1 = _node;
            _node.getComponent("SubGame_1").initModule({
              lobbyRoot: _this
            });
          });
        });
      };
      LobbyRoot.prototype.removeGame_1 = function() {
        this._game1 && this._game1.destroy();
        this._game1 = null;
      };
      LobbyRoot.prototype.onBtn_loadGame_2 = function() {
        var _this = this;
        JS_LOG("onBtn_loadGame_2");
        this.removeGame_2();
        this.loadSubGame("ABSubGame2", function(moduleObj) {
          var abObj = moduleObj.getABObj();
          abObj.load("root/Scene/SubGame2", cc.Prefab, function(err, prefab) {
            JS_LOG("load_game2_prefab_:", JSON.stringify(err));
            var _node = cc.instantiate(prefab);
            _this.node.addChild(_node, 100);
            _this._game2 = _node;
            _node.getComponent("SubGame_2").initModule({
              lobbyRoot: _this
            });
          });
        });
      };
      LobbyRoot.prototype.removeGame_2 = function() {
        this._game2 && this._game2.destroy();
        this._game2 = null;
      };
      LobbyRoot.prototype.loadSubGame = function(abName, callback) {
        BundleManager_1.default.getInstance().hotUpdateMultiModule([ abName ], function() {
          BundleManager_1.default.getInstance().addModule(abName, function(moduleObj) {
            callback(moduleObj);
          });
        });
      };
      LobbyRoot = __decorate([ ccclass ], LobbyRoot);
      return LobbyRoot;
    }(cc.Component);
    exports.default = LobbyRoot;
    cc._RF.pop();
  }, {
    "../../../Script/bundle/BundleManager": void 0
  } ]
}, {}, [ "LobbyRoot" ]);