import BundleUtil, { CodeType } from "./BundleUtil";
import { ModuleConst } from "./Const";

export default class BundleModule {

    _ABName: string;
    _useHotUpdate: boolean;
    _abObj: cc.AssetManager.Bundle;
    _timeOutIds: number[];

    init(ABName: string, useHotUpdate: boolean){
       BundleUtil.LOG(CodeType.BundleModule, "module_init")
        
        this._ABName = ABName
        this._useHotUpdate = useHotUpdate
        this._timeOutIds = [];
        return this
    }

    getABObj(){
        return this._abObj 
    }
    
    getModuleName(){
        return this._ABName
    }

    loadAB(cb, version?){
        // {version: 'fbc07'},
        let loadArg: any = {}
        if(version){
            loadArg.version = version
        }
        let isValid = true 
        let abUrl = this._ABName 

        if(this._useHotUpdate){
            // 如果希望使用creator构建时填的资源服务器地址,将下面这行代码注释掉即可.
            abUrl = ModuleConst.hotUrl + "remote/" + this._ABName
        // } else {
        //     let writablePath = jsb.fileUtils.getWritablePath() 
        //     let path_cache  = writablePath + "gamecaches/" 
        //     abUrl = path_cache +  this._ABName
        }
        BundleUtil.LOG(CodeType.BundleModule, "loadAB_:", this._ABName, abUrl  )
        cc.assetManager.loadBundle(abUrl,  loadArg, (err, bundle)=> {
            if(!isValid){ return } ;  isValid = false ;
            
            if(!err){
                BundleUtil.LOG(CodeType.BundleModule, "loadAB_OK_:", this._ABName )
                this._abObj = bundle 

                cb()
            }else {
                BundleUtil.LOG(CodeType.BundleModule, "load_ab_Err_:", this._ABName, JSON.stringify(err)) 
                // 错误重试
                this.intervalScheduleOnce(()=>{
                    this.loadAB(cb, version)
                }, 3)
            }
        });
    }
    

    // 下载资源
    preloadModule(onProgress, onComplete){
        let is_Valid = true

        //---------------------------------------------------------
        let autoAtlas = []
        let extNum = autoAtlas.length 
        let finishNum = 0
        let is_2Valid = true
        let preloadAutoAtlas = ()=>{
            if(autoAtlas.length == 0 ){ 
                if(!is_2Valid){ return; }; is_2Valid = false ;
                onComplete && onComplete();
                return 
            }

            // RequestType.URL = 'url' 
            cc.assetManager.preloadAny(autoAtlas, { __requestType__: 'url', type: null, bundle: this._abObj.name }, 
                (finish, total, item)=>{
                    if(!is_2Valid){ return; }; 
                    BundleUtil.LOG(CodeType.BundleModule, "load_autoatlas_progress_:",this._abObj.name, finish, total )
                    onProgress && onProgress(finish+finishNum, total+finishNum, item);
                }, (error, items)=>{
                    if(!is_2Valid){ return; }; is_2Valid = false ;
                    if(!error){
                        onComplete && onComplete();
                    }else { 
                        BundleUtil.LOG(CodeType.BundleModule, "preloadAutoAtlas_error:", JSON.stringify(error) )
                        this.intervalScheduleOnce(()=>{
                            this.preloadModule(onProgress, onComplete);
                        }, 3)
                    }
                }   
            );
                
        }
        //--------------------------------------------------------- 

        this._abObj.preloadDir("", (finish, total, item)=>{
            if(!is_Valid){ return; };
            finishNum = total
            onProgress && onProgress(finish, total + extNum, item);
        }, (error, items)=>{
            if(!is_Valid){ return; }; is_Valid = false ;
            if(!error){
                // onComplete && onComplete(items);
                preloadAutoAtlas()
            }else {
                this.intervalScheduleOnce(()=>{
                    this.preloadModule(onProgress, onComplete);
                }, 3)
            }
        })

    }

    releaseAB(){
        this.unIntervalSchedule();
        if(!this._abObj ){ return }
        BundleUtil.LOG(CodeType.BundleModule, "release_ab__") 
        cc.assetManager.removeBundle(this._abObj);
        this._abObj = null
    }

    intervalScheduleOnce(callback: Function, delay: number) {
       let id: number = setTimeout(callback, delay * 1000); // Assuming delay is in seconds
       this._timeOutIds.push(id);
    }

    unIntervalSchedule() {
        // Assuming we have a way to track all timeouts
        const timeoutIds = this._timeOutIds;
        timeoutIds.forEach((id: number) => clearTimeout(id));
        this._timeOutIds = [];
    }

}

