/**
 * Created by junjie on 16/10/17.
 */
import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule } from '../../../architecture';

//Components

import { ClMngListComponent } from './component/cl-mng-list.component';

// Routing
import { ClMngRouting } from './cl-mng.routing';

@NgModule({
    imports: [
        CommonComponentModule,
        ClMngRouting
    ],
    declarations: [
        ClMngListComponent
    ],
    exports: [
    ],
    providers: [
    ]

})
export class ClMnfModule { }
