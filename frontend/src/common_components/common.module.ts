import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SpinnerComponent } from './spinner/component/spinner.component';
import { PaginationComponent } from './pagination/component/pagination.component';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SpinnerComponent,
        PaginationComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        SpinnerComponent,
        PaginationComponent
    ]
})
export class CommonComponentModule { }
