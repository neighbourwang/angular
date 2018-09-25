// 
/**
 * Created by junjie on 16/10/19.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';
import { CreStep5Model } from '../model/cre-step5.model';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class ClMngCreStep5Service {
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

    //获取云主机规格 pf.cre.flavors.get
    getFlavors(id : string){
        let api = this.restApiCfg.getRestApi("pf.cre.flavors.get");

        return this.restApi.request(api.method , api.url , [{key : 'pf-id' , value : id}],undefined);
    }

    //更新云主机规格 pf.cre.step.05.flavors.put
    putFlavors(id : string , item : Array<CreStep5Model>){
        let api = this.restApiCfg.getRestApi("pf.cre.step.05.flavors.put");

        return this.restApi.request(api.method , api.url ,[{key : 'pf-id',value : id}],undefined,item);
    }


}
