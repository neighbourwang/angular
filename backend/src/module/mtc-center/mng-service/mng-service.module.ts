import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule, PipeModule} from '../../../architecture';

//Components
import {MngServiceListComponent} from './component/mng-service-list.component'
import {MngServiceDetailComponent} from './component/mng-service-detail.component'

// Routing
import {MngServiceRouting} from './mng-service.routing';

//service
import { MngService} from './service/mng-service.service';

@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
        MngServiceRouting
    ],
    declarations: [
        MngServiceListComponent,
        MngServiceDetailComponent
    ],
    exports: [
        MngServiceListComponent,
        MngServiceDetailComponent
    ],
    providers:[
        MngService
    ]
})

export class MngServiceModule{

}
