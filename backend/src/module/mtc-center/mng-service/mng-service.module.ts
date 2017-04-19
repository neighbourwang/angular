import {NgModule} from '@angular/core';
// Common Components
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from "../../../architecture";

import {MngServiceListComponent} from './component/mng-service-list.component'
import {MngServiceDetailComponent} from './component/mng-service-detail.component'
import {MngServiceRouting} from './mng-service.routing';
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

    ]
})

export class MngServiceModule{

}
