import { NgModule } from '@angular/core';

import { PhyPoolModule } from './phy-pool/phy-pool.module';
import { PhyNetModule } from './phy-net-mng/phy-net-mng.module';
import { PhysicalMngModule } from './physical-mng/physical-mng.module';

@NgModule({
    imports: [
        PhyPoolModule,
		PhysicalMngModule,
        PhyNetModule,
    ],
    declarations: [],
    exports: [
        PhyPoolModule,
		PhysicalMngModule,
        PhyNetModule
    ],
    providers: []
})

export class PhyMngModule { }
