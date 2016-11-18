/**
 * Created by wangyao on 2016/10/18.
 */
import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule } from '../../../architecture';

//Components
import { VMPortMngModule } from './port-mng/port-mng.module';

@NgModule({
    imports: [
        CommonComponentModule,
        VMPortMngModule
    ],
    declarations: [
      
    ],
    exports: [
        VMPortMngModule
    ],
    providers: [

    ]

})
export class VMMngModule { }
