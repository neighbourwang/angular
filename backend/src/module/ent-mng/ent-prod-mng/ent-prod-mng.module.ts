import { NgModule } from '@angular/core';

// Common Componets
import { CommonComponentModule } from '../../../architecture';

// ent-prod-mng
import { EntProdMngComponent } from './component/ent-prod-mng.component';
import { EntProdCre01Component } from './component/ent-prod-cre-01.component';
import { EntProdCre02Component } from './component/ent-prod-cre-02.component';
import { EntProdCre03Component } from './component/ent-prod-cre-03.component';

//service

import { EntProdMngService } from './service/ent-prod-mng.service';


// Routing
import { EntProdMngRouting } from './ent-prod-mng.routing';

@NgModule({
    imports: [
        CommonComponentModule,
        EntProdMngRouting
    ],
    declarations: [
        EntProdMngComponent
        ,EntProdCre01Component
        ,EntProdCre02Component
        ,EntProdCre03Component
    ],
    exports: [],
    providers: [
        EntProdMngService
    ]

})
export class EntProdMngModule { }