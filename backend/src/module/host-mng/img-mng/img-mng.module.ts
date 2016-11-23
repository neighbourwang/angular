import { NgModule } from '@angular/core';


import { OpenstackMngModule } from './openstack-mng/openstack-mng.module';

@NgModule({
    imports: [
        OpenstackMngModule
    ],
    declarations: [],
    exports: [
        OpenstackMngModule
    ],
    providers: []
})

export class ImgMngModule{

}