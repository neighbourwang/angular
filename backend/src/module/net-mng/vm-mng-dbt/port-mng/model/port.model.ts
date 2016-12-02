import { Enterprise } from "./enterprise.model";

export class PortMngModel {
    id: string;
    dcId: string;
    dcName: string;
    switchId: string;
    switchName: string;//VDS1
    dvPortGroupName: string;
    enterpriseList: Array<Enterprise>;

    vlanId: string;
    selected: boolean;
    
}