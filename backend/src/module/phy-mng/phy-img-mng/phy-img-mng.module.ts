import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule, PipeModule} from '../../../architecture';

//Components
import { PhyImgMngComponent } from './component/phy-img-mng.component';
import { PhyImgMngAllocateComponent} from './component/phy-img-mng-allocate.component';
// Routing
import { PhyImgRouting } from './phy-img-mng.routing';

import { PhyImgSourceService} from './service/phy-img-source.service'
@NgModule({
    imports: [
        CommonComponentModule,
        PhyImgRouting,
        PipeModule
    ],
    declarations: [
        PhyImgMngComponent,
        PhyImgMngAllocateComponent
    ],
    exports: [
        PhyImgMngComponent,
        PhyImgMngAllocateComponent
    ],
    providers: [PhyImgSourceService]

})
export class PhyImgModule { }
