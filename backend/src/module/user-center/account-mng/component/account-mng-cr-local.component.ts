import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent, ValidationService } from "../../../../architecture";

import { Validation, ValidationRegs } from '../../../../architecture';

//service
import { AccountMngService } from "../service/account-mng-list.service";

//model
import { Account } from "../model/account"

@Component({
    selector: "account-mng-cr-local",
    templateUrl: "../template/account-mng-cr-local.component.html",
    styleUrls: ['../style/account-mng.style.less'],
    providers: []
})
export class AccountMngCrLocal implements OnInit {
    constructor(
        private service: AccountMngService,
        private layoutservice: LayoutService,
        private router: Router,
        private v: Validation,
        private route: ActivatedRoute,
        private validService: ValidationService,
    ) {
    }

    @ViewChild('notice')
    notice: NoticeComponent;
    //判断是否是创建 还是 编辑
    isCreate = false;
    // 标题 根据 isCreate 修改
    title = "";
    // 按钮的名字 根据 isCreate 修改
    btnTitle = "";

    page = 0;
    size = 10;

    role = new Array<any>();
    org = new Array<any>();

    loadMode = true;

    accountId: string;
    account: Account = new Account();
    ngOnInit() {
        // this.role=[
        //     {displayValue:'bt1',selected:false},
        //      {displayValue:'bt1',selected:true},
        //       {displayValue:'bt1',selected:false},
        //        {displayValue:'bt1',selected:false},
        // ]
        console.log(this.route.params, 2123123123);
        this.route.params.forEach((params: Params) => {
            if (params["id"]) {
                console.log("params", params["id"]);
                this.accountId = params["id"];

                //编辑
                this.isCreate = false;
                this.title = "USER_CENTER.EDIT_ACCOUNT"; //USER_CENTER.EDIT_ACCOUNT=>编辑帐号 

                this.btnTitle = "HOST_OPENSTACK_MNG.EDIT"; //HOST_OPENSTACK_MNG.EDIT=>编辑 

                this.layoutservice.show();
                this.service.getRole()
                    .then(
                    role => {
                        this.role = role.resultContent;
                        this.role.forEach(ele => ele.selected = false)
                        console.log('role', this.role);
                    }
                    )
                    .then(
                    role => {
                        return this.service.getOrg(this.page, this.size)
                            .then(org => {
                                this.org = org.resultContent;
                            });
                    }
                    )
                    .then(
                    res => {
                        this.service.getAccountById(params["id"])
                            .then(
                            res => {
                                this.account = res.resultContent;
                                console.log(this.account);
                                for (let role of this.role) {
                                    for (let account of this.account.roles) {
                                        if (role.id == account.id) {
                                            role.selected = true;
                                            continue;
                                        }
                                    }
                                }
                                console.log('role', this.role);
                                for (let org of this.org) {
                                    for (let organizations of this.account.organizations) {
                                        if (org.id == organizations.id) {
                                            org.selected = true;
                                            break;
                                        }
                                    }
                                }
                            }
                            );
                        this.layoutservice.hide();
                    }
                    )
                    .catch(
                    err => {
                        console.error(err);
                        this.layoutservice.hide();
                    }
                    );
            } else {
                //创建
                this.isCreate = true;
                this.title = "USER_CENTER.CREATE_ACCOUNT"; //USER_CENTER.CREATE_ACCOUNT=>创建帐号 

                this.btnTitle = "NET_MNG_VM_IP_MNG.CREATE"; //NET_MNG_VM_IP_MNG.CREATE=>创建 

                this.layoutservice.show();
                this.service.getRole()
                    .then(
                    role => {
                        this.role = role.resultContent;
                    }
                    )
                    .then(
                    role => {
                        return this.service.getOrg(this.page, this.size)
                            .then(org => {
                                this.org = org.resultContent;
                                this.layoutservice.hide();
                            });
                    }
                    )
                    .catch(
                    err => {
                        console.error(err);
                        this.layoutservice.hide();

                    }
                    );
            }
        });
    }
    //验证账号唯一性
    loginNameIsOnly: boolean = true;
    isEmail: boolean = true;
    accountOnlyValid(val) {
        console.log(val);
        if (val) {
            if (this.validService.isEmail(val)) {
                this.isEmail = true;
                this.service.loginNameValid(val).then(res => {
                    console.log(res);
                    if (res.resultCode == '10001001') {
                        this.loginNameIsOnly = false;
                    } else {
                        this.loginNameIsOnly = true;
                    }
                }).catch(err => {
                    console.error(err);
                })
            } else {
                this.isEmail = false;
            }
        }
    }
    //验证手机号
    isPhone: boolean = true;
    phoneValid(val) {
        if (val) {
            this.isPhone =
                this.validService.isMoblie(val) ? true : false;
        }
        console.log('phone', this.isPhone)
    }
    //创建
    create() {
        console.log(this.account);
        // if(!this.account.userName){
        //     this.notice.open('COMMON.OPERATION_ERROR','请输入姓名'); //COMMON.OPERATION_ERROR=>操作错误 

        //     return
        // }
        // if(!this.account.loginName){
        //     this.notice.open('COMMON.OPERATION_ERROR','请输入账号'); //COMMON.OPERATION_ERROR=>操作错误 

        //     return
        // }
        //  if(!this.account.phone){
        //     this.notice.open('COMMON.OPERATION_ERROR','USER_CENTER.INPUT_PHONE_NUMBER'); //USER_CENTER.INPUT_PHONE_NUMBER=>请输入电话  //COMMON.OPERATION_ERROR=>操作错误 


        //     return
        // }        
        if (this.account.roles.length < 1) {
            this.notice.open('COMMON.OPERATION_ERROR', 'USER_CENTER.SELECT_ROLE'); //COMMON.OPERATION_ERROR=>操作错误  //USER_CENTER.SELECT_ROLE=>请选择角色 


            return
        }
        if (this.account.organizations.length < 1) {
            this.notice.open('COMMON.OPERATION_ERROR', 'USER_CENTER.SELECT_ORG'); //COMMON.OPERATION_ERROR=>操作错误  //USER_CENTER.SELECT_ORG=>请选择组织机构 


            return
        }
        if (!this.isCreate) {
            this.layoutservice.show()
            this.service.editAccount(this.accountId, this.account)
                .then(
                res => {
                    console.log(res);
                    this.layoutservice.hide();
                    this.router.navigateByUrl('user-center/account-mng/account-mng-list');
                }
                )
                .catch(
                err => {
                    this.layoutservice.hide();
                    console.error(err);
                }
                );
        } else {
            this.layoutservice.show()
            this.service.createAccount(this.account)
                .then(
                res => {
                    console.log(res);
                    this.layoutservice.hide();
                    this.router.navigateByUrl('user-center/account-mng/account-mng-list');
                }
                )
                .catch(
                err => {
                    console.error(err);
                    this.layoutservice.hide();
                }
                );
        }
    }

