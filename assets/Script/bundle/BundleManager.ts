import BundleModule from './BundleModule';
import SingleIns from './SingleIns';
import BundleHotUIHelper from './BundleHotUIHelper';
import BundleUtil, { CodeType } from './BundleUtil';
import BundleUnpackHelper from './BundleUnpackHelper';
import { ModuleConst, GlobalConst } from './Const';

export default class BundleManager extends SingleIns<BundleManager>() {
    _bundleUtil: BundleUtil;
    _unpackage: BundleUnpackHelper;
    _bundleHotUIHelper: BundleHotUIHelper;
    _nativeRootPath: string;
    _useHotUpdate: any;
    _lastReq_VersionInfoTime: number;
    _detectNewVersionInterval: number;
    modules: any = {};
    _local_data_key: string;
    _local_Version: any;
    _romoteVersion: { clientMin: string; modules: {} };
    _reqLoopHandler: any;
    _httpReqHandler: any;
    _timeOutIds: number[] = [];

    initCom(args) {
        this._bundleUtil = BundleUtil.inst;
        this._unpackage = BundleUnpackHelper.inst;
        this._bundleHotUIHelper = BundleHotUIHelper.inst;

        // jsb.fileUtils.getDefaultResourceRootPath()
        this._nativeRootPath = args.assetPath;
        BundleUtil.LOG(CodeType.BundleManager, '_nativeRootPath:', this._nativeRootPath);

        this._lastReq_VersionInfoTime = 0; //(new Date()).getTime()  // 最后一次检测版本时间
        this._detectNewVersionInterval = 30; // 自动检测版本间隔

        this.modules = {};

        this._local_data_key = ModuleConst.localVersionConfigKey; //"_local_gameVersionData1"
        let versionData = cc.sys.localStorage.getItem(this._local_data_key);
        if (!versionData) {
            versionData = this.createDefaultVersionData();
        } else {
            versionData = JSON.parse(versionData);
        }
        this._local_Version = versionData;

        this._romoteVersion = this.createDefaultVersionData();

        this._useHotUpdate = args;
        this._unpackage.initCom(args);
    }

    execUnpackage(onComplate) {
        this._unpackage.execUnpackage(onComplate);
    }

    getNativePath() {
        return this._nativeRootPath;
    }

    reqLoopVersionInfo() {
        if (this._useHotUpdate) {
            if (this._reqLoopHandler) {
                return;
            }
            this._reqLoopHandler = () => {
                this.reqVersionInfo();
            };
            this.intervalSchedule(this._reqLoopHandler, this._detectNewVersionInterval);
        }
    }

    // 更新AB版本号 , 新包安装解压资源后覆盖版本号
    setLocalAbVersion(verObj) {
        let localMap = this._local_Version;
        for (let abName in verObj) {
            let verStr = verObj[abName];

            if (!localMap.modules[abName]) {
                // 运营中新增模块
                localMap.modules[abName] = {};
            }
            localMap.modules[abName].resVersion = verStr;
        }

        cc.sys.localStorage.setItem(this._local_data_key, JSON.stringify(this._local_Version));
    }

    get_LocalVersion() {
        return this._local_Version;
    }

    get_RomoteVersion() {
        return this._romoteVersion;
    }

    createDefaultVersionData() {
        let ret = {
            clientMin: '1.0.0',
            modules: {}
        };
        return ret;
    }

    // 更新所有模块
    hotUpdateAllModule(callback, isShowHotDetectAlert) {
        if (!this._useHotUpdate) {
            callback && callback();
            return false;
        }

        // 显示正在检测更新提示
        if (isShowHotDetectAlert) {
            this._bundleHotUIHelper.checkNewVersionShow();
        }

        return this.hotUpdateMultiModule(Object.keys(this._romoteVersion.modules), () => {
            this._bundleHotUIHelper.checkNewVersionHide();
            callback();
        });
    }

    // 置顶更新模块
    public hotUpdateMultiModule(moduleNameArr, callback) {
        if (this.isNeedReq_versionInfo()) {
            this.reqVersionInfo(() => {
                this._doHotUpdateMulti(moduleNameArr, callback);
            });
        } else {
            this._doHotUpdateMulti(moduleNameArr, callback);
        }
    }

