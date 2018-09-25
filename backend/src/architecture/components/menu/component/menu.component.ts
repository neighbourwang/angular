import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MenuService } from '../service/menu.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
	selector: 'fc-menu',
	templateUrl: '../template/menu.component.html'
})

export class MenuComponent implements OnInit {
	endMenu: Array<Object>;

	active: Array<number> = new Array<number>();
	@Output() navOnClick=new EventEmitter();

	constructor(
		private router: Router,
		private service: MenuService) 
	{ 
		 router.events.subscribe(val => {
            if(val instanceof NavigationStart){
                this.urlChanged(val);
            }
        });
	}

	ngOnInit() {
		this.setMenu();
		// this.router.navigateByUrl("user-center/account-mng/account-mng-list");
	}

	setMenu() {
		this.service.getMenuList().then(menu => {
			this.endMenu = menu;
		})
	}

	// 一级菜单事件处理, 切换菜单的展开/关闭
	top1MenuClick(top1Idx: number) {
		if (this.endMenu[top1Idx]["isOpen"]) {
			this.endMenu[top1Idx]["isOpen"] = false;
		} else {
			this.endMenu[top1Idx]["isOpen"] = true;
		}
		for (let i = 0; i < this.endMenu.length; ++i) {
			if(top1Idx !== i && this.endMenu[i]["isOpen"])  this.endMenu[i]["isOpen"] = false;
		}
	}

	// 二级菜单事件处理, 切换菜单的展开/关闭
	top2MenuClick(top1Idx: number, top2Idx: number) {
		if (this.endMenu[top1Idx]["top2_menu"][top2Idx]["isOpen"]) {
			this.endMenu[top1Idx]["top2_menu"][top2Idx]["isOpen"] = false;
		} else {
			this.endMenu[top1Idx]["top2_menu"][top2Idx]["isOpen"] = true;
		}
	}

	// 二级菜单事件处理, 切换菜单的活动/非活动
	top2MenuActive(top1Idx: number, top2Idx: number) {
		this.deactive();

		this.active[0] = top1Idx;
		this.active[1] = top2Idx;

		this.endMenu[top1Idx]["top2_menu"][top2Idx]["isActive"] = true;
	}

	// 三级菜单事件处理, 切换菜单的活动/非活动
	top3MenuActive(top1Idx: number, top2Idx: number, top3Idx: number) {
		this.deactive();

		this.active[0] = top1Idx;
		this.active[1] = top2Idx;
		this.active[2] = top3Idx;

		this.endMenu[top1Idx]["top2_menu"][top2Idx]["top3_menu"][top3Idx]["isActive"] = true;
	}

	// 取消当前活动菜单
	deactive() {
		if (this.active.length == 2) {
			this.endMenu[this.active[0]]["top2_menu"][this.active[1]]["isActive"] = false;
		} else if (this.active.length == 3) {
			this.endMenu[this.active[0]]["top2_menu"][this.active[1]]["top3_menu"][this.active[2]]["isActive"] = false;
		}

		this.active = new Array<number>();
	}

	lastUrl: string;
	urlChanged(val) {
        if(val.url === this.lastUrl) return;
        
        this.lastUrl = val.url;
        this.navOnClick.emit(val);
    }
}

