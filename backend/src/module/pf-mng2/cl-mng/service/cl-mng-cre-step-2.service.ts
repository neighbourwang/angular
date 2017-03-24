/**
 * Created by junjie on 16/10/19.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class ClMngCreStep2Service {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private restApi:RestApi) {
    }

    // 取得全部平台信息
    //getPlatforms(page: number, size: number) {
    //
    //    let api = this.restApiCfg.getRestApi("pf.conn.mng.platforms.get");
    //
    //    return this.restApi.request(api.method, api.url, [{ key: "page", value: page }, { key: "size", value: size }], undefined);
    //}


    //同步可用区
    //  zones (id : String,platFormType:String){
    //     switch(platFormType){
    //         case "0":let api = this.restApiCfg.getRestApi("pf.cre.step.02.zones.synchronize.get");
    //         case "2":let api = this.restApiCfg.getRestApi("pf.cre.step.02.cluster.synchronize.vmware.get");
    //     }     
    //     return this.restApi.request(api.method , api.url , [{key : "pf-id" , value : id}],undefined);
    // }

    // //存储同步
    // storages(id : String,platFormType:String) {
    //   switch(platFormType){
    //         case "0":let api = this.restApiCfg.getRestApi("pf.cre.step.02.storages.synchronize.get");
    //         case "2":let api = this.restApiCfg.getRestApi("pf.cre.step.02.storages.synchronize.vmware.get");
    //     }     
    //     return this.restApi.request(api.method, api.url, [{ key: "pf-id", value: id }], undefined);
    // }

    // //镜像 同步 
    // images(id : String,platformType:String){
    //       switch(platFormType){
    //         case "0": let api = this.restApiCfg.getRestApi("pf.cre.step.02.images.synchronize.get");
    //         case "2":let api = this.restApiCfg.getRestApi("pf.cre.step.02.images.synchronize.vmware.get");
    //     }    
    //     return this.restApi.request(api.method, api.url , [{key : 'pf-id' , value : id}],undefined);
    // }
  
    //宿主机同步
    // hosts( id : String,platformType:String){
    //    switch(platFormType){
    //         case "0": let api = this.restApiCfg.getRestApi("pf.cre.step.02.hosts.synchronize.vmware.get");
    //         case "2":let api = this.restApiCfg.getRestApi("pf.cre.step.02.hosts.synchronize.vmware.get");
    //     }    
    //     return this.restApi.request(api.method , api.url , [{key : 'pf-id' , value : id}],undefined);
    // 

    

    zones (id : String){
        let api = this.restApiCfg.getRestApi("pf.cre.step.02.zones.synchronize.get");
        return this.restApi.request(api.method , api.url , [{key : "pf-id" , value : id}],undefined);
    }

    //存储 同步
    storages(id : String) {
        let api = this.restApiCfg.getRestApi("pf.cre.step.02.storages.synchronize.get");

        return this.restApi.request(api.method, api.url, [{ key: "pf-id", value: id }], undefined);
    }

    //云主机规格 同步 pf.cre.step.02.flavors.synchronize.get
    flavors(id : String ){
        let api = this.restApiCfg.getRestApi("pf.cre.step.02.flavors.synchronize.get");

        return this.restApi.request(api.method , api.url , [{key : 'pf-id' , value : id}] , undefined);
    }

    //镜像 同步 pf.cre.step.02.images.synchronize.get"
    images(id : String){
        let api = this.restApiCfg.getRestApi("pf.cre.step.02.images.synchronize.get");

        return this.restApi.request(api.method, api.url , [{key : 'pf-id' , value : id}],undefined);
    }
    //update镜像同步
    
    getImages(id : String){
        let api = this.restApiCfg.getRestApi("pf.cre.step.images.synchronize.get");

        return this.restApi.request(api.method, api.url , [{key : 'id' , value : id}],undefined);
    }
    postImages(id : String,data:any){
        let api = this.restApiCfg.getRestApi("pf.cre.step.images.synchronize.post");

        return this.restApi.request(api.method, api.url , [{key : 'id' , value : id}],undefined,data);
    }

    //宿主机 pf.cre.step.02.hosts.synchronize.get
    hosts( id : String){
        let api = this.restApiCfg.getRestApi("pf.cre.step.02.hosts.synchronize.get");

        return this.restApi.request(api.method , api.url , [{key : 'pf-id' , value : id}],undefined);
    }

    //openstack 同步volumeType
    //pf.cre.step.02.volumetype.synchronize.get
    getvolumeType(id : string){
        let api = this.restApiCfg.getRestApi("pf.cre.step.04.volumetype.synchronize.get");

        return this.restApi.request(api.method , api.url , [{key : 'id' , value : id}],undefined);
    }

}
