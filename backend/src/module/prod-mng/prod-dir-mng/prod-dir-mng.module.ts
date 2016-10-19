/**
 * Created by wangyao on 2016/10/18.
 */
import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule } from '../../../architecture';

//Components
import { ProdDirListComponent } from './component/prod-dir-list.component';
import {ProdDirCreComponent} from "./component/prod-dir-cre.component";
// Routing
import { ProdDirMngRouting } from './prod-dir-mng.routing';


//Service
import { ProdDirListService } from './service/prod-dir-list.service';

@NgModule({
    imports: [
        CommonComponentModule,
        ProdDirMngRouting
    ],
    declarations: [
        ProdDirListComponent,
        ProdDirCreComponent
    ],
    exports: [
        ProdDirListComponent,
        ProdDirCreComponent
    ],
    providers: [
        ProdDirListService
    ]

})
export class ProdDirMngModule { }
