import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class PlatformDetailService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private restApi:RestApi) {
    }    
    //获取platform详情    
    getPlatform (id:string){
        let api = this.restApiCfg.getRestApi("pf-mng-detail.get");
        return this.restApi.request(api.method , api.url,[{key:'id',value:id}],undefined );
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////可用区
    //更新平台基本信息
     putPlatform (data:any){
        let api = this.restApiCfg.getRestApi("pf-mng-update.put");
        return this.restApi.request(api.method, api.url,[],undefined,data);
    }
    //获取平台可用区信息    
    getUpdateZoneList (id:string){
        let api = this.restApiCfg.getRestApi("pf-mng-zonelist.get");
        return this.restApi.request(api.method , api.url,[{key:'id',value:id}],undefined );
    }
         
    //get同步计算信息
    getUpdateZone (zoneId:string){
        let api = this.restApiCfg.getRestApi("pf-mng-zoneUpdate.get");
        return this.restApi.request(api.method , api.url,[{key:'zoneId',value:zoneId}],undefined );
    }    
    
    //禁用平台可用区信息    
    suspendZone (id:string){
        let api = this.restApiCfg.getRestApi("pf-mng-zone.suspend");
        return this.restApi.request(api.method , api.url,[{key:'id',value:id}],undefined );
    }
    //启用平台可用区信息    
    enableZone (id:string){
        let api = this.restApiCfg.getRestApi("pf-mng-zone.enable");
        return this.restApi.request(api.method , api.url,[{key:'id',value:id}],undefined );
    }
    //////////////////////////////////////////////////////////////////////////////////////////////存储区
    //获取新增平台存储区信息    
    getUpdateStorageList (id:string){
        let api = this.restApiCfg.getRestApi("pf-mng-storagelist.get");
        return this.restApi.request(api.method , api.url,[{key:'id',value:id}],undefined );
    }
         
    //get存储区同步存储空间信息
    getUpdateStorageCount (storageId:string){
        let api = this.restApiCfg.getRestApi("pf-mng-storageUpdate.get");
        return this.restApi.request(api.method , api.url,[{key:'id',value:storageId}],undefined );
    }    
   
    //禁用平台存储区信息    
    suspendStorage (id:string){
        let api = this.restApiCfg.getRestApi("pf-mng-storage.suspend");
        return this.restApi.request(api.method , api.url,[{key:'id',value:id}],undefined );
    }
    //启用平台存储区信息    
    enableStorage (id:string){
        let api = this.restApiCfg.getRestApi("pf-mng-storage.enable");
        return this.restApi.request(api.method , api.url,[{key:'id',value:id}],undefined );
    }
    /////////////////////////////////////////////////////////////////////////////////////////////Openstack平台VolumeType
    //获取volumeType列表
    getVolumeTypeList(id:string){
        let api = this.restApiCfg.getRestApi("platform-mng.volumeTypeList.get");
        return this.restApi.request(api.method , api.url,[{key:'id',value:id}],undefined );
    } 
    //PUT 获取volumeType列表
    putVolumeTypeList(data){
        let api = this.restApiCfg.getRestApi("platform-mng.volumeTypeList.put");
        return this.restApi.request(api.method , api.url,[],undefined ,data);
    }
    //启用VolumeType
    enableVolumeype(id:string){
        let api = this.restApiCfg.getRestApi("platform-mng.volumeType.enable");
        return this.restApi.request(api.method , api.url,[{key:'id',value:id}],undefined );
    }
    //禁用VolumeType
    suspendVolumeType(id:string){
        let api = this.restApiCfg.getRestApi("platform-mng.volumeTypeList.suspend");
        return this.restApi.request(api.method , api.url,[{key:'id',value:id}],undefined );
    }
    //获取更新VolueTypeList
    getUpdateVolumeType(id:string){
        let api = this.restApiCfg.getRestApi("platform-mng.addVolumeTypeList.get");
        return this.restApi.request(api.method , api.url,[{key:'id',value:id}],undefined );
    }
    //POST更新VolumeypeList
    postUpdateVolumeType(data:any){
        let api = this.restApiCfg.getRestApi("adminui/authsec/sync/platform/volumetypes");
        return this.restApi.request(api.method , api.url,[],undefined ,data);
    }
}
