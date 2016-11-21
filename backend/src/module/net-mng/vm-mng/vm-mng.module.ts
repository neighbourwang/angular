/**
 * Created by wangyao on 2016/10/18.
 */
import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule } from '../../../architecture';

//Components
import { VMPortMngModule } from './port-mng/port-mng.module';
import { IpMngModule } from './ip-mng/ip-mng.module';

@NgModule({
    imports: [
        CommonComponentModule,
        VMPortMngModule,
        IpMngModule
    ],
    declarations: [
      
    ],
    exports: [
        VMPortMngModule,
        IpMngModule
    ],
    providers: [

    ]

})
export class VMMngModule { }
