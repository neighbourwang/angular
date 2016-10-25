/**
 * Created by wangyao on 2016/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Config} from '../../../../architecture/components/countBar/config/config';
import { LayoutService, ValidationService, NoticeComponent, ConfirmComponent ,CountBarComponent} from '../../../../architecture';

@Component({
    selector: 'prod-dir-cre',
    templateUrl: '../template/prod-dir-cre.component.html',
    styleUrls: ['../../prod-mng/style/prod-cre.less'],
    providers: []
})

export class ProdDirCreComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        // private service: HeroService
    ) { }
    countBar:Config={
        default:100,
        step:50,
        min:0,
        max:1024,
        disabled:true,
        name:'prodCre01'
    }

    ngOnInit() {
        let proDdDirId:string;
        console.log(this.route.params)
        this.route.params.forEach((params:Params)=>{
            // let id=+params['id'];
            proDdDirId=params['id'];
            proDdDirId=params['type'];
            
            console.log(proDdDirId);
        })
    }
    

    outputValue(arg,e){
        console.log('参数'+arg,e);
        
    }
    cancel() {
        this.router.navigateByUrl('prod-mng/prod-dir-mng/prod-dir-mng', { skipLocationChange: true })
    }

    onSubmit() {
        this.router.navigateByUrl('prod-mng/prod-dir-mng/prod-dir-mng', { skipLocationChange: true })
    }



}