    _doHotUpdateMulti(moduleNameArr, callback) {
        if (!this._useHotUpdate) {
            callback && callback();
            return false;
        }

        // 大版本太旧
        if (
            -1 ==
            this._bundleUtil.comVersion(GlobalConst.Client_Version, this._romoteVersion.clientMin)
        ) {
            this._bundleHotUIHelper.showAlertClientTooOld();
            return;
        }
        BundleUtil.LOG(CodeType.BundleManager, 'moduleName_ori:', JSON.stringify(moduleNameArr));
        moduleNameArr = this.getDependModule(moduleNameArr);
        BundleUtil.LOG(CodeType.BundleManager, 'moduleName_dep:', JSON.stringify(moduleNameArr));

        // isShowHotUI
        let need_Update = false;
        let need_Restart = false;

        // 所有module更新完成
        let onAllModuleHotFinish = () => {
            BundleUtil.LOG(CodeType.BundleManager, 'hot_update_-AllHot_Finish');
            cc.sys.localStorage.setItem(this._local_data_key, JSON.stringify(this._local_Version));
            if (need_Restart) {
                // this.scheduleOnce(()=>{
                //     // cc.sys.restartVM()
                //     cc.game.restart();
                // }, 0.1)
                setTimeout(() => {
                    cc.game.restart();
                }, 100);
            } else {
                callback && callback();
            }
        };

        // 下载 assets bundle 资源
        let needUpdateNames = [];
        let preloadDir = () => {
            this._bundleUtil.sequenceMis(
                needUpdateNames,
                () => {
                    BundleUtil.LOG(CodeType.BundleManager, 'hot_update_-allPreloadFinish');
                    // 所有任务完成
                    this._bundleHotUIHelper.hideUpdating(onAllModuleHotFinish);
                },
                (curMis, idx, onExec) => {
                    // 每个预加载任务
                    let curMisIdx = idx + 1;
                    let totalMis = needUpdateNames.length;
                    let moduleObj = this.modules[needUpdateNames[idx]];
                    moduleObj.preloadModule(
                        (finish, total, item) => {
                            // BundleUtil.LOG(CodeType.BundleManager, "hot_update_-onProgress_info_:", curMisIdx, finish, total, item.url )
                            this._bundleHotUIHelper.onProgress(curMisIdx, totalMis, finish, total);
                        },
                        (items) => {
                            BundleUtil.LOG(
                                CodeType.BundleManager,
                                'hot_update_-preloadOK_:',
                                needUpdateNames[idx]
                            );
                            onExec();
                        }
                    );
                }
            );
        };

        // ------------------------------------------- 顺序下载配置
        this._bundleUtil.sequenceMis(
            moduleNameArr,
            () => {
                // 所有配置下载完成
                if (need_Update) {
                    this._bundleHotUIHelper.showUpdating(1, needUpdateNames.length);
                    this._bundleHotUIHelper.showHotAlert(need_Restart, () => {
                        preloadDir();
                    });
                } else {
                    onAllModuleHotFinish();
                }
            },
            (curMis, idx, onExec) => {
                // 每个预加载任务
                let moduleName = moduleNameArr[idx];
                let retTemp = {};
                retTemp = this._hotUpdateModule(moduleName, (hot_ret) => {
                    let { haveNewVer, needRestart } = hot_ret;
                    if (haveNewVer) {
                        need_Update = true;
                        needUpdateNames.push(moduleName);
                    }
                    if (needRestart) {
                        need_Restart = true;
                    }
                    onExec();
                });
                // ------------------------------------------
            }
        );
    }

    // 获取依赖模块, 并排序
    getDependModule(names, h?) {
        h = h || 1;
        let rms = this._romoteVersion.modules;
        let ret: any = {};
        for (let idx in names) {
            let n_1 = names[idx];
            ret[n_1] = { name: n_1, priority: rms[n_1].priority };

            let depends = this.getDependModule(rms[n_1].depend || [], h + 1);
            for (let j in depends) {
                let n_2 = depends[j];
                ret[n_2] = { name: n_2, priority: rms[n_2].priority };
            }
        }
        //排序, 优先级高的先更新
        if (h == 1) {
            let minfos: any = Object.values(ret);
            minfos.sort(function (a: any, b: any) {
                if (a.priority > b.priority) {
                    return -1;
                }
                return 1;
            });
            ret = {};
            for (let idx in minfos) {
                ret[minfos[idx].name] = 1;
            }
        }

        return Object.keys(ret);
    }

