import { RestApiModel } from '../model/rest';

export let RestApis: RestApiModel[] = [
    /*
     * Cloud-Host Order
     */
    // 数据字典
    {
        "desc": "全部数据字典信息",
        "id": "sysdic",
        "method": "GET",
        "url": "basis/authsec/sysdic"
    },
    {
        "desc": "数据字典信息（OWNER）",
        "id": "sysdic.owner",
        "method": "GET",
        "url": "basis/authsec/sysdic/{_owner}"
    },
    {
        "desc": "数据字典信息（OWNER/FIELD）",
        "id": "sysdic.owner.field",
        "method": "GET",
        "url": "basis/authsec/sysdic/{_owner}/{_field}"
    },
    {
        "desc": "数据字典信息（OWNER/FIELD/CODE）",
        "id": "sysdic.owner.field.code",
        "method": "GET",
        "url": "basis/authsec/sysdic/{_owner}/{_field}/{_code}"
    },
    {
        "desc": "获取token",
        "id": "oauth.token",
        "method": "POST",
        "url": "/uaa/oauth/token?grant_type=password&username=gavin@hpe.com&password=12345&client_id=ui&client_secret=12345"
    },
    {
        "desc": "登出",
        "id": "uaa.logout",
        "method": "GET",
        "url": "uaa/logout"
    },
    // 数据字典
    {
        "desc": "获取可订购配置数据",
        "method": "GET",
        "id": "hosts.services.get",
        // "url": "marketplace/authsec/shopping/servicelist/vm"
        // "url": "marketplace/authsec/shopping/servicelist/88/1/vm",
        // "url": "marketplace/authsec/shopping/servicelist/88/1/vm",
        "url": "marketplace/authsec/shopping/servicelist/type/{id}"
    },
    {
        "desc": "云主机订购",
        "method": "POST",
        "id": "hosts.order.add",
        "url": "marketplace/authsec/shopping/purchase"
    },
    {
        "desc": "添加到购物车",
        "method": "POST",
        "id": "shopping.cart.add",
        "url": "marketplace/authsec/shopping/cart"
    },
    /*
     * Cloud-Host Instance List
     */
    {
        "desc": "获取云主机列表 - 弃用",
        "method": "GET",
        "id": "hosts.instance.get",
        "url": "marketplace/authsec/subinstance/itemlist/vm/page/{page}/size/{size}"
    },
    {
        "desc": "获取某个平台下的所有可用镜像",
        "method": "POST",
        "id": "platform.image.post",
        "url": "marketplace/authsec/platform/image"
    },
    {
        "desc": "获取某个平台下的所有可用网络",
        "method": "GET",
        "id": "enterprise.network.get",
        "url": "marketplace//authsec/platform/{platformId}/enterprise/{enterPriseId}/zoneId/{zoneId}/network"
    },
    {
        "desc": "云主机操作",
        "method": "POST",
        "id": "hosts.instance.action",
        "url": "marketplace/authsec/subinstance/itemlist/vm/action"
    },
    {
        "desc": "云主机操作",
        "method": "POST",
        "id": "hosts.instance.action",
        "url": "marketplace/authsec/subinstance/itemlist/vm/action"
    },
    {
        "desc": "提交变更云主机配置",
        "method": "POST",
        "id": "submit.vm.config",
        "url": "marketplace/authsec/shopping/instance/vm/{instanceId}/update"
    },
    {
        "desc": "提交变更云硬盘配置",
        "method": "POST",
        "id": "submit.disk.config",
        "url": "marketplace/authsec/shopping/instance/disk/{instanceId}/update"
    },
    {
        "desc": "变更云主机和云硬盘的借口",
        "method": "GET",
        "id": "change.vm.disk.config",
        "url": "marketplace/authsec/shopping/servicelist/{instanceId}/serviceType/{serviceType}"
    },
    {
        "desc": "更改云主机名称",
        "method": "POST",
        "id": "change.vm.info",
        "url": "marketplace/authsec/instance/vm/{id}"
    },
    {
        "desc": "更改云硬盘名称",
        "method": "POST",
        "id": "change.disk.info",
        "url": "marketplace/authsec/instance/disk/{id}"
    },
    {
        "desc": "云硬盘操作",
        "method": "POST",
        "id": "hosts.vm.action",
        "url": "marketplace/authsec/subinstance/itemlist/disk/action"
    },
    {
        "desc": "获取云主机控制台",
        "method": "GET",
        "id": "vm.console.url",
        "url": "marketplace/authsec/platforms/{platformid}/enterprise/{enterpriseId}/subinstance/computes/{uuid}/vnc"
    },
    {
        "desc": "获取平台的配额",
        "method": "GET",
        "id": "fetch.platforms.quotas",
        "url": "marketplace/authsec/platforms/{platformId}/resouces/quotas"
    },
    {
        "desc": "获取云主机详细信息",
        "method": "GET",
        "id": "hosts.instance.detail",
        "url": "marketplace/authsec/subinstance/itemlist/vm/{uuid}"
    },
    {
        "desc": "获取云主机详细信息",
        "method": "GET",
        "id": "vm.instance.detail",
        "url": "marketplace/authsec/serviceinstance/vm/{itemId}"
    },
    {
        "desc": "更新云主机详细信息",
        "method": "POST",
        "id": "vm.instance.detail.updata",
        "url": "marketplace/authsec/serviceinstance/vm/{instanceId}"
    },
    {
        "desc": "获取购物车列表",
        "method": "GET",
        "id": "shopping.cart.items",
        "url": "marketplace/authsec/shopping/cart/items"
    },
    {
        "desc": "删除购物车元素",
        "method": "DELETE",
        "id": "delete.shopping.cart",
        "url": "marketplace/authsec/shopping/cart/{itemId}"
    },
    {
        "desc": "购物车直接购买",
        "method": "POST",
        "id": "shopping.purchase.cart",
        "url": "marketplace/authsec/shopping/purchase/cart"
    },
    {
        "desc": "购物车订单",
        "method": "POST",
        "id": "shopping.orders.completion",
        "url": "marketplace/authsec/shopping/orders/completion"
    },
    {
        "desc": "获取云硬盘列表",
        "method": "POST",
        "id": "disk.search.page",
        "url": "marketplace/authsec/subinstance/itemlist/disk/search/page"
    },
    {
        "desc": "获取云主机列表",
        "method": "POST",
        "id": "vm.search.page",
        "url": "marketplace/authsec/subinstance/itemlist/vm/search/page"
    },
    {
        "desc": "获取云主机标签",
        "method": "GET",
        "id": "instance.labels",
        "url": "marketplace/authsec/instance/labels"
    },
    {
        "desc": "云硬盘创建页面，分页获取备份盘实例",
        "method": "POST",
        "id": "disk.backup.search",
        "url": "marketplace/authsec/instance/itemlist/disk/backup/search/page"
    },
    {
        "desc": "云硬盘创建页面，分页获取未挂载盘实例",
        "method": "POST",
        "id": "disk.unmount.search",
        "url": "marketplace/authsec/instance/itemlist/disk/unmount/search/page"
    },
    {
        "desc": "云硬盘创建页面，分页获取云主机实例",
        "method": "POST",
        "id": "disk.vm.search",
        "url": "marketplace/authsec/subinstance/itemlist/vm/simple/search/page"
    },
    //物理机部分,
    {
        "desc": "获取区域列表",
        "method": "GET",
        "id": "basis.regions",
        "url": "basis/authsec/regions"
    },
    {
        "desc": "按条件查询匹配的物理机信息",
        "method": "POST",
        "id": "post.pmlist.detail",
        "url": "pmresourcemgmt/noauth/pmmgmt/order/pmlist"
    },
    {
        "desc": "根据区域得到相关的资源池列表",
        "method": "GET",
        "id": "region.pmpool.list",
        "url": "pmresourcemgmt/noauth/pmmgmt/order/pmpool/{regionId}/list"
    },
    {
        "desc": "根据pmImagePoolId显示资源池的分配信息",
        "method": "GET",
        "id": "pmPoolId.image.list",
        "url": "pmimagemgmt/noauth/pmimage/image/listbype/{pmPoolId}/{enterpriseId}"
    },
    {
        "desc": "物理机--根据物理机id，获取对应的产品信息",
        "method": "GET",
        "id": "phymachine.product.info",
        "url": "marketplace/authsec/shopping/product/phymachine/{phymachineId}"
    },
    //管理服务部分
    {
        "desc": "获取管理服务产品",
        "method": "GET",
        "id": "mgmt-product-simple",
        "url": "productmgmt/authsec/supervise/product/simple"
    },
    {
        "desc": "获取管理服务产品详情",
        "method": "GET",
        "id": "product-info-via-serviceId",
        "url": "productmgmt/authsec/supervise/product/{productId}"
    },
    {
        "desc": "获取管理服务的attribute",
        "method": "GET",
        "id": "mngm-attribute",
        "url": "productmgmt/authsec/supervise/product/attribute"
    },
    // {
    //     "desc": "获取一个管理服务目录的基础信息",
    //     "method": "GET",
    //     "id": "product-list-via-serviceId",
    //     "url": "productmgmt/authsec/services/supervise/{serviceId}"
    // },
    //镜像管理部分
    {
        "desc": "创建镜像",
        "method": "POST",
        "id": "creat.custom.image",
        "url": "marketplace/authsec/service/instance/vm/image/{imageName}"
    },
    {
        "desc": "获取镜像列表",
        "method": "POST",
        "id": "image.mng.list",
        "url": "marketplaceboe/authsec/images/page/{page}/size/{size}"
    },
    {
        "desc": "更新镜像信息",
        "method": "PUT",
        "id": "image.mng.update",
        "url": "marketplaceboe/authsec/image"
    },
    {
        "desc": "删除镜像信息",
        "method": "DELETE",
        "id": "image.mng.delete",
        "url": "marketplaceboe/authsec/image/{id}"
    },
    {
        "desc": "获取区域列表",
        "method": "GET",
        "id": "image.mng.area.list",
        "url": "marketplace/authsec/platforms/status/activation"
    },
    {
        "desc": "启用/禁用",
        "method": "PUT",
        "id": "image.mng.endisable",
        "url": "marketplaceboe/authsec/image/{id}/{status}"
    }
    // 管理控制台
    , {
        "desc": "获取管理控制台里的相关信息",
        "method": "GET",
        "id": "mng-console-info",
        // "url": "/basis/authsec/mpp/organizations/page/0/size/10"
        "url": "basis/authsec/mpp/organization/{organizationId}/ext"
    }
    //<--费用中心-已购服务管理
    , {
        "desc": "部门列表获取",
        "method": "GET",
        "id": "op-center.order-mng.department-list.get",
        // "url": "/basis/authsec/mpp/organizations/page/0/size/10"
        "url": "basis/authsec/adm/organization/enterprise/{enterpriseId}"
    }
    , {
        "desc": "区域获取",
        "method": "GET",
        "id": "op-center.order-mng.platform-list.get",
        "url": "marketplace/authsec/platforms/status/activation"
    }
    , {
        "desc": "可用区获取",
        "method": "GET",
        "id": "op-center.order-mng.region-list.get",
        "url": "marketplace/authsec/platform/{_id}/zone"
    }
    , {
        "desc": "订单列表查询",
        "method": "POST",
        "id": "op-center.order-mng.order-list.post",
        "url": "marketplace/authsec/subinstance/subscription/orderlist"
    }
    , {
        "desc": "订单详情查询",
        "method": "POST",
        "id": "op-center.order-mng.order-detail.get",
        "url": "marketplace/authsec/subinstance/{subinstanceCode}/orderDetail"
    }, {
        "desc": "订单退订",
        "method": "POST",
        "id": "op-center.order-mng.order-cancel.post",
        "url": "marketplace/authsec/shopping/subinstances/cancel"//修改后的接口
        // "url": "marketplace/authsec/subscription/instance/{_subId}/cascadeFlag/{_cascadeFlag}/cancel"y以前的
    }, {
        "desc": "订单续订",
        "method": "POST",
        "id": "op-center.order-mng.order-renew.get",
        "url": "marketplace/authsec/subscription/instance/{_subId}/renew"
    }, {
        "desc": "获取续订费用",
        "method": "GET",
        "id": "op-center.order-mng.order-renew-price.get",
        "url": "marketplace/authsec/subscription/instance/{_subId}/price"
    },
    {
        "desc": "自动续订配置变更",
        "method": "GET",
        "id": "op-center.order-mng.order-auto-renew-config.get",
        "url": "marketplace/authsec/shopping/renewWay/{_instanceId}/serviceType/{_serviceType} "
    },

    {
        "desc": "对订购实例进行自动续订的设定及取消",
        "method": "POST",
        "id": "op-center.order-mng.order-auto-renew-setting.post",
        "url": "marketplace/authsec/shopping/subinstance/setting"
    },
    //费用中心-已购服务管理-->

    //订单查询
    {
        "desc": "查询订单",
        "method": "POST",
        "id": "op-center.order-search.list.post",
        // "url": "marketplace/authsec/subinstance/subscription/orderlist"
        "url": "marketplace/authsec/order/search/paging"
    },
    {
        "desc": "查询订单详情",
        "method": "GET",
        "id": "op-center.order-search.detail.get",
        "url": "marketplace/authsec/subinstance/order/{orderNo}/detail"
        // "url": "adminui/authsec/backend/order/{orderNo}/detail"
    },
    {
        "desc": "查询订单撤单",
        "method": "POST",
        "id": "op-center.order-search.cencel.post",
        "url": "marketplace/authsec/order/withdraw/order/{orderId}/reason/{reason}"
    },
    //订单查询

    //消费总览
    {
        "desc": "部门消费概览",
        "id": "op-center.order-mng.cost-pandect.consume.post",
        "method": "POST",
        "url": "adminui/authsec/enterprise/consume/sum"
    },
    {
        "desc": "部门消费趋势-总消费",
        "id": "op-center.order-mng.cost-pandect.total.post",
        "method": "POST",
        "url": "adminui/authsec/enterprise/consume/history"
    },
    {
        "desc": "部门消费趋势-新增消费",
        "id": "op-center.order-mng.cost-pandect.increase.post",
        "method": "POST",
        "url": "adminui/authsec/enterprise/increase/consume/history"
    },
    {
        "desc": "TOP5消费排名-所有企业",
        "id": "op-center.order-mng.cost-pandect.enterprise-top.post",
        "method": "POST",
        "url": "adminui/authsec/enterprise/order/count/top"
    },
    {
        "desc": "TOP5消费排名-某个企业",
        "id": "op-center.order-mng.cost-pandect.department-top.post",
        "method": "POST",
        "url": "adminui/authsec/enterprise/department/order/count/top"
    },
    {
        "desc": "TOP新增消费排名-所有企业",
        "id": "op-center.order-mng.cost-pandect.increase-enterprise-top.post",
        "method": "POST",
        "url": "adminui/authsec/enterprise/order/increase/count/top"
    },
    {
        "desc": "TOP新增消费排名-某个企业",
        "id": "op-center.order-mng.cost-pandect.increase-department-top.post",
        "method": "POST",
        "url": "adminui/authsec/enterprise/department/order/increase/count/top"
    },
    {
        "desc": "用户类型判断",
        "id": "op-center.order-mng.ent-type.get",
        "method": "GET",
        "url": "adminui/authsec/user/currentuser"
    },
    {
        "desc": "消费管理-所有服务",
        "id": "op-center.order-mng.cost-pandect.all-service.post",
        "method": "POST",
        "url": "adminui/authsec/enterrpise/subinstance/bill"
    }, {
        "desc": "消费管理-新增服务",
        "id": "op-center.order-mng.cost-pandect.increase-service.post",
        "method": "POST",
        "url": "adminui/authsec/enterrpise/subinstance/increase/bill"
    }, {
        "desc": "部门消费总览-部门消费概览",
        "id": "op-center.order-mng.cost-pandect-department.consume.post",
        "method": "POST",
        "url": "adminui/authsec/department/consume/sum"
    }, {
        "desc": "部门消费总览-部门消费趋势-总消费",
        "id": "op-center.order-mng.cost-pandect-department.total.post",
        "method": "POST",
        "url": "adminui/authsec/department/consume/history"
    }, {
        "desc": "部门消费总览-部门消费趋势-新增消费",
        "id": "op-center.order-mng.cost-pandect-department.increase.post",
        "method": "POST",
        "url": "adminui/authsec/department/increase/consume/history"
    }, {
        "desc": "部门消费总览-所有服务",
        "id": "op-center.order-mng.cost-pandect-department.all-service.post",
        "method": "POST",
        "url": "adminui/authsec/department/subinstance/bill"
    }, {
        "desc": "部门消费总览-新增服务",
        "id": "op-center.order-mng.cost-pandect-department.increase-service.post",
        "method": "POST",
        "url": "adminui/authsec/department/subinstance/increase/bill"
    },{
        "desc": "企业消防总览-下载账单",
        "id": "op-center.order-mng.cost-pandect.bill-download.post",
        "method": "POST",
        "url": "adminui/authsec/enterpirse/bill/download"
    },{
        "desc": "企业消防总览-下载账单表格",
        "id": "op-center.order-mng.cost-manage.post",
        "method": "POST",
        "url": "adminui/authsec/enterrpise/subinstance/bill/report/search"
    },

    //消费总览
    //用户中心
    //个人账户管理
    {
        "desc": "获取当前登录账户信息",
        "id": "user-center.person-acc.mng",
        "method": "GET",
        "url": "basis/authsec/mpp/user/current"
    },
    {
        "desc": "编辑账户本地",
        "id": "user-center.account-mng.editLocal",
        "method": "PUT",
        "url": "basis/authsec/mpp/user/{id}"
    },
    {
        "desc": "更改账户密码",
        "id": "user-center.account-mng-pwd.edit",
        "method": "PUT",
        "url": "basis/authsec/mpp/user/password/modify"
    },
    {
        "desc": "用户中心，帐号管理，帐号列表",
        "id": "user-center.account-mng.list",
        "method": "GET",
        "url": "basis/authsec/mpp/users/page/{page}/size/{size}"
    },
    {
        "desc": "用户中心，帐号管理，搜索帐号列表By用户名",
        "id": "user-center.search-account.list",
        "method": "GET",
        "url": "basis/authsec/mpp/users/search/page/{page}/size/{size}"
    },
    {
        "desc": "用户中心，帐号管理，启用帐号",
        "id": "user-center.account-mng.enableAcc",
        "method": "PUT",
        "url": "basis/authsec/mpp/user/{id}/enable"
    },
    {
        "desc": "用户中心，帐号管理，禁用帐号",
        "id": "user-center.account-mng.disableAcc",
        "method": "PUT",
        "url": "basis/authsec/mpp/user/{id}/disable"
    },
    {
        "desc": "用户中心，帐号管理，删除帐号",
        "id": "user-center.account-mng.deleteAcc",
        "method": "DELETE",
        "url": "basis/authsec/mpp/user/{id}"
    },
    //账号管理
    {
        "desc": "验证账号的唯一性",
        "id": "user-center.account-mng.loginNameValid",
        "method": "GET",
        "url": "basis/authsec/mpp/user/{_loginName}/validation"
    },
    {
        "desc": "用户中心，帐号管理，帐号创建，获取所有角色",
        "id": "user-center.account-mng.create.roleList",
        "method": "GET",
        "url": "basis/authsec/mpp/roles/page/{page}/size/{size}"
    },
    {
        "desc": "用户中心，帐号管理，帐号创建，获取所有机构",
        "id": "user-center.account-mng.create.orgList",
        "method": "GET",
        "url": "basis/authsec/mpp/organizations/page/{page}/size/{size}"
    },
    {
        "desc": "创建账户",
        "method": "POST",
        "id": "user-center.account-mng.create.post",
        "url": "basis/authsec/mpp/user"
    },
    {
        "desc": "用户中心，帐号管理，帐号编辑，获取账号详情",
        "id": "user-center.account-mng.detail",
        "method": "GET",
        "url": "basis/authsec/mpp/user/{id}"
    },
    {
        "desc": "用户中心，帐号管理，获取AD认证源列表",
        "id": "user-center.attest-mng.ldap.attest.simple.list",
        "method": "GET",
        "url": "basis/authsec/ldaps/simple"
    },
    {
        "desc": "获取企业认证源列表（下拉框）",
        "id": "ent-mng.enterprise.ldap.simple.list",
        "method": "GET",
        "url": "basis/authsec/enterprise/{enterpriseId}/ldaps/simple"
    },
    {
        "desc": "用户中心 查询符合条件的AD用户",
        "id": "user-center.account-mng.aduser.get",
        "method": "POST",
        "url": "basis/authsec/ldap/{ldapid}/adusers/page/{page}/size/{size}"
    },
    {
        "desc": "创建帐号（AD）",
        "id": "user-center.account-mng.ad.create",
        "method": "POST",
        "url": "basis/authsec/aduser"
    },
    {
        "desc": "获取AD帐号详情",
        "id": "user-center.account-mng.ad.get",
        "method": "GET",
        "url": "basis/authsec/adm/user/{id}"
    },
    {
        "desc": "编辑账户本地",
        "id": "user-center.account-mng.editAd",
        "method": "PUT",
        "url": "basis/authsec/mpp/user/{id}"
    },
    //组织管理
    {
        "desc": "获取所有机构",
        "id": "user-center.org-mng.list",
        "method": "GET",
        "url": "basis/authsec/mpp/organizations/page/{page}/size/{size}"
    },
    {
        "desc": "删除机构",
        "id": "user-center.org-mng.delete",
        "method": "DELETE",
        "url": "basis/authsec/mpp/organization/{id}"
    },
    {
        "desc": "启用机构",
        "id": "user-center.org-mng.enable",
        "method": "PUT",
        "url": "basis/authsec/mpp/organization/{id}/enable"
    },
    {
        "desc": "禁用机构",
        "id": "user-center.org-mng.disable",
        "method": "PUT",
        "url": "basis/authsec/mpp/organization/{id}/disable"
    },
    {
        "desc": "创建机构",
        "id": "user-center.org-mng.create",
        "method": "POST",
        "url": "basis/authsec/mpp/organization"
    },
    {
        "desc": "获得单个机构",
        "id": "user-center.org-mng.account.get",
        "method": "GET",
        "url": "basis/authsec/mpp/organization/{id}"
    },
    {
        "desc": "获得单个机构资源信息",
        "id": "user-center.org-mng.resource.get",
        "method": "GET",
        "url": "basis/authsec/mpp/organization/resource/{id}"
    },
    {
        "desc": "获得机构下的成员",
        "id": "user-center.org-mng.user-by-org.list",
        "method": "GET",
        "url": "basis/authsec/mpp/users/organization/{id}"
        // adm/users/organization/e264346e-2857-4876-ba96-9fc2b0eeeb89
    },
    {
        "desc": "编辑机构",
        "id": "user-center.org-mng.edit",
        "method": "PUT",
        "url": "basis/authsec/mpp/organization/{id}"
    },
    {
        "desc": "获取未管理人员列表",
        "id": "user-center.org-mng.nomnguser.list",
        "method": "GET",
        "url": "basis/authsec/mpp/users/nonorganization/page/{page}/size/{size}"
    },
    {
        "desc": "获取组织成员列表(for leader)",
        "id": "user-center.org-mng.members.list",
        "method": "GET",
        "url": "basis/authsec/mpp/users/nonorganization/page/{page}/size/{size}"
    },
    {
        "desc": "获取当前登录人企业ID",
        "id": "user-center.org-mng.currentEnterpriseID.get",
        "method": "GET",
        "url": "basis/authsec/mpp/currentEnterpriseId"
    },
    {
        "desc": "获取当前登录人企业可用资源",
        "id": "user-center.org-mng.currEntResoure.get",
        "method": "GET",
        // "url": "adminui/authsec/enterprise/{id}/resouces/quotas/page/{page}/size/{size}"
        "url": "adminui/authsec/enterprise/{id}/resource/quota/detail"
    },

    // 审批中心
    {
        "desc": "订购人、提交者列表",
        "id": "check-center.submiter-list.get",
        "method": "GET",
        "url": "adminui/authsec/approval/department/{departmentId}/users"
    },
    {
        "desc": "审批人列表",
        "id": "check-center.checker-list.get",
        "method": "GET",
        "url": "adminui/authsec/approval/department/{departmentId}/approvers"
    },
    {
        "desc": "订单类型列表",
        "id": "check-center.orderType-list.get",
        "method": "GET",
        "url": ""
    }, {
        "desc": "审批设置保存",
        "id": "check-center.approve-set.put",
        "method": "PUT",
        "url": "adminui/authsec/enterprise/audit"
    }, {
        "desc": "审批设置获取",
        "id": "check-center.approve-set.get",
        "method": "GET",
        "url": "adminui/authsec/enterprise/{_enterpriseId}/simple "
    }, {
        "desc": "审批列表",
        "id": "check-center.get-list.post",
        "method": "POST",
        "url": "marketplace/authsec/order/approval/orders/search/paging "
    }, {
        "desc": "审批同意/拒绝",
        "id": "check-center.approve-refust.post",
        "method": "POST",
        "url": "marketplace/authsec/order/approval/order/{orderId}/operation/{operation}/reason/{reason}"
    }
    , {
        "desc": "获取审批意见",
        "id": "check-center.approve-info.get",
        "method": "GET",
        "url": "marketplace//authsec/order/approval/history/order/{orderId}"
    },
    // 工单管理
    {
        "desc": "工单列表",
        "id": "user-center.case-mng.list",
        "method": "POST",
        "url": "basis/authsec/mpp/worklist/{page}/{size}"
    },
    {
        "desc": "新建工单",
        "id": "user-center.case-mng.create",
        "method": "POST",
        "url": "basis/authsec/mpp/worklist"
    },
    {
        "desc": "编辑工单",
        "id": "user-center.case-mng.edit",
        "method": "POST",
        "url": "basis/authsec/mpp/worklist/{id}"
    },
    {
        "desc": "删除工单",
        "id": "user-center.case-mng.delete",
        "method": "DELETE",
        "url": "basis/authsec/mpp/worklist/{id}"
    },
    {
        "desc": "获取工单基本信息",
        "id": "user-center.case-mng.basicInfo",
        "method": "GET",
        "url": "basis/authsec/mpp/worklist/{id}"
    },
    {
        "desc": "获取工单处理信息",
        "id": "user-center.case-mng.handleInfo",
        "method": "GET",
        "url": "basis/authsec/mpp/worklist/{id}/handle"
    },
    {
        "desc": "获取工单关闭信息",
        "id": "user-center.case-mng.closedInfo",
        "method": "GET",
        "url": "basis/authsec/mpp/worklist/{id}/closeinfo"
    },
    {
        "desc": "部门工单列表",
        "id": "user-center.case-depart.list",
        "method": "POST",
        "url": "basis/authsec/mpp/worklist/organization/{page}/{size}"
    },
    {
        "desc": "获取指定机构下所有用户",
        "id": "user-center.case-depart.user",
        "method": "GET",
        "url": "basis/authsec/mpp/users/organization/{organizationId}"
    },

    // 消息中心
    {
        "desc": "获取消息列表、所有/未读/已读",
        "id": "user-center.msg-mng.message.get",
        "method": "GET",
        "url": "messagemgmt/authsec/message/getmessages/page/{page}/size/{size}/status/{status}"
    },
    {
        "desc": "设置消息已读",
        "id": "user-center.msg-mng.message.setread",
        "method": "POST",
        "url": "messagemgmt/authsec/message/setread"
    },
    {
        "desc": "删除消息",
        "id": "user-center.msg-mng.message.delete",
        "method": "DELETE",
        "url": "messagemgmt/authsec/message/delete"
    },

    // 阿里云
    { //获取region列表
        "desc": "Get alicloud region list",
        "id": "al-cloud.cloud-disk.regions.get",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/ecs/action/describeregions"
    },
    {//获取secretKey
        "desc": "Get user key and secret",
        "id": "al-cloud.cloud-disk.key-secret.get",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/getkey"
    },
    { //根据regionId获取可用区列表
        "desc": "根据regionId获取可用区列表",
        "id": "al-cloud.cloud-disk.regionZone.get",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/ecs/action/describezones/regionid/{regionid}"
    },
    { //计算云硬盘购买的价格
        "desc": "Get cloud disk price",
        "id": "al-cloud.cloud-disk.price.get",
        "method": "POST",
        "url": "alicloud/noauth/alicloud/price/disk"
    },
    { //订购阿里云硬盘
        "desc": "create alicloud disk",
        "id": "al-cloud.cloud-disk.diskorder.post",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/ecs/action/createdisk/regionid/{regionid}/zoneid/{zoneid}"
    },
    { //获得阿里云硬盘的列表
        "desc": "query alicloud disk",
        "id": "al-cloud.cloud-disk.disklist.get",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/ecs/action/describedisks/regionid/{regionid}"
    },
    { //删除阿里云硬盘
        "desc": "delete alicloud disk",
        "id": "al-cloud.cloud-disk.diskorder.delete",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/ecs/action/deletedisk/diskid/{diskid}"
    },
    { //挂载阿里云硬盘
        "desc": "attach alicloud disk",
        "id": "al-cloud.cloud-disk.disk.attach",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/ecs/action/attachdisk"
    },
    { //卸载阿里云硬盘
        "desc": "detach alicloud disk",
        "id": "al-cloud.cloud-disk.disk.detach",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/ecs/action/detachdisk"
    },

    { //创建/订购阿里云主机
        "desc": "create alicloud instance",
        "id": "al-cloud.cloud-vm.instance.create",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/ecs/action/createinstance/regionid/{regionid}"
    },
    { //删除阿里云主机
        "desc": "delete instance",
        "id": "al-cloud.cloud-vm.instance.delete",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/ecs/action/deleteinstance/instanceid/{instanceid}"
    },
    { //启动阿里云主机
        "desc": "Start alicloud Instance",
        "id": "al-cloud.cloud-vm.instance.start",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/ecs/action/startinstance/instanceid/{instanceid}"
    },
    { //停止阿里云主机
        "desc": "Stop alicloud Instance",
        "id": "al-cloud.cloud-vm.instance.stop",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/ecs/action/stopinstance/instanceid/{instanceid}"
    },
    { //重启阿里云主机
        "desc": "Reboot alicloud Instance",
        "id": "al-cloud.cloud-vm.instance.reboot",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/ecs/action/rebootinstance/instanceid/{instanceid}/operation/{forcereboot}"
    },
    { //获取浮动IP地址
        "desc": "Get floating ip list",
        "id": "al-cloud.cloud-vm.instance.floating.ips.get",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/ecs/action/describeeipaddresses/regionid/{regionid}"
    },
    { //分配IP地址给云主机
        "desc": "Allocation alicloud ip addresss with instance",
        "id": "al-cloud.cloud-vm.instance.ip.allocate",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/ecs/action/associateeipaddress/instanceid/{instanceid}/allocationid/{allocationid}"
    },
    { //从云主机解绑IP地址
        "desc": "Unassociate public ip addresss",
        "id": "al-cloud.cloud-vm.instance.ip.unallocate",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/ecs/action/unassociateeipaddress"
    },
    { //获取阿里云主机列表
        "desc": "query instance",
        "id": "al-cloud.cloud-vm.instance.list",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/ecs/action/describeinstances/regionid/{regionid}"
    },
    { //获取阿里云镜像
        "desc": "Get alicloud images",
        "id": "al-cloud.cloud-vm.image.get",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/ecs/action/describeimages/regionid/{regionid}"
    },
    { //获取阿里云实例类型family
        "desc": "Get alicloud instance tyep families",
        "id": "al-cloud.cloud-vm.instance.type.family.get",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/ecs/action/describeinstancetypefamilies/regionid/{regionid}"
    },
    { //获取阿里云实例类型
        "desc": "Get alicloud instance types",
        "id": "al-cloud.cloud-vm.instance.type.get",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/ecs/action/describeinstancetypes"
    },
    { //获取阿里云实例类型联动数据
        "desc": "Get alicloud instance tree families",
        "id": "al-cloud.cloud-vm.instance.family.tree.get",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/ecs/action/getfamilytree/regionid/{regionid}"
    },
    { //获取阿里云VPC
        "desc": "Get VPC network list",
        "id": "al-cloud.cloud-vm.network.vpc.get",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/ecs/action/describevpcs/regionid/{regionid}"
    },
    { //获取阿里云vSwitch
        "desc": "Query VSwitches",
        "id": "al-cloud.cloud-vm.network.vswitch.get",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/ecs/action/describevswitches/vpcid/{vpcid}"
    },
    { //获取阿里云SecurityGroup
        "desc": "Get security group list",
        "id": "al-cloud.cloud-vm.network.securitygroup.get",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/ecs/action/describesecuritygroups/regionid/{regionid}"
    },
    { //计算阿里云主机价格
        "desc": "Get instance price",
        "id": "al-cloud.cloud-vm.price.get",
        "method": "POST",
        "url": "alicloud/noauth/alicloud/price"
    },
    { //更改阿里云主机名字
        "desc": "Update instance property",
        "id": "al-cloud.cloud-vm.property.modify",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/ecs/action/modifyinstanceattribute/instanceid/{instanceid}"
    },
    { //更改阿里云硬盘名字
        "desc": "Update disk property",
        "id": "al-cloud.cloud-disk.property.modify",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/ecs/action/modifydiskattribute/diskid/{diskid}"
    },
    { //远程控制云主机
        "desc": "Get remote url",
        "id": "al-cloud.cloud-vm.remotecontrol",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/ecs/action/describeinstancevncurl/regionid/{regionid}/instanceid/{instanceid}"
    },

    // 阿里云主账号管理
    {
        "desc": "主账号列表",
        "id": "user-center.ali-cloud.list",
        "method": "GET",
        "url": "alicloud/authsec/alicloud/mmp/main/list"
    },
    {
        "desc": "主账号详细信息",
        "id": "user-center.ali-cloud.majorinfo",
        "method": "GET",
        "url": "alicloud/authsec/alicloud/mmp/main/acct/{id}"
    },
    {
        "desc": "测试主账号",
        "id": "user-center.ali-cloud.majortest",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/mmp/main/testacct"
    },
    {
        "desc": "编辑保存主账号信息",
        "id": "user-center.ali-cloud.edit",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/mmp/main/update/{id}"
    },
    {
        "desc": "编辑保存主账号部门分配",
        "id": "user-center.ali-cloud.editdepart",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/mmp/main/depart/update/{id}"
    },
    {
        "desc": "主账号部门列表",
        "id": "user-center.ali-cloud.departmajorlist",
        "method": "GET",
        "url": "alicloud/authsec/alicloud/mmp/main/depart/list"
    },
    // 阿里云子账号管理
    {
        "desc": "子账号列表",
        "id": "user-center.ali-cloud.sublist",
        "method": "GET",
        "url": "alicloud/authsec/alicloud/mmp/sub/list/{id}"
    },
    {
        "desc": "子账号详细信息",
        "id": "user-center.ali-cloud.subinfo",
        "method": "GET",
        "url": "marketplace/authsec/alicloud/mmp/sub/acct/detail/{id}"
    },
    {
        "desc": "子账号部门列表",
        "id": "user-center.ali-cloud.departsublist",
        "method": "GET",
        "url": "alicloud/authsec/alicloud/mmp/sub/depart/list"
    },
    {
        "desc": "测试子账号",
        "id": "user-center.ali-cloud.subtest",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/mmp/sub/acct/testsubacct"
    },
    {
        "desc": "启用子账号",
        "id": "user-center.ali-cloud.enable",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/mmp/sub/acct/enable/{id}"
    },
    {
        "desc": "禁用子账号",
        "id": "user-center.ali-cloud.disable",
        "method": "POST",
        "url": "marketplace/authsec/alicloud/mmp/sub/acct/disable/{id}"
    },
    {
        "desc": "删除子账号",
        "id": "user-center.ali-cloud.delete",
        "method": "POST",
        "url": "marketplace/authsec/alicloud/mmp/sub/acct/delete/{id}"
    },
    {
        "desc": "创建子账号",
        "id": "user-center.ali-cloud.create",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/mmp/sub/acct/create/{id}"
    },
    {
        "desc": "编辑保存子账号部门分配",
        "id": "user-center.ali-cloud.subdepart",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/mmp/sub/depart/update/{id}"
    },
    {
        "desc": "编辑保存子账号信息",
        "id": "user-center.ali-cloud.editsub",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/mmp/sub/acct/update"
    },
    // 阿里云共享账号管理
    {
        "desc": "共享账号列表",
        "id": "user-center.ali-cloud.sharedlist",
        "method": "GET",
        "url": "marketplace/authsec/alicloud/mmp/share/acct/list"
    },
    {
        "desc": "编辑保存共享账号部门分配",
        "id": "user-center.ali-cloud.sharedepart",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/mmp/share/acct/depart/update/{id}"
    },
    {
        "desc": "共享账号部门列表",
        "id": "user-center.ali-cloud.departsharelist",
        "method": "GET",
        "url": "alicloud/authsec/alicloud/mmp/share/sub/depart/list"
    },
    // 阿里云index账号管理
    {
        "desc": "导航",
        "id": "user-center.ali-cloud.index",
        "method": "POST",
        "url": "alicloud/authsec/alicloud/mmp/acct/type"
    },
]
