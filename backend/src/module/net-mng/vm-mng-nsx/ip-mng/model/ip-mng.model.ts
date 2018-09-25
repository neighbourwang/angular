/*
{
    "resultCode": "100",
    "detailDescription": null,
    "resultContent":[
        {
    "dlrPortId":"mkgroup1-3bfb-4b09-b804-30954b084e0c",
    "dlrRouteName":"DLR1",
    "dlrInterfaceName":"app test",
    "drlSubnetDisplayName":null,
    "dlrInterfaceIPaddress":"172.16.1.1",
    "dlrSubnet":"24",
    "dlrInterfaceType":"uplink",
    "lswName":"LSW01",
    "lswId":"5000",
    "lswTransportZone":"A",
    "status":1,
    "lastUpdate":"2016-10-1 15:35:50",
    "platformId":"100",

    "dnsPre": "16.187.145.120",  
    "dnsAlt": "16.187.145.119", 

    "ipCount": 24, 
    "usedIPCount": 20, 
    "freeIPCount": 4,
    "range": [
        "172.16.1.55,172.16.1.60",
        "172.16.1.61,172.16.1.61"
    ]
}
]} 
*/
export class IpMngModel {
    dlrPortId: string = "";
    dlrId: string = "";
    dlrRouteName: string= "";
    dlrInterfaceName: string = "";
    drlSubnetDisplayName: string = "";
    dlrInterfaceIPaddress: string = "";
    
    gateway: string = "";
    dlrSubnet: string = "";
    subnetCIDR: string = "";
    dlrInterfaceType: string = "";

    lswName: string = "";
    lswId: string = "";
    lswTransportZone: string = "";

    status: string = "";
    lastUpdate: string = "";
    platformId: string = "";

    dnsPre: string = "";
    dnsAlt: string = "";

    ipCount: string = "";  //ip总数量
    usedIPCount: string = "";  //已使用ip数量
    freeIPCount: string = "";  //剩余ip数量
    range: Array<string>;
        
    checked: boolean = false;//ui operation
}

/*
{
    "resultCode": "100",
    "detailDescription": null,
    "resultContent":[ 
        {
            "dlrId":"mkgroup1-3bfb-4b09-b804-30954b084e0c",
            "dlrName":"DLR1"
        }
        ]
    }
*/

export class DLRModel {
    dlrName: string = "";
    dlrId: string = "";

    toString(){
        return JSON.stringify(this);
    }
}


/*
export class DCModel {
    dcName: string = "";
    dcId: string = "";
    switchList: Array<SwitchModel>;

    toString(){
        return JSON.stringify(this);
    }
}

export class SwitchModel {
    switchName: string = "";
    switchId: string = "";
    toString(){
        return JSON.stringify(this);
    }
}


export class subnetModel {
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
    id: string;
    
    dcId: string;
    dcName: string;
    switchId: string;
    switchName: string;
    dvPortGroupName: string;
    distPortGroupDisplayName: string;
    //vlanId: string;
    subnetCIDR: string;
    gateway: string;
    subnetMask: string;
    dnsPre: string;
    dnsAlt: string;
    range: Array<string>;

    toString(){
        return JSON.stringify(this);
    }
}
*/

/*
{
 "dlrPortId":"mkgroup1-3bfb-4b09-b804-30954b084e0c",
 "dlrId":"mkgroup1-3bfb-4b09-b804-30954b084e0c",
 "dlrRouteName":"DLR1",
 "dlrInterfaceName":"app test",
 "drlSubnetDisplayName":null,
 "dlrInterfaceIPaddress":"172.16.1.1",
 "dlrSubnet":"24",
 "dlrInterfaceType":"uplink",
 "lswName":"LSW01",
 "lswId":"5000",
 "lswTransportZone":"A",
 "status":1,
 "lastUpdate":"2016-10-1 15:35:50",
 "platformId":"100",

    "dnsPre": "16.187.145.120",  
    "dnsAlt": "16.187.145.119", 
    "range": [
        "172.16.1.55,172.16.1.60",
        "172.16.1.61,172.16.1.61"
    ]
}
*/

export class subnetInfoModel {
    dlrPortId: string = "";
    dlrId: string = "";
    dlrRouteName: string= "";
    dlrInterfaceName: string = "";
    drlSubnetDisplayName: string = "";
    dlrInterfaceIPaddress: string = "";
    gateway: string = "";
    dlrSubnet: string = "";
    subnetCIDR: string = "";
    dlrInterfaceType: string = "";
    lswName: string = "";
    lswId: string = "";
    lswTransportZone: string = "";
    status: string = "";
    lastUpdate: string = "";
    platformId: string = "";

    dnsPre: string = "";
    dnsAlt: string = "";
    range: Array<string>;
    
}


/*
{
    "dnsPre": "16.187.145.120",
    "dnsAlt": "16.187.145.119",
    "subnetRange": [
        "172.16.1.55,172.16.1.60",
        "172.16.1.61,172.16.1.61"
    ]
}
*/

export class subnetIpModel {
    portGroup: string = "";

    dlrInterfaceIPaddress: string = "";
    dlrSubnet: string = "";
    subnetCIDR: string = "";
    gateway: string = "";
    dnsPre: string = "";
    dnsAlt: string = "";
    ips: Array<string>;
    ipstr: string = "";

    toString(){
        return JSON.stringify(this);
    }
}

export class IpUsageMngModel {
    id: string = ""; //IP地址ID
    addr: string = ""; //IP地址
    instanceName: string = ""; //占用IP的主机名
    tenantName: string = "";  //企业名称
    status: string; //状态, 来源于数据字典
    description: string = ""; //说明 

    checked: boolean = false;//ui operation

    toString(){
        return JSON.stringify(this);
    }

}