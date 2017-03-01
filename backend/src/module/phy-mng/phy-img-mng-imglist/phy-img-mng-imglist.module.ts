import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule, PipeModule} from '../../../architecture';

//Components
import { PhyImgListComponent } from './component/phy-imglist.component';
import { PhyImgListShowImgComponent} from './component/phy-imglist-showimg.component';
import { PhyImgListSyncComponent } from'./component/phy-imglist-sync.component';
import { PhyImgListSetentComponent } from'./component/phy-imglist-setent.component';
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
        PhyImgListShowImgComponent,
        PhyImgListSyncComponent,
        PhyImgListSetentComponent
    ],
    exports: [
        PhyImgListComponent,
        PhyImgListShowImgComponent,
        PhyImgListSyncComponent,
        PhyImgListSetentComponent
    ],
    providers: [PhyImgListService]

})
export class PhyImgMngImgListModule { }
