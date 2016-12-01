import { NgModule } from '@angular/core';
import { CommonComponentModule } from '../../../../architecture';

import { VmDisIndexRouting } from './index.routing';
import { VmDisIndexComponent } from './component/index.component';


import { VmDisIndexService} from './service/index.service'
@NgModule({
    imports: [
        VmDisIndexRouting,
        CommonComponentModule
    ],
    declarations: [
        VmDisIndexComponent
        
    ],
    exports: [
        VmDisIndexComponent
        
    ],
    providers: [VmDisIndexService]
})

export class VmDisIndexModule { }
