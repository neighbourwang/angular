import { NgModule } from '@angular/core';

// Common Componets
import { CommonComponentModule } from '../../architecture';
import { PipeModule } from '../../architecture';

// Routing
import { CheckCenterRouting } from './check-center.routing';

//component
import { CheckMngListComponent } from './component/check-mng-list.component';
import { CheckMngHascheckComponent } from './component/check-mng-hascheck.component';
import { CheckMngSetComponent } from './component/check-mng-set.component';


@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
        CheckCenterRouting
    ],
    declarations: [
         CheckMngListComponent,
         CheckMngHascheckComponent,
         CheckMngSetComponent
    ],
    exports: [],
    providers: []

})
export class CheckCenterModule { }