import {Enterprise} from "./enterprise.model";
export class PhyImg{
    id:string;
    displayName:string;
    name:string;
    os:string;
    bitsType:string;
    type: string;
    status:string;
    enterpriseList: Array<Enterprise>;
}