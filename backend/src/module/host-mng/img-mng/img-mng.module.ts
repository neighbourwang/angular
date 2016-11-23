import { NgModule } from '@angular/core';


import { OpenstackMngModule } from './openstack-mng/openstack-mng.module';
import { VmareMngModule } from './vmware-mng/vmware-mng.module';

@NgModule({
    imports: [
        OpenstackMngModule,
        VmareMngModule
    ],
    declarations: [],
    exports: [
        OpenstackMngModule,
        VmareMngModule
    ],
    providers: []
})

export class ImgMngModule{

}