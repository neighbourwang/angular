import { NgModule } from '@angular/core';
import { PersonAccMngModule } from './person-acc-mng/person-acc-mng.module';

@NgModule({
    imports: [
        PersonAccMngModule
    ],
    declarations: [],
    exports: [
        PersonAccMngModule
    ],
    providers: []
})

export class UserCenterModule { }