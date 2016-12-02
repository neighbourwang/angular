export class subnetModel {
/*
    "subnetCIDR": "10.10.0.0/24",
    "subnetMask": "255.255.255.0",
    "gateway": "10.10.0.1",
    "dnsPre": "10.10.0.255",
    "dnsAlt": "10.10.0.254"
*/
    portGroup: string;
    
    subnetCIDR: string;
    subnetMask: string;
    gateway: string;
    dnsPre: string;
    dnsAlt: string;

    toString(){
        return JSON.stringify(this);
    }
}


export class subnetInfoModel {
/*
{
    "id": "ef349044-3bfb-4b09-b804-30954b084e0c",
    "dcId": "ef349044-3bfb-4b09-b804-30954b084e0c",
    "dcName": "DC1",
    "clusterId": "ef349044-3bfb-4b09-b804-30954b084e0c",
    "clusterName": "Cluster1",
    "clusterDisplayName": "Cluster1",
    "portGroup": "dvpg1",
    "portGroupDisplayName": "dvpg1",
    "vlanId": null,
    "subnetCIDR": "10.10.0.0/24",
    "gateway": "10.10.0.1",
    "subnetMask": "16.187.145.1",
    "dnsPre": "16.187.145.120",
    "dnsAlt": "16.187.145.119",
    "range": [
      "172.16.1.55,172.16.1.60",
      "172.16.1.61,172.16.1.61"
    ]
}
*/
    id: string;
    
    dcId: string;
    dcName: string;
    clusterId: string;
    clusterName: string;
    clusterDisplayName: string;
    portGroup: string;
    portGroupDisplayName: string;
    vlanId: string;
    subnetCIDR: string;
    gateway: string;
    subnetMask: string;
    dnsPre: string;
    dnsAlt: string;
    range: Array<String>;

    toString(){
        return JSON.stringify(this);
    }
}