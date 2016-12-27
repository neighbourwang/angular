
import { NgModule } from '@angular/core';
import { CommonComponentModule, PipeModule } from '../../../../architecture';

import { VmNSXIndexRouting } from './index-nsx.routing';
import { VmNSXIndexComponent } from './component/index-nsx.component';
import { VmNSXIndexService} from './service/index-nsx.service'
@NgModule({
    imports: [
        VmNSXIndexRouting,
        CommonComponentModule,
        PipeModule
    ],
    declarations: [
        VmNSXIndexComponent
        
    ],
    exports: [
        VmNSXIndexComponent
        
    ],
        
    providers: [
        VmNSXIndexService
    ]
})

export class VmNSXIndexModule { }