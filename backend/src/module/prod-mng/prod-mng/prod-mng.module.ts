/**
 * Created by wangyao on 2016/10/18.
 */
import { NgModule } from '@angular/core';
// Common Components ../../../architecture
import { CommonComponentModule } from '../../../architecture';

//Components
import { ProdMngComponent } from './component/prod-mng.component';
import { ProdCreComponent } from './component/prod-cre.component';
import { ProdDetailComponent } from './component/prod-detail.component';


// Routing
import { ProdMngRouting } from './prod-mng.routing';

//Service
import { ProdListService } from './service/prodList.service';
import { ProdDirListService } from "./service/prodDirList.service";
import { PostProduct } from './service/postProd.service';
import { GetProduct } from './service/getProduct.service';

@NgModule({
    imports: [
        CommonComponentModule,
        ProdMngRouting
    ],
    declarations: [
        ProdMngComponent,
        ProdCreComponent,
        ProdDetailComponent
    ],
    exports: [
    ],
    providers: [
        ProdListService,
        ProdDirListService,
        PostProduct,
        GetProduct
    ]

})
export class ProdMngModule { }
