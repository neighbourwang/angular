import { NgModule } from '@angular/core';

// Common Componets
import { CommonComponentModule } from '../../architecture';

// Routing
import { CheckCenterRouting } from './check-center.routing';

//component
import { CheckMngListComponent } from './component/check-mng-list.component';

@NgModule({
    imports: [
        CommonComponentModule,
        CheckCenterRouting
    ],
    declarations: [
         CheckMngListComponent
    ],
    exports: [],
    providers: []

})
export class CheckCenterModule { }