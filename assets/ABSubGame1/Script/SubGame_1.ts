let JS_LOG = function (...arg) {
    cc.log('[SubGame_1]', ...arg);
};

const { ccclass, property } = cc._decorator;

@ccclass
export default class SubGame_2 extends cc.Component {
    _lobbyRoot: any;

    initModule(args) {
        JS_LOG('initModule');
        let { lobbyRoot } = args;
        this._lobbyRoot = lobbyRoot;
    }

    onBtn_close() {
        JS_LOG('btn_close');
        this._lobbyRoot.removeGame_1();
    }
}
