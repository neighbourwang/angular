import { NgModule } from '@angular/core';

// Common Componets
import { PipeModule } from '../../architecture';
import { CommonComponentModule } from '../../architecture';

// Routing
import { CheckCenterRouting } from './check-center.routing';

//component
import { CheckMngListComponent } from './component/check-mng-list.component';
import { CheckMngHascheckComponent } from './component/check-mng-hascheck.component';

@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
        CheckCenterRouting
    ],
    declarations: [
         CheckMngListComponent,
         CheckMngHascheckComponent
    ],
    exports: [],
    providers: []

})
export class CheckCenterModule { }