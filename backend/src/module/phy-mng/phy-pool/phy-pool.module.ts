import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule, PipeModule} from '../../../architecture';

//Components
import { PhyPoolMngComponent } from './component/phy-pool-mng.component';

// Routing
import { PhyPoolRouting } from './phy-pool.routing';

//service
import { PhyPoolMngService} from './service/phy-pool-mng.service'


@NgModule({
    imports: [
        CommonComponentModule,
        PhyPoolRouting,
        PipeModule
    ],
    declarations: [
        PhyPoolMngComponent
    ],
    exports: [
        PhyPoolMngComponent
    ],
    providers: [
        PhyPoolMngService
    ]

})
export class PhyPoolModule { }
