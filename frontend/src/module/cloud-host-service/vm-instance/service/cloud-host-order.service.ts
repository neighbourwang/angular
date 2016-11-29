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
        // const api = this.restApiCfg.getRestApi("oauth.token");
        // this.restApi.request(api.method, api.url, undefined, undefined).then(res => {
        //   console.log(res,2313123)
        // })

// return new Promise((next) => {
//     next(
// {
//   "attrList": [
//     {
//       "attrId": "de227c2e-a0f7-11e6-a18b-0050568a49fd",
//       "attrCode": "IMAGETYPE",
//       "attrDisplayName": "镜像类型",
//       "skuFlag": null,
//       "valueType": 1,
//       "mandatory": 0,
//       "relyType": 1,
//       "relyAttrId": "de22951e-a0f7-11e6-a18b-0050568a49fd",
//       "valueList": null,
//       "mapValueList": {
//         "946a6340-a1b6-11e6-a18b-0050568a49fd": [
//           {
//             "attrValueId": "d121b2ee-a1b6-11e6-a18b-0050568a49fd",
//             "attrValueCode": "IMAGETYPE",
//             "attrDisplayValue": "私有镜像",
//             "attrValue": "1"
//           },
//           {
//             "attrValueId": "cbe7ad93-a1b6-11e6-a18b-0050568a49fd",
//             "attrValueCode": "IMAGETYPE",
//             "attrDisplayValue": "标准镜像",
//             "attrValue": "0"
//           }
//         ]
//       }
//     },
//     {
//       "attrId": "2a988fbc-a1a0-11e6-a18b-0050568a49fd",
//       "attrCode": "PLATFORM",
//       "attrDisplayName": "云平台",
//       "skuFlag": null,
//       "valueType": 1,
//       "mandatory": 0,
//       "relyType": 0,
//       "relyAttrId": null,
//       "valueList": [
//         {
//           "attrValueId": "ead0ce48-a74e-11e6-a18b-0050568a49fd",
//           "attrValueCode": "PLATFORM",
//           "attrDisplayValue": "HOS2",
//           "attrValue": "88"
//         }
//       ],
//       "mapValueList": null
//     },
//     {
//       "attrId": "0b4e7b13-a733-11e6-a18b-0050568a49fd",
//       "attrCode": "ZONE",
//       "attrDisplayName": "可用区",
//       "skuFlag": null,
//       "valueType": 1,
//       "mandatory": 0,
//       "relyType": 1,
//       "relyAttrId": "2a988fbc-a1a0-11e6-a18b-0050568a49fd",
//       "valueList": null,
//       "mapValueList": {
//         "ead0ce48-a74e-11e6-a18b-0050568a49fd": [
//           {
//             "attrValueId": "1b4f62a7-a74f-11e6-a18b-0050568a49fd",
//             "attrValueCode": "ZONE",
//             "attrDisplayValue": "可用区1",
//             "attrValue": "nova"
//           }
//         ]
//       }
//     },
//     {
//       "attrId": "de2285b7-a0f7-11e6-a18b-0050568a49fd",
//       "attrCode": "NETWORKTYPE",
//       "attrDisplayName": "网络类型",
//       "skuFlag": null,
//       "valueType": 1,
//       "mandatory": 0,
//       "relyType": 0,
//       "relyAttrId": null,
//       "valueList": [
//         {
//           "attrValueId": "2a33f9ad-a1b6-11e6-a18b-0050568a49fd",
//           "attrValueCode": "NETWORKTYPE",
//           "attrDisplayValue": "自定义网络1: 192.168.101.0",
//           "attrValue": "73f6f1ac-5e58-4801-88c3-7e12c6ddfb39"
//         },
//         {
//           "attrValueId": "33a08bec-a1b6-11e6-a18b-0050568a49fd",
//           "attrValueCode": "NETWORKTYPE",
//           "attrDisplayValue": "自定义网络1: 172.16.0.0",
//           "attrValue": "0d7f94cd-8fd2-42e6-8049-10deeb5a2dbf"
//         }
//       ],
//       "mapValueList": null
//     },
//     {
//       "attrId": "ab2cd7ee-a1ba-11e6-a18b-0050568a49fd",
//       "attrCode": "BILLINGMODE",
//       "attrDisplayName": "计费模式",
//       "skuFlag": null,
//       "valueType": 1,
//       "mandatory": 0,
//       "relyType": 0,
//       "relyAttrId": null,
//       "valueList": [
//         {
//           "attrValueId": "27e38973-a1bb-11e6-a18b-0050568a49fd",
//           "attrValueCode": "BILLINGMODE",
//           "attrDisplayValue": "流量计费",
//           "attrValue": "1"
//         },
//         {
//           "attrValueId": "2478ab7f-a1bb-11e6-a18b-0050568a49fd",
//           "attrValueCode": "BILLINGMODE",
//           "attrDisplayValue": "周期计费",
//           "attrValue": "0"
//         }
//       ],
//       "mapValueList": null
//     },
//     {
//       "attrId": "de228e4d-a0f7-11e6-a18b-0050568a49fd",
//       "attrCode": "USERNAME",
//       "attrDisplayName": "用户名",
//       "skuFlag": null,
//       "valueType": 2,
//       "mandatory": 0,
//       "relyType": 0,
//       "relyAttrId": null,
//       "valueList": null,
//       "mapValueList": null
//     },
//     {
//       "attrId": "de229d22-a0f7-11e6-a18b-0050568a49fd",
//       "attrCode": "BOOTSTORAGE",
//       "attrDisplayName": "启动盘",
//       "skuFlag": null,
//       "valueType": 0,
//       "mandatory": 0,
//       "relyType": 1,
//       "relyAttrId": "de229b8e-a0f7-11e6-a18b-0050568a49fd",
//       "valueList": null,
//       "mapValueList": {
//         "7a0b2215-a1b3-11e6-a18b-0050568a49fd": [
//           {
//             "attrValueId": "ac81393c-a1b5-11e6-a18b-0050568a49fd",
//             "attrValueCode": "BOOTSTORAGE",
//             "attrDisplayValue": "高速I/O",
//             "attrValue": "8816bd60-61c0-400b-b8b2-f20822d4baa8"
//           }
//         ]
//       }
//     },
//     {
//       "attrId": "373f06a8-a74b-11e6-a18b-0050568a49fd",
//       "attrCode": "DISKINSNAME",
//       "attrDisplayName": "云硬盘实例名称",
//       "skuFlag": null,
//       "valueType": 1,
//       "mandatory": 0,
//       "relyType": 0,
//       "relyAttrId": null,
//       "valueList": null,
//       "mapValueList": null
//     },
//     {
//       "attrId": "981dff3d-a74b-11e6-a18b-0050568a49fd",
//       "attrCode": "DISKMOUNTHOSTNAME",
//       "attrDisplayName": "云主机名称",
//       "skuFlag": null,
//       "valueType": 1,
//       "mandatory": 0,
//       "relyType": 0,
//       "relyAttrId": null,
//       "valueList": null,
//       "mapValueList": null
//     },
//     {
//       "attrId": "de2283fe-a0f7-11e6-a18b-0050568a49fd",
//       "attrCode": "STORAGE",
//       "attrDisplayName": "数据盘",
//       "skuFlag": null,
//       "valueType": 0,
//       "mandatory": 0,
//       "relyType": 0,
//       "relyAttrId": null,
//       "valueList": [
//         {
//           "attrValueId": "da3fc21a-a1b5-11e6-a18b-0050568a49fd",
//           "attrValueCode": "STORAGE",
//           "attrDisplayValue": "高速I/O",
//           "attrValue": "8816bd60-61c0-400b-b8b2-f20822d4baa8"
//         }
//       ],
//       "mapValueList": null
//     },
//     {
//       "attrId": "de229135-a0f7-11e6-a18b-0050568a49fd",
//       "attrCode": "INSTANCENAME",
//       "attrDisplayName": "实例名称",
//       "skuFlag": null,
//       "valueType": 2,
//       "mandatory": 0,
//       "relyType": 0,
//       "relyAttrId": null,
//       "valueList": null,
//       "mapValueList": null
//     },
//     {
//       "attrId": "de22a1e3-a0f7-11e6-a18b-0050568a49fd",
//       "attrCode": "MEM",
//       "attrDisplayName": "内存",
//       "skuFlag": null,
//       "valueType": 0,
//       "mandatory": 0,
//       "relyType": 1,
//       "relyAttrId": "de22a07b-a0f7-11e6-a18b-0050568a49fd",
//       "valueList": null,
//       "mapValueList": {
//         "e55bd6eb-a1b3-11e6-a18b-0050568a49fd": [
//           {
//             "attrValueId": "79d80098-a1b4-11e6-a18b-0050568a49fd",
//             "attrValueCode": "MEM",
//             "attrDisplayValue": "8GB",
//             "attrValue": "8192"
//           }
//         ],
//         "db44f252-a1b3-11e6-a18b-0050568a49fd": [
//           {
//             "attrValueId": "7556c38e-a1b4-11e6-a18b-0050568a49fd",
//             "attrValueCode": "MEM",
//             "attrDisplayValue": "4GB",
//             "attrValue": "4096"
//           }
//         ],
//         "be9731a0-a1b3-11e6-a18b-0050568a49fd": [
//           {
//             "attrValueId": "2ef9b384-a1b4-11e6-a18b-0050568a49fd",
//             "attrValueCode": "MEM",
//             "attrDisplayValue": "512MB",
//             "attrValue": "512"
//           },
//           {
//             "attrValueId": "67c571f0-a1b4-11e6-a18b-0050568a49fd",
//             "attrValueCode": "MEM",
//             "attrDisplayValue": "1GB",
//             "attrValue": "1024"
//           },
//           {
//             "attrValueId": "7078d68f-a1b4-11e6-a18b-0050568a49fd",
//             "attrValueCode": "MEM",
//             "attrDisplayValue": "2GB",
//             "attrValue": "2048"
//           }
//         ]
//       }
//     },
//     {
//       "attrId": "de227a98-a0f7-11e6-a18b-0050568a49fd",
//       "attrCode": "TIMELINE",
//       "attrDisplayName": "购买时长",
//       "skuFlag": null,
//       "valueType": 0,
//       "mandatory": 0,
//       "relyType": 0,
//       "relyAttrId": null,
//       "valueList": null,
//       "mapValueList": null
//     },
//     {
//       "attrId": "0cc055b5-a751-11e6-a18b-0050568a49fd",
//       "attrCode": "DISKMAXSIZE",
//       "attrDisplayName": "最大",
//       "skuFlag": null,
//       "valueType": 1,
//       "mandatory": 0,
//       "relyType": 0,
//       "relyAttrId": null,
//       "valueList": [
//         {
//           "attrValueId": "3b9e940c-a756-11e6-a18b-0050568a49fd",
//           "attrValueCode": "DISKMAXSIZE",
//           "attrDisplayValue": null,
//           "attrValue": "200"
//         }
//       ],
//       "mapValueList": null
//     },
//     {
//       "attrId": "de2296a2-a0f7-11e6-a18b-0050568a49fd",
//       "attrCode": "STORAGESIZE",
//       "attrDisplayName": "数据盘容量",
//       "skuFlag": null,
//       "valueType": 1,
//       "mandatory": 0,
//       "relyType": 0,
//       "relyAttrId": null,
//       "valueList": null,
//       "mapValueList": null
//     },
//     {
//       "attrId": "de227f1f-a0f7-11e6-a18b-0050568a49fd",
//       "attrCode": "OS",
//       "attrDisplayName": "镜像列表",
//       "skuFlag": null,
//       "valueType": 1,
//       "mandatory": 0,
//       "relyType": 1,
//       "relyAttrId": "de227c2e-a0f7-11e6-a18b-0050568a49fd",
//       "valueList": null,
//       "mapValueList": {
//         "cbe7ad93-a1b6-11e6-a18b-0050568a49fd": [
//           {
//             "attrValueId": "1401e2d1-a1b7-11e6-a18b-0050568a49fd",
//             "attrValueCode": "OS",
//             "attrDisplayValue": "CentOS7.2",
//             "attrValue": "2"
//           },
//           {
//             "attrValueId": "06ed9910-a1b7-11e6-a18b-0050568a49fd",
//             "attrValueCode": "OS",
//             "attrDisplayValue": "Windows Server R2012",
//             "attrValue": "0"
//           },
//           {
//             "attrValueId": "110d338d-a1b7-11e6-a18b-0050568a49fd",
//             "attrValueCode": "OS",
//             "attrDisplayValue": "CentOS6.5",
//             "attrValue": "1"
//           }
//         ]
//       }
//     },
//     {
//       "attrId": "c0b0d3cb-a750-11e6-a18b-0050568a49fd",
//       "attrCode": "DISKINITIALSIZE",
//       "attrDisplayName": "初始大小",
//       "skuFlag": null,
//       "valueType": 1,
//       "mandatory": 0,
//       "relyType": 0,
//       "relyAttrId": null,
//       "valueList": [
//         {
//           "attrValueId": "08944ebc-a756-11e6-a18b-0050568a49fd",
//           "attrValueCode": "DISKINITIALSIZE",
//           "attrDisplayValue": null,
//           "attrValue": "100"
//         }
//       ],
//       "mapValueList": null
//     },
//     {
//       "attrId": "dfdbcc3a-a748-11e6-a18b-0050568a49fd",
//       "attrCode": "DISKTYPE",
//       "attrDisplayName": "云硬盘",
//       "skuFlag": null,
//       "valueType": 1,
//       "mandatory": 0,
//       "relyType": 0,
//       "relyAttrId": null,
//       "valueList": [
//         {
//           "attrValueId": "9447bd7f-a74f-11e6-a18b-0050568a49fd",
//           "attrValueCode": "DISKTYPE",
//           "attrDisplayValue": "从未挂载盘",
//           "attrValue": "1"
//         },
//         {
//           "attrValueId": "9774de0c-a74f-11e6-a18b-0050568a49fd",
//           "attrValueCode": "DISKTYPE",
//           "attrDisplayValue": "从备份恢复",
//           "attrValue": "2"
//         },
//         {
//           "attrValueId": "90bfdf09-a74f-11e6-a18b-0050568a49fd",
//           "attrValueCode": "DISKTYPE",
//           "attrDisplayValue": "空白盘",
//           "attrValue": "0"
//         }
//       ],
//       "mapValueList": null
//     },
//     {
//       "attrId": "de22a07b-a0f7-11e6-a18b-0050568a49fd",
//       "attrCode": "CPU",
//       "attrDisplayName": "CPU",
//       "skuFlag": null,
//       "valueType": 0,
//       "mandatory": 0,
//       "relyType": 1,
//       "relyAttrId": "de226d17-a0f7-11e6-a18b-0050568a49fd",
//       "valueList": null,
//       "mapValueList": {
//         "2167aa03-a1b3-11e6-a18b-0050568a49fd": [
//           {
//             "attrValueId": "be9731a0-a1b3-11e6-a18b-0050568a49fd",
//             "attrValueCode": "CPU",
//             "attrDisplayValue": "1核",
//             "attrValue": "1"
//           },
//           {
//             "attrValueId": "e55bd6eb-a1b3-11e6-a18b-0050568a49fd",
//             "attrValueCode": "CPU",
//             "attrDisplayValue": "4核",
//             "attrValue": "4"
//           },
//           {
//             "attrValueId": "db44f252-a1b3-11e6-a18b-0050568a49fd",
//             "attrValueCode": "CPU",
//             "attrDisplayValue": "2核",
//             "attrValue": "2"
//           }
//         ]
//       }
//     },
//     {
//       "attrId": "6e867f57-a74b-11e6-a18b-0050568a49fd",
//       "attrCode": "DISKMOUNTHOSTID",
//       "attrDisplayName": "挂载云主机ID",
//       "skuFlag": null,
//       "valueType": 1,
//       "mandatory": 0,
//       "relyType": 0,
//       "relyAttrId": null,
//       "valueList": null,
//       "mapValueList": null
//     },
//     {
//       "attrId": "e9b5b9b1-a750-11e6-a18b-0050568a49fd",
//       "attrCode": "DISKSTEPSIZE",
//       "attrDisplayName": "步长",
//       "skuFlag": null,
//       "valueType": 1,
//       "mandatory": 0,
//       "relyType": 0,
//       "relyAttrId": null,
//       "valueList": [
//         {
//           "attrValueId": "32342f44-a756-11e6-a18b-0050568a49fd",
//           "attrValueCode": "DISKSTEPSIZE",
//           "attrDisplayValue": null,
//           "attrValue": "200"
//         }
//       ],
//       "mapValueList": null
//     },
//     {
//       "attrId": "de228b51-a0f7-11e6-a18b-0050568a49fd",
//       "attrCode": "SETTINGTYPE",
//       "attrDisplayName": "设置方式",
//       "skuFlag": null,
//       "valueType": 2,
//       "mandatory": 0,
//       "relyType": 0,
//       "relyAttrId": null,
//       "valueList": [
//         {
//           "attrValueId": "d45738f1-a1b8-11e6-a18b-0050568a49fd",
//           "attrValueCode": "SETTINGTYPE",
//           "attrDisplayValue": "模板自带密码",
//           "attrValue": "1"
//         },
//         {
//           "attrValueId": "d1217664-a1b8-11e6-a18b-0050568a49fd",
//           "attrValueCode": "SETTINGTYPE",
//           "attrDisplayValue": "立即设置",
//           "attrValue": "0"
//         }
//       ],
//       "mapValueList": null
//     },
//     {
//       "attrId": "de229efb-a0f7-11e6-a18b-0050568a49fd",
//       "attrCode": "BOOTSIZE",
//       "attrDisplayName": "启动盘容量",
//       "skuFlag": null,
//       "valueType": 0,
//       "mandatory": 0,
//       "relyType": 0,
//       "relyAttrId": null,
//       "valueList": null,
//       "mapValueList": null
//     },
//     {
//       "attrId": "de229819-a0f7-11e6-a18b-0050568a49fd",
//       "attrCode": "TIMELINEUNIT",
//       "attrDisplayName": "时长单位",
//       "skuFlag": null,
//       "valueType": 1,
//       "mandatory": 0,
//       "relyType": 0,
//       "relyAttrId": null,
//       "valueList": [
//         {
//           "attrValueId": "adc530eb-a1bb-11e6-a18b-0050568a49fd",
//           "attrValueCode": "TIMELINEUNIT",
//           "attrDisplayValue": "按小时",
//           "attrValue": "0"
//         },
//         {
//           "attrValueId": "b58de889-a1bb-11e6-a18b-0050568a49fd",
//           "attrValueCode": "TIMELINEUNIT",
//           "attrDisplayValue": "按周",
//           "attrValue": "2"
//         },
//         {
//           "attrValueId": "bc5d2ca5-a1bb-11e6-a18b-0050568a49fd",
//           "attrValueCode": "TIMELINEUNIT",
//           "attrDisplayValue": "按年",
//           "attrValue": "5"
//         },
//         {
//           "attrValueId": "b2297040-a1bb-11e6-a18b-0050568a49fd",
//           "attrValueCode": "TIMELINEUNIT",
//           "attrDisplayValue": "按天",
//           "attrValue": "1"
//         },
//         {
//           "attrValueId": "b8fe32a7-a1bb-11e6-a18b-0050568a49fd",
//           "attrValueCode": "TIMELINEUNIT",
//           "attrDisplayValue": "按月",
//           "attrValue": "3"
//         }
//       ],
//       "mapValueList": null
//     },
//     {
//       "attrId": "de22938f-a0f7-11e6-a18b-0050568a49fd",
//       "attrCode": "SECURITYGROUP",
//       "attrDisplayName": "安全组",
//       "skuFlag": null,
//       "valueType": 0,
//       "mandatory": 0,
//       "relyType": 0,
//       "relyAttrId": null,
//       "valueList": [
//         {
//           "attrValueId": "64aa7bb2-a1b6-11e6-a18b-0050568a49fd",
//           "attrValueCode": "SECURITYGROUP",
//           "attrDisplayValue": "default",
//           "attrValue": "default"
//         }
//       ],
//       "mapValueList": null
//     },
//     {
//       "attrId": "de22951e-a0f7-11e6-a18b-0050568a49fd",
//       "attrCode": "STARTUPSOURCE",
//       "attrDisplayName": "启动源",
//       "skuFlag": null,
//       "valueType": 0,
//       "mandatory": 0,
//       "relyType": 1,
//       "relyAttrId": "de226d17-a0f7-11e6-a18b-0050568a49fd",
//       "valueList": null,
//       "mapValueList": {
//         "2167aa03-a1b3-11e6-a18b-0050568a49fd": [
//           {
//             "attrValueId": "946a6340-a1b6-11e6-a18b-0050568a49fd",
//             "attrValueCode": "STARTUPSOURCE",
//             "attrDisplayValue": "镜像",
//             "attrValue": "0"
//           },
//           {
//             "attrValueId": "9cd1950f-a1b6-11e6-a18b-0050568a49fd",
//             "attrValueCode": "STARTUPSOURCE",
//             "attrDisplayValue": "卷镜像",
//             "attrValue": "1"
//           }
//         ]
//       }
//     },
//     {
//       "attrId": "db4fac5d-a74a-11e6-a18b-0050568a49fd",
//       "attrCode": "DISKSIZE",
//       "attrDisplayName": "容量",
//       "skuFlag": null,
//       "valueType": 1,
//       "mandatory": 0,
//       "relyType": 0,
//       "relyAttrId": null,
//       "valueList": null,
//       "mapValueList": null
//     },
//     {
//       "attrId": "de229b8e-a0f7-11e6-a18b-0050568a49fd",
//       "attrCode": "ZONE",
//       "attrDisplayName": "可用区",
//       "skuFlag": null,
//       "valueType": 1,
//       "mandatory": 0,
//       "relyType": 1,
//       "relyAttrId": "de226d17-a0f7-11e6-a18b-0050568a49fd",
//       "valueList": null,
//       "mapValueList": {
//         "2167aa03-a1b3-11e6-a18b-0050568a49fd": [
//           {
//             "attrValueId": "7a0b2215-a1b3-11e6-a18b-0050568a49fd",
//             "attrValueCode": "ZONE",
//             "attrDisplayValue": "可用区1",
//             "attrValue": "nova"
//           }
//         ]
//       }
//     },
    
