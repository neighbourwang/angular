//云硬盘平台数据model
class storageItem {
    "storageId": string;
    "storageName": string;
    "displayName": string;
    "selected": boolean;
    skuId: string;
}
class DiskPlatform {
    "platformId": string;
  "platformName": string;
  "zoneList": Array<zone>;
  "zoneId": "all";
  "zoneName": string;
}
//云主机平台数据model
class storage {
    "storageId": string;
    "storageName": string;
    "displayName": string;
    "selected": string;
    "serviceSKUId": string;
}
class zone {
    "skuId": string;
    "storageId": string;
    "storageName": string;
    "zoneId": string;
    "zoneName": string;
    "selected": boolean;
    "displayName": string;
    storageList: Array<storage>;
}
class VmPlatform {
    "platformId": string;
      "platformName": string;
      "zoneList": Array<zone>;
      selected
}
//产品平台model

export {
    DiskPlatform,
    VmPlatform
}