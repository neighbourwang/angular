import { NgModule } from '@angular/core';

import { PhyPoolModule } from './phy-pool/phy-pool.module';
import { PhyCreatModule } from './phy-creat/phy-creat.module';

//import { PhysicalMngModule } from './physical-mng/physical-mng.module';
@NgModule({
    imports: [
        PhyPoolModule,
        PhyCreatModule,
	//	PhysicalMngModule
    ],
    declarations: [],
    exports: [
        PhyPoolModule,
        PhyCreatModule,
		//PhysicalMngModule
    ],
    providers: []
})

export class PhyMngModule { }
