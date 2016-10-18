/**
 * Created by junjie on 16/10/17.
 */
import { NgModule } from '@angular/core';

import { ClMnfModule } from './cl-mng/cl-mng.module';


@NgModule({
    imports: [
        ClMnfModule
    ],
    declarations: [],
    exports: [
        ClMnfModule
    ],
    providers: []
})

export class PfMngModule2 { }
