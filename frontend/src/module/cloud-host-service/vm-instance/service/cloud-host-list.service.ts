import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

import { VmList,HandleVm, QuiryVmList } from '../model/vm-list.model';
import { VMInstanceLabelItem } from '../model/labe-iItem.model';
import { InstanceVMProfile } from '../model/vm.model'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class cloudHostServiceList {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }

    userInfo = this.restApi.getLoginInfo().userInfo;
    
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
        // return new Promise(next => {
        //     next({"resultCode":"100","detailDescription":null,"resultContent":[{"itemId":"23929278-e077-4140-925e-d2c20ccc9466","subInstanceId":"3f2566d1-2865-4bc5-ae0c-6272bc351c44","instanceName":"fredvm20170209","osInfo":"cirros-0.3.4-x86_64-disk","specification":"1核CPU, 512M内存, 1G启动盘","platformId":"060b3c71-7bbf-479c-a189-bfafa6f9b825","platformType":"0","networkType":"Demo-Dev-Network","paymentType":"周期计费","privateIP":"10.19.0.39","publicIP":"","regionZone":"Demo-Openstackedit nova","vmState":"0","diskCount":0,"expiryDate":"2017-02-09 15:04:20","billingInfo":{"billingId":"79fc665c-a9a7-4348-a1da-10cf74356373","billingMode":0,"basePrice":2313.0,"periodType":5,"basicPrice":223.0,"cyclePrice":443.0,"unitPrice":null,"unitType":null},"uuid":"17166a52-8c78-4a26-9213-895e2594773e"},{"itemId":"4f17123e-5b09-4d49-adee-ee02f19b3d0a","subInstanceId":"49f6ce5e-d211-4cef-9529-fa10d567c6f6","instanceName":"fredvm20170124","osInfo":"cirros-0.3.4-x86_64-disk","specification":"1核CPU, 512M内存, 1G启动盘","platformId":"060b3c71-7bbf-479c-a189-bfafa6f9b825","platformType":"0","networkType":"Demo-Dev-Network","paymentType":"周期计费","privateIP":"10.19.0.38","publicIP":"","regionZone":"Demo-Openstackedit nova","vmState":"0","diskCount":0,"expiryDate":"2017-01-25 04:25:58","billingInfo":{"billingId":"79fc665c-a9a7-4348-a1da-10cf74356373","billingMode":0,"basePrice":2313.0,"periodType":5,"basicPrice":223.0,"cyclePrice":443.0,"unitPrice":null,"unitType":null},"uuid":"c88b2701-4d5c-4c15-9ac0-c779b5f573d7"},{"itemId":"e16be856-ce9c-4a51-8803-525f6766b3ef","subInstanceId":"6c7e4fa4-95ef-4731-bf25-e0b6644ddd28","instanceName":"fredvm20170124","osInfo":"cirros-0.3.4-x86_64-disk","specification":"1核CPU, 512M内存, 1G启动盘","platformId":"060b3c71-7bbf-479c-a189-bfafa6f9b825","platformType":"0","networkType":"Demo-Dev-Network","paymentType":"周期计费","privateIP":"10.19.0.37","publicIP":"","regionZone":"Demo-Openstackedit nova","vmState":"0","diskCount":0,"expiryDate":"2017-01-24 16:09:42","billingInfo":{"billingId":"79fc665c-a9a7-4348-a1da-10cf74356373","billingMode":0,"basePrice":2313.0,"periodType":5,"basicPrice":223.0,"cyclePrice":443.0,"unitPrice":null,"unitType":null},"uuid":"59d90d85-ff6b-49ae-9174-793155801730"},{"itemId":"c0afd80c-9285-465e-8f22-680914d5c79b","subInstanceId":"2aedc954-6547-4cbb-a3ea-0b1ca562672e","instanceName":"fredvm20170122","osInfo":"cirros-0.3.4-x86_64-disk","specification":"1核CPU, 512M内存, 1G启动盘","platformId":"060b3c71-7bbf-479c-a189-bfafa6f9b825","platformType":"0","networkType":"Demo-Dev-Network","paymentType":"????","privateIP":"10.19.0.36","publicIP":"","regionZone":"Demo-Openstackedit nova","vmState":"0","diskCount":0,"expiryDate":"2017-01-24 12:04:41","billingInfo":{"billingId":"08467027-8206-4c51-a7b3-92356d7d5baf","billingMode":0,"basePrice":15.0,"periodType":3,"basicPrice":15.0,"cyclePrice":2.0,"unitPrice":null,"unitType":null},"uuid":"4db81b90-5f1b-45eb-a01e-0d19aef84530"},{"itemId":"dc407fdf-9d58-4505-9567-904d3de89a3a","subInstanceId":"e0528ae7-9db5-4b62-8d04-ce90ac03d0de","instanceName":"mockcai17010310","osInfo":"cirros-0.3.4-x86_64-disk","specification":"1核CPU, 512M内存, 1G启动盘","platformId":"060b3c71-7bbf-479c-a189-bfafa6f9b825","platformType":"0","networkType":"Demo-Dev-Network","paymentType":"????","privateIP":"10.19.0.33","publicIP":"","regionZone":"Demo-Openstackedit nova","vmState":"0","diskCount":0,"expiryDate":"2017-01-11 23:45:29","billingInfo":{"billingId":"08467027-8206-4c51-a7b3-92356d7d5baf","billingMode":0,"basePrice":15.0,"periodType":3,"basicPrice":15.0,"cyclePrice":2.0,"unitPrice":null,"unitType":null},"uuid":"ade653be-d4f5-4b78-82f0-f3ac92a2932e"},{"itemId":"f1bf44ef-f31d-41ed-8e72-7c68a5f85ab6","subInstanceId":"ffc13d2c-a3c1-4b30-90ce-23bbaaaf1ad4","instanceName":"mockcai17010310","osInfo":"cirros-0.3.4-x86_64-disk","specification":"1核CPU, 512M内存, 1G启动盘","platformId":"060b3c71-7bbf-479c-a189-bfafa6f9b825","platformType":"0","networkType":"Demo-Dev-Network","paymentType":"????","privateIP":"10.19.0.32","publicIP":"","regionZone":"Demo-Openstackedit nova","vmState":"0","diskCount":0,"expiryDate":"2017-01-11 23:45:30","billingInfo":{"billingId":"08467027-8206-4c51-a7b3-92356d7d5baf","billingMode":0,"basePrice":15.0,"periodType":3,"basicPrice":15.0,"cyclePrice":2.0,"unitPrice":null,"unitType":null},"uuid":"76c6286a-2b6e-442c-90f1-95ff86b8b2ee"},{"itemId":"7a98be28-9d50-41fc-854d-8167aca9f97b","subInstanceId":"ca8523ae-7dec-4005-9e07-ef713435d2a6","instanceName":"mockcai17010310","osInfo":"cirros-0.3.4-x86_64-disk","specification":"1核CPU, 512M内存, 1G启动盘","platformId":"060b3c71-7bbf-479c-a189-bfafa6f9b825","platformType":"0","networkType":"Demo-Dev-Network","paymentType":"????","privateIP":"10.19.0.31","publicIP":"","regionZone":"Demo-Openstackedit nova","vmState":"0","diskCount":0,"expiryDate":"2017-01-11 23:45:31","billingInfo":{"billingId":"08467027-8206-4c51-a7b3-92356d7d5baf","billingMode":0,"basePrice":15.0,"periodType":3,"basicPrice":15.0,"cyclePrice":2.0,"unitPrice":null,"unitType":null},"uuid":"a81fd0e0-ea25-4b3f-a06c-ed32c60ddc8e"},{"itemId":"c9314c22-f01d-4f3d-9b4d-768751e040d4","subInstanceId":"8c65e458-ff66-431d-b7ce-2dfb0becd2f3","instanceName":"mockcai17010310","osInfo":"cirros-0.3.4-x86_64-disk","specification":"1核CPU, 512M内存, 1G启动盘","platformId":"060b3c71-7bbf-479c-a189-bfafa6f9b825","platformType":"0","networkType":"Demo-Dev-Network","paymentType":"????","privateIP":"10.19.0.30","publicIP":"","regionZone":"Demo-Openstackedit nova","vmState":"0","diskCount":0,"expiryDate":"2017-01-11 22:32:52","billingInfo":{"billingId":"08467027-8206-4c51-a7b3-92356d7d5baf","billingMode":0,"basePrice":15.0,"periodType":3,"basicPrice":15.0,"cyclePrice":2.0,"unitPrice":null,"unitType":null},"uuid":"54f293a6-836d-4f00-9529-67c40ea0a1cc"},{"itemId":"0173f49a-003c-41d5-9fe2-9742646a7ef9","subInstanceId":"100d7670-486b-4d97-9550-8147e42c1980","instanceName":"mockcai17010310","osInfo":"cirros-0.3.4-x86_64-disk","specification":"1核CPU, 512M内存, 1G启动盘","platformId":"060b3c71-7bbf-479c-a189-bfafa6f9b825","platformType":"0","networkType":"Demo-Dev-Network","paymentType":"????","privateIP":"10.19.0.29","publicIP":"","regionZone":"Demo-Openstackedit nova","vmState":"0","diskCount":0,"expiryDate":"2017-01-11 13:59:14","billingInfo":{"billingId":"08467027-8206-4c51-a7b3-92356d7d5baf","billingMode":0,"basePrice":15.0,"periodType":3,"basicPrice":15.0,"cyclePrice":2.0,"unitPrice":null,"unitType":null},"uuid":"962ec262-2d50-49fc-8214-6c1829d485d0"},{"itemId":"4122437c-3275-41d6-8ed0-d6e2367b49d6","subInstanceId":"d0d7c0dc-bee7-44ed-bc4c-a2ed8583f127","instanceName":"mockcai17010310","osInfo":"cirros-0.3.4-x86_64-disk","specification":"1核CPU, 512M内存, 1G启动盘","platformId":"060b3c71-7bbf-479c-a189-bfafa6f9b825","platformType":"0","networkType":"Demo-Dev-Network","paymentType":"????","privateIP":"10.19.0.28","publicIP":"","regionZone":"Demo-Openstackedit nova","vmState":"0","diskCount":0,"expiryDate":"2017-01-11 11:42:51","billingInfo":{"billingId":"08467027-8206-4c51-a7b3-92356d7d5baf","billingMode":0,"basePrice":15.0,"periodType":3,"basicPrice":15.0,"cyclePrice":2.0,"unitPrice":null,"unitType":null},"uuid":"3507b53b-6e20-416e-9e96-b94c6ef4a06f"},{"itemId":"a18c5128-3ea3-4e43-8daf-46cbd82f9254","subInstanceId":"f788c572-14f0-441b-b1e8-60b743d3f9ec","instanceName":"f322","osInfo":"cirros-0.3.4-x86_64-disk","specification":"1核CPU, 512M内存, 1G启动盘","platformId":"060b3c71-7bbf-479c-a189-bfafa6f9b825","platformType":"0","networkType":"Demo-Dev-Network","paymentType":"周期计费","privateIP":"10.19.0.23","publicIP":"","regionZone":"Demo-Openstackedit nova","vmState":"0","diskCount":0,"expiryDate":"2017-01-07 01:39:56","billingInfo":{"billingId":"84b88033-f9ae-476c-b66e-2e7241e879a1","billingMode":0,"basePrice":1000.0,"periodType":3,"basicPrice":10.0,"cyclePrice":20.0,"unitPrice":null,"unitType":null},"uuid":"9b0c092a-0395-45d6-b334-8043487ef6d2"},{"itemId":"a270b346-3f34-46a2-8c01-5a9e334b292d","subInstanceId":"57ee8cda-e73a-43ce-abda-29d8be856c60","instanceName":"fredvm01061155","osInfo":"cirros-0.3.4-x86_64-disk","specification":"1核CPU, 512M内存, 1G启动盘","platformId":"060b3c71-7bbf-479c-a189-bfafa6f9b825","platformType":"0","networkType":"Demo-Dev-Network","paymentType":"周期计费","privateIP":"10.19.0.22","publicIP":"","regionZone":"Demo-Openstackedit nova","vmState":"0","diskCount":0,"expiryDate":"2017-01-06 21:40:42","uuid":"9ffee506-abab-4496-bedb-ee35f984e634"},{"itemId":"c2dc16fb-7963-4c7f-b6b6-a9e149dcf6fb","subInstanceId":"bcd5a63c-68f3-4c5e-8ad4-366da9185eb9","instanceName":"问问","osInfo":"cirros-0.3.4-x86_64-disk","specification":"1核CPU, 512M内存, 1G启动盘","platformId":"060b3c71-7bbf-479c-a189-bfafa6f9b825","platformType":"0","networkType":"Demo-Dev-Network","paymentType":"周期计费","privateIP":"10.19.0.21","publicIP":"","regionZone":"Demo-Openstackedit nova","vmState":"0","diskCount":0,"expiryDate":"2017-01-05 03:08:51","uuid":"a581d2f0-8136-412b-b8a8-cc60c8fdb25a"},{"itemId":"b70782a9-08ae-4744-b84b-672d34c02493","subInstanceId":"f3d5e3fa-a26b-4abc-87a7-2533af5bb437","instanceName":"自行车","osInfo":"cirros-0.3.4-x86_64-disk","specification":"1核CPU, 512M内存, 1G启动盘","platformId":"060b3c71-7bbf-479c-a189-bfafa6f9b825","platformType":"0","networkType":"Demo-Dev-Network","paymentType":"周期计费","privateIP":"10.19.0.20","publicIP":"","regionZone":"Demo-Openstackedit nova","vmState":"0","diskCount":0,"expiryDate":"2017-01-05 02:11:05","uuid":"fc609d11-f405-4533-8d7a-5dcd8ae2665b"},{"itemId":"cdd79d27-10aa-4895-b6e8-bd20996123ae","subInstanceId":"6766b209-9819-4648-aee5-77e4a3eae11a","instanceName":"fredvm01041401","osInfo":"cirros-0.3.4-x86_64-disk","specification":"1核CPU, 512M内存, 1G启动盘","platformId":"060b3c71-7bbf-479c-a189-bfafa6f9b825","platformType":"0","networkType":"Demo-Dev-Network","paymentType":"周期计费","privateIP":"10.19.0.19","publicIP":"","regionZone":"Demo-Openstackedit Demo可用区","vmState":"0","diskCount":0,"expiryDate":"2017-01-05 01:59:28","uuid":"cb1b5e60-7ec4-4bf6-92ab-2d72a44ec4e3"},{"itemId":"2d64c710-cc08-423e-8657-b32306894816","subInstanceId":"e03c60fa-f216-4193-b745-dbbfd2c60292","instanceName":"fredvm01041400","osInfo":"cirros-0.3.4-x86_64-disk","specification":"1核CPU, 512M内存, 1G启动盘","platformId":"060b3c71-7bbf-479c-a189-bfafa6f9b825","platformType":"0","networkType":"Demo-Dev-Network","paymentType":"周期计费","privateIP":"10.19.0.18","publicIP":"","regionZone":"Demo-Openstackedit nova","vmState":"0","diskCount":0,"expiryDate":"2017-01-05 01:57:32","uuid":"b6e039d2-f4ac-427c-8cb8-8e9477283cbd"},{"itemId":"a71bc23c-eb69-47c0-8869-d892f3d48d68","subInstanceId":"bdfde6ac-9753-4507-b417-d604aca6a271","instanceName":"fredvm0104","osInfo":"cirros-0.3.4-x86_64-disk","specification":"1核CPU, 512M内存, 1G启动盘","platformId":"060b3c71-7bbf-479c-a189-bfafa6f9b825","platformType":"0","networkType":"Demo-Dev-Network","paymentType":"周期计费","privateIP":"10.19.0.17","publicIP":"","regionZone":"Demo-Openstackedit nova","vmState":"0","diskCount":0,"expiryDate":"2017-01-05 01:50:49","uuid":"64dc99ed-321a-4d51-a042-b092b53b127d"},{"itemId":"f56b090e-5ef9-4d92-bea6-da0339770fd7","subInstanceId":"17ce0a4b-1953-4dc7-9807-32860ba7198e","instanceName":"roger12291114","osInfo":"cirros-0.3.4-x86_64-disk","specification":"1核CPU, 512M内存, 1G启动盘","platformId":"060b3c71-7bbf-479c-a189-bfafa6f9b825","platformType":"0","networkType":"Demo-Dev-Network","paymentType":"周期计费","privateIP":"10.19.0.6","publicIP":"","regionZone":"Demo-Openstack Demo可用区","vmState":"0","diskCount":0,"expiryDate":"2016-12-29 11:27:13","billingInfo":{"billingId":"08467027-8206-4c51-a7b3-92356d7d5baf","billingMode":0,"basePrice":15.0,"periodType":3,"basicPrice":15.0,"cyclePrice":2.0,"unitPrice":null,"unitType":null},"uuid":"269aedaf-574b-4d60-8621-a77571ddfe41"},{"itemId":"c6b40bfb-c255-41a1-98e0-a34af05034ee","subInstanceId":"3c79bec5-8c4e-4bca-86b7-f09d88ea398c","instanceName":"michael0001","osInfo":"cirros-0.3.4-x86_64-disk","specification":"1核CPU, 512M内存, 1G启动盘","platformId":"060b3c71-7bbf-479c-a189-bfafa6f9b825","platformType":"0","networkType":"Demo-Dev-Network","paymentType":"周期计费","privateIP":"10.19.0.4","publicIP":"","regionZone":"Demo-Openstack Demo可用区","vmState":"0","diskCount":0,"expiryDate":"2016-12-30 17:59:09","billingInfo":{"billingId":"08467027-8206-4c51-a7b3-92356d7d5baf","billingMode":0,"basePrice":15.0,"periodType":3,"basicPrice":15.0,"cyclePrice":2.0,"unitPrice":null,"unitType":null},"uuid":"6ba3b763-bc1d-4177-90f7-dd23df561fb7"}],"pageInfo":{"currentPage":1,"totalPage":1,"pageSize":20,"totalRecords":19}})
        // })
    }

    downloadExcel() {
        this.restApi.downloadFile("GET", "http://15.114.102.32:31072/adminui/authsec/subinstance/excel")
         
    }
    
    postVmInfo(instanceId:string, postData:InstanceVMProfile) : Promise<any> {
        const api = this.restApiCfg.getRestApi("vm.instance.detail.updata");

        let pathParams = [
            {
                key: 'instanceId',
                value: instanceId
            }
        ];

        const request = this.restApi.request(api.method, api.url, pathParams, undefined, postData)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });
        return request;
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