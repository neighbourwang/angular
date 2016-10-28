import { NgModule } from '@angular/core';
// Common Components ../../../architecture
import { CommonComponentModule } from '../../../architecture';

//Components
// import { ProdMngComponent } from './component/prod-mng.component';
// import { ProdCreComponent } from './component/prod-cre.component';

// Routing
import { AccountMngRouting } from './account-mng.routing';

//Service
// import { ProdListService } from './service/prodList.service';

@NgModule({
    imports: [
        CommonComponentModule,
        AccountMngRouting
    ],
    declarations: [
        // ProdMngComponent,
        // ProdCreComponent
    ],
    exports: [
    ],
    providers: [
        // ProdListService
    ]

})
export class ProdMngModule { }