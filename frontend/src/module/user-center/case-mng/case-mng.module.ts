import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule, PipeModule} from '../../../architecture';

//Components
import { CaseMngListComponent } from './component/case-mng-list.component';
import { CaseDepartListComponent } from './component/case-depart-list.component';

// Routing
import { CaseMngRouting } from './case-mng.routing';

//service
import { CaseMngService} from './service/case-mng-list.service'


@NgModule({
    imports: [
        CommonComponentModule,
        CaseMngRouting,
        PipeModule
    ],
    declarations: [
        CaseMngListComponent,
        CaseDepartListComponent
    ],
    exports: [
        CaseMngListComponent,
        CaseDepartListComponent
    ],
    providers: [
        CaseMngService
    ]

})
export class CaseMngModule { }
