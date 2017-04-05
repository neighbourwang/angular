import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule, PipeModule} from '../../../architecture';

//Components
import { AliMajorMngComponent } from './component/ali-major-mng.component';

// Routing
import { AliCloudMajorRouting } from './ali-cloud-major.routing';

//service
import { AliMajorMngService} from './service/ali-major-mng.service'


@NgModule({
    imports: [
        CommonComponentModule,
        AliCloudMajorRouting,
        PipeModule
    ],
    declarations: [
        AliMajorMngComponent
    ],
    exports: [
        AliMajorMngComponent
    ],
    providers: [
        AliMajorMngService
    ]

})
export class AliCloudMajorModule { }
