import { NgModule } from '@angular/core';

import { CapacityMngModule } from './capacity-mng/capacity-mng.module';
import { AssignMngModule } from './assign-mng/assign-mng.module';
import { CaseMngModule } from './case-mng/case-mng.module';

@NgModule({
    imports: [
       CaseMngModule,
       CapacityMngModule,
       AssignMngModule
    ],
    declarations: [],
    exports: [
        CaseMngModule,
        CapacityMngModule,
        AssignMngModule
    ],
    providers: [
        
        
    ]
})

export class MtcCenterModule { }