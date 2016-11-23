import {Tenant} from './tenant.model'
export class Image {

    id: string;
    name: string;
    displayName: string;
    os: string;
    bitesType:string;
    type: string;
    tenants: Array<Tenant>;
    status:string;
    description:string;

        
}