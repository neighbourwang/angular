import { NgModule } from '@angular/core';


// Common Components
import { CommonComponentModule } from '../../../architecture';

import { OpenstackRouting } from './Openstack.routing';
import { OpenstackNetMngComponent } from './component/openstack-net-mng.component';
import { OpenstackSynchrNetComponent } from './component/openstack-synchr-net.component';

import { OpenstackService } from './service/openstack.service'
@NgModule({
    imports: [
        OpenstackRouting,
        CommonComponentModule
    ],
    declarations: [
        OpenstackNetMngComponent,
        OpenstackSynchrNetComponent
    ],
    exports: [
        OpenstackNetMngComponent,
        OpenstackSynchrNetComponent
    ],
    providers: [OpenstackService]
})

export class OpenstackModule { }
