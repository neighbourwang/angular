/**
 * Created by wangyao on 2016/10/18.
 */
import { NgModule } from '@angular/core';

// Common Components
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';

//Components
import { ProdDirListComponent } from './component/prod-dir-list.component';
import {ProdDirCreComponent} from "./component/prod-dir-cre.component";
import {ProdDirDiskCreComponent} from "./component/prod-dirDisk-cre.component";

// Routing
import { ProdDirMngRouting } from './prod-dir-mng.routing';


//Service
import { ProdDirListService } from './service/prod-dir-list.service';
import { ProdSeriesService } from './service/prod.series.service';
import { PlatformsActiveService } from './service/platform.service';
import { ProdDirPublishService } from './service/prod-dir-publish.service';
import { CcProdDirPublishService } from './service/prod-dir-ccPublish.service';
import { ProdDirDeleteService } from './service/prod-dir-delete.service';
import { ProdDirDetailService } from './service/prod-dir-detail.service';
import { CreateProdDirService } from './service/prod-dir-new.service';

@NgModule({
    imports: [
        CommonComponentModule,
        ProdDirMngRouting,
        PipeModule
    ],
    declarations: [
        ProdDirListComponent,
        ProdDirCreComponent,
        ProdDirDiskCreComponent
    ],
    exports: [
        ProdDirListComponent,
        ProdDirCreComponent,
        ProdDirDiskCreComponent
    ],
    providers: [
        ProdDirListService,
        ProdSeriesService,
        PlatformsActiveService,
        ProdDirPublishService,
        CcProdDirPublishService,
        ProdDirDeleteService,
        ProdDirDetailService,
        CreateProdDirService
    ]

})
export class ProdDirMngModule { }
