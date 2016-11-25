import { NgModule } from '@angular/core';

// Common Components
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';

// pf-conn-mng
import { PfConnMngComponent, PfConnCreStep01Component, PfConnCreStep02Component, PfConnCreStep03Component,
    PfConnCreStep04Component, PfConnCreStep05Component, PfConnCreStep06Component } from './component';
import { PfConnMngService, PfConnCreStep01Service, PfConnCreStep02Service, PfConnCreStep03Service,
    PfConnCreStep04Service, PfConnCreStep05Service, PfConnCreStep06Service, StateService} from './service';

// Routing
import { PfConnMngRouting } from './pf-conn-mng.routing';

@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
        PfConnMngRouting
    ],
    declarations: [
        PfConnMngComponent,
        PfConnCreStep01Component,
        PfConnCreStep02Component,
        PfConnCreStep03Component,
        PfConnCreStep04Component,
        PfConnCreStep05Component,
        PfConnCreStep06Component
    ],
    exports: [
        PfConnMngComponent,
        PfConnCreStep01Component,
        PfConnCreStep02Component,
        PfConnCreStep03Component,
        PfConnCreStep04Component,
        PfConnCreStep05Component,
        PfConnCreStep06Component
    ],
    providers: [
        PfConnMngService,
        PfConnCreStep01Service,
        PfConnCreStep02Service,
        PfConnCreStep03Service,
        PfConnCreStep04Service,
        PfConnCreStep05Service,
        PfConnCreStep06Service,
        StateService
    ]

})
export class PfConnMngModule { }
