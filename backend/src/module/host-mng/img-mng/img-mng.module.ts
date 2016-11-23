import { NgModule } from '@angular/core';


import { OpenstackMngModule } from './openstack-mng/openstack-mng.module';
import { ImgIndexModule} from './img-index/img-index.module';
@NgModule({
    imports: [
        OpenstackMngModule,
        ImgIndexModule
    ],
    declarations: [],
    exports: [
        OpenstackMngModule,
        ImgIndexModule
    ],
    providers: []
})

export class ImgMngModule{

}