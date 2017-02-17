import { NgModule } from '@angular/core';

import { CapacityMngModule } from './capacity-mng/capacity-mng.module';

@NgModule({
    imports: [
       CapacityMngModule
    ],
    declarations: [],
    exports: [
        
    ],
    providers: [
        CapacityMngModule
    ]
})

export class MtcCenterModule { }