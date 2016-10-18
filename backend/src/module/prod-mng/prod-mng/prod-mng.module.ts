/**
 * Created by wangyao on 2016/10/18.
 */
import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule } from '../../../architecture';

//Components
import { ProdMngComponent } from './component/prod-mng.component.ts';

// Routing
import { ProdMngRouting } from './prod-mng.routing.ts';

//Service
// import { ClMngListService } from './service/cl-mgn-list.service';

@NgModule({
    imports: [
        CommonComponentModule,
        ProdMngRouting
    ],
    declarations: [
        ProdMngComponent
    ],
    exports: [
    ],
    providers: [
        // ClMngListService
    ]

})
export class ProdMngModule { }
