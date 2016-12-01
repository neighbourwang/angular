import { NgModule } from '@angular/core';

import { CommonComponentModule } from '../../../architecture';
import { VmDisIndexModule}from './index/index.module';

@NgModule({
    imports:[
        CommonComponentModule,
        VmDisIndexModule
    ],
    declarations:[],
    exports: [
        VmDisIndexModule
    ],
    providers:[]

})

export class VmMngDbtModule{

}