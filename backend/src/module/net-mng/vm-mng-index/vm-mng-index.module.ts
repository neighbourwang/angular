import { NgModule } from '@angular/core';

// Common Components
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';

//Routing
import { VmwareMngIndexRouting } from './vm-mng-index.routing';

//Component
import { VmwareMngIndexComponent } from './component/vm-mng-index.component';

//Service
import { VmwareMngIndexService } from './service/vm-mng-index.service';
@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
        VmwareMngIndexRouting
    ],
    declarations: [
        VmwareMngIndexComponent
    ],
    exports: [
        VmwareMngIndexComponent
    ],
    providers: [
        VmwareMngIndexService
    ]
})

export class VmwareMngIndexModule { }

