import { NgModule } from '@angular/core';

import { CapacityMngModule } from './capacity-mng/capacity-mng.module';

import { CaseMngModule } from './case-mng/case-mng.module';

@NgModule({
    imports: [
       CapacityMngModule
        CaseMngModule,
       
    ],
    declarations: [],
    exports: [
        CaseMngModule,
        
    ],
    providers: [
        CapacityMngModule
    ]
})

export class MtcCenterModule { }