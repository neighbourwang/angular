import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule, PipeModule} from '../../../architecture';

//Components
import { PhyImgListComponent } from './component/phy-imglist.component';

// Routing
import { PhyImgMngImgListRouting } from './phy-img-mng-imglist.routing';

import { PhyImgListService} from './service/phy-imglist.service'
@NgModule({
    imports: [
        CommonComponentModule,
        PhyImgMngImgListRouting,
        PipeModule
    ],
    declarations: [
        PhyImgListComponent,

    ],
    exports: [
        PhyImgListComponent
    ],
    providers: [PhyImgListService]

})
export class PhyImgMngImgListModule { }
