/**
 * Created by junjie on 16/10/17.
 */
import { NgModule } from '@angular/core';

import { ClMnfModule } from './cl-mng/cl-mng.module';

import { PlatformComponents } from './components/platform-components.module';

@NgModule({
    imports: [
        ClMnfModule,
        PlatformComponents
    ],
    declarations: [],
    exports: [
        ClMnfModule
    ],
    providers: []
})

export class PfMngModule2 { }
