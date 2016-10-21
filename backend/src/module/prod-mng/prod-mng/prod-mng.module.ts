/**
 * Created by wangyao on 2016/10/18.
 */
import { NgModule } from '@angular/core';
// Common Components ../../../architecture
import { CommonComponentModule } from '../../../architecture';

//Components
import { ProdMngComponent } from './component/prod-mng.component';
import { ProdCreComponent } from './component/prod-cre.component';

// Routing
import { ProdMngRouting } from './prod-mng.routing';

//Service
// import { ClMngListService } from './service/cl-mgn-list.service';

@NgModule({
    imports: [
        CommonComponentModule,
        ProdMngRouting
    ],
    declarations: [
        ProdMngComponent,
        ProdCreComponent
    ],
    exports: [
    ],
    providers: [
        // ClMngListService
    ]

})
export class ProdMngModule { }
