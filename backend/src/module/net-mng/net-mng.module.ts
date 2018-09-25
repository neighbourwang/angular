import { NgModule } from '@angular/core';

import { OpenstackModule } from './openstack/openstack.module';
import { VmwareMngIndexModule } from './vm-mng-index/vm-mng-index.module';
import { VMMngModule } from './vm-mng/vm-mng.module';
import { VmMngDbtModule } from './vm-mng-dbt/vm-mng-dbt.module';
import { VmMngNsxModule } from './vm-mng-nsx/vm-mng-nsx.module';
@NgModule({
    imports: [
        OpenstackModule,
        VmwareMngIndexModule,
        VMMngModule,
        VmMngDbtModule,
        VmMngNsxModule
    ],
    declarations: [],
    exports: [
        OpenstackModule,
        VmwareMngIndexModule,
        VMMngModule,
        VmMngDbtModule,
        VmMngNsxModule
    ],
    providers: []
})

export class NetMngModule { }