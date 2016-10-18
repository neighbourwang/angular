/**
 * Created by wangyao on 2016/10/18.
 */
import { NgModule } from '@angular/core';

import { ProdDirMngModule } from './prod-dir-mng/prod-dir-mng.module';
import { ProdMngModule } from './prod-mng/prod-mng.module';


@NgModule({
    imports: [
        ProdDirMngModule,ProdMngModule
    ],
    declarations: [],
    exports: [
        ProdDirMngModule,ProdMngModule
    ],
    providers: []
})

export class MainProdMngModule { }
