import { Enterprise } from "./enterprise.model";

export class PortMngModel {
    id: string;
    dcId: string;
    dcName: string;
    clusterId:string;
    clusterName: string;
    clusterDisplayName: string;
    portDisplayName: string;
    portGroupName: string;
    vlanId: string;
    enterpriseList: Array<Enterprise>;

    selected: boolean;
}