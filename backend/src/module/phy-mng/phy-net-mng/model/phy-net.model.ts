export class PhyNetListModel {
    gateway: string = "";
    id: string = "";
    ipAllCount: string = "";
    ipFreeCount: string = "";
    ipUsedCount: string = "";
    networkName: string = "";
    status: number = 0;
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


export class PhySetResPmPoolModel {
    pmPoolId: string = "";
    pmPoolName: string = "";    
}

export class PhySetResPmModel {
    pmPoolId: string = "";
    pmPoolName: string = "";
    pmId: string = "";
    pmName: string = "";
}

export class IpScopeModel{
    networkName = "";
    subnetIP = "";
    subnetMask = "";
    subnetCIDR = "";
    gateway = "";
    dnsPre = "";
    dnsAlt = "";
    id = "";
    ipRange = "";

    toString(){
        return JSON.stringify(this);
    }
}

export class IpUsageMngModel {
    id: string = ""; //IP地址ID
    ipAddress: string = ""; //IP地址
    hostName: string = ""; //占用IP的主机名
    enterprise: string = "";  //企业名称
    status: string; //状态, 来源于数据字典
    description: string = ""; //说明 

    checked: boolean = false;//ui operation

    toString(){
        return JSON.stringify(this);
    }

}
