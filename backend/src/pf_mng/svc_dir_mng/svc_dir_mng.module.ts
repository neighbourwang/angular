import { NgModule } from '@angular/core';
// import { HttpModule, Jsonp } from '@angular/http';

// Common Componets
import { CommonComponentModule } from '../../common_components/common.module';

// Service Directory
import { DirectoryComponent } from './svc_dir_mng/component/directory.component';
import { DirectoryService } from './svc_dir_mng/service/directory.service';
import { DirectoryDispPipe } from './svc_dir_mng/pipe/directory.pipe';

import { SvcDirCreStep1Component } from './svc_dir_cre_step/component/step1.component';
import { SvcDirCreStep2Component } from './svc_dir_cre_step/component/step2.component';
import { SvcDirCreStep3Component } from './svc_dir_cre_step/component/step3.component';
import { SvcDirCreStep4Component } from './svc_dir_cre_step/component/step4.component';


// Routing
import { SvcDirMngRouting } from './svc_dir_mng.routing';

@NgModule({
    imports: [
        CommonComponentModule,
        // HttpModule,
        SvcDirMngRouting
    ],
    declarations: [
        DirectoryComponent,
        DirectoryDispPipe,
        SvcDirCreStep1Component,
        SvcDirCreStep2Component,
        SvcDirCreStep3Component,
        SvcDirCreStep4Component
    ],
    exports: [
    ],
    providers: [
        DirectoryService
    ]

})
export class SvcDirMngModule { }
