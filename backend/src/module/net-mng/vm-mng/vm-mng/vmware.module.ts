import { NgModule } from '@angular/core';
import { CommonComponentModule ,PipeModule} from '../../../../architecture';

import { VmwareRouting } from './vmware.routing';
import { VmwareStdNetComponent } from './component/vmware-std-net.component';


import { VmwareService } from './service/vmware.service'
@NgModule({
    imports: [
        VmwareRouting,
        CommonComponentModule,
        PipeModule
    ],
    declarations: [
        VmwareStdNetComponent,
        
    ],
    exports: [
        VmwareStdNetComponent,
        
    ],
    providers: [VmwareService]
})

export class VmwareModule { }
