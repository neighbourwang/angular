
import { Component,ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup } from '@angular/forms';

import { LayoutService, NoticeComponent, ConfirmComponent, CustomValidators } from '../../../../architecture';
import { cartListService } from '../service/cart-list.service'

import { VmList, HandleVm } from '../model/vm-list.model';

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

	testArr: Array<any>;

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private service: cartListService
	) {
	}
	ngOnInit() {

		setTimeout(() => {
			console.log(this)
			this.testArr = [1,2,3,4,5,5,6,6,6,66,4,4];
		},5000)

		this.testArr = [1,2,3,4,5];

		// var password = new FormControl('', Validators.required);
	 //    var certainPassword = new FormControl('');

	 //    this.form = new FormGroup({
	 //      passwordGroup: new FormGroup({
	 //        password: password,
	 //        certainPassword: certainPassword
	 //      }, CustomValidators.equalTo)
	 //    });
		
	}
	

	goTo(url : string) {
		this.router.navigateByUrl(url);
	}

	outputValue(e){
	    console.log(e)
	}

	onSubmit(e){
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