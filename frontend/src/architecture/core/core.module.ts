import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, ConnectionBackend, Jsonp } from '@angular/http';
import { UserService } from './service/user.service';
import { LayoutService } from './service/layout.service';
import { RestApiCfg } from './service/restapicfg.service';
import { RestApi } from './service/restapi.service';
import { ValidationService } from './service/validation.service';
import { SystemDictionaryService } from './service/system.dictionary.service';
import { DictService } from './service/dict-service';
@NgModule({
    imports: [
        CommonModule,
        HttpModule
    ],
    declarations: [

    ],
    exports: [
        HttpModule
    ],
    providers: [
        // ConnectionBackend,
        Jsonp,
        UserService,
        LayoutService,
        RestApiCfg,
        RestApi,
        ValidationService,
        SystemDictionaryService,
        DictService
    ]
})
export class CoreModule {
    userService:UserService;
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
   
}