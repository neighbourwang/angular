import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule } from '../../../architecture';

// pf-conn-mng
import { PfConnMngComponent } from './component/pf-conn-mng.component';
import { PfConnMngService } from './service/pf-conn-mng.service';

import { PfConnCreStep01Component } from './component/pf-conn-cre-step-01.component';
import { PfConnCreStep01Service } from './service/pf-conn-cre-step-01.service';

import { PfConnCreStep02Component } from './component/pf-conn-cre-step-02.component';
import { PfConnCreStep02Service } from './service/pf-conn-cre-step-02.service';

import { PfConnCreStep03Component } from './component/pf-conn-cre-step-03.component';
import { PfConnCreStep03Service } from './service/pf-conn-cre-step-03.service';

import { PfConnCreStep04Component } from './component/pf-conn-cre-step-04.component';
import { PfConnCreStep04Service } from './service/pf-conn-cre-step-04.service';

import { PfConnCreStep05Component } from './component/pf-conn-cre-step-05.component';
import { PfConnCreStep05Service } from './service/pf-conn-cre-step-05.service';

import { PfConnCreStep06Component } from './component/pf-conn-cre-step-06.component';
import { PfConnCreStep06Service } from './service/pf-conn-cre-step-06.service';

// Routing
import { PfConnMngRouting } from './pf-conn-mng.routing';

@NgModule({
    imports: [
        CommonComponentModule,
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
        PfConnCreStep06Service
    ]

})
export class PfConnMngModule { }
