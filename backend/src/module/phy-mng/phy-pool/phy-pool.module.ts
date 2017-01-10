import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule, PipeModule} from '../../../architecture';

//Components
import { PhyPoolMngComponent } from './component/phy-pool-mng.component';
import { PhyCreatComponent } from './component/phy-creat.component.ts';

// Routing
import { PhyPoolRouting } from './phy-pool.routing';

//service
import { PhyPoolMngService} from './service/phy-pool-mng.service'
import { PhyCreatMngService} from './service/phy-creat-mng.service.ts'


@NgModule({
    imports: [
        CommonComponentModule,
        PhyPoolRouting,
        PipeModule
    ],
    declarations: [
        PhyPoolMngComponent,
        PhyCreatComponent
    ],
    exports: [
        PhyPoolMngComponent,
        PhyCreatComponent
    ],
    providers: [
        PhyPoolMngService,
        PhyCreatMngService
    ]

})
export class PhyPoolModule { }
