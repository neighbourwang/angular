import { Enterprise } from './enterprise.model';

export class DlrModel{
    dlrName:string;
    dlrId:string;

    enterpriseList:Array<Enterprise>;
    selected:boolean;
}