import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import { PayLoad } from '../model/attr-list.model';
import { TimeLineData } from '../model/services.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class cloudHostServiceOrder {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private restApi:RestApi) {
    }

    getHostConfigList() : Promise<any>{
        const api = this.restApiCfg.getRestApi("hosts.services.get");

        const request = this.restApi.request(api.method, api.url, undefined, undefined)
                            .then(res => {
                        
                                res = {
                                    "resultCode": "100",
                                    "detailDescription": null,
                                    "resultContent": [
                                        {
                                            "attrId": "eb0ff7af-ded0-4c29-bad7-682a686da0c3",
                                            "attrCode": "BOOTSTORAGE",
                                            "attrDisplayName": "启动盘",
                                            "skuFlag": null,
                                            "valueType": 0,
                                            "mandatory": 1,
                                            "relyType": 1,
                                            "relyAttrId": "8531042f-a062-413f-a7b3-c2c8ed00b16d",
                                            "valueList": null,
                                            "mapValueList": {
                                                "d97db38a-e131-480b-909f-a727a5d6ef18": [
                                                    {
                                                        "id": "7f659d77-b826-402d-9863-d3c1848ebdf0",
                                                        "code": null,
                                                        "displayName": "高速I/O",
                                                        "value": null
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "attrId": "f7af1772-02a6-42a5-80e8-e85177f9501a",
                                            "attrCode": "DISK",
                                            "attrDisplayName": "硬盘",
                                            "skuFlag": null,
                                            "valueType": 0,
                                            "mandatory": 1,
                                            "relyType": 0,
                                            "relyAttrId": null,
                                            "valueList": [
                                                {
                                                    "id": "371491b4-3a25-43bd-92a5-c45de06b7bbb",
                                                    "code": null,
                                                    "displayName": "1",
                                                    "value": "1"
                                                }
                                            ],
                                            "mapValueList": null
                                        },
                                        {
                                            "attrId": "217cc602-7fa5-4e98-a685-73731a963859",
                                            "attrCode": "CPU",
                                            "attrDisplayName": "CPU",
                                            "skuFlag": null,
                                            "valueType": 0,
                                            "mandatory": 1,
                                            "relyType": 0,
                                            "relyAttrId": null,
                                            "valueList": [
                                                {
                                                    "id": "2e4156d3-0162-41b4-bdda-b7c1941e72c4",
                                                    "code": null,
                                                    "displayName": "1",
                                                    "value": "1"
                                                }
                                            ],
                                            "mapValueList": null
                                        },
                                        {
                                            "attrId": "75aed31e-0f9f-4d99-8547-61daa7091591",
                                            "attrCode": "PLATFORM",
                                            "attrDisplayName": "云平台",
                                            "skuFlag": null,
                                            "valueType": 0,
                                            "mandatory": 1,
                                            "relyType": 0,
                                            "relyAttrId": null,
                                            "valueList": [
                                                {
                                                    "id": "e2914d9a-4aec-46ac-920a-1cdc4107c3b3",
                                                    "code": null,
                                                    "displayName": "上海",
                                                    "value": null
                                                }
                                            ],
                                            "mapValueList": null
                                        },
                                        {
                                            "attrId": "8531042f-a062-413f-a7b3-c2c8ed00b16d",
                                            "attrCode": "ZONE",
                                            "attrDisplayName": "可用区",
                                            "skuFlag": null,
                                            "valueType": 0,
                                            "mandatory": 1,
                                            "relyType": 1,
                                            "relyAttrId": "75aed31e-0f9f-4d99-8547-61daa7091591",
                                            "valueList": null,
                                            "mapValueList": {
                                                "e2914d9a-4aec-46ac-920a-1cdc4107c3b3": [
                                                    {
                                                        "id": "d97db38a-e131-480b-909f-a727a5d6ef18",
                                                        "code": null,
                                                        "displayName": "可用区1",
                                                        "value": "nova"
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "attrId": "7f2aea37-239c-4c08-83b8-bdba98d422be",
                                            "attrCode": "MEM",
                                            "attrDisplayName": "内存",
                                            "skuFlag": null,
                                            "valueType": 0,
                                            "mandatory": 1,
                                            "relyType": 0,
                                            "relyAttrId": null,
                                            "valueList": [
                                                {
                                                    "id": "c571c9ca-5d76-4607-8fda-fe9258e9f2e6",
                                                    "code": null,
                                                    "displayName": "512",
                                                    "value": "512"
                                                }
                                            ],
                                            "mapValueList": null
                                        },
                                        {
                                            "attrId": "45eb7113-a39f-488e-90df-cec627b70854",
                                            "attrCode": "BOOTSIZE",
                                            "attrDisplayName": "启动盘容量",
                                            "skuFlag": null,
                                            "valueType": 0,
                                            "mandatory": 1,
                                            "relyType": 0,
                                            "relyAttrId": null,
                                            "valueList": [
                                                {
                                                    "id": "c571c9ca-5d76-4607-8fda-fe9258e9f2e6",
                                                    "code": null,
                                                    "displayName": "20",
                                                    "value": "20"
                                                }
                                            ],
                                            "mapValueList": null
                                        },
                                        {
                                            "attrId": "10b16adf-f9ac-4dc3-8f9d-898be666a2eb",
                                            "attrCode": "SETTINGTYPE",
                                            "attrDisplayName": "设置方式",
                                            "skuFlag": null,
                                            "valueType": 0,
                                            "mandatory": 1,
                                            "relyType": 0,
                                            "relyAttrId": null,
                                            "valueList": [
                                                {
                                                    "id": "45a1414e-01b2-4bfd-998e-31ef9467e6aa",
                                                    "code": null,
                                                    "displayName": "模板自带密码",
                                                    "value": "模板自带密码"
                                                },
                                                {
                                                    "id": "70a4f29e-f66b-48d7-9557-a62a40688cf4",
                                                    "code": null,
                                                    "displayName": "立即设置",
                                                    "value": "立即设置"
                                                }
                                            ],
                                            "mapValueList": null
                                        },
                                        {
                                            "attrId": "3179fe81-8531-4db9-b595-b88e9bcc5280",
                                            "attrCode": "PASSWORD",
                                            "attrDisplayName": "登录密码",
                                            "skuFlag": null,
                                            "valueType": 0,
                                            "mandatory": 1,
                                            "relyType": 0,
                                            "relyAttrId": null,
                                            "valueList": [],
                                            "mapValueList": null
                                        },
                                        {
                                            "attrId": "3546f092-fa67-4ff7-82bb-fc32a2c06fd3",
                                            "attrCode": "NETWORKTYPE",
                                            "attrDisplayName": "网络类型",
                                            "skuFlag": null,
                                            "valueType": 0,
                                            "mandatory": 1,
                                            "relyType": 0,
                                            "relyAttrId": null,
                                            "valueList": [
                                                {
                                                    "id": "bd97ac08-bd1c-4f14-a556-e70401222315",
                                                    "code": null,
                                                    "displayName": "自定义网络1: 10.1.10.1",
                                                    "value": "自定义网络1: 10.1.10.1"
                                                },
                                                {
                                                    "id": "e0ba5e08-f1ad-4f12-858e-f3246e841402",
                                                    "code": null,
                                                    "displayName": "自定义网络2: 10.1.11.1",
                                                    "value": "自定义网络2: 10.1.11.1"
                                                }
                                            ],
                                            "mapValueList": null
                                        },
                                        {
                                            "attrId": "68bf29d6-771a-47b3-b94a-175843247923",
                                            "attrCode": "TIMELINEUNIT",
                                            "attrDisplayName": "时长单位",
                                            "skuFlag": null,
                                            "valueType": 0,
                                            "mandatory": 1,
                                            "relyType": 0,
                                            "relyAttrId": null,
                                            "valueList": [],
                                            "mapValueList": null
                                        },
                                        {
                                            "attrId": "690571a9-01cf-48a8-abfe-e0cc23b31fb3",
                                            "attrCode": "SECURITYGROUP",
                                            "attrDisplayName": "安全组",
                                            "skuFlag": null,
                                            "valueType": 0,
                                            "mandatory": 1,
                                            "relyType": 0,
                                            "relyAttrId": null,
                                            "valueList": [
                                                {
                                                    "id": "71314cad-b855-40a6-9389-1fcb694b6ad6",
                                                    "code": null,
                                                    "displayName": "default",
                                                    "value": "default"
                                                }
                                            ],
                                            "mapValueList": null
                                        },
                                        {
                                            "attrId": "699bdf57-0c62-4210-b84c-d9e49a22991c",
                                            "attrCode": "STORAGESIZE",
                                            "attrDisplayName": "数据盘容量",
                                            "skuFlag": null,
                                            "valueType": 0,
                                            "mandatory": 1,
                                            "relyType": 0,
                                            "relyAttrId": null,
                                            "valueList": [],
                                            "mapValueList": null
                                        },
                                        {
                                            "attrId": "77c97007-40c5-4029-9baa-4bea8c5d845f",
                                            "attrCode": "STARTUPSOURCE",
                                            "attrDisplayName": "启动源",
                                            "skuFlag": null,
                                            "valueType": 0,
                                            "mandatory": 1,
                                            "relyType": 0,
                                            "relyAttrId": null,
                                            "valueList": [
                                                {
                                                    "id": "0a62e224-53f7-47ee-a9d1-6cce7d0048c2",
                                                    "code": null,
                                                    "displayName": "镜像",
                                                    "value": "镜像"
                                                },
                                                {
                                                    "id": "329822b9-618a-4a81-88e6-08e5328d0a0d",
                                                    "code": null,
                                                    "displayName": "云硬盘",
                                                    "value": "云硬盘"
                                                },
                                                {
                                                    "id": "c438105c-4a61-4327-9006-9cffb249d4b6",
                                                    "code": null,
                                                    "displayName": "快照",
                                                    "value": "快照"
                                                }
                                            ],
                                            "mapValueList": null
                                        },
                                        {
                                            "attrId": "a399457d-ccb4-453c-9a38-65ba83ed988e",
                                            "attrCode": "STORAGE",
                                            "attrDisplayName": "数据盘",
                                            "skuFlag": null,
                                            "valueType": 0,
                                            "mandatory": 1,
                                            "relyType": 0,
                                            "relyAttrId": null,
                                            "valueList": [],
                                            "mapValueList": null
                                        },
                                        {
                                            "attrId": "b6f94419-cca4-4a65-8c68-4d7fd2596541",
                                            "attrCode": "INSTANCENAME",
                                            "attrDisplayName": "实例名称",
                                            "skuFlag": null,
                                            "valueType": 0,
                                            "mandatory": 1,
                                            "relyType": 0,
                                            "relyAttrId": null,
                                            "valueList": [],
                                            "mapValueList": null
                                        },
                                        {
                                            "attrId": "bba5cc37-2569-4d53-bc88-e4bba01d4606",
                                            "attrCode": "USERNAME",
                                            "attrDisplayName": "用户名",
                                            "skuFlag": null,
                                            "valueType": 0,
                                            "mandatory": 1,
                                            "relyType": 0,
                                            "relyAttrId": null,
                                            "valueList": [],
                                            "mapValueList": null
                                        },
                                        {
                                            "attrId": "16690f8f-9d1b-40d0-b450-001eae98de91",
                                            "attrCode": "TIMELINE",
                                            "attrDisplayName": "购买时长",
                                            "skuFlag": null,
                                            "valueType": 0,
                                            "mandatory": 1,
                                            "relyType": 0,
                                            "relyAttrId": null,
                                            "valueList": [],
                                            "mapValueList": null
                                        },
                                        {
                                            "attrId": "7e7a65e4-4ab7-4542-b0d2-ae01b887a4a9",
                                            "attrCode": "IMAGETYPE",
                                            "attrDisplayName": "镜像类型",
                                            "skuFlag": null,
                                            "valueType": 0,
                                            "mandatory": 1,
                                            "relyType": 0,
                                            "relyAttrId": null,
                                            "valueList": [
                                                {
                                                    "id": "42c60214-01d2-4e57-a37e-ad86985e7cdf",
                                                    "code": null,
                                                    "displayName": "标准镜像",
                                                    "value": "标准镜像"
                                                },
                                                {
                                                    "id": "460a10b2-77c9-43e2-a55b-597f0d9c51c3",
                                                    "code": null,
                                                    "displayName": "私有镜像",
                                                    "value": "私有镜像"
                                                }
                                            ],
                                            "mapValueList": null
                                        },
                                        {
                                            "attrId": "9184c090-1b21-4608-9ece-2005d4f377d4",
                                            "attrCode": "OS",
                                            "attrDisplayName": "镜像列表",
                                            "skuFlag": null,
                                            "valueType": 0,
                                            "mandatory": 1,
                                            "relyType": 0,
                                            "relyAttrId": null,
                                            "valueList": [
                                                {
                                                    "id": "155227e4-378a-4e10-84fe-561631a33bec",
                                                    "code": null,
                                                    "displayName": "Windows Server R2012",
                                                    "value": "Windows Server R2012"
                                                },
                                                {
                                                    "id": "6cd5bfb6-d422-4b04-8180-722ef6b4bab0",
                                                    "code": null,
                                                    "displayName": "CenOS 7.0",
                                                    "value": "CenOS 7.0"
                                                },
                                                {
                                                    "id": "fdca58c1-95a1-404d-8f8a-72ca669461bc",
                                                    "code": null,
                                                    "displayName": "CenOS 7.2",
                                                    "value": "CenOS 7.2"
                                                }
                                            ],
                                            "mapValueList": null
                                        }
                                    ]
                                }
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });
        return request;
    }

    saveOrder(payload: PayLoad): Promise<any> {

        let api = this.restApiCfg.getRestApi('hosts.order.add');
        return this.restApi.request(api.method, api.url, undefined, undefined, payload);
        
    }

    getTimeLineType() : Promise<TimeLineData[]> {
        let api = this.restApiCfg.getRestApi('sysdic.owner.field');

        let pathParams = [
            {
                key: '_owner',
                value: "PACKAGE_BILLING"
            }, 
            {
                key: '_field',
                value: "PERIOD_TYPE"
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
    }
}