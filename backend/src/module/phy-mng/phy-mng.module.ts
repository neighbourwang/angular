import { NgModule } from '@angular/core';

import { PhyPoolModule } from './phy-pool/phy-pool.module';

import { PhysicalMngModule } from './physical-mng/physical-mng.module';
@NgModule({
    imports: [
        PhyPoolModule,
		PhysicalMngModule
    ],
    declarations: [],
    exports: [
        PhyPoolModule,
		PhysicalMngModule
    ],
    providers: []
})

export class PhyMngModule { }
