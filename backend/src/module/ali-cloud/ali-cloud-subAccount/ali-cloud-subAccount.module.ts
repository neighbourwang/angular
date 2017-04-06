import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule, PipeModule} from '../../../architecture';

//Components
import { AliCloudSubAccountListComponent } from './component/ali-cloud-subAccount-list.component';

// Routing
import { AliCloudSubAccountRouting } from './ali-cloud-subAccount.routing';

//service
import { AliCloudSubAccountMngService} from './service/ali-cloud-subAccount-mng.service'


@NgModule({
    imports: [
        CommonComponentModule,
        AliCloudSubAccountRouting,
        PipeModule
    ],
    declarations: [
        AliCloudSubAccountListComponent
    ],
    exports: [
        AliCloudSubAccountListComponent
    ],
    providers: [
        AliCloudSubAccountMngService
    ]

})
export class AliCloudSubAccountModule { }
