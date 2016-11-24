export class DCModel {
    dcName: string = "";
    dcId: string = "";
    clusters: Array<ClusterModel>;

    toString(){
        return JSON.stringify(this);
    }
}

export class ClusterModel {
    clusterName: string = "";
    clusterId: string = "";
    toString(){
        return JSON.stringify(this);
    }
}