import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

import { Regions, PMOrderResponse, PMPartsEntity, PMNetworkVO, ResoucePolls, PMImageBaseVO } from '../model/service.model';
import { PostAttrList, PayLoad, PMServiceQuery} from '../model/post.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PhysicalMachineListService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }

    userInfo = this.restApi.getLoginInfo().userInfo;
    
    fetchPMList (page, pmServiceQuery:PMServiceQuery): Promise<any> {
        let api = this.restApiCfg.getRestApi('phymachine.product.page');
        let pathParams = [
            {
                key: 'size',
                value: 20
            },
            {
                key: 'page',
                value: page
            }
        ];

        return this.restApi.request(api.method, api.url, pathParams, undefined, pmServiceQuery)
    }
    
    handlePM (actions:string, uuid:string): Promise<any> {
        let api = this.restApiCfg.getRestApi('phymachine.subinstance.action');

        return this.restApi.request(api.method, api.url, undefined, undefined, {actions, uuid})
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });
    }

    fetchPMState(pmId): Promise<any> {
        const api = this.restApiCfg.getRestApi("phymachine.status");

        let pathParams = [
            {
                key: 'pmId',
                value: pmId
            }
        ];

        const request = this.restApi.request(api.method, api.url, pathParams, undefined, undefined)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });
        return request;

        // return new Promise(next => {
        //     setTimeout(() => {
        //         next({"resultCode":"100","detailDescription":null,"resultContent":{"id":null,"status":""+Math.round(Math.random()*13),"uuid":"都得_GvH_34E"}}.resultContent)
        //     },500)
        // })

    }

    //数据字典所用到的值
    dictSourceType = this.dict.get({ 
        owner : "RESOURCE_USAGE_DETAIL",
        field : "SOURCE_TYPE"
    })

    dictStatus = this.dict.get({ 
        owner : "SUBINSTANCE",
        field : "STATUS"
    })

    useType = this.dict.get({    //云主机类型
        owner : "GLOBAL",
        field : "USE_TYPE"
    });
    serviceLevel = this.dict.get({    //云主机服务级别
        owner : "GLOBAL",
        field : "SERVICE_LEVEL"
    });
    queryField = this.dict.get({    //云主机检索的字段列表，取数据字典的code返回
        owner : "GLOBAL_QUERY",
        field : "COMPUTE_INSTANCE"
    });
    addonType = this.dict.get({    //云主机附加服务类型
        owner : "COMPUTE_INSTANCE",
        field : "ADDON_TYPE"
    });
    ownerType = this.dict.get({    //实例归属
        owner : "INSTANCE",
        field : "OWNER_TYPE"
    });
    computeStatus = this.dict.get({    //获取状态列表
        owner : "PMRESOURCE",
        field : "STATUS"
    });

}