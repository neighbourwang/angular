import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

import { VmList,HandleVm, QuiryVmList } from '../model/vm-list.model';
import { VMInstanceLabelItem } from '../model/labe-iItem.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class cloudHostServiceList {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }

    getHostConfigList() : Promise<any>{
        const api = this.restApiCfg.getRestApi("hosts.services.get");

        const request = this.restApi.request(api.method, api.url, undefined, undefined)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });
        return request;
    }

    getHostList(quiry:QuiryVmList) : Promise<any>{
        const api = this.restApiCfg.getRestApi("vm.search.page");
        return this.restApi.request(api.method, api.url, undefined, undefined, quiry);
    }

    handleVm(senData:HandleVm) : Promise<any> { 
        const api = this.restApiCfg.getRestApi("hosts.instance.action");

        const request = this.restApi.request(api.method, api.url, undefined, undefined, senData)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });
        return request;
    }

    getConsoleUrl(pathParams) : Promise<any> {
        let api = this.restApiCfg.getRestApi('vm.console.url');

        const request = this.restApi.request(api.method, api.url, pathParams, undefined, undefined)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });

        return request;
    }

    getLabels() : Promise<VMInstanceLabelItem[]> { 
        const api = this.restApiCfg.getRestApi("instance.labels");

        // const request = this.restApi.request(api.method, api.url, undefined, undefined)
        //                     .then(res => {
        //                         if(res.resultCode !== "100"){
        //                             throw "";
        //                         }
        //                         return res.resultContent;
        //                     });

        const mock = new Promise(next => {
            next(
                 [
                    {
                        labelCode : "22123",
                        labelDisplayName : "标签一",
                        labelId : "1232",
                        labelName : "biaoqianyi"
                    },
                    {
                        labelCode : "22123",
                        labelDisplayName : "fake标签",
                        labelId : "1233",
                        labelName : "biaoqianer"
                    },
                    {
                        labelCode : "22123",
                        labelDisplayName : "我只是一个mock标签",
                        labelId : "1243",
                        labelName : "biaoqiansa"
                    },
                ]
            ) 
        })
        return mock;
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

    computeStatus = this.dict.get({    //获取状态列表
        owner : "COMPUTE",
        field : "STATUS"
    });
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
}