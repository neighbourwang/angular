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
        "label": "云主机服务",
        "isOpen": true,
        "icon": "icon-cloudhost",
        "top2_menu": [
            {
                "label": "创建云主机",
                "isOpen": true,
                "routing": "cloud-host-service/cloud-host-order"
            },
            {
                "label": "云主机列表",
                "isOpen": true,
                "routing": "cloud-host-service/cloud-host-list"
            },
            {
                "label": "创建云硬盘",
                "isOpen": true,
                "routing": "cloud-host-service/cloud-drive-order"
            },
            {
                "label": "云硬盘列表",
                "isOpen": true,
                "routing": "cloud-host-service/cloud-drive-list"
            },
            {
                "label": "镜像",
                "isOpen": true,
                "routing": "image-mng/image-mng-wxl"
            }
        ]
    },
    {
        "label": "物理机服务",
        "isOpen": false,
        "icon": "icon-machine",
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
        "label": "负载均衡服务器",
        "isOpen": false,
        "icon": "icon-loadbalance",
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
    },
    {
        "label": "审批中心",
        "isOpen": false,
        "icon": "icon-check",
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
        "label": "费用中心",
        "isOpen": false,
        "icon": "icon-cost",
        "top2_menu": [
            {
                "label": "账号管理",
                "isOpen": false,
                "routing": ""
            },
            {
                "label": "订单管理",
                "isOpen": false,
                "routing": "op-center/order-mng/order-mng"
            }
        ]
    },
    {
        "label": "用户中心",
        "isOpen": false,
        "icon": "icon-user",
        "top2_menu": [
            {
                "label": "账号管理",
                "isOpen": false,
                "routing": "user-center/account-mng/account-mng-list"
            },
            {
                "label": "组织管理",
                "isOpen": false,
                "routing": "user-center/org-mng/org-mng-list"
            },
            {
                "label": "个人账户管理",
                "isOpen": false,
                "routing": "user-center/person-acc-mng/person-acc-mng"
            }
            
        ]
    }
    // {
    //     "label": "产品与服务",
    //     "isOpen": true,
    //     "icon": "icon-product-and-service",
    //     "top2_menu": [
    //         {
    //             "label": "云主机",
    //             "isOpen": true,
    //             "routing": "",
    //             "top3_menu": [
    //                 {
    //                     "label": "概览",
    //                     "routing": "prod-and-svc/cloud-host/cloud-host-general-view"
    //                 },
    //                 {
    //                     "label": "订购",
    //                     "routing": "prod-and-svc/cloud-host/cloud-host-order"
    //                 },
    //                 {
    //                     "label": "实例列表",
    //                     "routing": "prod-and-svc/cloud-host/cloud-host-ins-list"
    //                 },
    //             ]
    //         },
    //         {
    //             "label": "云硬盘",
    //             "isOpen": false,
    //             "routing": ""
    //         }
    //     ]
    // },
];