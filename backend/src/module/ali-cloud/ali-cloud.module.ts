import { NgModule } from '@angular/core';

// Common Componets
import { CommonComponentModule } from '../../architecture';
import { PipeModule } from '../../architecture';

// Routing
import { AliCloudRouting } from './ali-cloud.routing';

//component
import { AliCloudMianAccountList } from './component/ali-cloud-mainAccount-list.component';

@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
        AliCloudRouting
    ],
    declarations: [
       AliCloudMianAccountList,
    
        
    ],
    exports: [],
    providers: []

})
export class AliCloudModule { }