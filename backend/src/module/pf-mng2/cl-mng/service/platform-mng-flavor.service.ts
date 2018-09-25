import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';
import { Flavor ,FlavorObj} from '../model/flavor.model'

@Injectable()
export class FlavorService{
    constructor(
        private http:Http,
        private restApi:RestApi,
        private restApiCfg:RestApiCfg
    ){}
    //获取平台规格列表
    getFlavorList (id : string){
        let api = this.restApiCfg.getRestApi("pf.cre.flavors.get");

        return this.restApi.request(api.method , api.url , [{key :'pf-id' , value : id}],undefined);
    }
    //同步云主机规格列表
    updateFlavorList(id:string){
        let api = this.restApiCfg.getRestApi("platform-mng.flavorList.post");

        return this.restApi.request(api.method , api.url , [{key :'id' , value : id}],undefined);
    }
    //新建vm云主机规格
    vmFlavorNew(flavor:FlavorObj){
        let list=[];
        list.push(flavor);
        let api = this.restApiCfg.getDataRestApi("platform-mng.vmflavorList.post");
        return this.restApi.request(api.method , api.url,[],undefined,list);        
    }
    //启用云主机规格
    enableFlavor(id:string){
        let api = this.restApiCfg.getDataRestApi("platform-mng.flavor.enable");
        return this.restApi.request(api.method , api.url,[{key:'id',value:id}],undefined );
    }
    //Vmware删除云主机规格
    deleteFlavor(id:string){
        let api = this.restApiCfg.getDataRestApi("platform-mng.flavor.delete");
        return this.restApi.request(api.method , api.url,[{key:'id',value:id}],undefined );
    }
} 