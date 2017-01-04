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
    //平台可用区信息    
    putUpdateZoneList (zoneList:any){
        let api = this.restApiCfg.getRestApi("pf-mng-zonelist.post");
        return this.restApi.request(api.method , api.url,[],undefined ,zoneList);
    }     
    //get同步计算信息
    getUpdateZone (zoneId:string){
        let api = this.restApiCfg.getRestApi("pf-mng-zoneUpdate.get");
        return this.restApi.request(api.method , api.url,[{key:'zoneId',value:zoneId}],undefined );
    }    
    //put同步计算信息
    putUpdateZone (zoneList:any){
        let api = this.restApiCfg.getRestApi("pf-mng-zoneUpdate.put");
        return this.restApi.request(api.method , api.url,[],undefined,zoneList );
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
     
   
}
