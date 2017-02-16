import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule, PipeModule} from '../../../architecture';

//Components
import { PhyNetMngComponent } from './component/phy-net-mng.component';
import { PhyNetIpUsageMngListComponent } from './component/phy-ipusage-mng-list.component';
import { PhyNetResourceSetupComponent } from './component/phy-setup-resource.component';
import { PhyNetDetailsComponent  } from './component/phy-net-details.component';

// Routing
import { PhyNetRouting } from './phy-net-mng.routing';

//service
//import { PhyPoolMngService} from './service/phy-pool-mng.service'
//import { PhyCreatMngService} from './service/phy-creat-mng.service.ts'


@NgModule({
    imports: [
        CommonComponentModule,
        PhyNetRouting,
        PipeModule
    ],
    declarations: [
        PhyNetMngComponent,
        PhyNetIpUsageMngListComponent,
        PhyNetResourceSetupComponent,
        PhyNetDetailsComponent
    ],
    exports: [
        PhyNetMngComponent,
        PhyNetIpUsageMngListComponent,
        PhyNetResourceSetupComponent,
        PhyNetDetailsComponent
    ],
    providers: [
        //PhyPoolMngService,
        //PhyCreatMngService
    ]

})
export class PhyNetModule { }
