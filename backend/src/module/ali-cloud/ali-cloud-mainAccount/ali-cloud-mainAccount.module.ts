import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule, PipeModule} from '../../../architecture';

//Components
import { AliCloudMainAccountListComponent } from './component/ali-cloud-mainAccount-list.component';
import { AliCloudMainAccountEditComponent } from './component/ali-cloud-mainAccount-edit.component';
import { AliCloudMainAccountEnterpriseComponent } from './component/ali-cloud-mainAccount-enterprise.component';


// Routing
import { AliCloudMainAccountRouting } from './ali-cloud-mainAccount.routing';

//service
import { AliCloudMainAccountMngService} from './service/ali-cloud-mainAccount-list.service';
import { AliCloudMainAccountEditService} from './service/ali-cloud-mainAccount-edit.service';

@NgModule({
    imports: [
        CommonComponentModule,
        AliCloudMainAccountRouting,
        PipeModule
    ],
    declarations: [
        AliCloudMainAccountListComponent,
        AliCloudMainAccountEditComponent,
        AliCloudMainAccountEnterpriseComponent
    ],
    exports: [
        AliCloudMainAccountListComponent,
        AliCloudMainAccountEditComponent,
        AliCloudMainAccountEnterpriseComponent
    ],
    providers: [
        AliCloudMainAccountMngService,
        AliCloudMainAccountEditService
    ]

})
export class AliCloudMainAccountModule { }
