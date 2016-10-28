/**
 * Created by wangyao on 2016/10/18.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProdDirListService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    // 取得所有产品目录
    getProdDirList(page: number, size: number,data) {
        // let data;
        let categoryId: string;
        let platformId: string;
        // (!cateId) && (categoryId = null);
        // (!platId) && (platformId = null);
        // let data = {
        //     'categoryId': categoryId,
        //     'platformId': platformId,
        // }
        console.log('123123323131',data);
        let api = this.restApiCfg.getRestApi("prod-mng.prod-dir-mng.list.get");
        return this.restApi.request(api.method, api.url, [{ key: "page", value: page }, { key: "size", value: size }
        ], undefined, data);
    }
}
