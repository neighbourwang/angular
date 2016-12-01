import { NgModule } from '@angular/core';

import { CommonComponentModule } from '../../../architecture';
import { IpMngModule } from './ip-mng/ip-mng.module';

@NgModule({
    imports:[
        CommonComponentModule,
        IpMngModule
    ],
    declarations:[],
    exports:[
        IpMngModule
    ],
    providers:[]

})

export class VmMngDbtModule{

}