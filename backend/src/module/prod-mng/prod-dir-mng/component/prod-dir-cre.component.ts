/**
 * Created by wangyao on 2016/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Config } from '../../../../architecture/components/countBar/config/config';
import { LayoutService, ValidationService, NoticeComponent, ConfirmComponent, CountBarComponent } from '../../../../architecture';

//service
import { ProdDirDetailService } from '../service/prod-dir-detail.service';
//model
import { ProdDir } from '../model/prodDir.model';

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
        private ProdDirDetailService: ProdDirDetailService,
        
        private LayoutService: LayoutService
    ) { }
    countBar: Config = {
        default: 100,
        step: 50,
        min: 0,
        max: 1024,
        disabled: true,
        name: 'prodCre01'
    }
    prodDir: ProdDir;
    ngOnInit() {
        let prodDirId: string;
        let prodDirType: string;
        console.log(this.route.params)
        this.route.params.forEach((params: Params) => {
            // let id=+params['id'];
            prodDirId = params['id'];
            prodDirType = params['type'];

        })
        if (prodDirType == 'new') {

        } else {
            this.getProdDirDetail(prodDirId);
        }
    }

    getProdDirDetail(id) {
        this.ProdDirDetailService.getVmProdDirDetail(id).then(
            response => {
                console.log(response);
                if (response && 100 == response.resultCode) {
                    let resultContent = response.resultContent;
                } else {

                }
                this.LayoutService.hide();
            }
        ).catch(err => {
            console.error(err);
        })


    }

    outputValue(arg, e) {
        console.log('参数' + arg, e);
    }
    cancel() {
        this.router.navigateByUrl('prod-mng/prod-dir-mng/prod-dir-mng', { skipLocationChange: true })
    }

    onSubmit() {
        this.router.navigateByUrl('prod-mng/prod-dir-mng/prod-dir-mng', { skipLocationChange: true })
    }


}
