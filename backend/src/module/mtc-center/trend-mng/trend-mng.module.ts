import { NgModule } from '@angular/core';
// Common Components ../../../architecture
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';


//Components

import { ComputeTrendComponent} from './component/compute-trend.component';
import { StoreTrendComponent} from './component/store-trend.component';


// Routing
import { TrendMngRouting } from './trend-mng.routing';

//Service
import { ComputeTrendService} from './service/compute-trend.service';
import { StoreTrendService} from './service/store-trend.service';


@NgModule({
    imports: [
       
        CommonComponentModule,
        TrendMngRouting,
        PipeModule
    ],
    declarations: [
        
        ComputeTrendComponent,
        StoreTrendComponent,
        
    ],
    exports: [
    ],
    providers: [
        
        ComputeTrendService,
        StoreTrendService,
        
    ]

})
export class TrendMngModule { }