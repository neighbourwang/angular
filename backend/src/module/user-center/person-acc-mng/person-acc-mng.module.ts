/**
 * Created by wangyao on 2016/10/18.
 */
import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule } from '../../../architecture';

//Components
import { PersonAccMngComponent } from './component/person-acc-mng.component';
import { PersonAccEditComponent } from './component/person-acc-edit.component';

// Routing
import { PersonAccMngRouting } from './person-acc-mng.routing';


//Service
import { GetPersonAccService } from './service/person-acc-get.service';

@NgModule({
    imports: [
        CommonComponentModule,
        PersonAccMngRouting
    ],
    declarations: [
        PersonAccMngComponent,
        PersonAccEditComponent
    ],
    exports: [
        PersonAccMngComponent,
        PersonAccEditComponent
    ],
    providers: [
        GetPersonAccService
    ]

})
export class PersonAccMngModule { }
