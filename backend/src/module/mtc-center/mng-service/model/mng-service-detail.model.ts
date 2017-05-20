import { Follow } from './follow.model';
export class MngServiceDetail{
    serviceId: string;
    serviceName: string;
    serviceInstanceType: string;
    instnceId: string;
    instanceName: string;
    regionZone: string;
    comments: string;
    serviceType: string;
    serviceState: string;
    startDate: string;
    endDate: string;
    serviceHisItems: Array<Follow>;

}

