import { NgModule } from '@angular/core';

import { CommonComponentModule } from '../../../architecture';
import { IpMngModule } from './ip-mng/ip-mng.module';
import { VmDisIndexModule}from './index-dbt/index.module';
import { VMPortMngModule } from './port-mng/port-mng.module';

@NgModule({
    imports:[
        CommonComponentModule,
        IpMngModule,
        VmDisIndexModule,
        VMPortMngModule
    ],
    declarations:[],
    
    exports: [
        IpMngModule,
        VmDisIndexModule,
        VMPortMngModule
    ],
    providers:[]

})

export class VmMngDbtModule{

}