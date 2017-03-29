import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { CommonModule } from '@angular/common';

import { TranslateService ,TranslateLoader , TranslateStaticLoader, TranslateModule} from 'ng2-translate';

// import { TranslateEN } from '../translate/translateEN';
// import { TranslateCN } from '../translate/translateCN';

@NgModule({
    imports: [
      HttpModule,
      CommonModule,
      TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, '/architecture/translate', '.json'),
            deps: [Http]
        })
    ],
    exports: [
      CommonModule,
      TranslateModule
    ]
})
export class SharedModule {
    
     constructor(private translate: TranslateService) {
                  
        // translate.setTranslation('EN',  TranslateEN);
        // translate.setTranslation('CN',  TranslateCN);
        const languageCode = window.localStorage["languageCode"] || "cn";  

        translate.addLangs(["EN", "CN"]);
        translate.use(languageCode.toLocaleUpperCase());

        // let browserLang: string = translate.getBrowserLang();
        // translate.use(browserLang.match(/EN|CN/) ? browserLang : 'CN');
    }
}
