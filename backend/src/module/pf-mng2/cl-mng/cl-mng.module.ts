/**
 * Created by junjie on 16/10/17.
 */
import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule } from '../../../architecture';

//Components
import { ClMngListComponent } from './component/cl-mng-list.component';

import { ClMngCreStep1Component } from './component/cl-mng-cre-step-1.component';

import { ClMngCreStep2Component} from './component/cl-mng-cre-step-2.component';

import { ClMngCreStep3Component } from './component/cl-mng-cre-step-3.component';

import { ClMngCreStep4Component } from './component/cl-mng-cre-step-4.component';

import { ClMngCreStep5Component } from './component/cl-mng-cre-step-5.component';

import { ClMngCreStep6Component } from './component/cl-mng-cre-step-6.component';


// Routing
import { ClMngRouting } from './cl-mng.routing';

//Service
import { ClMngListService } from './service/cl-mgn-list.service';

import { ClMngCreStep1Service } from './service/cl-mng-cre-step-1.service';

@NgModule({
    imports: [
        CommonComponentModule,
        ClMngRouting
    ],
    declarations: [
        ClMngListComponent,
        ClMngCreStep1Component,
        ClMngCreStep2Component,
        ClMngCreStep3Component,
        ClMngCreStep4Component,
        ClMngCreStep5Component,
        ClMngCreStep6Component
    ],
    exports: [
    ],
    providers: [
        ClMngListService,
        ClMngCreStep1Service
    ]

})
export class ClMnfModule { }