//     {
//       "attrId": "de228fbe-a0f7-11e6-a18b-0050568a49fd",
//       "attrCode": "PASSWORD",
//       "attrDisplayName": "登录密码",
//       "skuFlag": null,
//       "valueType": 2,
//       "mandatory": 0,
//       "relyType": 1,
//       "relyAttrId": "de228b51-a0f7-11e6-a18b-0050568a49fd",
//       "valueList": null,
//       "mapValueList": null
//     },
//     {
//       "attrId": "de226d17-a0f7-11e6-a18b-0050568a49fd",
//       "attrCode": "PLATFORM",
//       "attrDisplayName": "云平台",
//       "skuFlag": null,
//       "valueType": 1,
//       "mandatory": 0,
//       "relyType": 0,
//       "relyAttrId": null,
//       "valueList": [
//         {
//           "attrValueId": "2167aa03-a1b3-11e6-a18b-0050568a49fd",
//           "attrValueCode": "PLATFORM",
//           "attrDisplayValue": "HOS2",
//           "attrValue": "88"
//         }
//       ],
//       "mapValueList": null
//     }
//   ],
//   "skuMap": {
//     "[5efc2205-1d1a-42a9-b867-cef333a30c10]": {
//       "productId": "11a88d23-22ce-4526-a816-97059330ea3c",
//       "skuId": "9dac08ac-a5fe-4eb6-80ba-43612bc449e5",
//       "serviceType": 0,
//       "serviceName": "jira vm prod"
//     },
//     "[a5bfbd44-ca74-48de-ac24-5b33bc83ea37]": {
//       "productId": "3ddb2960-eb3c-449c-90de-fd62235c249c",
//       "skuId": "1c8628ae-f062-4250-8439-df50f7fe82d8",
//       "serviceType": 0,
//       "serviceName": "中型云主机"
//     },
//     "[5ef791b5-ea70-47c2-b396-95a3098064f1]": {
//       "productId": "a4dd30c8-f930-4dd2-b1bc-9707d23e1f2a",
//       "skuId": "9cba8190-c149-44da-ab1b-1ec34e22cc84",
//       "serviceType": 0,
//       "serviceName": "产品"
//     },
//     "[2d2f94ec-1787-4522-8e4b-21b7e50721cc]": {
//       "productId": "90241f70-6d4d-47aa-ab4e-b1d6d6c53c51",
//       "skuId": "ac55c1c8-a15f-4796-a90f-6d449ec2ff39",
//       "serviceType": 0,
//       "serviceName": "VM-Large2"
//     },
//     "[3ff74269-3a0e-417c-a19e-bd4aa2a10f5c]": {
//       "productId": "61951e37-cad0-46c7-bdbe-dab695080d24",
//       "skuId": "1b28397b-bdb7-49b5-9c22-c12057add433",
//       "serviceType": 0,
//       "serviceName": "this is first product"
//     },
//     "[f8ec9bbb-97e0-4827-b2a2-2152d3d5afdc]": {
//       "productId": "2b772cc8-537f-4547-92b0-753a8c0165a2",
//       "skuId": "19623245-92a1-4d1d-b84b-5467d4686852",
//       "serviceType": 0,
//       "serviceName": "disk pruduct001"
//     },
//     "[edcddda0-426d-495e-8409-1b097aa072c2]": {
//       "productId": "25285961-f227-4b4e-950b-10c20f16fa37",
//       "skuId": "24dd1fc0-6eaa-4827-9501-e5ea1d4a807b",
//       "serviceType": 0,
//       "serviceName": "周二"
//     },
//     "[c3b7d3ca-932b-481c-8b97-4d6a10657182]": {
//       "productId": "31dfed00-a6ad-41c4-8c6d-355b13f7fd2e",
//       "skuId": "19623245-92a1-4d1d-b84b-5467d4686852",
//       "serviceType": 0,
//       "serviceName": "another"
//     },
//     "[1bf38109-6138-4f31-b074-7afde90d14fc]": {
//       "productId": "0ff53c79-1264-4b54-8c7a-625f44a117e7",
//       "skuId": "90da5a78-49b0-42be-b2f9-c2525dde0ff3",
//       "serviceType": 0,
//       "serviceName": "涛涛涛涛涛涛涛涛涛涛"
//     },
//     "[898e0bb5-6e5c-47f4-85c9-f30770038176]": {
//       "productId": "2299cb06-ef18-439d-bc35-bc8ddaed6a94",
//       "skuId": "d53656df-a2a4-4fca-84d5-c344a0c040bb",
//       "serviceType": 0,
//       "serviceName": "disk thereewerwrwerrrrrrrrrrr"
//     },
//     "[60e0ad9c-7a8b-44f3-98f1-4e3ce45fbced]": {
//       "productId": "710ed12a-688b-47f0-bc82-52f9d7de121c",
//       "skuId": "20e54452-b767-47c2-96bf-ae06e2630d7e",
//       "serviceType": 0,
//       "serviceName": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
//     },
//     "[4c24a163-ab63-4005-96f0-84dbedf8df92]": {
//       "productId": "178aaec5-ecb5-4a52-9a25-cabcc2e41e97",
//       "skuId": "07d70bda-03e6-433c-9025-1f5892e80354",
//       "serviceType": 0,
//       "serviceName": "小型云主机"
//     },
//     "[7bbd4049-169e-4cc7-a848-549e85afd686]": {
//       "productId": "7408980c-b029-4344-a3db-8db0a49488eb",
//       "skuId": "1e82136d-56f5-4598-9f1f-c4dfa8788f9e",
//       "serviceType": 0,
//       "serviceName": "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj"
//     },
//     "[0962121a-8e5f-4f0d-8b19-7ace10486dfe]": {
//       "productId": "b230be50-93d0-43da-b57d-8b68d7889ddd",
//       "skuId": "08386787-3faf-4113-b49e-2d0b33076932",
//       "serviceType": 0,
//       "serviceName": "Michael-Product"
//     },
//     "[9a078af3-8187-4d6f-8d65-3b65388f76ca]": {
//       "productId": "d0bcc28c-c14a-4afa-9e32-55ea911f9ef3",
//       "skuId": "ec2e5592-abb0-4203-9bad-73faa3daf14c",
//       "serviceType": 0,
//       "serviceName": "大苏打似的"
//     },
//     "[30798f6a-da7f-45f2-8d30-e96fb31acbec]": {
//       "productId": "81bb1726-b5ba-44d5-9321-92ae72b044f9",
//       "skuId": "19623245-92a1-4d1d-b84b-5467d4686852",
//       "serviceType": 0,
//       "serviceName": "disk pruduct001"
//     },
//     "[59bc3bca-eeb7-4fe7-93eb-a4d34b329e88]": {
//       "productId": "43570b01-603e-4361-bea4-937b32e60d7a",
//       "skuId": "e399669e-57e3-4d56-8c3e-d16ef0b9d79f",
//       "serviceType": 0,
//       "serviceName": "价格"
//     },
//     "[86fedef0-feec-4697-a780-82dcc246812b]": {
//       "productId": "9d9a2141-f671-46a4-84f6-30fd7b2d4297",
//       "skuId": "6462cbff-80dc-4ecf-8c09-6b231b52e416",
//       "serviceType": 0,
//       "serviceName": "体育体育图"
//     },
//     "[96ddc261-d16f-4f1c-b28f-a28b4e7446c8]": {
//       "productId": "97474d11-59ce-421e-a2fe-a9fb39025009",
//       "skuId": "19623245-92a1-4d1d-b84b-5467d4686852",
//       "serviceType": 0,
//       "serviceName": "disk pruduct001"
//     },
//     "[3d7fe65e-1360-489f-a958-8e01e6793f84]": {
//       "productId": "f871bb91-3f6d-44bf-b5e7-743ad9fc725b",
//       "skuId": "a6e7ca91-b423-40ab-b40f-e8fc7899b746",
//       "serviceType": 0,
//       "serviceName": "yunzhuji product"
//     },
//     "[c834cc88-8ed6-41b8-887f-820504932561]": {
//       "productId": "c7e62578-026c-4d81-b36c-b04a62713742",
//       "skuId": "3fa6e408-5577-46b2-b74d-06dead68cc84",
//       "serviceType": 0,
//       "serviceName": "jira disk prod"
//     },
//     "[c876faba-a2a9-4317-9883-c051f94e5e70]": {
//       "productId": "720a6cc5-2029-4b6e-a946-84832149f7bf",
//       "skuId": "ac55c1c8-a15f-4796-a90f-6d449ec2ff39",
//       "serviceType": 0,
//       "serviceName": "VM-Large"
//     },
//     "[d3d6f362-051a-4edb-90c6-48067b4f940f]": {
//       "productId": "a393786a-bd72-4e9f-b590-8920c28a27fb",
//       "skuId": "ee9eea7e-501c-4131-9530-54cddd2c939c",
//       "serviceType": 0,
//       "serviceName": "StanardDisk-001"
//     },
//     "[27f1183c-adb0-469f-8bb2-a0b282a3833c]": {
//       "productId": "0ef0e649-25f3-4bf4-9782-a7f3578a760b",
//       "skuId": "02ebf057-392c-49ef-bf7f-3686a695441b",
//       "serviceType": 0,
//       "serviceName": "哦ipiip"
//     },
//     "[356579a9-a634-466b-9e1b-b530712f83b9]": {
//       "productId": "58dfcd51-ec96-4563-9f01-e8803eabe6be",
//       "skuId": "20e54452-b767-47c2-96bf-ae06e2630d7e",
//       "serviceType": 0,
//       "serviceName": "oooooooooooooooooooo"
//     },
//     "[65ff2410-0060-4243-81bc-a4bc14f13f57]": {
//       "productId": "5c18d6eb-d080-47f3-aa85-8f870de9137b",
//       "skuId": "f74ff5de-f020-44e9-827c-5395bca389c8",
//       "serviceType": 0,
//       "serviceName": "AAAAAAAAAAAAAAAAAAA"
//     },
//     "[7802f4c3-7ec7-4cc5-a8dd-deeab67ca256]": {
//       "productId": "669f4f0e-1c57-4437-9d50-d1db2d5a1428",
//       "skuId": "e940c0d8-8c3d-4074-8a23-eeb2458f0c10",
//       "serviceType": 0,
//       "serviceName": "自行车"
//     }
//   }
// }
//        )
// })


        const request = this.restApi.request(api.method, api.url, undefined, undefined)
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