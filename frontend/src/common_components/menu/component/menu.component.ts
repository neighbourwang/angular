import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'fc-menu',
    templateUrl: '../template/menu.component.html'
})

export class MenuComponent implements OnInit {
    endMenu: Array<Object>;

    active: Array<number> = new Array<number>();

    ngOnInit() {
        this.endMenu = menu;
    }

    // 一级菜单事件处理, 切换菜单的展开/关闭
    top1MenuClick(top1Idx: number) {
        if (this.endMenu[top1Idx]["isOpen"]) {
            this.endMenu[top1Idx]["isOpen"] = false;
        } else {
            this.endMenu[top1Idx]["isOpen"] = true;
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

}

// Frontend Menu Definition
const menu: Array<any> = [
    {
        "label": "产品与服务",
        "isOpen": true,
        "icon": "icon-product-and-service",
        "top2_menu": [
            {
                "label": "云主机",
                "isOpen": true,
                "routing": "",
                "top3_menu": [
                    {
                        "label": "概览",
                        "routing": ""
                    },
                    {
                        "label": "订购",
                        "routing": "prod_and_svc/cloud_host/cloud_host_order"
                    },
                    {
                        "label": "实例列表",
                        "routing": "prod_and_svc/cloud_host/cloud_host_ins_list"
                    },
                ]
            },
            {
                "label": "云硬盘",
                "isOpen": false,
                "routing": ""
            }
        ]
    },
    {
        "label": "用户中心",
        "isOpen": true,
        "icon": "icon-user-center",
        "top2_menu": [
            {
                "label": "账号管理",
                "isOpen": false,
                "routing": ""
            },
            {
                "label": "费用中心",
                "isOpen": false,
                "routing": ""
            }
        ]
    },
    {
        "label": "管理员中心",
        "isOpen": true,
        "icon": "icon-administrator-center",
        "top2_menu": [
            {
                "label": "账户管理",
                "isOpen": false,
                "routing": ""
            },
            {
                "label": "部门管理",
                "isOpen": false,
                "routing": ""
            },
            {
                "label": "权限管理",
                "isOpen": false,
                "routing": ""
            },
            {
                "label": "价格设置",
                "isOpen": false,
                "routing": ""
            },
            {
                "label": "配额管理",
                "isOpen": false,
                "routing": ""
            },
            {
                "label": "费用中心",
                "isOpen": false,
                "routing": ""
            }
        ]
    }
];