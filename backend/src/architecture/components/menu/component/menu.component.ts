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

// Backend Menu Definition
const menu: Array<Object> = [
  {
    "label" : "平台管理",
    "isOpen" : true,
    "icon": "icon-platform-manage",
    "top2_menu" : [
      {
          "label": "云平台",
          "isOpen": false,
          "isActive": false,
          "routing": "pf-mng2/cl-mng/cl-mng"
      },
    ]
  },
    {
    "label" : "产品管理",
    "isOpen" : true,
    "icon": "icon-platform-manage",
    "top2_menu" : [
      {
          "label": "产品目录管理",
          "isOpen": false,
          "isActive": false,
          // "routing": "pf-mng2/cl-mng/cl-mng"
          "routing": "prod-mng/prod-dir-mng/prod-dir-mng"
      },{
          "label": "产品管理",
          "isOpen": false,
          "isActive": false,
          "routing": "prod-mng/prod-mng/prod-mng"
      },
    ]
  },
  {
    "label" : "用户中心",
    "isOpen" : true,
    "icon": "icon-platform-manage",
    "top2_menu" : [
      {
          "label": "账号管理",
          "isOpen": false,
          "isActive": false,
          "routing": "user-center/account-mng/account-mng-list"
      },
      {
          "label": "组织管理",
          "isOpen": false,
          "isActive": false,
          "routing": "user-center/org-mng/org-mng-list"
      },
      {
          "label": "角色管理",
          "isOpen": false,
          "isActive": false,
          "routing": "user-center/role-mng/role-mng-list"
      },
      {
          "label": "认证管理",
          "isOpen": false,
          "isActive": false,
          "routing": "user-center/attest-mng/attest-mng"
      },
      {
          "label": "个人账户管理",
          "isOpen": false,
          "isActive": false,
          "routing": "user-center/person-acc-mng/person-acc-mng"
      },
    ]
  },
    // {
    //     "label": "平台管理中心",
    //     "isOpen": true,
    //     "icon": "icon-platform-manage",
    //     "top2_menu": [
    //         {
    //             "label": "平台接入管理",
    //             "isOpen": false,
    //             "isActive": false,
    //             "routing": "pf-mng/pf-conn-mng/pf-conn-mng"
    //         },
    //         {
    //             "label": "平台系统",
    //             "isOpen": false,
    //             "isActive": false,
    //             "routing": ""
    //         },
    //         {
    //             "label": "服务目录管理",
    //             "isOpen": true,
    //             "isActive": false,
    //             "routing": "",
    //             "top3_menu": [
    //                 {
    //                     "label": "概览",
    //                     "routing": "pf-mng/svc-dir-mng/svc-dir-mng",
    //                     "isActive": false
    //                 },
    //                 {
    //                     "label": "创建",
    //                     "routing": "pf-mng/svc-dir-mng/svc-dir-cre-step-01",
    //                     "isActive": false
    //                 }
    //             ]
    //         }
    //     ]
    // },
    {
        "label": "企业管理",
        "isOpen": true,
        "icon": "icon-enterprise-manage",
        "top2_menu": [
            {
                "label": "企业管理",
                "isOpen": false,
                "isActive": false,
                "routing": "ent-mng/ent-est-mng/ent-est-mng"
            }
            // {
            //     "label": "企业资源配额管理",
            //     "isOpen": false,
            //     "isActive": false,
            //     "routing": "ent-mng/ent-res-quota-mng/ent-res-quota-mng"
            // },
            // {
            //     "label": "企业产品管理",
            //     "isOpen": false,
            //     "isActive": false,
            //     "routing": "ent-mng/ent-prod-mng/ent-prod-mng"
            // },
            // {
            //     "label": "企业管理员",
            //     "isOpen": false,
            //     "isActive": false,
            //     "routing": "ent-mng/ent-admin-mng/ent-admin-mng/ac25dfeb-d727-40a3-842f-dca8ab0409c0"
            // }
        ]
    },
    {
         "label": "云主机管理",
         "isOpen": true,
         "icon": "icon-order-manage",
         "top2_menu": [
          {
              "label": "镜像管理",
                "isOpen": false,
                "isActive": false,
                "routing": "host-mng/img-mng/img-index"
            }
         ]
     },
     {
         "label": "云网络管理",
         "isOpen": true,
         "icon": "icon-order-manage",
         "top2_menu": [
          {
              "label": "Opensatck网络",
                 "isOpen": false,
                 "isActive": false,
                 "routing": "net-mng/openstack/openstack-net-mng"
             },
         {
              "label": "VmWare",
                 "isOpen": false,
                 "isActive": false,
                 "routing": "net-mng/vmware/vmware-std-net"
             }
         ]
     },
     {
         "label": "运营中心",
         "isOpen": true,
         "icon": "icon-order-manage",
         "top2_menu": [
          {
              "label": "订单管理",
                 "isOpen": false,
                 "isActive": false,
                 "routing": "op-center/order-mng/order-mng"
             }
         ]
     },
     {
         "label": "审批中心",
         "isOpen": true,
         "icon": "icon-order-manage",
         "top2_menu": [
          {
              "label": "待审批",
                 "isOpen": false,
                 "isActive": false,
                 "routing": "check-center/check-mng-list"
             }, {
              "label": "已审批",
                 "isOpen": false,
                 "isActive": false,
                 "routing": "check-center/check-mng-hascheck"
             }
         ]
     }
];
