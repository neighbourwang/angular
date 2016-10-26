/**
 * Created by junjie on 16/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ClMngIdService } from '../service/cl-mng-id.service';

import { ClMngCreStep2Service } from '../service/cl-mng-cre-step-2.service';

import { CreStep2Model } from '../model/cre-step2.model';

@Component({
    selector: 'cl-mng-cre-step-2',
    templateUrl: '../template/cl-mng-cre-step-02.component.html',
    styleUrls: [
    ],
    providers: []
})

export class ClMngCreStep2Component implements OnInit{

    constructor(
        private router : Router,
        private idService : ClMngIdService,
        private service : ClMngCreStep2Service
    ) {}

    creStep2Model : CreStep2Model = new CreStep2Model('正在同步可用区' , 0);


    ngOnInit (){
        let platFormId : String = this.idService.getPlatformId();
        console.log('init');
        //可用区同步
        this.service.zones(platFormId).then(
            res => {
                console.log(res);
                this.creStep2Model.zones = 'ok';
                this.creStep2Model.zonesStatus = true;
                this.creStep2Model.message = '同步可用区成功，正在同步存储区';
                this.creStep2Model.percentage = 20;
                this.storages();
            }
        ).catch(
            error => {
                this.creStep2Model.zones = 'fail';
                this.creStep2Model.message = '同步可用区失败';
            }
        //     function(){
        //     this.creStep2Model.synchronize = 'fail';
        //     this.creStep2Model.message = '同步可用区失败';
        // }
        )
    }

    
    private storages(){
        let platFormId : String = this.idService.getPlatformId();
        this.service.storages(platFormId).then(
            res => {
                console.log(res);
                this.creStep2Model.storages = 'ok';
                this.creStep2Model.storagesStatus = true;
                this.creStep2Model.message = '同步存储区成功，正在同步云主机规格';
                this.creStep2Model.percentage = 40;
                this.flavors();
            }
        ).catch(
            error => {
                this.creStep2Model.storages = 'fail';
                this.creStep2Model.message = '同步存储失败';
            }
        )
    }

    private flavors (){
        let platFormId : String = this.idService.getPlatformId();

        this.service.flavors(platFormId).then(
            res => {
                console.log(res);
                this.creStep2Model.flavors = 'ok';
                this.creStep2Model.flavorsStatus = true;
                this.creStep2Model.message = '同步云主机规格成功，正在同步镜像';
                this.creStep2Model.percentage = 60;
                this.images();
            }
        ).catch(
            error => {
                this.creStep2Model.flavors = 'fail';
                this.creStep2Model.message = '同步云主机规格失败';
            }
        )
    }

    private images(){
         let platFormId : String = this.idService.getPlatformId();

         this.service.images(platFormId).then(
             res => {
                 console.log(res);
                 this.creStep2Model.images = 'ok';
                 this.creStep2Model.imagesStatus = true;
                 this.creStep2Model.message = '同步镜像成功，正在同步宿主机';
                 this.creStep2Model.percentage = 80;
                 this.hosts();
             }
         ).catch(
             error => {
                 this.creStep2Model.images = 'fail';
                 this.creStep2Model.message = '同步镜像失败';
             }
         )
    }

    private hosts(){
        let platFormId : String = this.idService.getPlatformId();

        this.service.hosts(platFormId).then(
            res => {
                console.log(res);
                 this.creStep2Model.hosts = 'ok';
                 this.creStep2Model.hostsStatus = true;
                 this.creStep2Model.message = '同步宿主机成功,同步完成';
                 this.creStep2Model.percentage = 100;
                 this.creStep2Model.isNext = true;
            }
        ).catch(
            error => {
                 this.creStep2Model.hosts = 'fail';
                 this.creStep2Model.message = '同步宿主机失败';
            }
        )
    }


    next (){
        this.router.navigateByUrl("pf-mng2/cl-mng/cre-step3");
    }

    previous (){
        this.router.navigateByUrl('pf-mng2/cl-mng/cre-step1');
    }
    cancel (){
        this.router.navigateByUrl("pf-mng2/cl-mng/cl-mng");
    }
}