    //点击更多
    loadModeOrg() {
        if (this.loadMode) {
            this.size += 10;
            this.service.getOrg(this.page, this.size)
                .then(
                org => {
                    this.org = org.resultContent;
                    for (let org of this.org) {
                        for (let organizations of this.account.organizations) {
                            if (org.id == organizations.id) {
                                org.selected = true;
                                break;
                            }
                        }
                    }
                    if (org.pageInfo.totalRecords <= this.size) {
                        this.loadMode = false;
                    }
                }
                );
        } else {
            console.error("没有更多");
        }

    }

    isLeader() {
        this.account.isLeader =
            this.account.isLeader == true ? false : true;
        // if (this.account.isLeader == 0) {
        //     this.account.isLeader = 1;
        // } else {
        //     this.account.isLeader = 0;
        // }
    }

    addRole(item, idx) {

        item.selected = !item.selected
        // this.role[idx].selected=!this.role[idx].selected;
        console.log(item);
        // const obj = {
        //     id: item
        // };
        // if (this.account.roles.includes(obj)) {
        //     this.remove(this.account.roles, obj);
        // } else {
        //     this.account.roles.push(obj);
        // }
        this.account.roles = this.role.filter((ele) => {
            if (ele.selected == true) {
                return ele;
            }
        })
        console.log(this.account.roles);
    }

    addOrg(item) {
        // const obj = {
        //     id: item.id,
        //     name: item.name
        // };
        // if (!(this.account.organizations.includes(obj))) {
        //     this.account.organizations[0] = obj;
        // }
        this.org.forEach(ele => ele.selected = false)
        item.selected = true;
        // item.selected=!item.selected;
        this.account.organizations = this.org.filter((ele) => {
            if (ele.selected == true) {
                return ele;
            }
        })
        console.log(this.account.organizations);
    }

    remove(arr, obj) {
        for (let i = 0; i < arr.length; i++) {
            let temp = arr[i];
            if (!isNaN(obj)) {
                temp = i;
            }
            if (temp == obj) {
                for (let j = i; j < arr.length; j++) {
                    arr[j] = arr[j + 1];
                }
                arr.length = arr.length - 1;
            }
        }
    }
    //取消
    cancel() {
        this.router.navigateByUrl('user-center/account-mng/account-mng-list');
    }
    nof() { }

    //表单验证
    checkForm(key?:string) {
		let regs:ValidationRegs = {  //regs是定义规则的对象
			// email: [this.email, [this.v.isEmail], "Email输入不正确"], 
  			//验证email
			// baseInput: [this.baseInput, [this.v.isBase, this.v.isUnBlank], "不能包含特殊字符"],
  			//两次验证[基础的验证不能包含特殊字符，不能为空]
			// phone: [this.phone, [this.v.isMoblie], "手机号码输入不正确"],
  			//手机号码验证
			// password: [this.password, [this.v.isPassword, this.v.lengthRange(8, 16)], "密码输入不正确"],
  			//两次验证[密码验证，8-16个字]
			// passwordCheck: [this.passwordCheck, [this.v.equalTo(this.password)], "两次密码输入不一致"],
  			//再次输入密码验证
			userName: [this.account.userName, [this.v.isInstanceName, this.v.isBase,this.v.isUnBlank], "用户名输入格式不正确"],
  			//云主机名称验证
			// numberRange: [this.numberRange, [this.v.range(10, 80)], "数字范围不对"],
  			//数字范围10-80
		}
        console.log(this.v.check(key, regs));
		return this.v.check(key, regs);
	}
}