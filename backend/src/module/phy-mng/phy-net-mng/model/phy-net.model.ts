export class PhyNetListModel {
    gateway: string = "";
    id: string = "";
    ipAllCount: string = "";
    ipFreeCount: string = "";
    ipUsedCount: string = "";
    networkName: string = "";
    status: string = "";
    subnetCIDR: string = "";
    dnsAlt: string = "";
    dnsPre: string = "";
    subnetIP: string = "";
    subnetMask: string = "";    

    checked: boolean = false;
    nameEditing: boolean = false;

    toString(){
        return JSON.stringify(this);
    }
}

export class PhyNetCreateModel {
    dnsAlt: string = "";
    dnsPre: string = "";
    gateway: string = "";
    networkName: string = "";
    subnetIP: string = "";
    subnetMask: string = "";

    toString(){
        return JSON.stringify(this);
    }
}

export class PhyNetEditModel {
    dnsAlt: string = "";
    dnsPre: string = "";
    gateway: string = "";
    id: string = "";
    networkName: string = "";
    subnetIP: string = "";
    subnetMask: string = "";

    toString(){
        return JSON.stringify(this);
    }
}

/*
{
  "resultCode": "100",
  "detailDescription": null,
  "resultContent": {
    "networkName": "北京1区网络",
    "subnetIP": "192.168.1.0",
    "subnetMask": "255.255.255.0",
    "gateway": "192.168.1.1",
    "dnsPre": "114.114.114.114",
    "dnsAlt": "",
    "id": "id00008882",
    "resourcePoolList": [
      {
        "pmId": "pmId00000001",
        "pmPoolName": "北京地区-物理资源池1",
        "region": "北京",
        "dataCenter": "朝阳数据中心"
      },
      {
        "pmId": "pmId00000002",
        "pmPoolName": "北京地区-物理资源池2",
        "region": "北京",
        "dataCenter": "西城数据中心"
      },
      {
        "pmId": "pmId00000003",
        "pmPoolName": "北京地区-物理资源池3",
        "region": "北京",
        "dataCenter": "洋桥数据中心"
      }
    ]
  }
}
*/

export class PhyResPoolModel {
    pmId: string = "";
    pmPoolName: string = "";
    region: string = "";
    dataCenter: string = "";

    toString(){
        return JSON.stringify(this);
    }
}

export class PhyNetDetailsModel {
    phynet_info: PhyNetEditModel = new PhyNetEditModel();
    phyres_pools: Array<PhyResPoolModel> = [];
}
