import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';
import { BootDiskModel } from '../model/bootDisk.model';

@Injectable()
export class BootDiskService{
    constructor(
        private http:Http,
        private restApi:RestApi,
        private restApiCfg:RestApiCfg
    ){}

    //编辑启动盘数据传递
    editBootDiskData:BootDiskModel=new BootDiskModel();
    //获取启动盘列表
    getbootDiskList (id : String){
        let api = this.restApiCfg.getRestApi("platform-mng.bootDiskList.get");

        return this.restApi.request(api.method , api.url , [{key :'id' , value : id}],undefined);
    }
    //同步更新启动盘
    updateFlavorList(bootDisk:BootDiskModel){
        let list=[];
        list.push(bootDisk);
        let api = this.restApiCfg.getRestApi("platform-mng.bootDisk.put");
        return this.restApi.request(api.method , api.url,[],undefined,list); 
    }
    //获取平台启用可用区for创建启动盘    
    getEnableZoneList(id:string){
        let api = this.restApiCfg.getRestApi("platform-mng.validZoneList.get");

        return this.restApi.request(api.method , api.url , [{key :'id' , value : id}],undefined);
    }
    //获取可用去volumetype或存储后端
    getEnableStorageList(id:string){
        let api = this.restApiCfg.getRestApi("platform-mng.validStorageList.get");

        return this.restApi.request(api.method , api.url , [{key :'id' , value : id}],undefined);
    }
    //新建启动盘
    vmBootDiskNew(bootDisk:BootDiskModel){
        let list=[];
        list.push(bootDisk);
        let api = this.restApiCfg.getDataRestApi("platform-mng.bootDisk.post");
        return this.restApi.request(api.method , api.url,[],undefined,list);        
    }
    //启用启动盘
    enableBootDisk(id:string){
        let api = this.restApiCfg.getDataRestApi("platform-mng.bootDisk.enable");
        return this.restApi.request(api.method , api.url,[{key:'id',value:id}],undefined );
    }
    //禁用启动盘    
    suspendBootDisk(id:string){
        let api = this.restApiCfg.getDataRestApi("platform-mng.bootDisk.suspend");
        return this.restApi.request(api.method , api.url,[{key:'id',value:id}],undefined );
    }
    //删除启动盘
    deleteBootDisk(id:string){
        let api = this.restApiCfg.getDataRestApi("platform-mng.bootDisk.delete");
        return this.restApi.request(api.method , api.url,[{key:'id',value:id}],undefined );
    }
} 