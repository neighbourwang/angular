import { Component, OnInit } from '@angular/core';
import { DictService} from '../../../core/service/dict-service';

@Component({
    selector: 'fc-menu',
    templateUrl: '../template/menu.component.html'
    ,providers:[DictService]
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
        "label": "MENU.CLOUD_HOSTING_SERVICES",
        "isOpen": true,
        "icon": "icon-cloudhost",
        "top2_menu": [
            // {
            //     "label": "MENU.VIRTUAL_MACHINE_INSTANCE",
            //     "isOpen": true,
            //     "routing": "cloud-host-service/cloud-host-detail"
            // },
            {
                "label": "MENU.CLOUD_HOSTING_INSTANCE",
                "isOpen": true,
                "routing": "cloud-host-service/cloud-host-list"
            },
            {
                "label": "MENU.CLOUD_HARD_DISK",
                "isOpen": true,
                "routing": "cloud-host-service/cloud-drive-list"
            },
            // {
            //     "label": "MENU.MIRROR",
            //     "isOpen": true,
            //     "routing": "image-mng/image-mng"
            // }
        ]
    },
    // {
    //     "label": "MENU.PHYSICAL_SERVERS",
    //     "isOpen": false,
    //     "icon": "icon-machine",
    //     "top2_menu": [
    //         {
    //             "label": "MENU.ACCOUNT_MANAGEMENT",
    //             "isOpen": false,
    //             "routing": ""
    //         },
    //         {
    //             "label": "MENU.EXPENSE_CENTER",
    //             "isOpen": false,
    //             "routing": ""
    //         }
    //     ]
    // },
    // {
    //     "label": "MENU.LOAD_BALANCER",
    //     "isOpen": false,
    //     "icon": "icon-loadbalance",
    //     "top2_menu": [
    //         {
    //             "label": "MENU.ACCOUNT_MANAGEMENT",
    //             "isOpen": false,
    //             "routing": ""
    //         },
    //         {
    //             "label": "MENU.DEPARTMENT_MANAGENMENT",
    //             "isOpen": false,
    //             "routing": ""
    //         },
    //         {
    //             "label": "MENU.AUTHORITY_MANAGEMENT",
    //             "isOpen": false,
    //             "routing": ""
    //         },
    //         {
    //             "label": "MENU.PRICE_SET",
    //             "isOpen": false,
    //             "routing": ""
    //         },
    //         {
    //             "label": "MENU.QUOTA_MANAGEMENT",
    //             "isOpen": false,
    //             "routing": ""
    //         },
    //         {
    //             "label": "MENU.EXPENSE_CENTER",
    //             "isOpen": false,
    //             "routing": ""
    //         }
    //     ]
    // },
    {
        "label": "MENU.APPROVAL_CENTER",
        "isOpen": false,
        "icon": "icon-check",
        "top2_menu": [
            {
                "label": "MENU.NOT_APPROVED",
                "isOpen": false,
                "routing": "check-center/check-mng-list"
            },
            {
                "label": "MENU.APPROVED",
                "isOpen": false,
                "routing": "check-center/check-mng-hascheck"
            }
        ]
    },
    {
        "label": "MENU.EXPENSE_CENTER",
        "isOpen": false,
        "icon": "icon-cost",
        "top2_menu": [
            // {
            //     "label": "MENU.ACCOUNT_MANAGEMENT",
            //     "isOpen": false,
            //     "routing": ""
            // },
            {
                "label": "MENU.PURCHASED_SERVICE_MANAGEMENT",
                "isOpen": false,
                "routing": "op-center/order-mng/order-mng"
            }, {
                "label": "MENU.ORDER_INQUIRY",
                "isOpen": false,
                "routing": "op-center/order-mng/order-mng-search"
            }
        ]
    },
    {
        "label": "MENU.ACCOUNT_CENTER",
        "isOpen": false,
        "icon": "icon-user",
        "top2_menu": [
            {
                "label": "MENU.ACCOUNT_MANAGEMENT",
                "isOpen": false,
                "routing": "user-center/account-mng/account-mng-list"
            },
            {
                "label": "MENU.ORGANIZATION_MANAGENMENT",
                "isOpen": false,
                "routing": "user-center/org-mng/org-mng-list"
            },
            {
                "label": "MENU.PERSONAL_ACCOUNT_MANAGEMENT",
                "isOpen": false,
                "routing": "user-center/person-acc-mng/person-acc-mng"
            }
            
        ]
    }
    // {
    //     "label": "MENU.PRODUCTS_SERVICES",
    //     "isOpen": true,
    //     "icon": "icon-product-and-service",
    //     "top2_menu": [
    //         {
    //             "label": "MENU.CLOUD_HOSTING",
    //             "isOpen": true,
    //             "routing": "",
    //             "top3_menu": [
    //                 {
    //                     "label": "MENU.OVERVIEW",
    //                     "routing": "prod-and-svc/cloud-host/cloud-host-general-view"
    //                 },
    //                 {
    //                     "label": "MENU.ORDER",
    //                     "routing": "prod-and-svc/cloud-host/cloud-host-order"
    //                 },
    //                 {
    //                     "label": "MENU.INSTANCE_LIST",
    //                     "routing": "prod-and-svc/cloud-host/cloud-host-ins-list"
    //                 },
    //             ]
    //         },
    //         {
    //             "label": "MENU.CLOUD_HARD_DISK",
    //             "isOpen": false,
    //             "routing": ""
    //         }
    //     ]
    // },
];