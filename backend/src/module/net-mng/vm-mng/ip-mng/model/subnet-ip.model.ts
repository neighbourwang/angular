export class subnetIpModel {
/*
    [
    "172.16.1.55,172.16.1.60",
    "172.16.1.61,172.16.1.61"
    ];
*/  
    portGroup: string;

    subnetCIDR: string;
    subnetMask: string;
    gateway: string;
    ips: Array<String>;
    ipstr: string;

    toString(){
        return JSON.stringify(this);
    }
}