import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule, PipeModule} from '../../../architecture';

//Components
import { PhyNetMngComponent } from './component/phy-net-mng.component';
import { PhyNetMngIpAddrComponent } from './component/phy-net-mng-ip-addr.component';
import { PhyNetSetupResourceComponent } from './component/phy-net-setup-resource.component';
import { PhyNetDetailsComponent  } from './component/phy-net-details.component';

// Routing
import { PhyNetRouting } from './phy-net-mng.routing';

//service
import { PhyNetMngService } from './service/phy-net-mng.service';
import { PhyNetDictService } from './service/phy-net-dict.service';
import { IPValidationService } from './service/ip-validation.service';
import { PhyNetDetailsService } from './service/phy-net-details.service';
import { PhyNetSetupResourceService } from './service/phy-net-setup-resource.service';
import { PhyNetMngIpAddrService } from './service/ipusage-mng-list.service';

@NgModule({
    imports: [
        CommonComponentModule,
        PhyNetRouting,
        PipeModule
    ],
    declarations: [
        PhyNetMngComponent,
        PhyNetMngIpAddrComponent,
        PhyNetSetupResourceComponent,
        PhyNetDetailsComponent
    ],
    exports: [
        PhyNetMngComponent,
        PhyNetMngIpAddrComponent,
        PhyNetSetupResourceComponent,
        PhyNetDetailsComponent
    ],
    providers: [
        PhyNetMngService,
        PhyNetDictService,
        IPValidationService,
        PhyNetDetailsService,
        PhyNetSetupResourceService,
        PhyNetMngIpAddrService
    ]

})
export class PhyNetModule { }
