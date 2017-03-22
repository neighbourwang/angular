import { NgModule } from '@angular/core';

// Common Componets
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';

// component 
import { AliCloudVmListComponent } from './component/cloud-vm-list.component';
import { AliCloudVmOrderComponent } from './component/cloud-vm-order.component';

//service 
//import { MsgMngService } from './service/msg-mng.service';

//routing
import { AliCloudVmRouting } from './cloud-vm.routing';

@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
        AliCloudVmRouting
    ],
    declarations: [
        AliCloudVmListComponent,
        AliCloudVmOrderComponent
    ],
    exports: [
        AliCloudVmListComponent,
        AliCloudVmOrderComponent
    ],
    providers: [
        //MsgMngService
    ]

})
export class AliCloudVmModule { }
