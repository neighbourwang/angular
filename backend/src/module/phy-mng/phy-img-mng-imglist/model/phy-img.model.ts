import {Enterprise} from './enterprise.model';
export class PhyImg{
    id: string;
    destImageName: string;
    origImageName: string;
    osTypeId: string;
    osTypeName: string;
    bitId: number;
    bitName: string;
    imageTypeId: number;//0-公有镜像，1-私有镜像
    imageTypeName: string;
    enterpriseSelectedList:Array<Enterprise>;
    status:number;

    syncStatusId: number;
    syncStatusName: string;
    
    selected:boolean;
}