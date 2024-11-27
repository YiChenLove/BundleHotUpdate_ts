

import SingleIns from "./SingleIns";
import BundleHotUIHelper from "./BundleHotUIHelper";
import BundleUtil, { CodeType } from "./BundleUtil";
import BundleManager from "./BundleManager";
import { ModuleConst, GlobalConst } from "./Const";


export default class BundleUnpackHelper extends SingleIns{
    _bundleMgr: BundleManager;
    _bundleUtil: BundleUtil;
    _bundleHotUIHelper: BundleHotUIHelper;
    _timeOutIds: number[];

    initCom(arg) {
        this._bundleMgr = BundleManager.getInstance();
        this._bundleUtil = BundleUtil.getInstance();
        this._bundleHotUIHelper = BundleHotUIHelper.getInstance();
    }

    execUnpackage(onComplete){

        if ( !(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.OS_WINDOWS) ) {
            BundleUtil.LOG(CodeType.BundleUnpackHelper, "ignore_unpackage")
            onComplete();
            return 
        } 

        let localClientVer = cc.sys.localStorage.getItem(ModuleConst.localClientVer)
        let writablePath = jsb.fileUtils.getWritablePath() 
        let path_cache  = writablePath + "gamecaches/" 
        
        if( GlobalConst.Client_Version == localClientVer && jsb.fileUtils.isFileExist(path_cache+"cacheList.json")){
            BundleUtil.LOG(CodeType.BundleUnpackHelper, "Unpackage_not_exec")
            let versionData = cc.sys.localStorage.getItem(ModuleConst.localVersionConfigKey)
            let localVersionData2 = cc.sys.localStorage.getItem(ModuleConst.localVersionConfigKey2)
            let moudles = JSON.parse(versionData).modules;
            let localAbversion = JSON.parse(localVersionData2);

            for (let key in localAbversion) {
                if (!moudles[key] || moudles[key].resVersion == localAbversion[key]) {
                    cc.assetManager.loadBundle(path_cache + key, { version: localAbversion[key] }, (err, bundle)=> {
                    });
                }
            }
            onComplete()
            return ; 

        }else { 
            // 第一次启动该版本
            let nativeRoot = this._bundleMgr.getNativePath() //  

            let path_native = nativeRoot + "PKgamecaches/"
            BundleUtil.LOG(CodeType.BundleUnpackHelper, "unpackage_res_:", path_native, path_cache )

            if(!jsb.fileUtils.isDirectoryExist(path_native)){
                BundleUtil.LOG(CodeType.BundleUnpackHelper, "PKgamecaches_not_exist")                
                cc.sys.localStorage.setItem(ModuleConst.localClientVer, GlobalConst.Client_Version )
                onComplete()
                return ; 
            }
            //-------------------------------------------------->>  替换 cacheManager 数据
            let cacheMag = cc.assetManager.cacheManager
            // cacheMag.clearCache()

            let coverCachelist = ()=>{
                let fileStr = jsb.fileUtils.getStringFromFile(path_native + "cacheList.json")  
                
                let abVersion = {} 

                var cache_d_Map = JSON.parse(fileStr)
                if(cache_d_Map){
                    let files = cache_d_Map.files
                    for(let id in  files){
                        let info = files[id]
                        // BundleUtil.LOG(CodeType.BundleUnpackHelper, "call_cacheFile_:", id, info.url, info.bundle )
                        cacheMag.cacheFile(id, info.url, info.bundle)

                        // 查找版本号
                        if(id.indexOf("/index.") != -1){
                            let splitRet = id.split('.')
                            abVersion[info.bundle] = splitRet[splitRet.length-2]
                        }
                    }
                }

                // 覆盖本地资源版本号 
                BundleUtil.LOG(CodeType.BundleUnpackHelper, "abVersion__:", JSON.stringify(abVersion) )

                cacheMag.writeCacheFile(()=>{

                    BundleUtil.LOG(CodeType.BundleUnpackHelper, "writeCache_File_ok")

                    this._bundleMgr.setLocalAbVersion(abVersion)

                    cc.sys.localStorage.setItem(ModuleConst.localVersionConfigKey2, JSON.stringify(abVersion))
                    cc.sys.localStorage.setItem(ModuleConst.localClientVer, GlobalConst.Client_Version )
                    onComplete()
                })

                for (let key in abVersion) {
                    cc.assetManager.loadBundle(path_cache + key, { version: abVersion[key] }, (err, bundle)=> {
                    });
                }
            }
            //--------------------------------------------------<<  替换 cacheManager 数据

            this._bundleHotUIHelper.unpackageShow()
            this.copyFoldTo(path_native, path_cache, (finish, total)=>{
                this._bundleHotUIHelper.unpackageUpdateProgress(finish, total)
                // BundleUtil.LOG(CodeType.BundleUnpackHelper, "copy_file_:", finish, total)
            },()=>{
                // 完成 
                this._bundleHotUIHelper.unpackageFinish()  
                coverCachelist()
            })
        }


    }


