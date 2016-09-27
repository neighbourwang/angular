import { NgModule } from '@angular/core';
// import { HttpModule, Jsonp } from '@angular/http';

// Common Componets
import { CommonComponentModule } from '../../common_components/common.module';

// cloud_host_ins_list
import { DirectoryComponent } from './svc_dir_mng/component/directory.component';
import { DirectoryService } from './svc_dir_mng/service/directory.service';


// Routing
import { SvcDirMngRouting } from './svc_dir_mng.routing';

@NgModule({
    imports: [
        CommonComponentModule,
        // HttpModule,
        SvcDirMngRouting
    ],
    declarations: [
        DirectoryComponent
    ],
    exports: [
    ],
    providers: [
        DirectoryService
    ]

})
export class SvcDirMngModule { }
