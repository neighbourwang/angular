import { NgModule } from '@angular/core';

import { ImgMngModule } from './img-mng/img-mng.module'

@NgModule({
    imports:[
        ImgMngModule
    ],
    declarations:[

    ],
    exports:[
        ImgMngModule
    ],
    providers: []
})
export class HostMngModule{

} 
