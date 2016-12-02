import { NgModule } from '@angular/core';

import { CommonComponentModule } from '../../../architecture';
import { IpMngModule } from './ip-mng/ip-mng.module';
import { VmDisIndexModule}from './index-dbt/index.module';

@NgModule({
    imports:[
        CommonComponentModule,
        IpMngModule,
        VmDisIndexModule
    ],
    declarations:[],
    
    exports: [
        IpMngModule,
        VmDisIndexModule
    ],
    providers:[]

})

export class VmMngDbtModule{

}