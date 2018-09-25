import { NgModule } from '@angular/core';

import { CapacityMngModule } from './capacity-mng/capacity-mng.module';
import { AssignMngModule } from './assign-mng/assign-mng.module';
import { CaseMngModule } from './case-mng/case-mng.module';
import { TrendMngModule} from './trend-mng/trend-mng.module';
import { MngServiceModule} from './mng-service/mng-service.module';
import { AlarmNoticeModule} from './alarm-notice/alarm-notice.module';
@NgModule({
    imports: [
        CaseMngModule,
        CapacityMngModule,
        AssignMngModule,
        TrendMngModule,
        MngServiceModule,
        AlarmNoticeModule
    ],
    declarations: [],
    exports: [
        CaseMngModule,
        CapacityMngModule,
        AssignMngModule,
        TrendMngModule,
        MngServiceModule,
        AlarmNoticeModule
    ],
    providers: [
        
        
    ]
})

export class MtcCenterModule { }
