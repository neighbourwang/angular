import { NgModule } from '@angular/core';
import { CommonComponentModule } from '../../../architecture';
import { PipeModule } from '../../../architecture';


import { TemplateMngRouting } from './template-mng.routing';

import { TemplateMngListComponent } from './components/template-mng-list.component';
import { DatabaseComponent } from './components/template-mng-database.component';
import { MiddlewareComponent } from './components/template-mng-middleware.component';

import { DatabaseService } from './service/template-mng-database.service';
import { MiddlewareService } from './service/template-mng-middleware.service';


@NgModule({
    imports:[
        CommonComponentModule,
        PipeModule,
        TemplateMngRouting
    ],
    declarations:[
        TemplateMngListComponent,
        DatabaseComponent,
        MiddlewareComponent
    ],
    exports:[],
    providers:[
        DatabaseService,
        MiddlewareService
    ]
})
export class TemplateMngModule{}