    getFileListFromDir(dir, filelist){
        let co = 1
        if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.OS_WINDOWS){
            let cacheJson = jsb.fileUtils.getStringFromFile(dir + "cacheList.json")
            let cacheMap = JSON.parse(cacheJson)
            let files = cacheMap.files
            for(let url in files){
                let item = files[url]
                let fullpath = this._bundleMgr.getNativePath()+"PKgamecaches/"+item.url
                filelist.push(fullpath)
                if(co<3){
                    console.log("get_file_list_full_:", fullpath )
                }
                co = co+1
            } 
        }else {
            jsb.fileUtils.listFilesRecursively(dir, filelist)
        } 
    }

    // 拷贝文件夹到 copyFoldTo("/path1/src/", "/path2/src/") 
    copyFoldTo(oriRoot, copyTo, onProgress, onComplate){

        let eachFrameCopyNum = 5  // 每帧复制文件数

        if( (typeof(jsb)=="undefined") || !jsb.fileUtils.isDirectoryExist(oriRoot)){
            cc.log("ori_folder_not_exist_:", oriRoot )
            onComplate();
            return 
        }

        let filelist = []
        this.getFileListFromDir(oriRoot, filelist) 

        cc.log("file_ori_arr_:",oriRoot, filelist.length);

        let realFileArr = []
        for(let i=0;i<filelist.length;i++){
            let path = filelist[i]
            if(path.substr( path.length-1 )!="/"){
                realFileArr.push(path)
            } 
        }

        let totalLen = realFileArr.length

        if(totalLen==0){
            cc.log("totalLen_is_0:", oriRoot )
            onComplate();
            return ;
        }

        let curMisIndex = 0

        let schHandler = ()=>{

            for(let i=curMisIndex; i<curMisIndex+eachFrameCopyNum; i++){ 

                if(i>=totalLen){
                    this.unIntervalSchedule();
                    onComplate()
                    return ;
                }
                let path = realFileArr[i] 
    
                let subPath = path.substr( oriRoot.length )  // 后半部分路径 import/00/00.7871f.json
                let fileName = path.substr( path.lastIndexOf("\/")+1) // 文件名 00.7871f.json
                let targetPath = copyTo + subPath // 目标完整路径
                let newFold = targetPath.substr( 0, targetPath.lastIndexOf("\/")+1 ) // 目标文件夹
    
                if(!jsb.fileUtils.isDirectoryExist(newFold)){ // 文件夹不存在则创建 
                    jsb.fileUtils.createDirectory(newFold)
                }

                let fileData = jsb.fileUtils.getDataFromFile(path); 
                let saveRet = jsb.fileUtils.writeDataToFile(fileData, targetPath);
                if(!saveRet){

                    this.unIntervalSchedule();
                    return ;
                }  
                
            } 
            curMisIndex = curMisIndex + eachFrameCopyNum

            onProgress( (curMisIndex<=totalLen? curMisIndex : totalLen), totalLen)

        }
        this.intervalSchedule(schHandler, 0)
    }
}
