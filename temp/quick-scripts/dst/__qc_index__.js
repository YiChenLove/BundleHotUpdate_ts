
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/ABLobby/root/Script/LobbyRoot');
require('./assets/ABSubGame1/root/Script/SubGame_1');
require('./assets/ABSubGame2/root/Script/SubGame_2');
require('./assets/Script/HelloWorld');
require('./assets/Script/bundle/BundleHotUIHelper');
require('./assets/Script/bundle/BundleManager');
require('./assets/Script/bundle/BundleModule');
require('./assets/Script/bundle/BundleUnpackHelper');
require('./assets/Script/bundle/BundleUtil');
require('./assets/Script/bundle/Const');
require('./assets/Script/bundle/SingleIns');

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