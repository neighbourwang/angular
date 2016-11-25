import { NgModule } from '@angular/core';
// Common Components
import { CommonComponentModule } from '../../../../architecture';

import { OpenstackMngComponent } from './component/openstack-mng.component';
import { OpenstackMngRouting } from './openstack-mng.routing'
import { OpenstackMngService } from './service/openstack-mng.service'
@NgModule({
    imports: [
        OpenstackMngRouting,
        CommonComponentModule
    ],
    declarations: [OpenstackMngComponent
    ],
    exports: [
        OpenstackMngComponent
    ],
    providers: [OpenstackMngService]
})

export class OpenstackMngModule{
    
} 
