import { NgModule } from '@angular/core';

// Common Componets
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';

// routing
import { AccountMngRouting } from './account-mng.routing';

//component 
import { AccountMngListComponent } from './component/account-mng-list.component'; 
import { AccountMngCrLocalComponent } from './component/account-mng-cr-local.component';
import { AccountMngCrAdComponent } from './component/account-mng-cr-ad.component';

//service
import { AccountMngService } from './service/account-mng.service';


@NgModule({
    imports: [
        CommonComponentModule,
        AccountMngRouting,
        PipeModule
    ],
    declarations: [
        AccountMngListComponent,
        AccountMngCrLocalComponent,
        AccountMngCrAdComponent
    ],
    exports: [
    ],
    providers: [
        AccountMngService
    ]

})
export class AccountMngModule { }
