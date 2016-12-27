import { NgModule } from '@angular/core';

import { CommonComponentModule } from '../../../architecture';
import { IpMngModule } from './ip-mng/ip-mng.module';
import { VmNSXIndexModule } from './index-nsx/index-nsx.module';
@NgModule({
    imports:[
        CommonComponentModule,
        IpMngModule,
        VmNSXIndexModule
    ],
    declarations:[],
    
    exports: [
        IpMngModule,
        VmNSXIndexModule
    ],
    providers:[]

})

export class VmMngNsxModule{

}