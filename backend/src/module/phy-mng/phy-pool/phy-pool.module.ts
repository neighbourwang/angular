import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule, PipeModule} from '../../../architecture';

//Components
import { PhyPoolMngComponent } from './component/phy-pool-mng.component';
import { PhyCreatComponent } from './component/phy-creat.component.ts';
import { PhyUnitMngComponent } from './component/phy-unit-mng.component';

// Routing
import { PhyPoolRouting } from './phy-pool.routing';

//service
import { PhyPoolMngService} from './service/phy-pool-mng.service'
import { PhyCreatMngService} from './service/phy-creat-mng.service.ts'
import { PhyUnitMngService} from './service/phy-unit-mng.service'


@NgModule({
    imports: [
        CommonComponentModule,
        PhyPoolRouting,
        PipeModule
    ],
    declarations: [
        PhyPoolMngComponent,
        PhyCreatComponent,
        PhyUnitMngComponent
    ],
    exports: [
        PhyPoolMngComponent,
        PhyCreatComponent,
        PhyUnitMngComponent
    ],
    providers: [
        PhyPoolMngService,
        PhyCreatMngService,
        PhyUnitMngService
    ]

})
export class PhyPoolModule { }
