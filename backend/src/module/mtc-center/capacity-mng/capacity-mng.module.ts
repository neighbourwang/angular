import { NgModule } from '@angular/core';
// Common Components ../../../architecture
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';


//Components
import { CapacityMngComponent} from './component/capacity-mng.component';
import { ComputeResComponent} from './component/compute-res.component';
import { StoreResComponent} from './component/store-res.component';
import { StoreDetailComponent} from './component/store-detail.component';
import { HostDetailComponent} from './component/host-detail.component';

// Routing
import { CapacityMngRouting } from './capacity-mng.routing';

//Service
import { CapacityMngService} from './service/capacity-mng.service';
import { ComputeResService} from './service/compute-res.service';
import { StoreResService} from './service/store-res.service';
import { StoreDetailService} from './service/store-detail.service';
import { HostDetailService} from './service/host-detail.service';

@NgModule({
    imports: [
       
        CommonComponentModule,
        CapacityMngRouting,
        PipeModule
    ],
    declarations: [
        CapacityMngComponent,
        ComputeResComponent,
        StoreResComponent,
        StoreDetailComponent,
        HostDetailComponent
    ],
    exports: [
    ],
    providers: [
        CapacityMngService,
        ComputeResService,
        StoreResService,
        StoreDetailService,
        HostDetailService
    ]

})
export class CapacityMngModule { }