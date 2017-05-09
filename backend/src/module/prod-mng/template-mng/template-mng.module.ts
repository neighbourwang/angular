import { NgModule } from '@angular/core';
import { CommonComponentModule } from '../../../architecture';
import { PipeModule } from '../../../architecture';


import { TemplateMngRouting } from './template-mng.routing';

import { TemplateMngListComponent } from './components/template-mng-list.component'
import { TemplateMngCreComponent } from './components/template-mng-cre.component'


@NgModule({
    imports:[
        CommonComponentModule,
        PipeModule,
        TemplateMngRouting
    ],
    declarations:[
        TemplateMngListComponent,
        TemplateMngCreComponent
    ],
    exports:[],
    providers:[

    ]
})
export class TemplateMngModule{}