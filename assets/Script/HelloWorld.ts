import BundleManager from "./bundle/BundleManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SubGame_2 extends cc.Component {
    @property(cc.Node)
    moduleLayer: cc.Node = null;
    @property(cc.Asset)
    asset1: cc.Asset = null;
    @property(cc.Asset)
    asset2: cc.Asset = null;

    _lobbyRootNode: cc.Node = null;
    _logArr: any;
    _initHackLog: any;


    onDestroy () { 
    }

    onLoad() {  
        this.hackSysLog()
        if (!cc.sys.isBrowser) {
            cc.log("[HelloWorld] jsb_writable_:", jsb.fileUtils.getWritablePath() )
        }

        let assetPath = "";
        if(typeof(jsb)!="undefined"){
            let absPath1 = jsb.fileUtils.fullPathForFilename(this.asset1.nativeUrl).replace("//","/")
            let absPath2 = jsb.fileUtils.fullPathForFilename(this.asset2.nativeUrl).replace("//","/")
            let testLen = absPath1.length>absPath2.length? absPath2.length : absPath1.length 
            for(let i=0;i<testLen;i++){
                if(absPath1[i] != absPath2[i]){
                    assetPath = absPath1.substring(0, i)
                    break
                }
            } 
            cc.log("absFile_path:", assetPath )
        }

        BundleManager.getInstance().initCom({
            useHotUpdate : true ,     // 是否启用热更新 
            assetPath: assetPath,
        }) 
        
        //-------------------

        // 复制包内模块到可读写路径下,避免首次加载模块时从远程完整拉取
        BundleManager.getInstance().execUnpackage(()=>{

            BundleManager.getInstance().reqVersionInfo(()=>{ // 获取最新版本
                this.reloadLobbyRoot()
            })
        })

        // 定时检测更新
        BundleManager.getInstance().reqLoopVersionInfo() 

    }

    reloadLobbyRoot(){

        let loadAb = ["ABLobby"]
        // loadAb = ["ABLobby", "ABSubGame1", "ABSubGame2"]
        BundleManager.getInstance().hotUpdateMultiModule(loadAb,()=>{ // 更新模块到最新版本

            BundleManager.getInstance().addModule("ABLobby", (moduleObj)=>{ // 加载模块

                let abObj = moduleObj.getABObj()
                
                abObj.load('root/Scene/LobbyRoot', cc.Prefab, (err, prefab)=>{  // 使用模块资源 

                    cc.log("[HelloWorld] load_lobby_prefab_ err:", JSON.stringify(err) )
                    if(this._lobbyRootNode){
                        this._lobbyRootNode.destroy()
                    }
                    let lobbyRoot = cc.instantiate(prefab) 
                    this._lobbyRootNode = lobbyRoot
                    this.moduleLayer.addChild(lobbyRoot, 100)
                    lobbyRoot.getComponent("LobbyRoot").initModule()    
                }) 
            })
        })
    }

    hackSys_Log_Save(){
        if(!this._logArr){ return ; };

        let totalLen = this._logArr.length
        let reportCo = 2000
        let beginIdx = totalLen-reportCo
        beginIdx = beginIdx>=0?beginIdx:0
        let arrTemp = []

        for(let i=beginIdx; i<totalLen; i++){
            arrTemp.push(this._logArr[i])
        }

        let retMsg = arrTemp.join("\n")
        if(cc.sys.isNative){
            let path = jsb.fileUtils.getWritablePath()
            jsb.fileUtils.writeStringToFile(retMsg, path + "alogRecord.txt")
        }
    }

    hackSysLog(){

        if(this._initHackLog){ return ; } ; this._initHackLog = true ; 
        let _logArr = []
        this._logArr = _logArr 
        let MAX_STR_LEN = 1300 
        let excludeStr = { ["Can't find letter definition in texture"]:1 } 
        let push_log = function(...arg){  
            let ignore = false
            let logStr = arg.join(" ")
            let strLen = logStr.length
            for(let idx = 0;idx<strLen;){
                let endIdx = idx+MAX_STR_LEN

                let splitStr = logStr.slice(idx, endIdx)
                for(let excStr in  excludeStr){
                    if( splitStr.indexOf(excStr, 0) == 0 ){
                        ignore = true 
                        break 
                    }
                }
                if( !ignore ){
                    _logArr.push("_"+_logArr.length+"_=> "+ splitStr +(endIdx<strLen?"-->":"")) 
                } 

                idx = endIdx
            } 
            return ignore
        }

        let logDef = function(...arg){ 
            let ignore = push_log(...arg)
            if(!ignore){
                cc["_sv_log_2_Ori"].call(cc, ...arg)
            }
        }
        let consoleLogDef = function(...arg){ 
            let ignore = push_log(...arg) 
            if(!ignore){
                if(cc["_sv_console_log_2_Ori"]) { cc["_sv_console_log_2_Ori"].call(console,...arg ) }
            } 
        }
        if(!cc["_sv_log_2_Ori"]){ cc["_sv_log_2_Ori"] = cc.log  }
        if(!cc["_sv_console_log_2_Ori"]){ cc["_sv_console_log_2_Ori"] = console.log  }
        cc.log      = logDef
        console.log = consoleLogDef
    }


}
