import { NgModule } from '@angular/core';

import { PhyPoolModule } from './phy-pool/phy-pool.module';
import { PhyCreatModule } from './phy-creat/phy-creat.module';

@NgModule({
    imports: [
        PhyPoolModule,
        PhyCreatModule
    ],
    declarations: [],
    exports: [
        PhyPoolModule,
        PhyCreatModule
    ],
    providers: []
})

export class PhyMngModule { }