    // 更新到最新版本
    _hotUpdateModule(moduleName, callback) {
        if (!this._useHotUpdate) {
            let ret = { haveNewVer: false, needRestart: false };
            callback && callback(ret);
            return ret;
        }

        let local_Ver = this._local_Version.modules[moduleName].resVersion;
        let romoteVer = this._romoteVersion.modules[moduleName].resVersion;
        let moduleObj = this.modules[moduleName];

        BundleUtil.LOG(
            CodeType.BundleManager,
            'version_info_data_-local:',
            JSON.stringify(this._local_Version)
        );
        BundleUtil.LOG(
            CodeType.BundleManager,
            'version_info_data_-remote:',
            JSON.stringify(this._romoteVersion)
        );

        let ret = { haveNewVer: local_Ver != romoteVer, needRestart: false };

        let loadVerFunc = (mObj, ver, cb) => {
            mObj.loadAB(() => {
                if (local_Ver != romoteVer) {
                    this._local_Version.modules[moduleName].resVersion = romoteVer;
                    this._local_Version.modules[moduleName].showVer =
                        this._romoteVersion.modules[moduleName].showVer;
                }
                cb && cb();
            }, ver);
        };

        if (!moduleObj) {
            // 未加载过, 更新后不需要重启
            moduleObj = new BundleModule();
            loadVerFunc(moduleObj.init(moduleName, local_Ver != romoteVer), romoteVer, () => {
                this.modules[moduleName] = moduleObj;
                callback && callback(ret);
            });
        } else {
            // 已加载, 若有更新则更新后重启
            if (local_Ver == romoteVer) {
                callback && callback(ret);
            } else {
                ret.needRestart = true;
                loadVerFunc(moduleObj, romoteVer, () => {
                    callback && callback(ret);
                });
            }
        }
        return ret;
    }
    // ------------------------------------------------------------
    getBundle(moduleName) {
        // BundleUtil.LOG(CodeType.BundleManager, "ModuleMag_getbundle__:", moduleName)
        return this.modules[moduleName]._abObj;
    }

    getModule(moduleName) {
        return this.modules[moduleName];
    }

    addModule(moduleName, cb) {
        let module = this.modules[moduleName];
        BundleUtil.LOG(CodeType.BundleManager, 'module_mag-addMOdule:', moduleName, module);
        if (module) {
            cb(module);
            return module;
        }
        this.removeModule(moduleName);

        BundleUtil.LOG(CodeType.BundleManager, 'load_AB____:', moduleName);

        let moduleObj = new BundleModule();
        moduleObj.init(moduleName, this._useHotUpdate).loadAB(() => {
            this.modules[moduleName] = moduleObj;
            cb && cb(moduleObj);
        });
    }

    removeModule(moduleName) {
        let moduleObj = this.modules[moduleName];
        if (!moduleObj) {
            return;
        }
        moduleObj.releaseAB();
        delete this.modules[moduleName];
    }

    //------------------------------------------------------------------->> 查询新版本
    isNeedReq_versionInfo() {
        if (ModuleConst.reqVersionImmediately) {
            return true;
        }

        let curTime = new Date().getTime();
        BundleUtil.LOG(
            CodeType.BundleManager,
            'is_need_req_ver_:',
            curTime,
            this._lastReq_VersionInfoTime
        );
        if (curTime - this._lastReq_VersionInfoTime > this._detectNewVersionInterval * 1000) {
            return true;
        }
        return false;
    }

    reqVersionInfo(callback?: Function) {
        if (!this._useHotUpdate) {
            callback && callback();
            return false;
        }
        if (this._httpReqHandler) {
            this._httpReqHandler.abort();
        }
        let verUrl =
            ModuleConst.hotUrl + 'verconfig.json' + '?renew=' + this._bundleUtil.createUUID();
        BundleUtil.LOG(CodeType.BundleManager, 'req_version_url_:', verUrl);

        this._httpReqHandler = this._bundleUtil.makeXMLHttp({
            url: verUrl,
            callback: (_args) => {
                let httpData = _args.retData;
                if (!httpData) {
                    return;
                }
                this._httpReqHandler = null;
                this._romoteVersion = httpData;

                BundleUtil.LOG(
                    CodeType.BundleManager,
                    'onReqVersion_Info_:',
                    JSON.stringify(httpData)
                );
                let localMap = this._local_Version;
                let remoteMap = httpData;
                let needSave = false;

                for (let moduleName in remoteMap.modules) {
                    if (!localMap.modules[moduleName]) {
                        // 运营中新增模块
                        localMap.modules[moduleName] = {};
                    }
                    if (!localMap.modules[moduleName].showVer) {
                        needSave = true;
                        localMap.modules[moduleName].showVer =
                            remoteMap.modules[moduleName].showVer;
                    }
                }

                if (needSave) {
                    cc.sys.localStorage.setItem(
                        this._local_data_key,
                        JSON.stringify(this._local_Version)
                    );
                }

                this._lastReq_VersionInfoTime = new Date().getTime();
                callback && callback();
            }
        });
    }

    //-------------------------------------------------------------------<< 查询新版本
}
