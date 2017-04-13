/**
 * Created by wangyao on 2016/10/18.
 */
import { NgModule } from '@angular/core';

import { ProdDirMngModule } from './prod-dir-mng/prod-dir-mng.module';
import { ProdMngModule } from './prod-mng/prod-mng.module';
import { PhysicalProdMngModule } from './physical-product-mng/physical-prod-mng.module';
import { ProductMngComponents } from './components/product-mng.components.module'

@NgModule({
    imports: [
        ProdDirMngModule,
        ProdMngModule,
        ProductMngComponents,
        PhysicalProdMngModule
    ],
    declarations: [],
    exports: [
        ProdDirMngModule,
        ProdMngModule,
        ProductMngComponents,
        PhysicalProdMngModule
    ],
    providers: []
})

export class MainProdMngModule { }
