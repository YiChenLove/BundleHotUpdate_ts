// BundleHotUIHelper  热更新的一些界面提示
import BundleUtil, { CodeType } from './BundleUtil';
import SingleIns from './SingleIns';

export default class BundleHotUIHelper extends SingleIns<BundleHotUIHelper>() {
    hideUpdating(callback) {
        BundleUtil.LOG(CodeType.BundleHotUIHelper, 'hideUpdating');
        callback && callback();
    }

    // 下载进度
    onProgress(curMis, totalMis, finish, total) {
        // this.misNum.string = curMis + "/" + totalMis
        // this.update_proBar.progress = 1.0*finish/total
        BundleUtil.LOG(
            CodeType.BundleHotUIHelper,
            `onProgress : curMis_${curMis},totalMis_${totalMis},finish_${finish},total_${total}`
        );
    }

    showUpdating(curMis, totalMis) {
        // this.node.active = true
    }

    showHotAlert(isNeedRestart, callback) {
        BundleUtil.LOG(CodeType.BundleHotUIHelper, 'showHotAlert');
        callback && callback();
    }

    showAlertClientTooOld() {
        BundleUtil.LOG(CodeType.BundleHotUIHelper, 'showAlertClientTooOld');
    }

    onBtn_ClientTooOld() {
        BundleUtil.LOG(CodeType.BundleHotUIHelper, 'onBtn_ClientTooOld');
        cc.game.end();
    }

    //--------------------------------------------------------->> 解压资源
    unpackageShow() {
        BundleUtil.LOG(CodeType.BundleHotUIHelper, 'unpackageShow');
    }

    unpackageUpdateProgress(finish, total) {
        BundleUtil.LOG(CodeType.BundleHotUIHelper, 'unpackageUpdateProgress_:', finish, total);
    }
    unpackageFinish() {
        BundleUtil.LOG(CodeType.BundleHotUIHelper, 'unpackageFinish');
    }

    //---------------------------------------------------------<< 解压资源

    //--------------------------------------------------------->> 获取新版本号提示
    checkNewVersionShow() {
        BundleUtil.LOG(CodeType.BundleHotUIHelper, 'checkNewVersionShow');
    }

    checkNewVersionHide() {
        BundleUtil.LOG(CodeType.BundleHotUIHelper, 'checkNewVersionHide');
    }
    //---------------------------------------------------------<< 获取新版本号提示
}
