// 
/**
 * Created by junjie on 16/10/19.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';
import { CreStep4Model } from '../model/cre-step4.model';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class StorageListService {
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

    //获取资源区配置 pf.cre.storage.get
    getStorage(id : String){
        let api = this.restApiCfg.getRestApi("pf.cre.storage.get");

        return this.restApi.request(api.method , api.url , [{key : 'pf-id' , value : id}],undefined);
    }

    //更新资源区配置 pf.cre.step.04.storage.put
    putStorage(id : String , item : Array<CreStep4Model>){
        let api = this.restApiCfg.getRestApi("pf.cre.step.04.storage.put");

        return this.restApi.request(api.method , api.url , [{key : 'pf-id',value : id}],undefined,item )
    }
    //pf.cre.step.04.volumetype.synchronize.get
    getvolumeType(id : String){
        let api = this.restApiCfg.getRestApi("pf.cre.step.04.volumetype.synchronize.get");

        return this.restApi.request(api.method , api.url , [{key : 'id' , value : id}],undefined);
    }
}
