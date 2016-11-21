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