import { InstanceList } from './instance-list.model';
export class MngServiceList{
    serviceProductId: string;
    serviceId: string;
    serviceName: string;
    serviceObjectCode: string;
    instance: InstanceList= new InstanceList();
    enterpriseId: string;
    enterpriseName: string;
    serviceType: string;
    serviceStatus: string;
    serviceNo: string;

    selected: boolean;

}

