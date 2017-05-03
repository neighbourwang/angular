import { NgModule } from '@angular/core';
// Common Components ../../../architecture
import { CommonComponentModule,PipeModule } from '../../../architecture';

import { ManagerServeServiceCreComponent } from './components/manager-serve-service-cre.component';
import { ManagerServeRouting } from './manager-serve.routing'
import { ManagerServeServiceService } from './service/manager-serve-service.service';
import { ManagerServeProdService } from './service/manager-serve-prod.service';

import { ManagerServeProdCreStep1Component } from './components/manager-serve-prod-cre-step1.component'
import { ManagerServeProdCreStep2Component } from './components/manager-serve-prod-cre-step2.component'
import { ManagerServeProdCreStep3Component } from './components/manager-serve-prod-cre-step3.component'
import { ManagerServeProdCreStep4Component } from './components/manager-serve-prod-cre-step4.component'

@NgModule({
    imports:[
        CommonComponentModule,
        ManagerServeRouting,
        PipeModule
    ],
    declarations:[
        ManagerServeServiceCreComponent,
        ManagerServeProdCreStep1Component,
        ManagerServeProdCreStep2Component,
        ManagerServeProdCreStep3Component,
        ManagerServeProdCreStep4Component        
    ],
    providers:[
        ManagerServeServiceService,
        ManagerServeProdService
    ],
    exports:[]
})
export class ManagerServeModule{

}