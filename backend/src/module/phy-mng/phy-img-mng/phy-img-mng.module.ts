import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule, PipeModule} from '../../../architecture';

//Components
import { PhyImgMngComponent } from './component/phy-img-mng.component';

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

    ],
    exports: [
        PhyImgMngComponent
    ],
    providers: [PhyImgSourceService]

})
export class PhyImgModule { }
