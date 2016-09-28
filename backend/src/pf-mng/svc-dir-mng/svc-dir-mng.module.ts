import { NgModule } from '@angular/core';
// import { HttpModule, Jsonp } from '@angular/http';

// Common Componets
import { CommonComponentModule } from '../../common_components/common.module';

// Service Directory
import { 
    DirectoryComponent,
    SvcDirCreStep1Component,
    SvcDirCreStep2Component,
    SvcDirCreStep3Component,
    SvcDirCreStep4Component
} from './component';
import { DirectoryService } from './service/svc-dir-mng.service';
import { DirectoryDispPipe } from './pipe/svc-dir-mng.pipe';

// Routing
import { SvcDirMngRouting } from './svc-dir-mng.routing';

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
