/**
 * Created by wangyao on 2016/10/18.
 */
import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule } from '../../../architecture';

//Components
import { ProdDirListComponent } from './component/prod-dir-list.component';

// Routing
import { ProdDirMngRouting } from './prod-dir-mng.routing';

//Service
// import { ClMngListService } from './service/cl-mgn-list.service';

@NgModule({
    imports: [
        CommonComponentModule,
        ProdDirMngRouting
    ],
    declarations: [
        ProdDirListComponent
    ],
    exports: [
    ],
    providers: [
        // ClMngListService
    ]

})
export class ProdDirMngModule { }
