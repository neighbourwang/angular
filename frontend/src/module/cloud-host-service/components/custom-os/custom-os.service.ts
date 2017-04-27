import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CustomOsService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }

    userInfo = this.restApi.getLoginInfo().userInfo;
    

    creatImage(imageName, uuid, platformId) : Promise<any> {
        let api = this.restApiCfg.getRestApi('creat.custom.image');

        let handleData = {
            id: uuid,
            actions: "start",
            enterpriseIds : {
                platformId,
                enterpriseId : this.userInfo.enterpriseId
            }
        }
        let pathParams = [
            {
                key: 'imageName',
                value: imageName
            }
        ];

        const request = this.restApi.request(api.method, api.url, pathParams, undefined, handleData)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });
        return request;
    }

}