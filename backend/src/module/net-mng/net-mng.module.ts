import { NgModule } from '@angular/core';

import { OpenstackModule } from './openstack/openstack.module';
import { IpMngModule } from './ip-mng/ip-mng.module';
import { VMMngModule } from './vm-mng/vm-mng.module';

@NgModule({
    imports: [
        OpenstackModule,
        IpMngModule,
        VMMngModule
    ],
    declarations: [],
    exports: [
        OpenstackModule,
        IpMngModule,
        VMMngModule
    ],
    providers: []
})

export class NetMngModule { }