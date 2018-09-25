import { NgModule } from '@angular/core';

import { CommonComponentModule } from '../../../architecture';
import { IpMngModule } from './ip-mng/ip-mng.module';
import { VmNSXIndexModule } from './index-nsx/index-nsx.module';
import { DlrMngModule } from './dlr-mng/dlr-mng.module';
@NgModule({
    imports:[
        CommonComponentModule,
        IpMngModule,
        VmNSXIndexModule,
        DlrMngModule
    ],
    declarations:[],
    
    exports: [
        IpMngModule,
        VmNSXIndexModule,
        DlrMngModule
    ],
    providers:[]

})

export class VmMngNsxModule{

}