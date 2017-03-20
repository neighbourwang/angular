// 
/**
 * Created by junjie on 16/10/19.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';
import { CreStep6Model } from '../model/cre-step6.model';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class ClMngCreStep6Service {
    constructor(private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi) {
    }

    // 取得全部平台信息
    //getPlatforms(page: number, size: number) {
    //
    //    let api = this.restApiCfg.getRestApi("pf.conn.mng.platforms.get");
    //
    //    return this.restApi.request(api.method, api.url, [{ key: "page", value: page }, { key: "size", value: size }], undefined);
    //}

    //获取镜像 pf.cre.images.get
    // getImages(id : String){
    //     let api = this.restApiCfg.getRestApi("pf.cre.images.get");

    //     return this.restApi.request(api.method , api.url , [{key : 'pf-id' , value : id}],undefined);
    // }

    //更新镜像 pf.cre.images.put
    // putImages(id : String , creStep6Model : Array<CreStep6Model>){
    //     let api = this.restApiCfg.getRestApi("pf.cre.images.put");

    //     return this.restApi.request(api.method , api.url , [{key : 'pf-id' , value : id}],undefined,creStep6Model);
    // }

    //获取镜像 pf.cre.images.get
    getImageList(id: string) {
        let data = {
            "enterpriseId": null,
            "imageType": null,
            "platformId": id,
            "startupResouce": null
        }
        let api = this.restApiCfg.getRestApi("pf.cre.imageList.get");

        return this.restApi.request(api.method, api.url, [], undefined, data);
    }

    //更新镜像 pf.cre.images.put
    putImageList(creStep6Model: Array<CreStep6Model>) {
        let api = this.restApiCfg.getRestApi("pf.cre.imageList.put");

        return this.restApi.request(api.method, api.url, [], undefined, creStep6Model);
    }

}
