import { Follow } from './follow.model';
import { MngServiceList } from './mng-service-list.model';
export class MngServiceDetail{
    serviceBaseInfo: MngServiceList= new MngServiceList();
    remarkInfo: string;
    startDate: string;
    endDate: string;
    followInfos: Array<Follow>;

}

