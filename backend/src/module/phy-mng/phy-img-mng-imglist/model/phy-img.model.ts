import {Enterprise} from './enterprise.model';
export class PhyImg{
    id: string;
    destImageName: string;
    origImageName: string;
    osTypeId: string;
    osTypeName: string;
    bitId: number;
    bitName: string;
    imageTypeId: number;
    imageTypeName: string;
    enterpriseSelectedList:Array<Enterprise>;
    status:number;

    syncStatusId: number;
    syncStatusName: string;
    
    selected:boolean;
}