import { NgModule } from '@angular/core';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

// Common Components
import { CommonComponentModule } from '../../architecture';
import { PipeModule } from '../../architecture';

//routing
import { ImgMngRouting } from './image-mng.routing';
//Components
import { ImgMngComponent_dlm } from './image-mng-dlm/component/img-mng.component';
import { ImgMngComponent_fhd } from './image-mng-fhd/component/img-mng.component';
import { ImgMngComponent_gcy } from './image-mng-gcy/component/img-mng.component';
import { ImgMngComponent_my } from './image-mng-my/component/img-mng.component';
import { ImgMngComponent_wxl } from './image-mng-wxl/component/img-mng.component';

import { ImgMngDescriptionComponent } from './image-mng-wxl/component/img-mng-edit-description.component';

import { ImgMngComponent } from './image-mng-zj/component/img-mng.component';


//service
import { ImgMngService_dlm } from './image-mng-dlm/service/img-mng.service';
import { ImgMngService_fhd } from './image-mng-fhd/service/img-mng.service';
import { ImgMngService_gcy } from './image-mng-gcy/service/img-mng.service';
import { ImgMngService_my } from './image-mng-my/service/img-mng.service';
import { ImgMngService_wxl } from './image-mng-wxl/service/img-mng.service';
import { ImgMngService } from './image-mng-zj/service/img-mng.service';


@NgModule({
    imports: [
        Ng2Bs3ModalModule,
        CommonComponentModule,
        ImgMngRouting,
        PipeModule
    ],
    declarations: [
        ImgMngComponent,
        ImgMngComponent_dlm,
        ImgMngComponent_fhd,
        ImgMngComponent_gcy,
        ImgMngComponent_my,
        ImgMngComponent_wxl,
        ImgMngComponent,
        ImgMngDescriptionComponent
        
    ],
    exports: [
        ImgMngComponent,
        ImgMngComponent_dlm,
        ImgMngComponent_fhd,
        ImgMngComponent_gcy,
        ImgMngComponent_my,
        ImgMngComponent_wxl,
        ImgMngComponent,
        ImgMngDescriptionComponent
    ],
    providers: [
        ImgMngService,
        ImgMngService_dlm,
        ImgMngService_gcy,
        ImgMngService_fhd,
        ImgMngService_my,
        ImgMngService_wxl
    ]

})
export class ImgMngModule { }
