/**
 * Created by junjie on 16/10/19.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';
import { ZoneListModel } from '../model/cre-step3.model';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class ZoneListService {
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

    //获取所有可用区 pf.cre.zone.get
    getZone(id : string){
        let api = this.restApiCfg.getRestApi("pf.cre.zone.get");

        return this.restApi.request(api.method , api.url , [{key : 'pf-id' , value : id}],undefined);
    }
    
    //更新可用区配置 pf.cre.step.03.zone.put
    putZone(id : string , zone : Array<ZoneListModel>){
        let api = this.restApiCfg.getRestApi("pf.cre.step.03.zone.put");

        return this.restApi.request(api.method , api.url ,[{key : 'pf-id',value : id }],undefined , zone)
    }
}
