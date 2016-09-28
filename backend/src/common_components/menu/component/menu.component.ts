import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'fc-menu',
    templateUrl: '../template/menu.component.html'
})

export class MenuComponent implements OnInit {
    endMenu: Array<Object>;

    ngOnInit() {
        this.endMenu = menu;
    }

    top1MenuClick(top1Idx: number) {
        if (this.endMenu[top1Idx]["isOpen"]) {
            this.endMenu[top1Idx]["isOpen"] = false;
        } else {
            this.endMenu[top1Idx]["isOpen"] = true;
        }
    }

    top2MenuClick(top1Idx: number, top2Idx: number) {
        if (this.endMenu[top1Idx]["top2_menu"][top2Idx]["isOpen"]) {
            this.endMenu[top1Idx]["top2_menu"][top2Idx]["isOpen"] = false;
        } else {
            this.endMenu[top1Idx]["top2_menu"][top2Idx]["isOpen"] = true;
        }
    }

}

// Backend Menu Definition
const menu: Array<Object> = [
    {
        "label": "平台管理中心",
        "isOpen": true,
        "icon": "icon-platform-manage",
        "top2_menu": [
            {
                "label": "平台接入管理",
                "isOpen": false,
                "routing": "pf-mng/pf-conn-mng/pf-conn-mng-cre"
            },
            {
                "label": "平台系统",
                "isOpen": false,
                "routing": ""
            },
            {
                "label": "服务目录管理",
                "isOpen": true,
                "routing": "",
                "top3_menu": [
                    {
                        "label": "概览",
                        "routing": "pf-mng/svc-dir-mng/svc-dir-mng"
                    },
                    {
                        "label": "创建",
                        "routing": "pf-mng/svc-dir-mng/svc-dir-cre-step-01"
                    }
                ]
            }
        ]
    },
    {
        "label": "企业管理中心",
        "isOpen": true,
        "icon": "icon-enterprise-manage",
        "top2_menu": [
            {
                "label": "企业开通管理",
                "isOpen": false,
                "routing": ""
            },
            {
                "label": "资源配额管理",
                "isOpen": false,
                "routing": ""
            },
            {
                "label": "企业产品管理",
                "isOpen": false,
                "routing": ""
            },
            {
                "label": "企业管理员",
                "isOpen": false,
                "routing": ""
            }
        ]
    },
    {
        "label": "订单管理中心",
        "isOpen": true,
        "icon": "icon-order-manage",
        "top2_menu": [
            {
                "label": "订单管理",
                "isOpen": false,
                "routing": ""
            },
            {
                "label": "账单与报表",
                "isOpen": false,
                "routing": ""
            }
        ]
    }
];
