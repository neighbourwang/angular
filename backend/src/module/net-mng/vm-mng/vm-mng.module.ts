/**
 * Created by wangyao on 2016/10/18.
 */
import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule } from '../../../architecture';
import { PipeModule } from '../../../architecture';

//Components
import { VMPortMngModule } from './port-mng/port-mng.module';
import { IpMngModule } from './ip-mng/ip-mng.module';
import { VmwareModule } from './vm-mng/vmware.module';
@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
        VMPortMngModule,
        IpMngModule,
        VmwareModule
    ],
    declarations: [
      
    ],
    exports: [
        VMPortMngModule,
        IpMngModule,
        VmwareModule
    ],
    providers: [

    ]

})
export class VMMngModule { }
