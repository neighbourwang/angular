import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SpinnerComponent } from './spinner/component/spinner.component';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SpinnerComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        SpinnerComponent
    ]
})
export class CommonComponentModule { }
