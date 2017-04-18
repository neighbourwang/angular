import { NgModule } from '@angular/core';

import { CapacityMngModule } from './capacity-mng/capacity-mng.module';
import { AssignMngModule } from './assign-mng/assign-mng.module';
import { CaseMngModule } from './case-mng/case-mng.module';
import { TrendMngModule} from './trend-mng/trend-mng.module';
import { MngServiceModule} from './mng-service/mng-service.module';
@NgModule({
    imports: [
        CaseMngModule,
        CapacityMngModule,
        AssignMngModule,
        TrendMngModule,
        MngServiceModule
    ],
    declarations: [],
    exports: [
        CaseMngModule,
        CapacityMngModule,
        AssignMngModule,
        TrendMngModule,
        MngServiceModule
    ],
    providers: [
        
        
    ]
})

export class MtcCenterModule { }