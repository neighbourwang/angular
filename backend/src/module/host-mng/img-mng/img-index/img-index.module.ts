import { NgModule } from '@angular/core';
import { CommonComponentModule } from '../../../../architecture';

import { ImgIndexRouting } from './img-index.routing';
import { ImgIndexComponent } from './component/img-index.component';


import { ImgIndexService } from './service/img-index.service'
@NgModule({
    imports: [
        ImgIndexRouting,
        CommonComponentModule
    ],
    declarations: [
        ImgIndexComponent
        
    ],
    exports: [
        ImgIndexComponent
        
    ],
    providers: [ImgIndexService]
})

export class ImgIndexModule { }
