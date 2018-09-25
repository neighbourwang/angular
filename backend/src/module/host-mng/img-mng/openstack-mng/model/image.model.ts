import {Tenant} from './tenant.model'
export class Image {

    id: string;
    uuid: string;
    name: string;
    displayName: string;
    os: string;
    bitsType:string;
    type: string;
    tenants: Array<Tenant>;
    status:string;
    description:string;
    capacity:number;//byte
    selected:boolean;
    syncResult:string;
    format:string;
    nameEditing:boolean;

   
}