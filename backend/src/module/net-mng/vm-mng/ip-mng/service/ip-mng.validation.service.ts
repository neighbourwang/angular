/*
import { Injectable } from '@angular/core';
import { ValidationService } from '../../../../../architecture';

https://www.npmjs.com/package/ip
const ip = require('ip');

import 'rxjs/add/operator/toPromise';

@Injectable()
export class IPValidationService {
    constructor(
        private validationService: ValidationService
    ) { }

    isIP(val: any): boolean {
        const reg = /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/;
        return reg.test(val);
    }

    isIPorEmpty(val: any): boolean {
        if (this.validationService.isBlank(val)) return true;
        else {
            const reg = /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/;
            return reg.test(val);
        }
    }

    isURL(val: any): boolean {
        /?
        const reg = "^((https|http|ftp|rtsp|mms)?://)"
        + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
        + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184 //((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9]))
        + "|" // 允许IP和DOMAIN（域名）
        + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
        + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
        + "[a-z]{2,6})" // first level domain- .com or .museum
        + "(:[0-9]{1,4})?" // 端口- :80
        + "((/?)|" // a slash isn't required if there is no file name
        + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
        ?/
        const reg = /^((https|http|ftp|rtsp|mms)?:\/\/)?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9]))|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+\/?)$/;
        return reg.test(val);
    }

    isIPMask(val: any): boolean {
        const reg = /^(((128|192|224|240|248|252|254)\.0\.0\.0)|(255\.(0|128|192|224|240|248|252|254)\.0\.0)|(255\.255\.(0|128|192|224|240|248|252|254)\.0)|(255\.255\.255\.(0|128|192|224|240|248|252|254)))$/
        return reg.test(val);
    }

    //console.log("127.0.0.1 is private network?", ip.isPrivate('127.0.0.1'));
    //let str = ip.cidrSubnet('192.168.1.134/26');
    //console.log(str)
    isCIDR(val: any): boolean {
        let str = val.split('/');
        if( !this.validationService.isBlank(str[0]) && !this.validationService.isBlank(str[1]) )
        {
            //console.log(str[0], str[1], "str0 and str1");
            if( this.isIP(str[0]) && this.validationService.isNumber(str[1]) && (str[1] > 0 && str[1] < 32))
            return true;
            else return false;

        } else return false;
    }

    isGatewayInSubnet(val: any): boolean {
        if(ip.cidrSubnet(val[1]).contains(val[0])) return true;
        else return false;

    }

    isGatewayInSubnetAndMask(val: any): boolean {
        if(ip.subnet(val[1], val[2]).contains(val[0])) return true;
        else return false;
    }

    isMaskInSubnet(val: any): boolean {
        console.log(ip.toLong(val[0]), ip.toLong(ip.cidrSubnet(val[1]).subnetMask), "子网掩码", "期望子网掩码")
        if(ip.toLong(val[0]) == ip.toLong(ip.cidrSubnet(val[1]).subnetMask)) return true;
        else return false;

    }

    isIpScopePerMask(pool: any, cidr: any, mask: any): boolean {    //网络号与mask
        if (pool instanceof Array) pool = pool.join(' ');
        pool = pool.replace(/\s+/g, "").replace(/\n\r/g, "");
        //console.log(pool, "pool");
        let arrayips = pool.split(';').filter(item => {return item != ""});
        console.log(arrayips, "arrayips");
        let i = 0;
        let ipnot = ip.not(mask);
        let networkIP = ip.mask(cidr, mask);
        let broadcaseIP = ip.or(cidr, ipnot);
        console.log(ipnot, networkIP, broadcaseIP);
        for (i = 0; i < arrayips.length; i++) {
            let lineips = arrayips[i].split(',');
            console.log(lineips, "lineips");
            if (lineips.length == 1) {
                if (!this.validationService.isBlank(lineips[0]) && this.isIP(lineips[0])) {
                    if (ip.subnet(cidr, mask).contains(lineips[0])) 
                    {
                        if(lineips[0]!=networkIP && lineips[0]!=broadcaseIP) continue;
                        else {
                            console.log("ip is networkIP or broadcaseIP");
                            return false;
                        }
                    }
                    else {
                        console.log("one ip was not in subnet");
                        return false;
                    }
                } else {
                    console.log("no ip before ',', or not-IP");
                    return false;
                }
            } else if (lineips.length == 2) {
                if (!this.validationService.isBlank(lineips[0]) && !this.validationService.isBlank(lineips[1])
                    && this.isIP(lineips[0]) && this.isIP(lineips[1])) {
                    if (ip.toLong(lineips[1]) >= ip.toLong(lineips[0])) {
                        if (ip.subnet(cidr, mask).contains(lineips[0]) && ip.subnet(cidr, mask).contains(lineips[1])) continue;
                        else {
                            console.log("one ip was not in subnet")
                            return false;
                        }
                    } else {
                        console.log("two ips in line don't matches 'x<=y'")
                        return false;
                    }
                } else {
                    console.log("one ip was null or not-IP")
                    return false;
                }
            } else {
                console.log("two ips per line!")
                return false;
            }
        }
        if( i >= arrayips.length) return true;
    }

    isIpScope(pool: any, cidr: any): boolean {   //网络号与网络段位数
        if (pool instanceof Array) pool = pool.join(' ');
        pool = pool.replace(/\s+/g, "").replace(/\n\r/g, "");
        //console.log(pool, "pool");
        let arrayips = pool.split(';').filter(item => {return item != ""});
        console.log(arrayips, "arrayips");
        let i = 0;
        let str = cidr.split('/');  //网络号+网络段位数
        let mask = ip.fromPrefixLen(str[1])        
        let ipnot = ip.not(mask);
        let networkIP = ip.cidr(cidr);
        let broadcaseIP = ip.or(str[0], ipnot);
        console.log(ipnot, networkIP, broadcaseIP);
        for (i = 0; i < arrayips.length; i++) {
            let lineips = arrayips[i].split(',');
            console.log(lineips, "lineips");
            if (lineips.length == 1) {
                if (!this.validationService.isBlank(lineips[0]) && this.isIP(lineips[0])) {
                    if (ip.cidrSubnet(cidr).contains(lineips[0])) 
                    {
                        if(lineips[0]!=networkIP && lineips[0]!=broadcaseIP) continue;
                        else {
                            console.log("ip is networkIP or broadcaseIP");
                            return false;
                        }
                    } else {
                        console.log("one ip was not in subnet");
                        return false;
                    }
                } else {
                    console.log("no ip before ',', or not-IP");
                    return false;
                }
            } else if (lineips.length == 2) {
                if (!this.validationService.isBlank(lineips[0]) && !this.validationService.isBlank(lineips[1])
                    && this.isIP(lineips[0]) && this.isIP(lineips[1])) {
                    if (ip.toLong(lineips[1]) >= ip.toLong(lineips[0])) {
                        if (ip.cidrSubnet(cidr).contains(lineips[0]) && ip.cidrSubnet(cidr).contains(lineips[1])) continue;
                        else {
                            console.log("one ip was not in subnet")
                            return false;
                        }
                    } else {
                        console.log("two ips in line don't matches 'x<=y'")
                        return false;
                    }
                } else {
                    console.log("one ip was null or not-IP")
                    return false;
                }
            } else {
                console.log("two ips per line!")
                return false;
            }
        }
        if( i >= arrayips.length) return true;
    }

    validate(name: string, val: any, op: string) {
        let map: any = {
            "*": {
                "func": this.validationService.isBlank,
                "msg": "NET_MNG_VM_IP_MNG.CANT_NULL"
            },
             "email": {
                "func": val => !this.validationService.isEmail(val),
                "msg": "NET_MNG_VM_IP_MNG.EMAIL_INVALID"
            },
            "ip": {
                "func": val => !this.isIP(val),
                "msg": "NET_MNG_VM_IP_MNG.IP_INVALID"
            },
            "ipmask": {
                "func": val => !this.isIPMask(val),
                "msg": "NET_MNG_VM_IP_MNG.MASK_INVALID"
            },
            "iporempty":{
                "func": val => !this.isIPorEmpty(val),
                "msg": "NET_MNG_VM_IP_MNG.IP_INVALID_OR_NULL"
            },
            "url": {
                "func": val => !this.isURL(val),
                "msg": "NET_MNG_VM_IP_MNG.INVALID"
            },
            "cidr":{
                "func": val => !this.isCIDR(val),
                "msg": "NET_MNG_VM_IP_MNG.INVALID"
            },
            "gatewayinsubnet":{
                "func": val => !this.isGatewayInSubnet(val),
                "msg": "NET_MNG_VM_IP_MNG.NOT_IN_SUBNET"
            },
            "gatewayinsubnetandmask":{
                "func": val => !this.isGatewayInSubnetAndMask(val),
                "msg": "NET_MNG_VM_IP_MNG.NOT_IN_SUBNET"
            },
            "maskinsubnet":{
                "func": val => !this.isMaskInSubnet(val),
                "msg": "NET_MNG_VM_IP_MNG.NOT_FIX_SUBNET"
            },
            "ipscope":{
                "func": val => !this.isIpScope(val[0], val[1]),  //ipstr, cidr
                "msg": "NET_MNG_VM_IP_MNG.NOT_IN_SUBNET"
            },
            "ipscopepermask":{
                "func": val => !this.isIpScopePerMask(val[0], val[1], val[2]),  //ipstr, networkId, mask
                "msg": "NET_MNG_VM_IP_MNG.NOT_IN_SUBNET"
            },

        }

        if (map[op].func(val)) {
            return [name, map[op].msg];
        }
        else
            return undefined;
    }
}
*/