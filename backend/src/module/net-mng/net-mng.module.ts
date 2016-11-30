import { NgModule } from '@angular/core';

import { OpenstackModule } from './openstack/openstack.module';
import { IpMngModule } from './vm-mng/ip-mng/ip-mng.module';
import { VMMngModule } from './vm-mng/vm-mng.module';
import { VmMngDbtModule } from './vm-mng-dbt/vm-mng-dbt.module';
@NgModule({
    imports: [
        OpenstackModule,
        IpMngModule,
        VMMngModule,
        VmMngDbtModule
    ],
    declarations: [],
    exports: [
        OpenstackModule,
        IpMngModule,
        VMMngModule,
        VmMngDbtModule
    ],
    providers: []
})

export class NetMngModule { }