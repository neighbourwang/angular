import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule, PipeModule} from '../../../architecture';

//Components
import { AliMajorListComponent } from './component/ali-major-list.component';
import { AliSubListComponent } from './component/ali-sub-list.component';

// Routing
import { AliMngRouting } from './ali-mng.routing';

//service
import { AliMajorService} from './service/ali-major-list.service'
import { AliSubService} from './service/ali-sub-list.service'

@NgModule({
    imports: [
        CommonComponentModule,
        AliMngRouting,
        PipeModule
    ],
    declarations: [
        AliMajorListComponent,
        AliSubListComponent
    ],
    exports: [
        AliMajorListComponent,
        AliSubListComponent
    ],
    providers: [
        AliMajorService,
        AliSubService
    ]

})
export class AliMngModule { }
