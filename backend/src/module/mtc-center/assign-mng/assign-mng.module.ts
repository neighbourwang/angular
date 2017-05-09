import { NgModule } from '@angular/core';
// Common Components ../../../architecture
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';

//Components
import { AssignMngComponent} from './component/assign-mng.component';
import { AssignDetailComponent} from './component/assign-detail.component';
import { AssignMngDetailComponent} from './component/assign-mng-detail.component';
// Routing
import { AssignMngRouting } from './assign-mng.routing';

//Service
import {AssignMngService} from './service/assign-mng.service';
import {AssignDetailService} from './service/assign-detail.service';


@NgModule({
    imports: [
        CommonComponentModule,
        AssignMngRouting,
        PipeModule
    ],
    declarations: [
        AssignMngComponent,
        AssignDetailComponent,
        AssignMngDetailComponent
    ],
    exports: [
    ],
    providers: [
        AssignMngService,
        AssignDetailService
    ]

})
export class AssignMngModule { }