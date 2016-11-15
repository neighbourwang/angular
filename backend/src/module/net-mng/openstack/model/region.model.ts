import { DataCenter } from './dataCenter.model';
export class Region {
    id: string = "";
    name: string;
    dcList: Array<DataCenter>;
}