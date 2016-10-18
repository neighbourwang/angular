import { NgModule } from '@angular/core';

// Common Componets
import { CommonComponentModule } from '../../../architecture';

// ent-est-mng
import { EntEstCreStep04Component, EntEstMngComponent, EntEstCreStep02Component, EntEstCreStep03Component, EntEstCreComponent, EntEstCreStep01Component } from './component';
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
        ,EntEstCreStep02Component
        ,EntEstCreStep03Component
        ,EntEstCreStep04Component
        ,EntEstCreComponent
    ],
    exports: [EntEstMngComponent],
    providers: []

})
export class EntEstMngModule { }