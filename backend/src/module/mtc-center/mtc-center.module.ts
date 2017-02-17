import { NgModule } from '@angular/core';

import { CaseMngModule } from './case-mng/case-mng.module';

@NgModule({
    imports: [
        CaseMngModule,
       
    ],
    declarations: [],
    exports: [
        CaseMngModule,
        
    ],
    providers: []
})

export class MtcCenterModule { }