import { NgModule } from '@angular/core';

// Common Componets
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';

// Routing
import { CostSetRouting } from './cost-set.routing';

//component
import {CostSetListComponent,CostSetDefaultComponent } from './component';

@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
        CostSetRouting
    ],
    declarations: [
       CostSetListComponent,
       CostSetDefaultComponent
    ],
    exports: [],
    providers: []

})
export class CostSetModule { }