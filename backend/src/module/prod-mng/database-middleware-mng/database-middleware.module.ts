import { NgModule } from '@angular/core';
// Common Components ../../../architecture
import { CommonComponentModule,PipeModule } from '../../../architecture';

import { DatabaseMiddlewareServiceCreComponent } from './components/database-middleware-service-cre.component';
import { DatabaseMiddlewareRouting } from './database-middleware.routing'
import { DatabaseMiddlewareService } from './service/database-middleware-service.service';
import { DatabaseMiddlewareProdService } from './service/database-middleware-prod.service';

import { DatabaseMiddlewareProdCreStep1Component } from './components/database-middleware-prod-cre-step1.component'
import { DatabaseMiddlewareProdCreStep2Component } from './components/database-middleware-prod-cre-step2.component'
import { DatabaseMiddlewareProdCreStep3Component } from './components/database-middleware-prod-cre-step3.component'
import { DatabaseMiddlewareProdCreStep4Component } from './components/database-middleware-prod-cre-step4.component'

@NgModule({
    imports:[
        CommonComponentModule,
        DatabaseMiddlewareRouting,
        PipeModule
    ],
    declarations:[
        DatabaseMiddlewareServiceCreComponent,
        DatabaseMiddlewareProdCreStep1Component,
        DatabaseMiddlewareProdCreStep2Component,
        DatabaseMiddlewareProdCreStep3Component,
        DatabaseMiddlewareProdCreStep4Component        
    ],
    providers:[
        DatabaseMiddlewareService,
        DatabaseMiddlewareProdService
    ],
    exports:[]
})
export class DatabaseMiddlewareModule{

}