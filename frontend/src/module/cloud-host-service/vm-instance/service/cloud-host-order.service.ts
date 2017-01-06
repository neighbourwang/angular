import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

import { PayLoad } from '../model/attr-list.model';
import { TimeLineData, Network, Image } from '../model/services.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class cloudHostServiceOrder {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }

    userInfo = this.restApi.getLoginInfo().userInfo;
    getHostConfigList() : Promise<any>{
        const api = this.restApiCfg.getRestApi("hosts.services.get");

        let pathParams = [
            {
                key: 'id',
                value: "0"
            }
        ];
        const request = this.restApi.request(api.method, api.url, pathParams, undefined)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                console.log(JSON.stringify(res.resultContent))
                                return res.resultContent;
                            });
        return request;
    }

    saveOrder(payload: PayLoad[]): Promise<any> {
        let api = this.restApiCfg.getRestApi('hosts.order.add');
        return this.restApi.request(api.method, api.url, undefined, undefined, payload);
    }
    addCart(payload: PayLoad[]): Promise<any> {
        let api = this.restApiCfg.getRestApi('shopping.cart.add');
        return this.restApi.request(api.method, api.url, undefined, undefined, payload);
    }
    
    getNetwork(platformId:string) : Promise<Network[]> {
        const api = this.restApiCfg.getRestApi("enterprise.network.get");

        let pathParams = [
            {
                key: 'platformId',
                value: platformId
            },{
                key : 'enterPriseId',
                // value: "868a8d22-0976-48c3-b080-e03481ca1c43"
                value: this.userInfo.enterpriseId
            }
        ];
        const request = this.restApi.request(api.method, api.url, pathParams, undefined, undefined)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "获取网络失败";
                                }
                                return res.resultContent.networkItems;
                            });
        return request;
    }

    getImage(platformId:string,imageType:string,startupResouce:string): Promise<Image[]> {

        const api = this.restApiCfg.getRestApi("platform.image.post");

        let pathParams = {
            imageType: imageType,
            enterPriseId: this.userInfo.enterpriseId,
            platformId: platformId,
            startupResouce: startupResouce,
        }
        
        return this.restApi.request(api.method, api.url, undefined, undefined, pathParams)
                    .then(res => {
                            if(res.resultCode !== "100"){
                                throw "获取镜像失败";
                            }
                            return res.resultContent.imageItems;
                        });
    }

    unitType = this.dict.get({ 
        owner : "PACKAGE_BILLING",
        field : "PERIOD_TYPE"
    });
}
