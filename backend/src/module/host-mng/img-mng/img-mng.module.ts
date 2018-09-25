import { NgModule } from '@angular/core';

import { ImgIndexModule} from './img-index/img-index.module';
import { OpenstackMngModule } from './openstack-mng/openstack-mng.module';
import { VmareMngModule } from './vmware-mng/vmware-mng.module';

@NgModule({
    imports: [
        ImgIndexModule,
        OpenstackMngModule,
        VmareMngModule
    ],
    declarations: [],
    exports: [
        OpenstackMngModule,
        ImgIndexModule,
        VmareMngModule
    ],
    providers: []
})

export class ImgMngModule{

}