import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule, PipeModule} from '../../../architecture';

//Components
import { AlarmNoticeListComponent } from './component/alarm-notice-list.component';
import { HostMemoryUseComponent } from './component/host-memory-use.component';

// Routing
import { AlarmNoticeRouting } from './alarm-notice.routing';

//service
import { AlarmNoticeListService} from './service/alarm-notice-list.service'


@NgModule({
    imports: [
        CommonComponentModule,
        AlarmNoticeRouting,
        PipeModule
    ],
    declarations: [
        AlarmNoticeListComponent,
        HostMemoryUseComponent
    ],
    exports: [
        AlarmNoticeListComponent,
        HostMemoryUseComponent
    ],
    providers: [
        AlarmNoticeListService
    ]

})
export class AlarmNoticeModule { }
