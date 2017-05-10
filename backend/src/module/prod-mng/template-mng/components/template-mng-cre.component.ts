import { Component,ViewChild,OnInit } from '@angular/core';
import { Router , ActivatedRoute, Params} from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent} from '../../../../architecture';
import { Validation, ValidationRegs } from '../../../../architecture';



@Component({
    templateUrl:"../template/template-mng-cre.component.html",    
})
export class TemplateMngCreComponent implements OnInit{
    constructor(
        private router:Router,
        private route:ActivatedRoute,
        private LayoutService: LayoutService,
        // private service: DatabaseMiddlewareProdService,
        private v: Validation,
    ) {
        this.v.result = {}
    }

    @ViewChild('notice')
    notice:NoticeComponent;

    ngOnInit(){
        // this.router.params.forEach((params: Params) => {
        //     console.log();
        // })
    }
    onSubmit(){
        this.router.navigateByUrl('prod-mng/template-mng/template-list', { skipLocationChange: true })
        
    }
    cancel(){
        this.router.navigateByUrl('prod-mng/template-mng/template-list', { skipLocationChange: true }) 
    }
    ccf(){

    }
}