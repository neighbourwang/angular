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

// return new Promise((next) => {
//     next(
// {
//   "resultCode": "100",
//   "detailDescription": null,
//   "resultContent": {
//     "attrList": [
//       {
//         "attrId": "de2283fe-a0f7-11e6-a18b-0050568a49fd",
//         "attrCode": "STORAGE",
//         "attrDisplayName": "数据盘",
//         "skuFlag": null,
//         "valueType": 0,
//         "mandatory": 0,
//         "relyType": 0,
//         "relyAttrId": null,
//         "valueList": [
//           {
//             "attrValueId": "da3fc21a-a1b5-11e6-a18b-0050568a49fd",
//             "attrValueCode": "STORAGE",
//             "attrDisplayValue": "高速I/O",
//             "attrValue": "8816bd60-61c0-400b-b8b2-f20822d4baa8"
//           }
//         ],
//         "mapValueList": null
//       },
//       {
//         "attrId": "de229135-a0f7-11e6-a18b-0050568a49fd",
//         "attrCode": "INSTANCENAME",
//         "attrDisplayName": "实例名称",
//         "skuFlag": null,
//         "valueType": 2,
//         "mandatory": 0,
//         "relyType": 0,
//         "relyAttrId": null,
//         "valueList": null,
//         "mapValueList": null
//       },
//       {
//         "attrId": "de22a1e3-a0f7-11e6-a18b-0050568a49fd",
//         "attrCode": "MEM",
//         "attrDisplayName": "内存",
//         "skuFlag": null,
//         "valueType": 0,
//         "mandatory": 0,
//         "relyType": 1,
//         "relyAttrId": "de22a07b-a0f7-11e6-a18b-0050568a49fd",
//         "valueList": null,
//         "mapValueList": {
//           "db44f252-a1b3-11e6-a18b-0050568a49fd": [
//             {
//               "attrValueId": "7556c38e-a1b4-11e6-a18b-0050568a49fd",
//               "attrValueCode": "MEM",
//               "attrDisplayValue": "4GB",
//               "attrValue": "4096"
//             }
//           ],
//           "be9731a0-a1b3-11e6-a18b-0050568a49fd": [
//             {
//               "attrValueId": "67c571f0-a1b4-11e6-a18b-0050568a49fd",
//               "attrValueCode": "MEM",
//               "attrDisplayValue": "1GB",
//               "attrValue": "1024"
//             },
//             {
//               "attrValueId": "2ef9b384-a1b4-11e6-a18b-0050568a49fd",
//               "attrValueCode": "MEM",
//               "attrDisplayValue": "512MB",
//               "attrValue": "512"
//             }
//           ]
//         }
//       },
//       {
//         "attrId": "de227c2e-a0f7-11e6-a18b-0050568a49fd",
//         "attrCode": "IMAGETYPE",
//         "attrDisplayName": "镜像类型",
//         "skuFlag": null,
//         "valueType": 1,
//         "mandatory": 0,
//         "relyType": 1,
//         "relyAttrId": "de22951e-a0f7-11e6-a18b-0050568a49fd",
//         "valueList": null,
//         "mapValueList": {
//           "946a6340-a1b6-11e6-a18b-0050568a49fd": [
//             {
//               "attrValueId": "cbe7ad93-a1b6-11e6-a18b-0050568a49fd",
//               "attrValueCode": "IMAGETYPE",
//               "attrDisplayValue": "标准镜像",
//               "attrValue": "0"
//             },
//             {
//               "attrValueId": "d121b2ee-a1b6-11e6-a18b-0050568a49fd",
//               "attrValueCode": "IMAGETYPE",
//               "attrDisplayValue": "私有镜像",
//               "attrValue": "1"
//             }
//           ]
//         }
//       },
//       {
//         "attrId": "de2285b7-a0f7-11e6-a18b-0050568a49fd",
//         "attrCode": "NETWORKTYPE",
//         "attrDisplayName": "网络类型",
//         "skuFlag": null,
//         "valueType": 1,
//         "mandatory": 0,
//         "relyType": 0,
//         "relyAttrId": null,
//         "valueList": [
//           {
//             "attrValueId": "2a33f9ad-a1b6-11e6-a18b-0050568a49fd",
//             "attrValueCode": "NETWORKTYPE",
//             "attrDisplayValue": "自定义网络1: 192.168.101.0",
//             "attrValue": "73f6f1ac-5e58-4801-88c3-7e12c6ddfb39"
//           },
//           {
//             "attrValueId": "33a08bec-a1b6-11e6-a18b-0050568a49fd",
//             "attrValueCode": "NETWORKTYPE",
//             "attrDisplayValue": "自定义网络1: 172.16.0.0",
//             "attrValue": "0d7f94cd-8fd2-42e6-8049-10deeb5a2dbf"
//           }
//         ],
//         "mapValueList": null
//       },
//       {
//         "attrId": "ab2cd7ee-a1ba-11e6-a18b-0050568a49fd",
//         "attrCode": "BILLINGMODE",
//         "attrDisplayName": "计费模式",
//         "skuFlag": null,
//         "valueType": 1,
//         "mandatory": 0,
//         "relyType": 0,
//         "relyAttrId": null,
//         "valueList": [
//           {
//             "attrValueId": "2478ab7f-a1bb-11e6-a18b-0050568a49fd",
//             "attrValueCode": "BILLINGMODE",
//             "attrDisplayValue": "周期计费",
//             "attrValue": "0"
//           },
//           {
//             "attrValueId": "27e38973-a1bb-11e6-a18b-0050568a49fd",
//             "attrValueCode": "BILLINGMODE",
//             "attrDisplayValue": "流量计费",
//             "attrValue": "1"
//           }
//         ],
//         "mapValueList": null
//       },
//       {
//         "attrId": "de22a07b-a0f7-11e6-a18b-0050568a49fd",
//         "attrCode": "CPU",
//         "attrDisplayName": "CPU",
//         "skuFlag": null,
//         "valueType": 0,
//         "mandatory": 0,
//         "relyType": 1,
//         "relyAttrId": "de226d17-a0f7-11e6-a18b-0050568a49fd",
//         "valueList": null,
//         "mapValueList": {
//           "2167aa03-a1b3-11e6-a18b-0050568a49fd": [
//             {
//               "attrValueId": "be9731a0-a1b3-11e6-a18b-0050568a49fd",
//               "attrValueCode": "CPU",
//               "attrDisplayValue": "1核",
//               "attrValue": "1"
//             },
//             {
//               "attrValueId": "db44f252-a1b3-11e6-a18b-0050568a49fd",
//               "attrValueCode": "CPU",
//               "attrDisplayValue": "2核",
//               "attrValue": "2"
//             }
//           ]
//         }
//       },
//       {
//         "attrId": "de22951e-a0f7-11e6-a18b-0050568a49fd",
//         "attrCode": "STARTUPSOURCE",
//         "attrDisplayName": "启动源",
//         "skuFlag": null,
//         "valueType": 0,
//         "mandatory": 0,
//         "relyType": 1,
//         "relyAttrId": "de226d17-a0f7-11e6-a18b-0050568a49fd",
//         "valueList": null,
//         "mapValueList": {
//           "2167aa03-a1b3-11e6-a18b-0050568a49fd": [
//             {
//               "attrValueId": "946a6340-a1b6-11e6-a18b-0050568a49fd",
//               "attrValueCode": "STARTUPSOURCE",
//               "attrDisplayValue": "镜像",
//               "attrValue": "0"
//             },
//             {
//               "attrValueId": "9cd1950f-a1b6-11e6-a18b-0050568a49fd",
//               "attrValueCode": "STARTUPSOURCE",
//               "attrDisplayValue": "卷镜像",
//               "attrValue": "1"
//             }
//           ]
//         }
//       },
//       {
//         "attrId": "de227a98-a0f7-11e6-a18b-0050568a49fd",
//         "attrCode": "TIMELINE",
//         "attrDisplayName": "购买时长",
//         "skuFlag": null,
//         "valueType": 0,
//         "mandatory": 0,
//         "relyType": 0,
//         "relyAttrId": null,
//         "valueList": null,
//         "mapValueList": null
//       },
//       {
//         "attrId": "de228e4d-a0f7-11e6-a18b-0050568a49fd",
//         "attrCode": "USERNAME",
//         "attrDisplayName": "用户名",
//         "skuFlag": null,
//         "valueType": 2,
//         "mandatory": 0,
//         "relyType": 0,
//         "relyAttrId": null,
//         "valueList": null,
//         "mapValueList": null
//       },
//       {
//         "attrId": "de2296a2-a0f7-11e6-a18b-0050568a49fd",
//         "attrCode": "STORAGESIZE",
//         "attrDisplayName": "数据盘容量",
//         "skuFlag": null,
//         "valueType": 1,
//         "mandatory": 0,
//         "relyType": 0,
//         "relyAttrId": null,
//         "valueList": null,
//         "mapValueList": null
//       },
//       {
//         "attrId": "de228b51-a0f7-11e6-a18b-0050568a49fd",
//         "attrCode": "SETTINGTYPE",
//         "attrDisplayName": "设置方式",
//         "skuFlag": null,
//         "valueType": 2,
//         "mandatory": 0,
//         "relyType": 0,
//         "relyAttrId": null,
//         "valueList": [
//           {
//             "attrValueId": "d45738f1-a1b8-11e6-a18b-0050568a49fd",
//             "attrValueCode": "SETTINGTYPE",
//             "attrDisplayValue": "模板自带密码",
//             "attrValue": "1"
//           },
//           {
//             "attrValueId": "d1217664-a1b8-11e6-a18b-0050568a49fd",
//             "attrValueCode": "SETTINGTYPE",
//             "attrDisplayValue": "立即设置",
//             "attrValue": "0"
//           }
//         ],
//         "mapValueList": null
//       },
//       {
//         "attrId": "de229b8e-a0f7-11e6-a18b-0050568a49fd",
//         "attrCode": "ZONE",
//         "attrDisplayName": "可用区",
//         "skuFlag": null,
//         "valueType": 1,
//         "mandatory": 0,
//         "relyType": 1,
//         "relyAttrId": "de226d17-a0f7-11e6-a18b-0050568a49fd",
//         "valueList": null,
//         "mapValueList": {
//           "2167aa03-a1b3-11e6-a18b-0050568a49fd": [
//             {
//               "attrValueId": "7a0b2215-a1b3-11e6-a18b-0050568a49fd",
//               "attrValueCode": "ZONE",
//               "attrDisplayValue": "可用区1",
//               "attrValue": "nova"
//             }
//           ]
//         }
//       },
//       {
//         "attrId": "de229d22-a0f7-11e6-a18b-0050568a49fd",
//         "attrCode": "BOOTSTORAGE",
//         "attrDisplayName": "启动盘",
//         "skuFlag": null,
//         "valueType": 0,
//         "mandatory": 0,
//         "relyType": 1,
//         "relyAttrId": "de229b8e-a0f7-11e6-a18b-0050568a49fd",
//         "valueList": null,
//         "mapValueList": {
//           "7a0b2215-a1b3-11e6-a18b-0050568a49fd": [
//             {
//               "attrValueId": "ac81393c-a1b5-11e6-a18b-0050568a49fd",
//               "attrValueCode": "BOOTSTORAGE",
//               "attrDisplayValue": "高速I/O",
//               "attrValue": "8816bd60-61c0-400b-b8b2-f20822d4baa8"
//             }
//           ]
//         }
//       },
//       {
//         "attrId": "de228fbe-a0f7-11e6-a18b-0050568a49fd",
//         "attrCode": "PASSWORD",
//         "attrDisplayName": "登录密码",
//         "skuFlag": null,
//         "valueType": 2,
//         "mandatory": 0,
//         "relyType": 1,
//         "relyAttrId": "de228b51-a0f7-11e6-a18b-0050568a49fd",
//         "valueList": null,
//         "mapValueList": null
//       },
//       {
//         "attrId": "de229efb-a0f7-11e6-a18b-0050568a49fd",
//         "attrCode": "BOOTSIZE",
//         "attrDisplayName": "启动盘容量",
//         "skuFlag": null,
//         "valueType": 0,
//         "mandatory": 0,
//         "relyType": 0,
//         "relyAttrId": null,
//         "valueList": null,
//         "mapValueList": null
//       },
//       {
//         "attrId": "de226d17-a0f7-11e6-a18b-0050568a49fd",
//         "attrCode": "PLATFORM",
//         "attrDisplayName": "云平台",
//         "skuFlag": null,
//         "valueType": 1,
//         "mandatory": 0,
//         "relyType": 0,
//         "relyAttrId": null,
//         "valueList": [
//           {
//             "attrValueId": "2167aa03-a1b3-11e6-a18b-0050568a49fd",
//             "attrValueCode": "PLATFORM",
//             "attrDisplayValue": "HOS2",
//             "attrValue": "88"
//           }
//         ],
//         "mapValueList": null
//       },
//       {
//         "attrId": "de229819-a0f7-11e6-a18b-0050568a49fd",
//         "attrCode": "TIMELINEUNIT",
//         "attrDisplayName": "时长单位",
//         "skuFlag": null,
//         "valueType": 1,
//         "mandatory": 0,
//         "relyType": 0,
//         "relyAttrId": null,
//         "valueList": [
//           {
//             "attrValueId": "b2297040-a1bb-11e6-a18b-0050568a49fd",
//             "attrValueCode": "TIMELINEUNIT",
//             "attrDisplayValue": "按天",
//             "attrValue": "1"
//           },
//           {
//             "attrValueId": "bc5d2ca5-a1bb-11e6-a18b-0050568a49fd",
//             "attrValueCode": "TIMELINEUNIT",
//             "attrDisplayValue": "按年",
//             "attrValue": "5"
//           },
//           {
//             "attrValueId": "adc530eb-a1bb-11e6-a18b-0050568a49fd",
//             "attrValueCode": "TIMELINEUNIT",
//             "attrDisplayValue": "按小时",
//             "attrValue": "0"
//           },
//           {
//             "attrValueId": "b8fe32a7-a1bb-11e6-a18b-0050568a49fd",
//             "attrValueCode": "TIMELINEUNIT",
//             "attrDisplayValue": "按月",
//             "attrValue": "3"
//           },
//           {
//             "attrValueId": "b58de889-a1bb-11e6-a18b-0050568a49fd",
//             "attrValueCode": "TIMELINEUNIT",
//             "attrDisplayValue": "按周",
//             "attrValue": "2"
//           }
//         ],
//         "mapValueList": null
//       },
//       {
//         "attrId": "de22938f-a0f7-11e6-a18b-0050568a49fd",
//         "attrCode": "SECURITYGROUP",
//         "attrDisplayName": "安全组",
//         "skuFlag": null,
//         "valueType": 0,
//         "mandatory": 0,
//         "relyType": 0,
//         "relyAttrId": null,
//         "valueList": [
//           {
//             "attrValueId": "64aa7bb2-a1b6-11e6-a18b-0050568a49fd",
//             "attrValueCode": "SECURITYGROUP",
//             "attrDisplayValue": "default",
//             "attrValue": "default"
//           }
//         ],
//         "mapValueList": null
//       },
//       {
//         "attrId": "de227f1f-a0f7-11e6-a18b-0050568a49fd",
//         "attrCode": "OS",
//         "attrDisplayName": "镜像列表",
//         "skuFlag": null,
//         "valueType": 1,
//         "mandatory": 0,
//         "relyType": 1,
//         "relyAttrId": "de227c2e-a0f7-11e6-a18b-0050568a49fd",
//         "valueList": null,
//         "mapValueList": {
//           "cbe7ad93-a1b6-11e6-a18b-0050568a49fd": [
//             {
//               "attrValueId": "06ed9910-a1b7-11e6-a18b-0050568a49fd",
//               "attrValueCode": "OS",
//               "attrDisplayValue": "Windows Server R2012",
//               "attrValue": "0"
//             },
//             {
//               "attrValueId": "1401e2d1-a1b7-11e6-a18b-0050568a49fd",
//               "attrValueCode": "OS",
//               "attrDisplayValue": "CentOS7.2",
//               "attrValue": "2"
//             },
//             {
//               "attrValueId": "110d338d-a1b7-11e6-a18b-0050568a49fd",
//               "attrValueCode": "OS",
//               "attrDisplayValue": "CentOS6.5",
//               "attrValue": "1"
//             }
//           ]
//         }
//       }
//     ],
//     "skuMap": {
//       "[08c1789b-2858-4369-8bbf-a499a490fb77, 0d75f035-959d-479a-a8ca-bb76c4ee8012, 14a7d34e-2f0a-4dc4-a893-57164b257dff, 168ed810-4fc4-4587-bb4e-0bd3b0d51f2a, a5bfbd44-ca74-48de-ac24-5b33bc83ea37]": {
//         "productId": "3ddb2960-eb3c-449c-90de-fd62235c249c",
//         "skuId": "1c8628ae-f062-4250-8439-df50f7fe82d8",
//         "serviceType": 0,
//         "serviceName": "中型云主机"
//       },
//       "[3ff74269-3a0e-417c-a19e-bd4aa2a10f5c]": {
//         "productId": "61951e37-cad0-46c7-bdbe-dab695080d24",
//         "skuId": "1b28397b-bdb7-49b5-9c22-c12057add433",
//         "serviceType": 0,
//         "serviceName": "this is first product"
//       },
//       "[3d7fe65e-1360-489f-a958-8e01e6793f84]": {
//         "productId": "f871bb91-3f6d-44bf-b5e7-743ad9fc725b",
//         "skuId": "a6e7ca91-b423-40ab-b40f-e8fc7899b746",
//         "serviceType": 0,
//         "serviceName": "yunzhuji product"
//       },
//       "[01895c56-3c04-4506-b89b-c85d55b0f066, 022cee4b-343d-463e-9807-830947def5e2, 03e88d93-a5ca-459b-9619-87b7646622b7, 062e8d8e-dea5-49bf-bb67-cbe166cd6e5f, 4c24a163-ab63-4005-96f0-84dbedf8df92]": {
//         "productId": "178aaec5-ecb5-4a52-9a25-cabcc2e41e97",
//         "skuId": "07d70bda-03e6-433c-9025-1f5892e80354",
//         "serviceType": 0,
//         "serviceName": "小型云主机"
//       }
//     }
//   }
// }.resultContent
//         )
// })


        const request = this.restApi.request(api.method, api.url, undefined, undefined)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
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