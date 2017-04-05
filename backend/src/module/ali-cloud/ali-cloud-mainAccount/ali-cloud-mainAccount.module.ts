import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule, PipeModule} from '../../../architecture';

//Components
import { AliCloudMainAccountListComponent } from './component/ali-cloud-mainAccount-list.component';

// Routing
import { AliCloudMainAccountRouting } from './ali-cloud-mainAccount.routing';

//service
import { AliCloudMainAccountMngService} from './service/ali-cloud-mainAccount-list.service'


@NgModule({
    imports: [
        CommonComponentModule,
        AliCloudMainAccountRouting,
        PipeModule
    ],
    declarations: [
        AliCloudMainAccountListComponent
    ],
    exports: [
        AliCloudMainAccountListComponent
    ],
    providers: [
        AliCloudMainAccountMngService
    ]

})
export class AliCloudMainAccountModule { }
