import { NgModule } from '@angular/core';

// Common Componets
import { CommonComponentModule } from '../../../architecture';

// ent-est-mng
import { EntEstCreStep04Component, EntEstMngComponent,  EntEstCreComponent, EntEstCreStep01Component } from './component';
// Routing
import { EntEstMngRouting } from './ent-est-mng.routing';

@NgModule({
    imports: [
        CommonComponentModule,
        EntEstMngRouting
    ],
    declarations: [
        EntEstMngComponent
        ,EntEstCreStep01Component
        ,EntEstCreStep04Component
        ,EntEstCreComponent
    ],
    exports: [EntEstMngComponent],
    providers: []

})
export class EntEstMngModule { }