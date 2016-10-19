import { NgModule } from '@angular/core';

// Common Componets
import { CommonComponentModule } from '../../../architecture';

// ent-est-mng
import { EntEstCreStep04Component, EntEstMngComponent,  EntEstCreComponent, EntEstCreStep01Component } from './component';
// Routing
import { EntEstMngRouting } from './ent-est-mng.routing';
import { EntEstSetProdComponent } from './component/ent-est-setProd.component';
@NgModule({
    imports: [
        CommonComponentModule,
        EntEstMngRouting
    ],
    declarations: [
        EntEstMngComponent
        ,EntEstCreStep01Component
        ,EntEstCreStep04Component
        ,EntEstCreComponent,
        EntEstSetProdComponent 
    ],
    exports: [EntEstMngComponent],
    providers: []

})
export class EntEstMngModule { }