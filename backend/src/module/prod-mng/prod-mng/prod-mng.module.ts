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
import { ProdListService } from './service/prodList.service';
import { ProdDirListService } from "./service/prodDirList.service";

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
        ProdListService,
        ProdDirListService
    ]

})
export class ProdMngModule { }
