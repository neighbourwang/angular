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
    // 数据字典
    {
        "desc": "获取可订购云主机配置数据",
        "method": "GET",
        "id": "hosts.services.get",
        // "url": "marketplace/authsec/shopping/servicelist/vm"
        "url": "marketplace/authsec/shopping/servicelist/88/1/vm"
    },
    {
        "desc": "云主机订购",
        "method": "POST",
        "id": "hosts.order.add",
        "url": "marketplace/authsec/shopping/cart/vm"
    },
    /*
     * Cloud-Host Instance List
     */
    {
        "desc": "获取云主机列表",
        "method": "GET",
        "id": "hosts.instance.get",
        "url": "marketplace/authsec/subinstance/itemlist/vm/page/{page}/size/{size}"
    },
    {
        "desc": "云主机操作",
        "method": "POST",
        "id": "hosts.instance.action",
        "url": "marketplace/authsec/subinstance/itemlist/vm/action"
    },
    {
        "desc": "获取云主机详细信息",
        "method": "GET",
        "id": "hosts.instance.detail",
        "url": "marketplace/authsec/subinstance/itemlist/vm/{uuid}"
    },
    //镜像管理部分
    {
        "desc": "获取镜像列表",
        "method": "POST",
        "id": "image.mng.list",
        "url": "marketplace/authsec/images/page/{page}/size/{size}"
    },
    {
        "desc": "更新镜像信息",
        "method": "PUT",
        "id": "image.mng.update",
        "url": "/marketplace/authsec/image/{image_id}"
    },
    {
        "desc": "删除镜像信息",
        "method": "DELETE",
        "id": "image.mng.delete",
        "url": "/marketplace/authsec/image"
    },
    {
        "desc": "获取区域列表",
        "method": "GET",
        "id": "image.mng.area.list",
        "url": "/adminui/authsec/platforms/status/activation"
    }
    //<--费用中心-订单管理
    ,{
        "desc": "部门列表获取",
        "method": "GET",
        "id": "op-center.order-mng.department-list.get",
        "url": "NONE"        
    }
    ,{
        "desc": "区域获取",
        "method": "GET",
        "id": "op-center.order-mng.platform-list.get",
        "url": "/marketplace/authsec/platforms/status/activation"        
    }
    ,{
        "desc": "可用区获取",
        "method": "GET",
        "id": "op-center.order-mng.region-list.get",
        "url": "marketplace/authsec/platform/{_id}/zone"        
    }
    ,{
        "desc": "订单列表查询",
        "method": "POST",
        "id": "op-center.order-mng.order-list.get",
        "url": "marketplace/authsec/subscription/instances/search/paging"        
    }
    ,{
        "desc": "订单详情查询",
        "method": "GET",
        "id": "op-center.order-mng.order-detail.get",
        "url": "NONE"        
    },{
        "desc": "订单退订",
        "method": "GET",
        "id": "op-center.order-mng.order-cancel.get",
        "url": " marketplace/authsec/subscription/instance/{_subId}/cancel"        
    },{
        "desc": "订单续订",
        "method": "GET",
        "id": "op-center.order-mng.order-renew.get",
        "url": "marketplace/authsec/subscription/instance/{_subId}/renew"        
    },
    //费用中心-订单管理-->

    //用户中心
    //个人账户管理
    {
        "desc": "获取当前登录账户信息",
        "id": "user-center.person-acc.mng",
        "method": "GET",
        "url": "basis/authsec/mpp/user/current"
    },
    {
        "desc" : "编辑账户本地",
        "id" : "user-center.account-mng.edit",
        "method" : "PUT",
        "url" : "basis/authsec/mpp/user/{id}"
    },
    {
        "desc" : "更改账户密码",
        "id" : "user-center.account-mng-pwd.edit",
        "method" : "PUT",
        "url" : "basis/authsec/mpp/user/password/modify"
    },
]