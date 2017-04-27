import { NgModule } from '@angular/core';
// Common Components ../../../architecture
import { CommonComponentModule } from '../../../architecture';

import { ManagerServeServiceCreComponent } from './components/manager-serve-service-cre.component';
import { ManagerServeRouting } from './manager-serve.routing'
import { ManagerServeServiceService } from './service/manager-serve-service.service';

@NgModule({
    imports:[
        CommonComponentModule,
        ManagerServeRouting
    ],
    declarations:[
        ManagerServeServiceCreComponent        
    ],
    providers:[
        ManagerServeServiceService
    ],
    exports:[]
})
export class ManagerServeModule{

}