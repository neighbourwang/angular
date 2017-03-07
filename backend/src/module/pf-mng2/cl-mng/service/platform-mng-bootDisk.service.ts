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
    //获取启动盘列表
    getbootDiskList (id : String){
        let api = this.restApiCfg.getRestApi("platform-mng.bootDiskList.get");

        return this.restApi.request(api.method , api.url , [{key :'id' , value : id}],undefined);
    }
    //同步更新启动盘
    updateFlavorList(id:string){
        let api = this.restApiCfg.getRestApi("platform-mng.bootDisk.put");

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
    //删除启动盘
    deleteBootDisk(id:string){
        let api = this.restApiCfg.getDataRestApi("platform-mng.bootDisk.delete");
        return this.restApi.request(api.method , api.url,[{key:'id',value:id}],undefined );
    }
} 