import { NgModule } from '@angular/core';

import { CapacityMngModule } from './capacity-mng/capacity-mng.module';
import { AssignMngModule } from './assign-mng/assign-mng.module';
@NgModule({
    imports: [
        CapacityMngModule,
        AssignMngModule
    ],
    declarations: [],
    exports: [
        
    ],
    providers: [
        CapacityMngModule,
        AssignMngModule
    ]
})

export class MtcCenterModule { }