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
//             "attrValueCode": null,
//             "attrDisplayValue": "私有镜像",
//             "attrValue": "1"
//           },
//           {
//             "attrValueId": "cbe7ad93-a1b6-11e6-a18b-0050568a49fd",
//             "attrValueCode": null,
//             "attrDisplayValue": "标准镜像",
//             "attrValue": "0"
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
//           "attrValueCode": null,
//           "attrDisplayValue": null,
//           "attrValue": "8"
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
//           "attrValueId": "90bfdf09-a74f-11e6-a18b-0050568a49fd",
//           "attrValueCode": "EMPTYDISK",
//           "attrDisplayValue": "空白盘",
//           "attrValue": "0"
//         },
//         {
//           "attrValueId": "9447bd7f-a74f-11e6-a18b-0050568a49fd",
//           "attrValueCode": "UNMOUNTDISK",
//           "attrDisplayValue": "从未挂载盘",
//           "attrValue": "1"
//         },
//         {
//           "attrValueId": "9774de0c-a74f-11e6-a18b-0050568a49fd",
//           "attrValueCode": "RECOVERDISK",
//           "attrDisplayValue": "从备份恢复",
//           "attrValue": "2"
//         }
//       ],
//       "mapValueList": null
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
//           "attrValueCode": null,
//           "attrDisplayValue": "自定义网络1: 192.168.101.0",
//           "attrValue": "73f6f1ac-5e58-4801-88c3-7e12c6ddfb39"
//         },
//         {
//           "attrValueId": "33a08bec-a1b6-11e6-a18b-0050568a49fd",
//           "attrValueCode": null,
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
//           "attrValueCode": null,
//           "attrDisplayValue": "流量计费",
//           "attrValue": "1"
//         },
//         {
//           "attrValueId": "2478ab7f-a1bb-11e6-a18b-0050568a49fd",
//           "attrValueCode": null,
//           "attrDisplayValue": "周期计费",
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
//             "attrValueCode": null,
//             "attrDisplayValue": "1核",
//             "attrValue": "1"
//           },
//           {
//             "attrValueId": "e55bd6eb-a1b3-11e6-a18b-0050568a49fd",
//             "attrValueCode": null,
//             "attrDisplayValue": "4核",
//             "attrValue": "4"
//           },
//           {
//             "attrValueId": "db44f252-a1b3-11e6-a18b-0050568a49fd",
//             "attrValueCode": null,
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
//           "attrValueCode": null,
//           "attrDisplayValue": null,
//           "attrValue": "3"
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
//           "attrValueCode": null,
//           "attrDisplayValue": "模板自带密码",
//           "attrValue": "1"
//         },
//         {
//           "attrValueId": "d1217664-a1b8-11e6-a18b-0050568a49fd",
//           "attrValueCode": null,
//           "attrDisplayValue": "立即设置",
//           "attrValue": "0"
//         }
//       ],
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
//             "attrValueCode": null,
//             "attrDisplayValue": "高速I/O",
//             "attrValue": "8816bd60-61c0-400b-b8b2-f20822d4baa8"
//           }
//         ]
//       }
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
//       "relyType": 2,
//       "relyAttrId": null,
//       "valueList": null,
//       "mapValueList": {
//         "90da5a78-49b0-42be-b2f9-c2525dde0ff3": [
//           {
//             "attrValueId": "bc5d2ca5-a1bb-11e6-a18b-0050568a49fd",
//             "attrValueCode": "1bf38109-6138-4f31-b074-7afde90d14fc",
//             "attrDisplayValue": "按年",
//             "attrValue": "5"
//           }
//         ],
//         "07d70bda-03e6-433c-9025-1f5892e80354": [
//           {
//             "attrValueId": "bc5d2ca5-a1bb-11e6-a18b-0050568a49fd",
//             "attrValueCode": "4c24a163-ab63-4005-96f0-84dbedf8df92",
//             "attrDisplayValue": "按年",
//             "attrValue": "5"
//           }
//         ],
//         "ac55c1c8-a15f-4796-a90f-6d449ec2ff39": [
//           {
//             "attrValueId": "b8fe32a7-a1bb-11e6-a18b-0050568a49fd",
//             "attrValueCode": "2d2f94ec-1787-4522-8e4b-21b7e50721cc",
//             "attrDisplayValue": "按月",
//             "attrValue": "3"
//           }
//         ],
//         "9dac08ac-a5fe-4eb6-80ba-43612bc449e5": [
//           {
//             "attrValueId": "b8fe32a7-a1bb-11e6-a18b-0050568a49fd",
//             "attrValueCode": "5efc2205-1d1a-42a9-b867-cef333a30c10",
//             "attrDisplayValue": "按月",
//             "attrValue": "3"
//           }
//         ],
//         "08386787-3faf-4113-b49e-2d0b33076932": [
//           {
//             "attrValueId": "b8fe32a7-a1bb-11e6-a18b-0050568a49fd",
//             "attrValueCode": "0962121a-8e5f-4f0d-8b19-7ace10486dfe",
//             "attrDisplayValue": "按月",
//             "attrValue": "3"
//           }
//         ],
//         "9cba8190-c149-44da-ab1b-1ec34e22cc84": [
//           {
//             "attrValueId": "b8fe32a7-a1bb-11e6-a18b-0050568a49fd",
//             "attrValueCode": "5ef791b5-ea70-47c2-b396-95a3098064f1",
//             "attrDisplayValue": "按月",
//             "attrValue": "3"
//           }
//         ],
//         "ec2e5592-abb0-4203-9bad-73faa3daf14c": [
//           {
//             "attrValueId": "bc5d2ca5-a1bb-11e6-a18b-0050568a49fd",
//             "attrValueCode": "9a078af3-8187-4d6f-8d65-3b65388f76ca",
//             "attrDisplayValue": "按年",
//             "attrValue": "5"
//           }
//         ],
//         "1c8628ae-f062-4250-8439-df50f7fe82d8": [
//           {
//             "attrValueId": "b2297040-a1bb-11e6-a18b-0050568a49fd",
//             "attrValueCode": "a5bfbd44-ca74-48de-ac24-5b33bc83ea37",
//             "attrDisplayValue": "按天",
//             "attrValue": "1"
//           }
//         ],
//         "02ebf057-392c-49ef-bf7f-3686a695441b": [
//           {
//             "attrValueId": "bc5d2ca5-a1bb-11e6-a18b-0050568a49fd",
//             "attrValueCode": "27f1183c-adb0-469f-8bb2-a0b282a3833c",
//             "attrDisplayValue": "按年",
//             "attrValue": "5"
//           }
//         ]
//       }
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
//           "attrValueCode": null,
//           "attrDisplayValue": "default",
//           "attrValue": "default"
//         }
//       ],
//       "mapValueList": null
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
//           "attrValueCode": null,
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
//             "attrValueCode": null,
//             "attrDisplayValue": "8GB",
//             "attrValue": "8192"
//           }
//         ],
//         "db44f252-a1b3-11e6-a18b-0050568a49fd": [
//           {
//             "attrValueId": "7556c38e-a1b4-11e6-a18b-0050568a49fd",
//             "attrValueCode": null,
//             "attrDisplayValue": "4GB",
//             "attrValue": "4096"
//           }
//         ],
//         "be9731a0-a1b3-11e6-a18b-0050568a49fd": [
//           {
//             "attrValueId": "2ef9b384-a1b4-11e6-a18b-0050568a49fd",
//             "attrValueCode": null,
//             "attrDisplayValue": "512MB",
//             "attrValue": "512"
//           },
//           {
//             "attrValueId": "7078d68f-a1b4-11e6-a18b-0050568a49fd",
//             "attrValueCode": null,
//             "attrDisplayValue": "2GB",
//             "attrValue": "2048"
//           }
//         ]
//       }
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
//             "attrValueCode": null,
//             "attrDisplayValue": "镜像",
//             "attrValue": "0"
//           },
//           {
//             "attrValueId": "9cd1950f-a1b6-11e6-a18b-0050568a49fd",
//             "attrValueCode": null,
//             "attrDisplayValue": "卷镜像",
//             "attrValue": "1"
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
//           "attrValueCode": null,
//           "attrDisplayValue": null,
//           "attrValue": "156"
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
//             "attrValueCode": null,
//             "attrDisplayValue": "可用区1",
//             "attrValue": "nova"
//           }
//         ]
//       }
//     },
//     {
//       "attrId": "8df90e09-a74a-11e6-a18b-0050568a49fd",
//       "attrCode": "STORAGE",
//       "attrDisplayName": "云硬盘类型",
//       "skuFlag": null,
//       "valueType": 1,
//       "mandatory": 0,
//       "relyType": 1,
//       "relyAttrId": "de226d17-a0f7-11e6-a18b-0050568a49fd",
//       "valueList": null,
//       "mapValueList": {
//         "ead0ce48-a74e-11e6-a18b-0050568a49fd": [
//           {
//             "attrValueId": "5284d21b-a750-11e6-a18b-0050568a49fd",
//             "attrValueCode": null,
//             "attrDisplayValue": "高速I/O",
//             "attrValue": "8816bd60-61c0-400b-b8b2-f20822d4baa8"
//           }
//         ],
//         "2167aa03-a1b3-11e6-a18b-0050568a49fd": [
//           {
//             "attrValueId": "5284d21b-a750-11e6-a18b-0050568a49fd",
//             "attrValueCode": "HIGHSPEEDIO",
//             "attrDisplayValue": "高速I/O",
//             "attrValue": "8816bd60-61c0-400b-b8b2-f20822d4baa8"
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
//           "attrValueCode": null,
//           "attrDisplayValue": "HOS2",
//           "attrValue": "88"
//         }
//       ],
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
//             "attrValueCode": null,
//             "attrDisplayValue": "CentOS7.2",
//             "attrValue": "2"
//           },
//           {
//             "attrValueId": "06ed9910-a1b7-11e6-a18b-0050568a49fd",
//             "attrValueCode": null,
//             "attrDisplayValue": "Windows Server R2012",
//             "attrValue": "0"
//           },
//           {
//             "attrValueId": "110d338d-a1b7-11e6-a18b-0050568a49fd",
//             "attrValueCode": null,
//             "attrDisplayValue": "CentOS6.5",
//             "attrValue": "1"
//           }
//         ]
//       }
//     }
//   ],
//   "skuMap": {
//     "[7a0b2215-a1b3-11e6-a18b-0050568a49fd, 2167aa03-a1b3-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd]": {
//       "productId": "eec0b1d3-a4f4-4bd5-a226-e8ee5ced3063",
//       "skuId": "df84021c-4c9d-483f-b06f-ba47ff937803",
//       "serviceType": 0,
//       "serviceName": "IPHONE_1480079314"
//     },
//     "[5284d21b-a750-11e6-a18b-0050568a49fd, 1b4f62a7-a74f-11e6-a18b-0050568a49fd, ead0ce48-a74e-11e6-a18b-0050568a49fd]": {
//       "productId": "43570b01-603e-4361-bea4-937b32e60d7a",
//       "skuId": "e399669e-57e3-4d56-8c3e-d16ef0b9d79f",
//       "serviceType": 0,
//       "serviceName": "价格"
//     },
//     "[1b4f62a7-a74f-11e6-a18b-0050568a49fd, ead0ce48-a74e-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd]": {
//       "productId": "2299cb06-ef18-439d-bc35-bc8ddaed6a94",
//       "skuId": "d53656df-a2a4-4fca-84d5-c344a0c040bb",
//       "serviceType": 0,
//       "serviceName": "disk thereewerwrwerrrrrrrrrrr"
//     },
//     "[7078d68f-a1b4-11e6-a18b-0050568a49fd, 2167aa03-a1b3-11e6-a18b-0050568a49fd, be9731a0-a1b3-11e6-a18b-0050568a49fd, 7a0b2215-a1b3-11e6-a18b-0050568a49fd]": {
//       "productId": "11a88d23-22ce-4526-a816-97059330ea3c",
//       "skuId": "9dac08ac-a5fe-4eb6-80ba-43612bc449e5",
//       "serviceType": 0,
//       "serviceName": "jira vm prod"
//     },
//     "[1b4f62a7-a74f-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, ead0ce48-a74e-11e6-a18b-0050568a49fd]": {
//       "productId": "25285961-f227-4b4e-950b-10c20f16fa37",
//       "skuId": "24dd1fc0-6eaa-4827-9501-e5ea1d4a807b",
//       "serviceType": 0,
//       "serviceName": "周二"
//     },
//     "[5284d21b-a750-11e6-a18b-0050568a49fd, 2167aa03-a1b3-11e6-a18b-0050568a49fd, 7a0b2215-a1b3-11e6-a18b-0050568a49fd]": {
//       "productId": "3eecda39-c18a-4890-aeba-05a4cb5b6336",
//       "skuId": "3895885d-17d1-4942-b89e-0bac0bb6f725",
//       "serviceType": 0,
//       "serviceName": "IPHONE_1480647598"
//     },
//     "[ead0ce48-a74e-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, 1b4f62a7-a74f-11e6-a18b-0050568a49fd]": {
//       "productId": "2b772cc8-537f-4547-92b0-753a8c0165a2",
//       "skuId": "19623245-92a1-4d1d-b84b-5467d4686852",
//       "serviceType": 0,
//       "serviceName": "disk pruduct001"
//     },
//     "[ead0ce48-a74e-11e6-a18b-0050568a49fd, 1b4f62a7-a74f-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd]": {
//       "productId": "710ed12a-688b-47f0-bc82-52f9d7de121c",
//       "skuId": "20e54452-b767-47c2-96bf-ae06e2630d7e",
//       "serviceType": 0,
//       "serviceName": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
//     },
//     "[2167aa03-a1b3-11e6-a18b-0050568a49fd, 7a0b2215-a1b3-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd]": {
//       "productId": "129bb5d0-a39e-493a-bf20-400fe192c48a",
//       "skuId": "732df352-1b00-4b08-a771-bd5e321df931",
//       "serviceType": 0,
//       "serviceName": "IPHONE_1480078236"
//     },
//     "[7a0b2215-a1b3-11e6-a18b-0050568a49fd, 2167aa03-a1b3-11e6-a18b-0050568a49fd, be9731a0-a1b3-11e6-a18b-0050568a49fd]": {
//       "productId": "b230be50-93d0-43da-b57d-8b68d7889ddd",
//       "skuId": "08386787-3faf-4113-b49e-2d0b33076932",
//       "serviceType": 0,
//       "serviceName": "Michael-Product"
//     },
//     "[5284d21b-a750-11e6-a18b-0050568a49fd, ead0ce48-a74e-11e6-a18b-0050568a49fd, 1b4f62a7-a74f-11e6-a18b-0050568a49fd]": {
//       "productId": "5c18d6eb-d080-47f3-aa85-8f870de9137b",
//       "skuId": "f74ff5de-f020-44e9-827c-5395bca389c8",
//       "serviceType": 0,
//       "serviceName": "AAAAAAAAAAAAAAAAAAA"
//     },
//     "[2167aa03-a1b3-11e6-a18b-0050568a49fd, e55bd6eb-a1b3-11e6-a18b-0050568a49fd, 7a0b2215-a1b3-11e6-a18b-0050568a49fd, 79d80098-a1b4-11e6-a18b-0050568a49fd]": {
//       "productId": "90241f70-6d4d-47aa-ab4e-b1d6d6c53c51",
//       "skuId": "ac55c1c8-a15f-4796-a90f-6d449ec2ff39",
//       "serviceType": 0,
//       "serviceName": "VM-Large2"
//     },
//     "[2167aa03-a1b3-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, 7a0b2215-a1b3-11e6-a18b-0050568a49fd]": {
//       "productId": "e91ffc4e-149b-4a55-bcb3-7c325a8e2821",
//       "skuId": "ed1b1701-22a3-4147-91a2-2b56eb5ce0b2",
//       "serviceType": 0,
//       "serviceName": "IPHONE_1480078185"
//     },
//     "[2167aa03-a1b3-11e6-a18b-0050568a49fd, 7a0b2215-a1b3-11e6-a18b-0050568a49fd, be9731a0-a1b3-11e6-a18b-0050568a49fd, 2ef9b384-a1b4-11e6-a18b-0050568a49fd]": {
//       "productId": "178aaec5-ecb5-4a52-9a25-cabcc2e41e97",
//       "skuId": "07d70bda-03e6-433c-9025-1f5892e80354",
//       "serviceType": 0,
//       "serviceName": "小型云主机"
//     },
//     "[2167aa03-a1b3-11e6-a18b-0050568a49fd, 7a0b2215-a1b3-11e6-a18b-0050568a49fd, db44f252-a1b3-11e6-a18b-0050568a49fd, 7556c38e-a1b4-11e6-a18b-0050568a49fd]": {
//       "productId": "3ddb2960-eb3c-449c-90de-fd62235c249c",
//       "skuId": "1c8628ae-f062-4250-8439-df50f7fe82d8",
//       "serviceType": 0,
//       "serviceName": "中型云主机"
//     },
//     "[7a0b2215-a1b3-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, 2167aa03-a1b3-11e6-a18b-0050568a49fd]": {
//       "productId": "f070bab5-4baa-4613-b24b-9c6461469b8d",
//       "skuId": "9ea632b4-70e1-49b9-9c92-d6409d0febb3",
//       "serviceType": 0,
//       "serviceName": "IPHONE_1480078709"
//     },
//     "[2167aa03-a1b3-11e6-a18b-0050568a49fd, 7078d68f-a1b4-11e6-a18b-0050568a49fd, 7a0b2215-a1b3-11e6-a18b-0050568a49fd, be9731a0-a1b3-11e6-a18b-0050568a49fd]": {
//       "productId": "0ef0e649-25f3-4bf4-9782-a7f3578a760b",
//       "skuId": "02ebf057-392c-49ef-bf7f-3686a695441b",
//       "serviceType": 0,
//       "serviceName": "哦ipiip"
//     },
//     "[be9731a0-a1b3-11e6-a18b-0050568a49fd, 7078d68f-a1b4-11e6-a18b-0050568a49fd, 7a0b2215-a1b3-11e6-a18b-0050568a49fd, 2167aa03-a1b3-11e6-a18b-0050568a49fd]": {
//       "productId": "a4dd30c8-f930-4dd2-b1bc-9707d23e1f2a",
//       "skuId": "9cba8190-c149-44da-ab1b-1ec34e22cc84",
//       "serviceType": 0,
//       "serviceName": "产品"
//     },
//     "[be9731a0-a1b3-11e6-a18b-0050568a49fd, 7078d68f-a1b4-11e6-a18b-0050568a49fd, 2167aa03-a1b3-11e6-a18b-0050568a49fd, 7a0b2215-a1b3-11e6-a18b-0050568a49fd]": {
//       "productId": "d0bcc28c-c14a-4afa-9e32-55ea911f9ef3",
//       "skuId": "ec2e5592-abb0-4203-9bad-73faa3daf14c",
//       "serviceType": 0,
//       "serviceName": "大苏打似的"
//     },
//     "[7a0b2215-a1b3-11e6-a18b-0050568a49fd, 7078d68f-a1b4-11e6-a18b-0050568a49fd, 2167aa03-a1b3-11e6-a18b-0050568a49fd, be9731a0-a1b3-11e6-a18b-0050568a49fd]": {
//       "productId": "0ff53c79-1264-4b54-8c7a-625f44a117e7",
//       "skuId": "90da5a78-49b0-42be-b2f9-c2525dde0ff3",
//       "serviceType": 0,
//       "serviceName": "涛涛涛涛涛涛涛涛涛涛"
//     }
//   },
//   "proMap": {
//     "[3fa6e408-5577-46b2-b74d-06dead68cc84, c834cc88-8ed6-41b8-887f-820504932561]": {
//       "productId": "c7e62578-026c-4d81-b36c-b04a62713742",
//       "productName": "jira disk prod",
//       "serviceId": "562362f8-114b-4fe1-bbea-38b46dc2a410",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "c834cc88-8ed6-41b8-887f-820504932561",
//         "billingMode": 2,
//         "basePrice": 0,
//         "periodType": null,
//         "basicPrice": null,
//         "cyclePrice": null,
//         "unitPrice": 100,
//         "unitType": 0
//       }
//     },
//     "[ed1b1701-22a3-4147-91a2-2b56eb5ce0b2, 100e7431-373f-4232-9109-00478ae45be9]": {
//       "productId": "e91ffc4e-149b-4a55-bcb3-7c325a8e2821",
//       "productName": "IPHONE_1480078185",
//       "serviceId": "6b1f8198-d927-4556-9c04-59611e1d6ac6",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "100e7431-373f-4232-9109-00478ae45be9",
//         "billingMode": 1,
//         "basePrice": 129,
//         "periodType": 0,
//         "basicPrice": 90,
//         "cyclePrice": 685,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[20e54452-b767-47c2-96bf-ae06e2630d7e, 60e0ad9c-7a8b-44f3-98f1-4e3ce45fbced]": {
//       "productId": "710ed12a-688b-47f0-bc82-52f9d7de121c",
//       "productName": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
//       "serviceId": "b3b114aa-da63-470b-afba-3cc70859e27a",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "60e0ad9c-7a8b-44f3-98f1-4e3ce45fbced",
//         "billingMode": 1,
//         "basePrice": 45,
//         "periodType": 3,
//         "basicPrice": 345,
//         "cyclePrice": null,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[90da5a78-49b0-42be-b2f9-c2525dde0ff3, 1bf38109-6138-4f31-b074-7afde90d14fc]": {
//       "productId": "0ff53c79-1264-4b54-8c7a-625f44a117e7",
//       "productName": "涛涛涛涛涛涛涛涛涛涛",
//       "serviceId": "6aa0c659-c7e6-4cb6-b63d-046415502f05",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "1bf38109-6138-4f31-b074-7afde90d14fc",
//         "billingMode": 1,
//         "basePrice": 34,
//         "periodType": 5,
//         "basicPrice": 678,
//         "cyclePrice": 5665,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[08386787-3faf-4113-b49e-2d0b33076932, 0962121a-8e5f-4f0d-8b19-7ace10486dfe]": {
//       "productId": "b230be50-93d0-43da-b57d-8b68d7889ddd",
//       "productName": "Michael-Product",
//       "serviceId": "5d7aa39a-b557-416a-b7f0-082a0ea28721",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "0962121a-8e5f-4f0d-8b19-7ace10486dfe",
//         "billingMode": 1,
//         "basePrice": 100,
//         "periodType": 3,
//         "basicPrice": null,
//         "cyclePrice": null,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[fd25d93e-7302-433b-9cba-ae3de4e62fb8, 8e554fad-fcff-44cf-ab10-40abfe21f7ff]": {
//       "productId": "3b425d79-52bc-44ce-a527-489dfc3accd4",
//       "productName": "IPHONE_1480079506",
//       "serviceId": "52785a1a-e324-44cf-b268-8b46d09845d3",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "8e554fad-fcff-44cf-ab10-40abfe21f7ff",
//         "billingMode": 2,
//         "basePrice": 532,
//         "periodType": null,
//         "basicPrice": null,
//         "cyclePrice": null,
//         "unitPrice": 681,
//         "unitType": 0
//       }
//     },
//     "[0709786f-4714-4010-aa32-e591a3c85484, 41c78014-28bf-422d-809f-eb0d05372609]": {
//       "productId": "1d86eeb6-c211-4c35-b310-4c61391bbf87",
//       "productName": "IPHONE_1480648414",
//       "serviceId": "efcb1ba3-be25-479d-bf12-82d09a8c5a80",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "41c78014-28bf-422d-809f-eb0d05372609",
//         "billingMode": 1,
//         "basePrice": 651,
//         "periodType": 1,
//         "basicPrice": 872,
//         "cyclePrice": 16,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[b38425fb-64c8-4dce-a346-67177e5b00e9, 28c2a9d5-1640-4474-b96c-16e34529c70d]": {
//       "productId": "b5fdf499-6f92-425e-8302-7cb417255394",
//       "productName": "A123",
//       "serviceId": "05fc0552-ec35-45a4-8bb7-e5b85dea1118",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "28c2a9d5-1640-4474-b96c-16e34529c70d",
//         "billingMode": 1,
//         "basePrice": 100,
//         "periodType": 5,
//         "basicPrice": 100,
//         "cyclePrice": 100,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[ec2e5592-abb0-4203-9bad-73faa3daf14c, 9a078af3-8187-4d6f-8d65-3b65388f76ca]": {
//       "productId": "d0bcc28c-c14a-4afa-9e32-55ea911f9ef3",
//       "productName": "大苏打似的",
//       "serviceId": "c70f356b-30d3-476b-8324-33039a4dfb42",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "9a078af3-8187-4d6f-8d65-3b65388f76ca",
//         "billingMode": 1,
//         "basePrice": 100,
//         "periodType": 5,
//         "basicPrice": 200,
//         "cyclePrice": 200,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[d19b82ae-9172-4ba8-93f4-38c235ecec9d, edbf3dd1-c499-428e-997d-f674b5ba99c2]": {
//       "productId": "94299dfb-dfd6-4b08-b798-28d6f4cfc006",
//       "productName": "IPHONE_1480078476",
//       "serviceId": "32260fc4-e499-49ea-93db-d8f04bd0816b",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "edbf3dd1-c499-428e-997d-f674b5ba99c2",
//         "billingMode": 1,
//         "basePrice": 716,
//         "periodType": 2,
//         "basicPrice": 17,
//         "cyclePrice": 138,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[07d70bda-03e6-433c-9025-1f5892e80354, 4c24a163-ab63-4005-96f0-84dbedf8df92]": {
//       "productId": "178aaec5-ecb5-4a52-9a25-cabcc2e41e97",
//       "productName": "小型云主机",
//       "serviceId": "17277abe-a1c5-11e6-a18b-0050568a49fd",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "4c24a163-ab63-4005-96f0-84dbedf8df92",
//         "billingMode": 1,
//         "basePrice": 100,
//         "periodType": 5,
//         "basicPrice": 300,
//         "cyclePrice": 200,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[19623245-92a1-4d1d-b84b-5467d4686852, f8ec9bbb-97e0-4827-b2a2-2152d3d5afdc]": {
//       "productId": "2b772cc8-537f-4547-92b0-753a8c0165a2",
//       "productName": "disk pruduct001",
//       "serviceId": "2bc5599f-748a-4c82-8683-bf0cb3b34434",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "f8ec9bbb-97e0-4827-b2a2-2152d3d5afdc",
//         "billingMode": 1,
//         "basePrice": 100,
//         "periodType": 5,
//         "basicPrice": null,
//         "cyclePrice": null,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[fd25d93e-7302-433b-9cba-ae3de4e62fb8, 5c40d91a-b98e-4dd3-b80e-456a4fd3520b]": {
//       "productId": "72fd01e6-9722-4953-8efc-8af1eea84d92",
//       "productName": "IPHONE_1480079506",
//       "serviceId": "52785a1a-e324-44cf-b268-8b46d09845d3",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "5c40d91a-b98e-4dd3-b80e-456a4fd3520b",
//         "billingMode": 1,
//         "basePrice": 301,
//         "periodType": 2,
//         "basicPrice": 340,
//         "cyclePrice": 756,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[55b5c326-4a85-4e43-82e1-7b920bcc1e2b, 36f7fa4c-43a6-482f-9fab-bf23a6643b83]": {
//       "productId": "4bbdf028-cc1a-4bdc-a620-83b26e944f56",
//       "productName": "IPHONE_1480078067",
//       "serviceId": "c96d61f9-4f75-4219-befd-77e2cad4da7a",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "36f7fa4c-43a6-482f-9fab-bf23a6643b83",
//         "billingMode": 2,
//         "basePrice": 320,
//         "periodType": null,
//         "basicPrice": null,
//         "cyclePrice": null,
//         "unitPrice": 869,
//         "unitType": 0
//       }
//     },
//     "[df84021c-4c9d-483f-b06f-ba47ff937803, 8bacbad0-bc62-47d6-ba36-cf55a7f91a19]": {
//       "productId": "40831452-fbdc-46f8-a843-dc6deaf6d0ab",
//       "productName": "IPHONE_1480079315",
//       "serviceId": "f515d872-b2f6-4449-8988-45c75c748321",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "8bacbad0-bc62-47d6-ba36-cf55a7f91a19",
//         "billingMode": 1,
//         "basePrice": 930,
//         "periodType": 2,
//         "basicPrice": 659,
//         "cyclePrice": 324,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[0709786f-4714-4010-aa32-e591a3c85484, dc1568fe-9b34-4e7d-b483-21297bf99db9]": {
//       "productId": "ac95cb82-1508-4122-8272-2a606332439c",
//       "productName": "IPHONE_1480648414",
//       "serviceId": "efcb1ba3-be25-479d-bf12-82d09a8c5a80",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "dc1568fe-9b34-4e7d-b483-21297bf99db9",
//         "billingMode": 1,
//         "basePrice": 898,
//         "periodType": 0,
//         "basicPrice": 431,
//         "cyclePrice": 832,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[fc3aab72-8d1b-48d1-ab6d-d02df30dc9be, 4599d6f9-dc53-4c3e-9c58-037e2abf83b2]": {
//       "productId": "a4249a94-5f08-47e2-8633-6f33e231687d",
//       "productName": "IPHONE_1480078378",
//       "serviceId": "8bfc8358-b1fd-4912-81bb-22cd34e5e029",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "4599d6f9-dc53-4c3e-9c58-037e2abf83b2",
//         "billingMode": 1,
//         "basePrice": 539,
//         "periodType": 0,
//         "basicPrice": 655,
//         "cyclePrice": 465,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[df84021c-4c9d-483f-b06f-ba47ff937803, 1db265b8-efb3-481c-9242-0da690ad1285]": {
//       "productId": "eec0b1d3-a4f4-4bd5-a226-e8ee5ced3063",
//       "productName": "IPHONE_1480079314",
//       "serviceId": "f515d872-b2f6-4449-8988-45c75c748321",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "1db265b8-efb3-481c-9242-0da690ad1285",
//         "billingMode": 1,
//         "basePrice": 816,
//         "periodType": 1,
//         "basicPrice": 811,
//         "cyclePrice": 106,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[2f0675e8-2986-4170-82ee-a42f2ec566db, 841cbfc5-7eae-4580-b617-a48d4bd2ec95]": {
//       "productId": "984d9620-8959-4555-880a-a3e01f06005b",
//       "productName": "IPHONE_1480079395",
//       "serviceId": "74c4f806-2223-4a2b-b6a5-a318894f4b97",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "841cbfc5-7eae-4580-b617-a48d4bd2ec95",
//         "billingMode": 1,
//         "basePrice": 332,
//         "periodType": 3,
//         "basicPrice": 454,
//         "cyclePrice": 730,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[d53656df-a2a4-4fca-84d5-c344a0c040bb, 898e0bb5-6e5c-47f4-85c9-f30770038176]": {
//       "productId": "2299cb06-ef18-439d-bc35-bc8ddaed6a94",
//       "productName": "disk thereewerwrwerrrrrrrrrrr",
//       "serviceId": "e8cf79eb-2b6d-4b66-a1ee-4532ca2ba47b",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "898e0bb5-6e5c-47f4-85c9-f30770038176",
//         "billingMode": 1,
//         "basePrice": null,
//         "periodType": 3,
//         "basicPrice": null,
//         "cyclePrice": null,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[6462cbff-80dc-4ecf-8c09-6b231b52e416, 86fedef0-feec-4697-a780-82dcc246812b]": {
//       "productId": "9d9a2141-f671-46a4-84f6-30fd7b2d4297",
//       "productName": "体育体育图",
//       "serviceId": "e5b38f2e-765d-49ad-9ec8-234410096d0b",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "86fedef0-feec-4697-a780-82dcc246812b",
//         "billingMode": 1,
//         "basePrice": 100,
//         "periodType": 3,
//         "basicPrice": 300,
//         "cyclePrice": 200,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[07ad17ae-425f-4e06-811c-0e81bf603f81, 5ca683fa-942a-4d9c-a11a-50779c0114a8]": {
//       "productId": "a694242a-333c-4325-9275-bf851ea88c4f",
//       "productName": "IPHONE_1480077920",
//       "serviceId": "6f9a0889-c12c-43de-b88b-f00231cc4908",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "5ca683fa-942a-4d9c-a11a-50779c0114a8",
//         "billingMode": 1,
//         "basePrice": 785,
//         "periodType": 1,
//         "basicPrice": 321,
//         "cyclePrice": 150,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[ee9eea7e-501c-4131-9530-54cddd2c939c, d3d6f362-051a-4edb-90c6-48067b4f940f]": {
//       "productId": "a393786a-bd72-4e9f-b590-8920c28a27fb",
//       "productName": "StanardDisk-001",
//       "serviceId": "b6c53151-2515-48df-986b-4b72d1c6746a",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "d3d6f362-051a-4edb-90c6-48067b4f940f",
//         "billingMode": 2,
//         "basePrice": 0,
//         "periodType": null,
//         "basicPrice": null,
//         "cyclePrice": null,
//         "unitPrice": 2,
//         "unitType": 0
//       }
//     },
//     "[bc7b9da6-71f8-43da-9ac9-1c67d8738f80, 5a37ddd2-f95d-48b5-8f68-77c718551dcf]": {
//       "productId": "e7ae4f39-04d8-4007-a9fe-3a0ea41b5ece",
//       "productName": "IPHONE_1480078584",
//       "serviceId": "bcb4e180-3ebb-441b-b22c-11a77defa3bf",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "5a37ddd2-f95d-48b5-8f68-77c718551dcf",
//         "billingMode": 2,
//         "basePrice": 929,
//         "periodType": null,
//         "basicPrice": null,
//         "cyclePrice": null,
//         "unitPrice": 558,
//         "unitType": 0
//       }
//     },
//     "[54c10710-cb6e-4600-8bb7-943e3baa33db, 2e80ef0d-aaf0-4bed-a85f-5a941e9b6d0f]": {
//       "productId": "406d2e25-dc89-48e1-9a2d-3cd39a6f6ce8",
//       "productName": "IPHONE_1480078157",
//       "serviceId": "9e0fb248-ff09-4b4a-ac45-9911ff3fb551",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "2e80ef0d-aaf0-4bed-a85f-5a941e9b6d0f",
//         "billingMode": 2,
//         "basePrice": 603,
//         "periodType": null,
//         "basicPrice": null,
//         "cyclePrice": null,
//         "unitPrice": 474,
//         "unitType": 0
//       }
//     },
//     "[19623245-92a1-4d1d-b84b-5467d4686852, c3b7d3ca-932b-481c-8b97-4d6a10657182]": {
//       "productId": "31dfed00-a6ad-41c4-8c6d-355b13f7fd2e",
//       "productName": "another",
//       "serviceId": "2bc5599f-748a-4c82-8683-bf0cb3b34434",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "c3b7d3ca-932b-481c-8b97-4d6a10657182",
//         "billingMode": 1,
//         "basePrice": 123,
//         "periodType": 5,
//         "basicPrice": 789,
//         "cyclePrice": 456,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[b38425fb-64c8-4dce-a346-67177e5b00e9, eef1caa5-6b4d-4f3a-8130-09ad1188ed1b]": {
//       "productId": "48a87721-3f05-4ce4-93d5-de59dd51cf0a",
//       "productName": "TEST_0012",
//       "serviceId": "05fc0552-ec35-45a4-8bb7-e5b85dea1118",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "eef1caa5-6b4d-4f3a-8130-09ad1188ed1b",
//         "billingMode": 1,
//         "basePrice": 100,
//         "periodType": 0,
//         "basicPrice": 110,
//         "cyclePrice": 120,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[ce009265-6e31-423a-8eae-681f76bf9a98, 07462ed2-c444-44d3-aa8a-4358a5a0c4f3]": {
//       "productId": "7b9ea38c-a7d4-411d-a424-2a363970225c",
//       "productName": "IPHONE_1480659654",
//       "serviceId": "cb93881b-520a-4892-ac9d-78767dbd45b1",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "07462ed2-c444-44d3-aa8a-4358a5a0c4f3",
//         "billingMode": 1,
//         "basePrice": 114,
//         "periodType": 1,
//         "basicPrice": 198,
//         "cyclePrice": 883,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[732df352-1b00-4b08-a771-bd5e321df931, d3c653ee-9117-4fb2-8281-55c7e4d8bb8b]": {
//       "productId": "78af03ab-787e-41c5-a654-23fd76c33d91",
//       "productName": "IPHONE_1480078236",
//       "serviceId": "30aad85d-d07d-4516-b14e-c97f96d2cef2",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "d3c653ee-9117-4fb2-8281-55c7e4d8bb8b",
//         "billingMode": 2,
//         "basePrice": 334,
//         "periodType": null,
//         "basicPrice": null,
//         "cyclePrice": null,
//         "unitPrice": 888,
//         "unitType": 0
//       }
//     },
//     "[2f0675e8-2986-4170-82ee-a42f2ec566db, eb0ad361-fc14-4e3a-8d3e-e308a0de2c39]": {
//       "productId": "8570ccb2-7cde-4367-833d-3728eea3f43c",
//       "productName": "IPHONE_1480079396",
//       "serviceId": "74c4f806-2223-4a2b-b6a5-a318894f4b97",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "eb0ad361-fc14-4e3a-8d3e-e308a0de2c39",
//         "billingMode": 1,
//         "basePrice": 733,
//         "periodType": 2,
//         "basicPrice": 197,
//         "cyclePrice": 380,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[1c8628ae-f062-4250-8439-df50f7fe82d8, a5bfbd44-ca74-48de-ac24-5b33bc83ea37]": {
//       "productId": "3ddb2960-eb3c-449c-90de-fd62235c249c",
//       "productName": "中型云主机",
//       "serviceId": "6b138c29-0ff8-4cb9-bb9f-3dbbcebb6f90",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "a5bfbd44-ca74-48de-ac24-5b33bc83ea37",
//         "billingMode": 1,
//         "basePrice": 100,
//         "periodType": 1,
//         "basicPrice": 200,
//         "cyclePrice": 200,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[fc3aab72-8d1b-48d1-ab6d-d02df30dc9be, c6a5f0a5-d404-42bb-9bb3-a6adbf11c4ce]": {
//       "productId": "0cfe56b8-ba52-4229-9833-2e091881faeb",
//       "productName": "IPHONE_1480078378",
//       "serviceId": "8bfc8358-b1fd-4912-81bb-22cd34e5e029",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "c6a5f0a5-d404-42bb-9bb3-a6adbf11c4ce",
//         "billingMode": 1,
//         "basePrice": 460,
//         "periodType": 0,
//         "basicPrice": 683,
//         "cyclePrice": 139,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[9ea632b4-70e1-49b9-9c92-d6409d0febb3, e2ba4d62-2925-4cfb-bc14-1102de0e92ae]": {
//       "productId": "f070bab5-4baa-4613-b24b-9c6461469b8d",
//       "productName": "IPHONE_1480078709",
//       "serviceId": "f7a91c8d-f964-4c87-97b9-3c7acc8ca7af",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "e2ba4d62-2925-4cfb-bc14-1102de0e92ae",
//         "billingMode": 2,
//         "basePrice": 216,
//         "periodType": null,
//         "basicPrice": null,
//         "cyclePrice": null,
//         "unitPrice": 379,
//         "unitType": 0
//       }
//     },
//     "[9ea632b4-70e1-49b9-9c92-d6409d0febb3, c531c36d-4d90-46f0-85cc-0c4de1ffa13d]": {
//       "productId": "ab92d7f6-dc47-4c41-9543-de7c794762c7",
//       "productName": "IPHONE_1480078709",
//       "serviceId": "f7a91c8d-f964-4c87-97b9-3c7acc8ca7af",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "c531c36d-4d90-46f0-85cc-0c4de1ffa13d",
//         "billingMode": 2,
//         "basePrice": 114,
//         "periodType": null,
//         "basicPrice": null,
//         "cyclePrice": null,
//         "unitPrice": 515,
//         "unitType": 0
//       }
//     },
//     "[19623245-92a1-4d1d-b84b-5467d4686852, 96ddc261-d16f-4f1c-b28f-a28b4e7446c8]": {
//       "productId": "97474d11-59ce-421e-a2fe-a9fb39025009",
//       "productName": "disk pruduct001",
//       "serviceId": "2bc5599f-748a-4c82-8683-bf0cb3b34434",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "96ddc261-d16f-4f1c-b28f-a28b4e7446c8",
//         "billingMode": 1,
//         "basePrice": 100,
//         "periodType": 5,
//         "basicPrice": null,
//         "cyclePrice": null,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[9dac08ac-a5fe-4eb6-80ba-43612bc449e5, 5efc2205-1d1a-42a9-b867-cef333a30c10]": {
//       "productId": "11a88d23-22ce-4526-a816-97059330ea3c",
//       "productName": "jira vm prod",
//       "serviceId": "c48e2349-d651-4ac4-8746-7dc2af01e4b0",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "5efc2205-1d1a-42a9-b867-cef333a30c10",
//         "billingMode": 1,
//         "basePrice": 100,
//         "periodType": 3,
//         "basicPrice": 300,
//         "cyclePrice": 200,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[ce009265-6e31-423a-8eae-681f76bf9a98, e806f1e3-ed8f-44d7-b40b-1bb55f4c4638]": {
//       "productId": "e694cff8-9f00-41ba-a35d-aff000d82918",
//       "productName": "IPHONE_1480659655",
//       "serviceId": "cb93881b-520a-4892-ac9d-78767dbd45b1",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "e806f1e3-ed8f-44d7-b40b-1bb55f4c4638",
//         "billingMode": 1,
//         "basePrice": 599,
//         "periodType": 2,
//         "basicPrice": 547,
//         "cyclePrice": 629,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[ed1b1701-22a3-4147-91a2-2b56eb5ce0b2, 4edc633f-a10d-4516-9706-2cd0e65e2c04]": {
//       "productId": "df8d5aaf-9f93-4e98-9bde-0fb42a4d72c9",
//       "productName": "IPHONE_1480078185",
//       "serviceId": "6b1f8198-d927-4556-9c04-59611e1d6ac6",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "4edc633f-a10d-4516-9706-2cd0e65e2c04",
//         "billingMode": 1,
//         "basePrice": 739,
//         "periodType": 2,
//         "basicPrice": 943,
//         "cyclePrice": 306,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[cb49fc4e-077e-47fc-88b0-2ee39adeb398, 68197a40-78e2-4c76-b2f7-fc28f84774ee]": {
//       "productId": "01c4e1e6-81e2-403a-b688-b3051b7e6f0f",
//       "productName": "IPHONE_1480659443",
//       "serviceId": "5dc36671-614f-41d8-ba8e-a8fd747a4fa3",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "68197a40-78e2-4c76-b2f7-fc28f84774ee",
//         "billingMode": 1,
//         "basePrice": 784,
//         "periodType": 2,
//         "basicPrice": 675,
//         "cyclePrice": 416,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[07ad17ae-425f-4e06-811c-0e81bf603f81, 331c200c-4d68-4c74-9d6c-9e9def7e15ab]": {
//       "productId": "acdc4335-2938-448c-a880-3f811830c5ba",
//       "productName": "IPHONE_1480077920",
//       "serviceId": "6f9a0889-c12c-43de-b88b-f00231cc4908",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "331c200c-4d68-4c74-9d6c-9e9def7e15ab",
//         "billingMode": 1,
//         "basePrice": 622,
//         "periodType": 2,
//         "basicPrice": 94,
//         "cyclePrice": 717,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[24dd1fc0-6eaa-4827-9501-e5ea1d4a807b, edcddda0-426d-495e-8409-1b097aa072c2]": {
//       "productId": "25285961-f227-4b4e-950b-10c20f16fa37",
//       "productName": "周二",
//       "serviceId": "8cfa23e6-5f88-4fe0-8ca0-1818da5a5062",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "edcddda0-426d-495e-8409-1b097aa072c2",
//         "billingMode": 2,
//         "basePrice": 0,
//         "periodType": null,
//         "basicPrice": null,
//         "cyclePrice": null,
//         "unitPrice": 23,
//         "unitType": 0
//       }
//     },
//     "[e940c0d8-8c3d-4074-8a23-eeb2458f0c10, 7802f4c3-7ec7-4cc5-a8dd-deeab67ca256]": {
//       "productId": "669f4f0e-1c57-4437-9d50-d1db2d5a1428",
//       "productName": "自行车",
//       "serviceId": "22401eda-0466-48e0-bf2d-b8b6c13d404d",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "7802f4c3-7ec7-4cc5-a8dd-deeab67ca256",
//         "billingMode": 1,
//         "basePrice": 100,
//         "periodType": 3,
//         "basicPrice": 200,
//         "cyclePrice": 100,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[9d8c9094-e501-431f-a341-fa08c5ec0b6e, 00dbd6dc-c5d7-4f4a-a638-ff852ae90204]": {
//       "productId": "8032aa0f-ae5b-435d-87aa-507b34e0dc86",
//       "productName": "IPHONE_1480664893",
//       "serviceId": "982b295c-5a19-4505-a8e8-a751c07dfc9a",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "00dbd6dc-c5d7-4f4a-a638-ff852ae90204",
//         "billingMode": 1,
//         "basePrice": 246,
//         "periodType": 3,
//         "basicPrice": 899,
//         "cyclePrice": 51,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[3895885d-17d1-4942-b89e-0bac0bb6f725, a1b55003-fa50-4d39-9b3f-15ab4034b0a3]": {
//       "productId": "3eecda39-c18a-4890-aeba-05a4cb5b6336",
//       "productName": "IPHONE_1480647598",
//       "serviceId": "3d1b4026-a536-4f6d-b273-d654a27889ae",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "a1b55003-fa50-4d39-9b3f-15ab4034b0a3",
//         "billingMode": 2,
//         "basePrice": 104,
//         "periodType": null,
//         "basicPrice": null,
//         "cyclePrice": null,
//         "unitPrice": 169,
//         "unitType": 0
//       }
//     },
//     "[732df352-1b00-4b08-a771-bd5e321df931, 721683a1-33d3-44fa-97b0-ef962cfe915e]": {
//       "productId": "129bb5d0-a39e-493a-bf20-400fe192c48a",
//       "productName": "IPHONE_1480078236",
//       "serviceId": "30aad85d-d07d-4516-b14e-c97f96d2cef2",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "721683a1-33d3-44fa-97b0-ef962cfe915e",
//         "billingMode": 1,
//         "basePrice": 281,
//         "periodType": 0,
//         "basicPrice": 966,
//         "cyclePrice": 126,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[bc7b9da6-71f8-43da-9ac9-1c67d8738f80, a6593d31-88e1-4d9f-a73a-a5678435dfec]": {
//       "productId": "9618cca3-1293-4c60-9dc3-9bd141f579ff",
//       "productName": "IPHONE_1480078583",
//       "serviceId": "bcb4e180-3ebb-441b-b22c-11a77defa3bf",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "a6593d31-88e1-4d9f-a73a-a5678435dfec",
//         "billingMode": 1,
//         "basePrice": 353,
//         "periodType": 3,
//         "basicPrice": 264,
//         "cyclePrice": 57,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[20e54452-b767-47c2-96bf-ae06e2630d7e, 356579a9-a634-466b-9e1b-b530712f83b9]": {
//       "productId": "58dfcd51-ec96-4563-9f01-e8803eabe6be",
//       "productName": "oooooooooooooooooooo",
//       "serviceId": "b3b114aa-da63-470b-afba-3cc70859e27a",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "356579a9-a634-466b-9e1b-b530712f83b9",
//         "billingMode": 2,
//         "basePrice": 0,
//         "periodType": null,
//         "basicPrice": null,
//         "cyclePrice": null,
//         "unitPrice": 34,
//         "unitType": 0
//       }
//     },
//     "[9cba8190-c149-44da-ab1b-1ec34e22cc84, 5ef791b5-ea70-47c2-b396-95a3098064f1]": {
//       "productId": "a4dd30c8-f930-4dd2-b1bc-9707d23e1f2a",
//       "productName": "产品",
//       "serviceId": "fd23ef4c-ea40-4d3c-a32f-8929ef7d3fbf",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "5ef791b5-ea70-47c2-b396-95a3098064f1",
//         "billingMode": 1,
//         "basePrice": 100,
//         "periodType": 3,
//         "basicPrice": 200,
//         "cyclePrice": 200,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[54c10710-cb6e-4600-8bb7-943e3baa33db, e956df14-fd76-4452-a276-2b1d3471b60c]": {
//       "productId": "f3bc7770-f7e7-4daa-9c37-0ada7edeb8cc",
//       "productName": "IPHONE_1480078158",
//       "serviceId": "9e0fb248-ff09-4b4a-ac45-9911ff3fb551",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "e956df14-fd76-4452-a276-2b1d3471b60c",
//         "billingMode": 2,
//         "basePrice": 547,
//         "periodType": null,
//         "basicPrice": null,
//         "cyclePrice": null,
//         "unitPrice": 664,
//         "unitType": 0
//       }
//     },
//     "[9d8c9094-e501-431f-a341-fa08c5ec0b6e, 55cf9b18-b573-45ef-8478-b350491f330c]": {
//       "productId": "0fbfcb17-e8d5-444a-a2c4-7a29e23ce275",
//       "productName": "IPHONE_1480664892",
//       "serviceId": "982b295c-5a19-4505-a8e8-a751c07dfc9a",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "55cf9b18-b573-45ef-8478-b350491f330c",
//         "billingMode": 2,
//         "basePrice": 348,
//         "periodType": null,
//         "basicPrice": null,
//         "cyclePrice": null,
//         "unitPrice": 664,
//         "unitType": 0
//       }
//     },
//     "[f74ff5de-f020-44e9-827c-5395bca389c8, 65ff2410-0060-4243-81bc-a4bc14f13f57]": {
//       "productId": "5c18d6eb-d080-47f3-aa85-8f870de9137b",
//       "productName": "AAAAAAAAAAAAAAAAAAA",
//       "serviceId": "4d321491-45d9-4322-9b3d-bcb93a30fcf1",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "65ff2410-0060-4243-81bc-a4bc14f13f57",
//         "billingMode": 2,
//         "basePrice": 0,
//         "periodType": null,
//         "basicPrice": null,
//         "cyclePrice": null,
//         "unitPrice": 0.1,
//         "unitType": 0
//       }
//     },
//     "[02ebf057-392c-49ef-bf7f-3686a695441b, 27f1183c-adb0-469f-8bb2-a0b282a3833c]": {
//       "productId": "0ef0e649-25f3-4bf4-9782-a7f3578a760b",
//       "productName": "哦ipiip",
//       "serviceId": "c825eed3-cf4f-4eb1-8c87-19f133239d02",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "27f1183c-adb0-469f-8bb2-a0b282a3833c",
//         "billingMode": 1,
//         "basePrice": 100,
//         "periodType": 5,
//         "basicPrice": 200,
//         "cyclePrice": 200,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[19623245-92a1-4d1d-b84b-5467d4686852, 30798f6a-da7f-45f2-8d30-e96fb31acbec]": {
//       "productId": "81bb1726-b5ba-44d5-9321-92ae72b044f9",
//       "productName": "disk pruduct001",
//       "serviceId": "2bc5599f-748a-4c82-8683-bf0cb3b34434",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "30798f6a-da7f-45f2-8d30-e96fb31acbec",
//         "billingMode": 1,
//         "basePrice": 100,
//         "periodType": 5,
//         "basicPrice": null,
//         "cyclePrice": null,
//         "unitPrice": null,
//         "unitType": null
//       }
//     },
//     "[cb49fc4e-077e-47fc-88b0-2ee39adeb398, 403ec5d8-7b58-4831-aa67-b9fd64563ecc]": {
//       "productId": "96aa5586-972b-4ee8-8137-604b5a1b8b73",
//       "productName": "IPHONE_1480659444",
//       "serviceId": "5dc36671-614f-41d8-ba8e-a8fd747a4fa3",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "403ec5d8-7b58-4831-aa67-b9fd64563ecc",
//         "billingMode": 2,
//         "basePrice": 484,
//         "periodType": null,
//         "basicPrice": null,
//         "cyclePrice": null,
//         "unitPrice": 565,
//         "unitType": 0
//       }
//     },
//     "[ac55c1c8-a15f-4796-a90f-6d449ec2ff39, 2d2f94ec-1787-4522-8e4b-21b7e50721cc]": {
//       "productId": "90241f70-6d4d-47aa-ab4e-b1d6d6c53c51",
//       "productName": "VM-Large2",
//       "serviceId": "251a1229-2e86-4b6a-bce9-6aa12f856feb",
//       "serviceType": 0,
//       "billingInfo": {
//         "billingId": "2d2f94ec-1787-4522-8e4b-21b7e50721cc",
//         "billingMode": 1,
//         "basePrice": 1000,
//         "periodType": 3,
//         "basicPrice": 200,
//         "cyclePrice": null,
//         "unitPrice": null,
//         "unitType": null
//       }
//     }
//   }
// }
//         )
// })



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
