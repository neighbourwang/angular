import { NgModule } from '@angular/core';

import { CapacityMngModule } from './capacity-mng/capacity-mng.module';
import { AssignMngModule } from './assign-mng/assign-mng.module';
import { CaseMngModule } from './case-mng/case-mng.module';
import { TrendMngModule} from './trend-mng/trend-mng.module';
@NgModule({
    imports: [
       CaseMngModule,
       CapacityMngModule,
        AssignMngModule,
        TrendMngModule
    ],
    declarations: [],
    exports: [
        CaseMngModule,
        CapacityMngModule,
        AssignMngModule,
        TrendMngModule
    ],
    providers: [
        
        
    ]
})

export class MtcCenterModule { }