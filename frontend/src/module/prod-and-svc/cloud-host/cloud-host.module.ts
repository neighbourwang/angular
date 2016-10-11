import { NgModule } from '@angular/core';

// Common Componets
import { CommonComponentModule } from '../../../architecture';

// cloud_host_ins_list
import {
    GeneralViewComponent, 
    HostOrderComponent,
    InstanceListComponent,
    InstantceDetailComponent
} from './component';
import { InstanceListService, OrderService } from './service';
import { InstanceDispPipe } from './pipe/instance.pipe';

// Routing
import { CloudHostRouting } from './cloud-host.routing';

@NgModule({
    imports: [
        CommonComponentModule,
        CloudHostRouting
    ],
    declarations: [
        GeneralViewComponent,
        HostOrderComponent,
        InstanceListComponent,
        InstantceDetailComponent,
        InstanceDispPipe
    ],
    exports: [
        InstanceListComponent,
        HostOrderComponent
    ],
    providers: [
        InstanceListService,
        OrderService
    ]

})
export class CloudHostModule { }
