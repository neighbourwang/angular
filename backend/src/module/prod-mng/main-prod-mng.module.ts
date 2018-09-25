/**
 * Created by wangyao on 2016/10/18.
 */
import { NgModule } from '@angular/core';

import { ProdDirMngModule } from './prod-dir-mng/prod-dir-mng.module';
import { ProdMngModule } from './prod-mng/prod-mng.module';
import { PhysicalProdMngModule } from './physical-product-mng/physical-prod-mng.module';
import { ProductMngComponents } from './components/product-mng.components.module';
import { ManagerServeModule } from './manager-serve/manager-serve.module';
import { DatabaseMiddlewareModule } from './database-middleware-mng/database-middleware.module';
import { TemplateMngModule } from './template-mng/template-mng.module';

@NgModule({
    imports: [
        ProdDirMngModule,
        ProdMngModule,
        ProductMngComponents,
        PhysicalProdMngModule,
        ManagerServeModule,
        DatabaseMiddlewareModule,
        TemplateMngModule
    ],
    declarations: [],
    exports: [
        //ProdDirMngModule,
        //ProdMngModule,
        //ProductMngComponents,
        //PhysicalProdMngModule,
        //ManagerServeModule,
        //DatabaseMiddlewareModule,
        //TemplateMngModule        
    ],
    providers: []
})

export class MainProdMngModule { }
