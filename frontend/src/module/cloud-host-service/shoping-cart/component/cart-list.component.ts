
import { Component,ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup } from '@angular/forms';

import { LayoutService, NoticeComponent, ConfirmComponent, Validation } from '../../../../architecture';
import { cartListService } from '../service/cart-list.service'

@Component({
	selector: 'cart-list',
	templateUrl: '../template/cart-list.component.html',
	styleUrls: ['../style/cart-list.less'],
})

export class cartListComponent implements OnInit {

	@ViewChild('confirm')
	private confirmDialog: ConfirmComponent;

	@ViewChild('notice')
	private noticeDialog: NoticeComponent;
  
	modalTitle: string = '';
	modalMessage: string = '';
	modalOKTitle: string = '';

	fieldname:string = '';

	v : Validation;
	@ViewChild('heroForm') heroForm;

	testArr: Array<any>;

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private service: cartListService
	) {
		this.v = new Validation();
		console.log(this.v)
	}
	ngOnInit() {
		
	}

	onDateChanged(event:any) {
        console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    }

    onValueChanged(data){
    	console.log(this.heroForm)
    }

	goTo(url : string) {
		this.router.navigateByUrl(url);
	}

	outputValue(e){
	    console.log(e)
	}

	// 警告框相关
	showNotice(title: string, msg: string) {
	    this.modalTitle = title;
	    this.modalMessage = msg;

	    this.noticeDialog.open();
	}

	modalAction(btnType: number) {
	    if (btnType == 0) {
	      this.noticeDialog.close();
	      return;
	    }
	    
	    this.noticeDialog.close()
	    this.confirmDialog.close();
	}
	// 警告框相关结束

	
}