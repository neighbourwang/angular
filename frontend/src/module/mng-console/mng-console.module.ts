import { NgModule } from '@angular/core';

// common

import { CommonComponentModule } from '../../architecture';
import { PipeModule } from '../../architecture';

//routing

import { MngConsoleRouting } from './mng-console.routing';

//component
import { MngConsoleComponent } from './component/mng-console.component';



//service

import { MngConsoleService } from './service/mng-console.service'

@NgModule({
    imports: [
        MngConsoleRouting,
        CommonComponentModule,
        PipeModule
    ],
    declarations: [
        MngConsoleComponent
    ],
    exports: [
    ],
    providers: [
        MngConsoleService
    ]

})
export class MngConsoleModule { }
