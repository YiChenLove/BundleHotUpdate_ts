interface ModuleConstType {
    hotUrl: string;
    localVersionConfigKey: string;
    localVersionConfigKey2: string;
    localClientVer: string;
    reqVersionImmediately: boolean;
}

export const ModuleConst: ModuleConstType = {
    hotUrl: 'http://192.168.20.196:8000/hotRes/', // 热更新地址, 以斜杠结尾
    localVersionConfigKey: '_local_gameVersionData1',
    localVersionConfigKey2: '_local_gameVersionData2',
    localClientVer: '__sv_loacal_client_ver',
    reqVersionImmediately: true
};

interface GlobalConstType {
    Client_Version: string;
}

export const GlobalConst: GlobalConstType = {
    Client_Version: '1.0.0'
};
