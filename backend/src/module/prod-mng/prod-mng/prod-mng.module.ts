/**
 * Created by wangyao on 2016/10/18.
 */
import { NgModule } from '@angular/core';
// Common Components ../../../architecture
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';

//Components
import { ProdMngComponent } from './component/prod-mng.component';
import { ProdCreComponent } from './component/prod-cre.component';
import { ProdDetailComponent } from './component/prod-detail.component';

import { ProdMngCreStep1Component} from './component/prod-mng-cre-step-1.component';
import { ProdMngCreStep2Component} from './component/prod-mng-cre-step-2.component';
import { ProdMngCreStep3Component} from './component/prod-mng-cre-step-3.component';
import { ProdMngCreStep4Component} from './component/prod-mng-cre-step-4.component';


// Routing
import { ProdMngRouting } from './prod-mng.routing';

//Service
import { ProdListService } from './service/prodList.service';
import { ProdDirListService } from "./service/prodDirList.service";
import { PostProduct } from './service/postProd.service';
import { GetProduct } from './service/getProduct.service';
import { CreateProdStepService } from './service/createProdStep.service';

@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
        ProdMngRouting
    ],
    declarations: [
        ProdMngComponent,
        ProdCreComponent,
        ProdDetailComponent,
        ProdMngCreStep1Component,
        ProdMngCreStep2Component,
        ProdMngCreStep3Component,
        ProdMngCreStep4Component
    ],
    exports: [
    ],
    providers: [
        ProdListService,
        ProdDirListService,
        PostProduct,
        GetProduct,
        CreateProdStepService
    ]

})
export class ProdMngModule { }
