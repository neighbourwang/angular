import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule, PipeModule} from '../../../architecture';

//Components
import {MngServiceListComponent} from './component/mng-service-list.component';
import {MngServiceDetailComponent} from './component/mng-service-detail.component';
import {MngServiceSetComponent} from './component/mng-service-set.component';

// Routing
import {MngServiceRouting} from './mng-service.routing';

//service
import { MngService} from './service/mng-service.service';
import { MngDetailService} from './service/mng-detail.service';
import { MngSetService} from './service/mng-set.service';

@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
        MngServiceRouting
    ],
    declarations: [
        MngServiceListComponent,
        MngServiceDetailComponent,
        MngServiceSetComponent
    ],
    exports: [
        MngServiceListComponent,
        MngServiceDetailComponent,
        MngServiceSetComponent
    ],
    providers:[
        MngService,
        MngDetailService,
        MngSetService
    ]
})

export class MngServiceModule{

}
