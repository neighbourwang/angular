export class VmwareNetModel {
    platformId: string;
    dcName: string;
    dcId: string;
    clusterName: string;
    clusterId: string;
    clusterDisplayName: string;
    type: string;

    toString(){
        return JSON.stringify(this);
    }
    
}