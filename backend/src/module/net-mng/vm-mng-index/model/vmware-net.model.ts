/*
{
    "resultCode": "100",
    "detailDescription": null,
    "resultContent":[  
     {
     "regionId":"1",
     "regionName":"wuhan",
     "dcList":[
                    {
                         "dcId":"1",
                        "dcName":"dc1",
                        "platformList":[
                                {"platformName":"platform1",
                                "platformUrl":"http://",
                                "platformId":"1231231-123123-123123-123"
                                 }
                         ]
                   }
 
                 ]
   
   }
 ]
}

*/
export class PlatformModel{
    platformName: string = "";
    platformUrl: string = "";
    platformId: string = "";
    toString(){
        return JSON.stringify(this);
    }
    revertString(){
        console.log(this.platformId + ' ' + this.platformName + ' ' + this.platformUrl);
    }
}

export class DCModel{
    datacenterId: string = "";    
    datacenterName: string = "";
    platformList: Array<PlatformModel> = [];
    toString(){
        return JSON.stringify(this);
    }
}

export class RegionModel {
    regionId: string = "";
    regionName: string = "";
    dcList: Array<DCModel> = [];
    toString(){
        return JSON.stringify(this);
    }    
}

/*
{
        "dcName": "DC1",
        "dcId": "12312-123123-123123",
        "clusterName": "cluster1",
        "clusterId": "cluster1-123-123-123",
        "clusterDisplayName": "area1",
        "networkType": 1
}
*/

export class VmwareNetModel {
    dcName: string = "";
    dcId: string = "";
    clusterName: string = "";
    clusterId: string = "";
    clusterDisplayName: string = "";
    networkType: string = "";

    checked: boolean = false;

    toString(){
        return JSON.stringify(this);
    }
    
}

/*
{
 "nsxVer":1,
 "nsxAddress":"htto://",
 "userName":"admin",
 "adminPassword":"adminpass",
 "platformId":"123123123-12312-11"
}
*/

export class NsxNetModel{
    nsxVer: string = "";
    nsxAddress: string = "";
    userName: string = "";
    adminPassword: string = "";
    platformId: string = "";
}

export class VmNetStatusModel{
    checkResult: string = ""; //nsx checking status
    vmNetStatus: string = "";
}