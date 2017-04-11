import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule, PipeModule} from '../../../architecture';

//Components
import { AliCloudSubAccountListComponent } from './component/ali-cloud-subAccount-list.component';
import { AliCloudSubAccountEditComponent } from './component/ali-cloud-subAccount-edit.component';
import { AliCloudSubAccountEnterpriseComponent } from './component/ali-cloud-subAccount-enterprise.component';

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
        AliCloudSubAccountListComponent,
        AliCloudSubAccountEditComponent,
        AliCloudSubAccountEnterpriseComponent
    ],
    exports: [
        AliCloudSubAccountListComponent,
        AliCloudSubAccountEditComponent,
        AliCloudSubAccountEnterpriseComponent
    ],
    providers: [
        AliCloudSubAccountMngService
    ]

})
export class AliCloudSubAccountModule { }
