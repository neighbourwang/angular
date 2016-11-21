import { NgModule } from '@angular/core';

import { OpenstackModule } from './openstack/openstack.module';
import { IpMngModule } from './ip-mng/ip-mng.module';
import { VMMngModule } from './vm-mng/vm-mng.module';
import {VmwareModule} from './vmware/vmware.module';
@NgModule({
    imports: [
        OpenstackModule,
        IpMngModule,
        VMMngModule,
        VmwareModule
    ],
    declarations: [],
    exports: [
        OpenstackModule,
        IpMngModule,
        VMMngModule,
        VmwareModule
    ],
    providers: []
})

export class NetMngModule { }