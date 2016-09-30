import { NgModule } from '@angular/core';

// Common Componets
import { CommonComponentModule } from '../../../../architecture';

// cloud_host_ins_list
import { InstanceListComponent } from './component/instance.component';
import { InstanceListService } from './service/instance.service';
import { InstanceDispPipe } from './pipe/instance.pipe';

// Routing
import { CloudHostInsListRouting } from './cloud-host-ins-list.routing';

@NgModule({
    imports: [
        CommonComponentModule,
        CloudHostInsListRouting
    ],
    declarations: [
        InstanceListComponent,
        InstanceDispPipe
    ],
    exports: [
        InstanceListComponent
    ],
    providers: [
        InstanceListService
    ]

})
export class CloudHostInsListModule { }
