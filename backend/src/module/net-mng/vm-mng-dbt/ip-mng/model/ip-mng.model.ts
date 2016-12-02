/*
        "id": "ef349044-3bfb-4b09-b804-30954b084e0c", 
        "dcId": "ef349044-3bfb-4b09-b804-30954b084e0c", 
        "dcName": "DC1", 
        "switchId": "ef349044-3bfb-4b09-b804-30954b084e0c", 
        "switchName": "VDS1",
        "dvPortGroupName": "dv pg 1",
        "distPortGroupDisplayName": null,
        "vlanId": "100", 
        "subnetCIDR": "10.10.0.0/24", 
        "gateway": "10.10.0.1", 
        "ipCount": 24, 
        "usedIPCount": 20, 
        "freeIPCount": 4 
*/
export class IpMngModel {
        id: string; //网络端口组ID
        dcId: string; 
        dcName: string; //数据中心,VC中定义的
        switchId: string;
        switchName: string;
        dvPortGroupName: string; //标准端口组名称
        distPortGroupDisplayName: string; //标准端口组显示名称
        vlanId: string; //虚拟局域网ID
        subnetCIDR: string; //网段信息
        gateway: string; //网关信息
        ipCount: string; //ip总数量
        usedIPCount: string; //已使用ip数量
        freeIPCount: string; //剩余ip数量
        
        checked: boolean = false;//ui operation
}



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

/*
    "id": "ef349044-3bfb-4b09-b804-30954b084e0c",  
    "dcId": "ef349044-3bfb-4b09-b804-30954b084e0c",  
    "dcName": "DC1", 
    "switchId": "ef349044-3bfb-4b09-b804-30954b084e0c",  
    "switchName": "Cluster1",  
    "dvPortGroupName": "Cluster1",  
    "distPortGroupDisplayName": null, 
    "subnetCIDR": "10.10.0.0/24",  
    "gateway": "10.10.0.1",  
    "subnetMask": "16.187.145.1", 
    "dnsPre": "16.187.145.120",  
    "dnsAlt": "16.187.145.119", 
    "range": [
        "172.16.1.55,172.16.1.60",
        "172.16.1.61,172.16.1.61"
    ]
*/

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


export class subnetIpModel {
    portGroup: string;

    subnetCIDR: string;
    gateway: string;
    ips: Array<string>;
    ipstr: string;

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