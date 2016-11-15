import { NgModule } from '@angular/core';

import { OpenstackModule } from './openstack/openstack.module';
import { IpMngModule } from './ip-mng/ip-mng.module';

@NgModule({
    imports: [
        OpenstackModule,
        IpMngModule
    ],
    declarations: [],
    exports: [
        OpenstackModule,
        IpMngModule
    ],
    providers: []
})

export class NetMngModule { }