import { RestApiModel } from '../model/rest';

export let RestApis: RestApiModel[] = [
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
        "desc": "登出",
        "id": "uaa.logout",
        "method": "GET",
        "url": "uaa/logout"
    },
    // 数据字典
    // 平台接入管理
    {
        "desc": "获取全部已创建平台信息",
        "id": "pf.conn.mng.platforms.get",
        "method": "GET",
        "url": "adminui/authsec/platforms/page/{page}/size/{size}"
    },
    {
        "desc": "获取地域",
        "id": "pf.cre.step.01.paltform.get",
        "method": "GET",
        "url": "basis/authsec/regions"
    },
    {
        "desc": "获取平台regiongs列表",
        "id": "pf.cre.step.01.paltformRegins.get",
        "method": "POST",
        "url": "adminui/authsec/regions"
    },
    {
        "desc": "创建平台",
        "id": "pf.cre.step.01.paltform.post",
        "method": "POST",
        "url": "adminui/authsec/platform"
    },
    {
        "desc": "取得特定平台信息",
        "id": "pf.cre.paltform.get",
        "method": "GET",
        "url": "adminui/authsec/platform/{pf-id}"
    },
    {
        "desc": "启用特定平台",
        "id": "pf.cre.paltform.active.get",
        "method": "GET",
        "url": "adminui/authsec/platform/{pf-id}/active"
    },
    {
        "desc": "启用特定平台",
        "id": "pf.cre.paltform.active.put",
        "method": "PUT",
        "url": "adminui/authsec/platform/{pf-id}/activation"
    },
    {
        "desc": "禁用平台",
        "id": "pf.cre.platform.disable.put",
        "method": "PUT",
        "url": "adminui/authsec/platform/{_id}/suspend"
    },
    {
        "desc": "删除特定平台信息",
        "id": "pf.cre.paltform.delete",
        "method": "DELETE",
        "url": "adminui/authsec/platform/{pf-id}"
    },
    {
        "desc": "取得资源同步数量信息",
        "id": "pf.cre.step.01.synchronize.count.get",
        "method": "GET",
        "url": "adminui/authsec/platform/{pf-id}/synchronizeCounts"
    },
    {
        "desc": "可用区同步",
        "id": "pf.cre.step.02.zones.synchronize.get",
        "method": "GET",
        "url": "adminui/authsec/platform/{pf-id}/zones/synchronize"
    },
    {
        "desc": "存储同步",
        "id": "pf.cre.step.02.storages.synchronize.get",
        "method": "GET",
        "url": "adminui/authsec/platform/{pf-id}/storages/synchronize"
    },
    {
        "desc": "volumetype同步",
        "id": "pf.cre.step.04.volumetype.synchronize.get",
        "method": "GET",
        "url": "adminui/authsec/platforms/{id}/volumetype/synchronize"
    },
    {
        "desc": "云主机类型同步",
        "id": "pf.cre.step.02.flavors.synchronize.get",
        "method": "GET",
        "url": "adminui/authsec/platform/{pf-id}/flavors/synchronize"
    },
    {
        "desc": "可用域同步",
        "id": "pf.cre.step.02.regions.synchronize.get",
        "method": "GET",
        "url": "adminui/authsec/platform/{pf-id}/regions/synchronize"
    },
    {
        "desc": "镜像同步",
        "id": "pf.cre.step.02.images.synchronize.get",
        "method": "GET",
        "url": "adminui/authsec/platform/{pf-id}/images/synchronize"
    },
   //platform   add
   {
        "desc": "取得特定平台信息",
        "id": "pf-mng-detail.get",
        "method": "GET",
        "url": "platformaccess/noauth/platforms/{id}"
    },
    {
        "desc": "UPdate平台信息",
        "id": "pf-mng-update.put",
        "method": "PUT",
        "url": "platformaccess/noauth/platform"
    },
    /////////////////////////////////////////可用区
    {
        "desc": "get同步可添加可用区信息",
        "id": "pf-mng-zonelist.get",
        "method": "GET",
        "url": "adminui/authsec/sync/platform/{id}/zones"
    },
    {
        "desc": "post同步可添加可用区信息",
        "id": "pf-mng-zonelist.post",
        "method": "POST",
        "url": "adminui/authsec/sync/platform/zones"
    },
    {
        "desc": "get可用区宿主机信息",
        "id": "pf-mng-zoneUpdate.get",
        "method": "GET",
        "url": "adminui/authsec/sync/platform/zones/{zoneId}/spec"
    },
    {
        "desc": "可用区宿主机信息",
        "id": "pf-mng-zoneUpdate.put",
        "method": "PUT",
        "url": "adminui/authsec/sync/platform/zones/spec"
    },
    {
        "desc": "启用平台可用区",
        "id": "pf-mng-zone.enable",
        "method": "GET",
        "url": "platformaccess/authsec/platform/zone/{id}/enable"
    },
    {
        "desc": "禁用平台可用区",
        "id": "pf-mng-zone.suspend",
        "method": "GET",
        "url": "platformaccess/authsec/platform/zone/{id}/suspend"
    },
    /////////////////////////////////存储区
    {
        "desc": "get同步可添加存储区信息",
        "id": "pf-mng-storagelist.get",
        "method": "GET",
        "url": "adminui/authsec/sync/platform/{id}/storages"
    },
    {
        "desc": "post同步可添加存储区信息",
        "id": "pf-mng-storagelist.post",
        "method": "POST",
        "url": "adminui/authsec/sync/platform/storages"
    },
    {
        "desc": "get存储区同步存储空间信息",
        "id": "pf-mng-storageUpdate.get",
        "method": "GET",
        "url": "adminui/authsec/sync/platform/storages/{id}/spec"
    },
    {
        "desc": "存储区同步存储空间信息",
        "id": "pf-mng-storageUpdate.put",
        "method": "PUT",
        "url": "adminui/authsec/sync/platform/storages/spec"
    },
    {
        "desc": "启用平台存储区",
        "id": "pf-mng-storage.enable",
        "method": "PUT",
        "url": "adminui/authsec/platform/storage/{id}/enable"
    },
    {
        "desc": "禁用平台存储区",
        "id": "pf-mng-storage.suspend",
        "method": "PUT",
        "url": "adminui/authsec/platform/storage/{id}/suspend"
    },
    //update镜像同步
    {
        "desc": "镜像同步",
        "id": "pf.cre.step.images.synchronize.get",
        "method": "GET",
        "url": "adminboe/authsec/images/sync/pub/{id}"
    },
    {
        "desc": "镜像同步",
        "id": "pf.cre.step.images.synchronize.post",
        "method": "POST",
        "url": "adminboe/authsec/images/sync/pub/{id}/sync"
    },
    {
        "desc": "宿主机同步",
        "id": "pf.cre.step.02.hosts.synchronize.get",
        "method": "GET",
        "url": "adminui/authsec/platform/{pf-id}/hosts/synchronize"
    },
    {
        "desc": "取得可用区资源",
        "id": "pf.cre.zone.get",
        "method": "GET",
        "url": "adminui/authsec/platform/{pf-id}/zone/quota"
    },
    {
        "desc": "更新可用区资源",
        "id": "pf.cre.step.03.zone.put",
        "method": "PUT",
        "url": "adminui/authsec/platform/{pf-id}/zone/quota"
    },
    {
        "desc": "取得存储资源",
        "id": "pf.cre.storage.get",
        "method": "GET",
        "url": "adminui/authsec/platform/{pf-id}/storage/quota"
    },
    {
        "desc": "更新存储资源",
        "id": "pf.cre.step.04.storage.put",
        "method": "PUT",
        "url": "adminui/authsec/platform/{pf-id}/storage/quota"
    },

    {
        "desc": "取得云主机类型",
        "id": "pf.cre.flavors.get",
        "method": "GET",
        "url": "adminui/authsec/platform/{pf-id}/flavors"
    },
    {
        "desc": "更新云主机类型",
        "id": "pf.cre.step.05.flavors.put",
        "method": "PUT",
        "url": "adminui/authsec/platform/{pf-id}/flavors"
    },
/////////////////////镜像guofeng接口
    {
        "desc": "取得镜像",
        "id": "pf.cre.images.get",
        "method": "GET",
        "url": "adminui/authsec/platform/{pf-id}/images"
        // /authsec/images/openstack/pub/{platformId}
    },
    {
        "desc": "更新镜像",
        "id": "pf.cre.images.put",
        "method": "PUT",
        "url": "adminui/authsec/platform/{pf-id}/images"
    },
//////镜像xiayang接口
    {
        "desc": "取得镜像",
        "id": "pf.cre.imageList.get",
        "method": "POST",
        "url": "adminboe/authsec/images/marketplace"
    },
    {
        "desc": "更新镜像",
        "id": "pf.cre.imageList.put",
        "method": "PUT",
        "url": "adminboe/authsec/platform/images"
    },

    {
        "desc": "取得云主机类型",
        "id": "pf.cre.flavor.get",
        "method": "GET",
        "url": "adminui/authsec/platform/{pf-id}/flavor"
    },
    {
        "desc": "更新云主机类型",
        "id": "pf.cre.step.05.flavor.put",
        "method": "PUT",
        "url": "adminui/authsec/platform/{pf-id}/flavor"
    },
    // 平台接入管理
    // 企业资源配额管理
    {
        "desc": "取得所有企业的资源配额信息",
        "id": "ent.res.quota.mng.resouces.quotas.get",
        "method": "GET",
        "url": "adminui/authsec/enterprises/resouces/quotas/page/{page}/size/{size}"
    },
    {
        "desc": "取得特定企业的资源配额信息",
        "id": "ent.res.quota.mng.resouces.ent.quotas.get",
        "method": "GET",
        "url": "adminui/authsec/enterprise/{ent-id}/resouces/quotas/page/{page}/size/{size}"
    },
    {
        "desc": "取得所有企业信息",
        "id": "ent.res.quota.mng.enterprises.get",
        "method": "GET",
        "url": "adminui/authsec/enterprises/simple/page/{page}/size/{size}"
    },
    {
        "desc": "取得所有区域信息",
        "id": "ent.res.quota.cre.regions.virtual.get",
        "method": "GET",
        "url": "adminui/authsec/regions/virtual"
    },
    {
        "desc": "创建企业资源配额信息",
        "id": "ent.res.quota.cre.post",
        "method": "POST",
        "url": "adminui/authsec/enterprise/{_enterpriseId}/resouce/quota"
    },
    // 企业资源配额管理
    // 服务目录管理
    {
        "desc": "获取全部服务目录",
        "method": "GET",
        "id": "pf-mng.svc-dir-mng.services.get",
        "url": "adminui/authsec/services"
    },
    {
        "desc": "获取全部地区列标",
        "method": "GET",
        "id": "pf-mng.svc-dir-mng.regions.get",
        "url": "adminui/authsec/regions/virtual"
    },
    {
        "desc": "更新服务目录信息",
        "id": "pf-mng.svc-dir-mng.services.update",
        "method": "PUT",
        "url": "adminui/authsec/platform/{platformid}/service"
    },
    {
        "desc": "删除单个服务目录",
        "id": "pf-mng.svc-dir-mng.services.remove",
        "method": "DELETE",
        "url": "adminui/authsec/platform/{platformid}/service"
    },
    {
        "desc": "删除多个服务目录",
        "id": "pf-mng.svc-dir-mng.services.removeAll",
        "method": "DELETE",
        "url": "adminui/authsec/platform/{platformid}/service"
    },
    {
        "desc": "更新服务目录状态.1:发布, 0:取消发布",
        "id": "pf-mng.svc-dir-mng.services.publish",
        "method": "PUT",
        "url": "adminui/authsec/platform/{platformid}/service"
    },
    {
        "desc": "获取全部服务模板列表",
        "id": "pf-mng.svc-dir-mng.servicetemplates.get",
        "method": "GET",
        "url": "adminui/authsec/servicetemplate"
    },
    {
        "desc": "获取全部主机配置列表",
        "id": "pf-mng.svc-dir-mng.flavors.get",
        "method": "GET",
        "url": "adminui/authsec/platform/{platformid}/flavor"
    },
    {
        "desc": "获取全部可用区列表",
        "id": "pf-mng.svc-dir-mng.zones.get",
        "method": "GET",
        "url": "adminui/authsec/platform/{platformid}/zone"
    },
    {
        "desc": "获取全部启动盘参数列表",
        "id": "pf-mng.svc-dir-mng.storages.get",
        "method": "GET",
        "url": "adminui/authsec/platform/{platformid}/storage/quota"
    },
    {
        "desc": "创建服务目录",
        "id": "pf-mng.svc-dir-mng.services.create",
        "method": "POST",
        "url": "adminui/authsec/platform/{_id}/service"
    },// 服务目录管理
    {
        "desc": "获取企业列表",
        "id": "ent-mng.admin.cre.enterprise.get",
        "method": "GET",
        "url": "adminui/authsec/enterprises/simple/page/{page}/size/{size} "
    },
    {
        "desc": "根据id获取简单企业信息",
        "id": "ent-mng.admin.enterprise.simple.get",
        "method": "GET",
        "url": "adminui/authsec/enterprise/{enterpriseId}/simple"
    },
    {
        "desc": "创建企业管理员",
        "id": "ent-mng.admin.cre.post",
        "method": "POST",
        "url": "adminui/authsec/enterprise/{enterpriseId}/admin"
    },
    {
        "desc": "根据id获取企业管理员",
        "id": "ent-mng.admin.get",
        "method": "GET",
        "url": "adminui/authsec/enterprise/admin/{id}"
    },
    {
        "desc": "更新企业管理员",
        "id": "ent-mng.admin.update.put",
        "method": "PUT",
        "url": "adminui/authsec/enterprise/admin/{id}"
    },
    {
        "desc": "批量更新企业管理员状态",
        "id": "ent-mng.admin.updateStatus.put",
        "method": "PUT",
        "url": "adminui/authsec/enterprise/admins/status/{status}"
    },
    {
        "desc": "更新企业管理员状态",
        "id": "ent-mng.admin.updateStatusOne.put",
        "method": "PUT",
        "url": "adminui/authsec/enterprise/admin/{id}/status/{status}"
    },
    {
        "desc": "删除企业管理员批量",
        "id": "ent-mng.admin.del.delete",
        "method": "DELETE",
        "url": "adminui/authsec/enterprises/admins"
    },
    {
        "desc": "删除單個企业管理员",
        "id": "ent-mng.admin.delOne.delete",
        "method": "DELETE",
        "url": "adminui/authsec/enterprise/admin/{id}"
    },
    {
        "desc": "重置管理员密码",
        "id": "ent-mng.admin.resetPassword.put",
        "method": "PUT",
        "url": "adminui/authsec/enterprise/admin/{adminId}/credential"
    },
    {
        "desc": "获取全部企业管理员",
        "id": "ent-mng.admin.all.get",
        "method": "GET",
        "url": "adminui/authsec/enterprises/admins/page/{page}/size/{size}"
    },
    {
        "desc": "获取某企业管理员",
        "id": "ent-mng.enterprise.admin.get",
        "method": "GET",
        "url": "adminui/authsec/enterprise/{enterpriseId}/admins/page/{page}/size/{size}"
    },
    {
        "desc": "获取某企业管AD员工",
        "id": "ent-mng.enterprise.adadmin.get",
        "method": "GET",
        "url": "adminui/authsec/enterprise/{enterpriseId}/adadmins/page/{page}/size/{size}"
    },
    // 企业产品管理
    {
        "desc": "获取产品",
        "id": "ent-mng.ent-prod-mng.all.get",
        "method": "GET",
        "url": "adminui/authsec/enterprises/products/page/{_page}/size/{_size}"
    },
    {
        "desc": "获取产品(企业)",
        "id": "ent-mng.ent-prod-mng.ent.all.get",
        "method": "GET",
        "url": "adminui/authsec/enterprise/{_enterpriseId}/products/page/{_page}/size/{_size}"

    },
    {
        "desc": "获取产品(区域)",
        "id": "ent-mng.ent-prod-mng.region.all.get",
        "method": "GET",
        "url": "adminui/authsec/enterprises/region/{_regionId}/products/page/{_page}/size/{_size}"
    },
    {
        "desc": "获取产品(企业/区域)",
        "id": "ent-mng.ent-prod-mng.ent.region.all.get",
        "method": "GET",
        "url": "adminui/authsec/enterprise/{_enterpriseId}/region/{_regionId}/product/page/{_page}/size/{_size}"
    },
    {
        "desc": "更改产品状态",
        "id": "ent-mng.ent-prod-mng.prod.status.put",
        "method": "PUT",
        "url": "adminui/authsec/enterprise/products/status/{_status}"
    },
    {
        "desc": "企业产品管理获取企业",
        "id": "ent-mng.ent-prod-cre.enterprises.get",
        "method": "GET",
        "url": "adminui/authsec/enterprises/simple/page/{page}/size/{size} "
    },
    {
        "desc": "企业产品管理获取区域",
        "id": "ent-mng.ent-prod-cre.regions.get",
        "method": "GET",
        "url": "adminui/authsec/regions/virtual"
    },
    {
        "desc": "企业产品管理获取服务目录",
        "id": "ent-mng.ent-prod-cre.directories.get",
        "method": "GET",
        "url": "adminui/authsec/region/{region_id}/serviceitem"
    },
    {
        "desc": "企业产品管理获取所有可用区",
        "id": "ent-mng.ent-prod-cre.storages.get",
        "method": "GET",
        "url": "adminui/authsec/platform/{pf_id}/flavor"
    },
    {
        "desc": "创建产品",
        "id": "ent-mng.ent-prod-cre.creation",
        "method": "POST",
        "url": "adminui/authsec/enterprise/{enterpriseId}/product "
    },
    {
        "desc": "更改产品价格",
        "id": "ent-mng.prod-mng/price-edit",
        "method": "PUT",
        "url": "adminui/authsec/product/billing "
    },
    // <-- 企业管理
    {
        "desc": "获取企业开通配额",
        "id": "ent-mng.ent-est-mng.resourcequota.get",
        "method": "GET",
        "url": "adminui/authsec/platforms/resoucequotas/page/{_page}/size/{_size}"
    }
    , {
        "desc": "企业信息列表",
        "id": "ent-mng.ent-est-mng.enterprise.get",
        "method": "GET",
        "url": "adminui/authsec/enterprises/resouces/quotas/page/{_page}/size/{_size}"
    }
    , {
        "desc": "加载企业配额数据",
        "id": "ent-mng.ent-est-mng.enterprise.resourcequota.get",
        "method": "GET",
        "url": "adminui/authsec/enterprise/{_enterpriseId}/resouces/quotas/page/{_page}/size/{_size}"
    }, {
        "desc": "获取企业基本信息",
        "id": "ent-mng.ent-est-mng.enterprise.simple.get",
        "method": "GET",
        "url": "adminui/authsec/enterprise/{_enterpriseId}/simple"
    }
    , {
        "desc": "创建企业",
        "id": "ent-mng.ent-est-mng.enterprise.create",
        "method": "POST",
        "url": "adminui/authsec/enterprise"
    }
    , {
        "desc": "更新企业名称",
        "id": "ent-mng.ent-est-mng.enterprise.updatename",
        "method": "PUT",
        "url": "adminui/authsec/enterprise/{_enterpriseId}/basic"
    }
    , {
        "desc": "更新企业配额数据",
        "id": "ent-mng.ent-est-mng.enterprise.updatequota",
        "method": "PUT",
        "url": "adminui/authsec/enterprise/{_enterpriseId}/resouces/quotas"
    }
    , {
        "desc": "更新企业认证信息数据",
        "id": "ent-mng.ent-est-mng.enterprise.updateauth",
        "method": "PUT",
        "url": "adminui/authsec/enterprise/{_enterpriseId}/auth"
    }
    , {
        "desc": "更新企业企业状态",
        "id": "ent-mng.ent-est-mng.enterprise.updatestatus",
        "method": "PUT",
        "url": "adminui/authsec/enterprise/{_enterpriseId}/status/{_status}"
    }
    , {
        "desc": "企业配额信息提交",
        "id": "ent-mng.ent-est-mng.resourcequota.create",
        "method": "POST",
        "url": "adminui/authsec/enterprise/{_enterpriseId}/resouce/quota"
    }
    , {
        "desc": "企业开通",
        "id": "ent-mng.ent-est-mng.enterprise.open",
        "method": "PUT",
        "url": "adminui/authsec/enterprise/{_enterpriseId}/status/{_status}"
    }, {
        "desc": "获取已选中企业产品",
        "id": "ent-mng.ent-est-mng.enterprise.products.get",
        "method": "POST",
        "url": "adminui/authsec/enterprise/{enterpriseId}/products/list"
    }, {
        "desc": "获取未选中产品",
        "id": "ent-mng.ent-est-mng.enterprise.avail.products.get",
        "method": "POST",
        "url": "adminui/authsec/enterprises/{enterpriseId}/products/search/paging"
    }, {
        "desc": "所有平台配额参考",
        "id": "ent-mng.ent-est-mng.platforms.quotas.get",
        "method": "GET",
        "url": "adminui/authsec/platforms/resouces/quotas/page/{_page}/size/{_size}"
    }, {
        "desc": "更新企业产品信息",
        "id": "ent-mng.ent-est-mng.enterprise.products.update",
        "method": "POST",
        "url": "adminui/authsec/enterprises/{enterpriseId}/products/bind"
    }, {
        "desc": "查看企业加载配额资源概率",
        "id": "ent-mng.ent-est-mng.enterprise.quota.detail",
        "method": "GET",
        "url": "adminui/authsec/enterprise/{enterpriseId}/resource/quota/detail"
    },{
        "desc": "管理可用平台已选择平台",
        "id": "ent-mng.ent-est-mng.enterprise.platform.selected",
        "method": "GET",
        "url": "adminui/authsec/enterprises/{_enterpriseId}/platforms"
    },{
        "desc": "管理可用平台未选择平台",
        "id": "ent-mng.ent-est-mng.enterprise.platform",
        "method": "GET",
        "url": "adminui/authsec/platforms/enterprises/{_enterpriseId}"
    },{
        "desc": "管理可用平台保存",
        "id": "ent-mng.ent-est-mng.enterprise.platform.save",
        "method": "PUT",
        "url": "adminui/authsec/enterprise/{_enterpriseId}/platforms/ids"
    },{
        "desc": "企业详情-扩展信息",
        "id": "ent-mng.ent-est-mng.enterprise.detail.ext",
        "method": "GET",
        "url": "adminui/authsec/enterprise/{_enterpriseId}/ext"
    },{
        "desc": "创建企业-判断名称是否存在",
        "id": "ent-mng.ent-est-mng.ent-mng-cre.check-name.post",
        "method": "POST",
        "url": "adminui/authsec/enterprise/query"
    },
    
    
    // 企业管理 -->
    //<!--后台-运营中心-订单管理
    {
        "desc": "订单查询详情",
        "id": "op-center.order-search.detail.get",
        "method": "GET",
        "url": "adminui/authsec/backend/order/{orderNo}/detail"
    },
     {
        "desc": "订单查询撤单",
        "id": "op-center.order-search.cencel.post",
        "method": "POST",
        "url": "adminui/authsec/order/withdraw/order/{orderId}/reason/{reason}"
    },
    {
        "desc": "企业列表",
        "id": "op-center.order-mng.ent-list.get",
        "method": "GET",
        "url": "adminui/authsec/enterprises/simple"
    },
    {
        "desc": "部门列表",
        "id": "op-center.order-mng.department-list.get",
        "method": "GET",
        "url": "basis/authsec/adm/organization/enterprise/{enterpriseId}"
    }, {
        "desc": "区域列表",
        "id": "op-center.order-mng.region-list.get",
        "method": "GET",
        "url": "adminui/authsec/platforms/status/activation"
    }, {
        "desc": "可用区列表",
        "id": "op-center.order-mng.avail-region-list.get",
        "method": "GET",
        "url": "adminui/authsec/platform/{_id}/zone"
    }
    // ,{
    //     "desc": "订购人列表",
    //     "id": "op-center.order-mng.buyer-list.get",
    //     "method": "GET",
    //     "url": "adminui/authsec/approval/department/{departmentId}/users"
    // }
    , {
        "desc": "已购服务管理列表",
        "id": "op-center.order-mng.order-list.post",
        "method": "POST",
        "url": "adminui/authsec/subinstance/subscription/list"
    },{
        "desc": "已购服务管理详情",
        "id": "op-center.order-mng.subinstance-detail.post",
        "method": "POST",
        "url": "adminui/authsec/subinstance/{subinstanceCode}/detail"
    },{
        "desc": "订单续订",
        "id": "op-center.order-mng.order-renew.get",
        "method": "POST",
        "url": "adminui/authsec/order/{orderId}/renew"
    }, {
        "desc": "续订费用",
        "id": "op-center.order-mng.order-renew-price.get",
        "method": "GET",
        "url": "marketplace/authsec/subscription/instance/{_subId}/price"
    }, {
        "desc": "订单退订",
        "id": "op-center.order-mng.order-cancel.get",
        "method": "GET",
        "url": "adminui/authsec/shopping/subinstance/{_subId}/cancel"
    }, {
        "desc": "订单查询列表",
        "id": "op-center.order-mng.search-list.post",
        "method": "POST",
        "url": "adminui/authsec/order/search/paging"
    },
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

    //<!--后台-运营中心-订单管理-->
    //
    //产品管理
    {
        "desc": "分页获取所有产品目录",
        "id": "prod-mng.prod-dir-mng.list.get",
        "method": "POST",
        "url": "adminui/authsec/services/pagging"
    },
    {
        "desc": "获取所有已激活云平台, 为下拉框准备",
        "id": "platforms.activation.get",
        "method": "GET",
        "url": "adminui/authsec/platforms/status/activation"
    },
    {
        "desc": "获取所有产品目录类别，为下拉框准备",
        "id": "services.simple.get",
        "method": "GET",
        "url": "adminui/authsec/servicetemplate"
    },
    {
        "desc": "获取所有产品目录规格，为下拉框准备",
        "id": "services.flavors.get",
        "method": "POST",
        "url": "adminui/authsec/services/flavors"
    },
    {
        "desc": "发布产品目录",
        "id": "prod-dir-publish",
        "method": "PUT",
        "url": "adminui/authsec/service/{id}/status/activation"
    },
    {
        "desc": "取消发布产品目录",
        "id": "prod-dir-ccPublish",
        "method": "PUT",
        "url": "adminui/authsec/service/{id}/status/cancelled"
    },
    {
        "desc": "删除产品目录",
        "id": "prod-dir-delete",
        "method": "DELETE",
        "url": "adminui/authsec/service/{id}"
    },
    //VM产品目录
    {
        "desc": "创建VM产品目录",
        "id": "prod-dir-vmCreate",
        "method": "POST",
        "url": "adminui/authsec/services/type/vm"
    },
    {
        "desc": "根据cpu和mmr获取平台VM产品平台列表",
        "id": "prod-dir-vmPlate",
        "method": "POST",
        "url": "adminui/authsec/services/platforms/vm/detailinfo"
    },
    {
        "desc": "获取某个VM产品目录详细信息",
        "id": "prod-mng.prod-dir-vm.detail",
        "method": "GET",
        "url": "adminui/authsec/service/{id}/type/vm/detail "
    },
    //DISK产品目录
    {
        "desc": "获取DISK产品目录平台信息",
        "id": "prod-mng.prod-disk-dir.plateforms",
        "method": "GET",
        "url": "adminui/authsec/services/platforms/disk/detailinfo "
    },
    {
        "desc": "创建DISK产品目录",
        "id": "prod-mng.prod-disk-dir.create",
        "method": "POST",
        "url": "adminui/authsec/services/type/disk "
    },
    {
        "desc": "获取某个DISK产品目录详细信息",
        "id": "prod-mng.prod-dir-disk.detail",
        "method": "GET",
        "url": "adminui/authsec/services/{id}/disk/"
    },
    //产品
    {
        "desc": "条件查询所有产品列表",
        "id": "prod-mng.prod-mng.list.get",
        "method": "POST",
        "url": "adminui/authsec/enterprises/products/search/page/{page}/size/{size}"
    },
    {
        "desc": "新建产品",
        "id": "prod-mng.prod-mng.prod-cre.post",
        "method": "POST",
        "url": "adminui/authsec/enterprises/product"
    },
    {
        "desc": "获取企业列表",
        "id": "prod-mng.prod-enterprise.list",
        "method": "GET",
        "url": "adminui/authsec/enterprises/simple "
    },
    {
        "desc": "根据平台获取企业列表",
        "id": "prod-mng.prod-enterprise.post",
        "method": "POST",
        "url": "adminui/authsec/enterprises/items"
    },

    {
        "desc": "获取产品目录列表",
        "id": "prod-mng.prod-dir.list",
        "method": "GET",
        "url": "adminui/authsec/services/simple "
    },
    {
        "desc": "更新产品状态",
        "id": "prod-mng.prod-mng.updateStatus",
        "method": "PUT",
        "url": "adminui/authsec/enterprises/products/status"
    },
    {
        "desc": "获取产品详细信息",
        "id": "prod-mng.prod-mng.detail",
        "method": "GET",
        "url": "adminui/authsec/enterprises/product/{id} "
    },
    {
        "desc": "获取产品历史价格信息",
        "id": "prod-mng.prod-mng.historyPrice",
        "method": "GET",
        "url": "adminui/authsec/product/{id}/historyBilling"
    },

    //用户中心
    {
        "desc": "获取所有机构",
        "id": "user-center.org-mng.list",
        "method": "GET",
        "url": "basis/authsec/adm/organizations/page/{page}/size/{size}"
    },
    {
        "desc": "删除机构",
        "id": "user-center.org-mng.delete",
        "method": "DELETE",
        "url": "basis/authsec/adm/organization/{id}"
    },
    {
        "desc": "启用机构",
        "id": "user-center.org-mng.enable",
        "method": "PUT",
        "url": "basis/authsec/adm/organization/{id}/enable"
    },
    {
        "desc": "禁用机构",
        "id": "user-center.org-mng.disable",
        "method": "PUT",
        "url": "basis/authsec/adm/organization/{id}/disable"
    },
    {
        "desc": "获取所有账户(所有)",
        "id": "user-center.account-mng.list",
        "method": "GET",
        "url": "basis/authsec/adm/users/page/{page}/size/{size}"
    },
    {
        "desc" : "用户中心，帐号管理，搜索帐号列表By用户名",
        "id" : "user-center.search-account.list",
        "method" : "GET",
        "url" : "basis/authsec/adm/users/search/page/{page}/size/{size}"
    },
    {
        "desc": "获取所有角色",
        "id": "user-center.role-mng.list",
        "method": "GET",
        "url": "basis/authsec/adm/roles/page/{page}/size/{size}"
    },
    {
        "desc": "创建帐号（本地）",
        "id": "user-center.account-mng.local.create",
        "method": "POST",
        "url": "basis/authsec/adm/user"
    },
    //账号管理
    {
        "desc" : "验证账号的唯一性",
        "id" : "user-center.account-mng.loginNameValid",
        "method" : "GET",
        "url" : "basis/authsec/adm/user/{_loginName}/validation"
    },
    {
        "desc": "编辑帐号（本地）",
        "id": "user-center.account-mng.local.edit",
        "method": "PUT",
        "url": "basis/authsec/adm/user/{id}"
    },
    {
        "desc": "用户中心 查询符合条件的AD用户",
        "id": "user-center.account-mng.aduser.get",
        "method": "POST",
        "url": "basis/authsec/ldap/{ldapid}/adusers/page/{page}/size/{size}"
    },
    {
        "desc": "查询单个帐号",
        "id": "user-center.account-mng.local.get",
        "method": "GET",
        "url": "basis/authsec/adm/user/{id}"
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
        "desc": "获取未管理人员列表",
        "id": "user-center.org-mng.nomnguser.list",
        "method": "GET",
        "url": "basis/authsec/adm/users/nonorganization/page/{page}/size/{size}"
    },
    {
        "desc": "获取未管理的云平台",
        "id": "user-center.org-mng.nomngplatform.list",
        "method": "GET",
        "url": "basis/authsec/adm/organization/platforms/nonorganization"
    },
    {
        "desc": "创建机构",
        "id": "user-center.org-mng.create",
        "method": "POST",
        "url": "basis/authsec/adm/organization"
    },
    {
        "desc": "获得单个机构",
        "id": "user-center.org-mng.account.get",
        "method": "GET",
        "url": "basis/authsec/adm/organization/{id}"
    },
    {
        "desc": "获得机构下的成员",
        "id": "user-center.org-mng.user-by-org.list",
        "method": "GET",
        "url": "basis/authsec/adm/users/organization/{id}"
    },

    {
        "desc": "禁用帐号",
        "id": "user-center.org-mng.user.disable",
        "method": "PUT",
        "url": "basis/authsec/adm/user/{id}/disable"
    },
    {
        "desc": "启用帐号",
        "id": "user-center.org-mng.user.enable",
        "method": "PUT",
        "url": "basis/authsec/adm/user/{id}/enable"
    },
    {
        "desc": "获取权限列表",
        "id": "user-center.org-mng.role.list",
        "method": "GET",
        "url": "basis/authsec/adm/roles/page/{page}/size/{size}"
    },
    {
        "desc" : "编辑机构",
        "id" : "user-center.org-mng.edit",
        "method" : "PUT",
        "url" : "basis/authsec/adm/organization/{id}"
    },
    {
        "desc" : "用户中心，账户管理修改密码",
        "id" : "user-center.account-mng.resetPassword",
        "method" : "PUT",
        "url" : "basis/authsec/adm/user/{id}/resetPassword"
    },
    {
        "desc" : "用户中心，账户管理删除",
        "id" : "user-center.account-mng.deleteAccount",
        "method" : "DELETE",
        "url" : "basis/authsec/adm/user/{id}"
    },
    {
        "desc" : "用户中心，角色管理，获得角色详情",
        "id" : "user-center.role-mng.detail",
        "method" : "GET",
        "url" : "basis/authsec/adm/menu/tree/{id}"
    },
    {
        "desc" : "用户中心，角色管理，权限树",
        "id" : "user-center.role-mng.roleTree",
        "method" : "GET",
        "url" : "basis/authsec/adm/menu/tree"
    },

    //个人账户管理
    {
        "desc": "获取当前登录账户信息",
        "id": "user-center.person-acc.mng",
        "method": "GET",
        "url": "basis/authsec/adm/user/current"
    },
    {
        "desc": "编辑账户本地",
        "id": "user-center.account-mng.edit",
        "method": "PUT",
        "url": "basis/authsec/adm/user/{id}"
    },
    {
        "desc": "更改账户密码",
        "id": "user-center.account-mng-pwd.edit",
        "method": "PUT",
        "url": "basis/authsec/adm/user/password/modify"
    },
    //认证管理
    {
        "desc": "获取认证源列表",
        "id": "user-center.attest-mng.list",
        "method": "GET",
        "url": "basis/authsec/ldaps/page/{page}/size/{size}"
    },
    {
        "desc": "认证源测试",
        "id": "user-center.attest-mng.ldap.test",
        "method": "POST",
        "url": "basis/authsec/ldap/test"
    },
    {
        "desc": "创建认证源",
        "id": "user-center.attest-mng.ldap.create",
        "method": "POST",
        "url": "basis/authsec/ldap"
    },
    {
        "desc": "获取认证源详情",
        "id": "user-center.attest-mng.ldap.get",
        "method": "GET",
        "url": "basis/authsec/ldap/{id}"
    },
    {
        "desc": "编辑认证源",
        "id": "user-center.attest-mng.ldap.edit",
        "method": "PUT",
        "url": "basis/authsec/ldap/{id}"
    },
    {
        "desc": "修改认证帐户",
        "id": "user-center.attest-mng.ldap.editacc",
        "method": "PUT",
        "url": "basis/authsec/ldap/{id}/account"
    },
    {
        "desc": "删除认证源",
        "id": "user-center.attest-mng.ldap.delete",
        "method": "DELETE",
        "url": "basis/authsec/ldap/{id}"
    },
    {
        "desc": "启用/禁用认证源",
        "id": "user-center.attest-mng.ldap.edit.status",
        "method": "PUT",
        "url": "basis/authsec/ldap/{id}/status/{status}"
    },
    {
        "desc": "查询AD用户",
        "id": "user-center.attest-mng.ldap.adusers.list",
        "method": "POST",
        "url": "basis/authsec/ldap/{id}/adusers/page/{page}/size/{size}"
    },
    {
        "desc": "认证源简单列表（下拉框）",
        "id": "user-center.attest-mng.ldap.attest.simple.list",
        "method": "GET",
        "url": "basis/authsec/ldaps/simple"
    },
    {
        "desc": "创建企业认证源",
        "id": "ent-mng.enterprise.ldap.create",
        "method": "POST",
        "url": "basis/authsec/enterprise/{enterpriseId}/ldap"
    },
    {
        "desc": "获取企业认证源列表",
        "id": "ent-mng.enterprise.ldap.list",
        "method": "GET",
        "url": "basis/authsec/enterprise/{enterpriseId}/ldaps/page/{page}/size/{size}"
    },
    {
        "desc": "获取企业认证源列表（下拉框）",
        "id": "ent-mng.enterprise.ldap.simple.list",
        "method": "GET",
        "url": "basis/authsec/enterprise/{enterpriseId}/ldaps/simple"
    },

    //Vmware 端口
    {
        "desc": "获取端口组资源分配列表",
        "id": "net-mng.vmware.dc.list",
        "method": "GET",
        "url": "adminboe/authsec/platform/{pid}/vmware/network/dclist"
    },
    {
        "desc": "获取端口组资源分配列表",
        "id": "net-mng.vmware.port.list",
        "method": "GET",
        "url": "adminboe/authsec/platform/{pid}/vmware/network/portresource"
    },
    {
        "desc": "获取端口资源企业列表",
        "id": "net-mng.vmware.port.enterprise.list",
        "method": "GET",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/{id}/set/ent"
    },
    {
        "desc": "获取端口资源设置企业保存",
        "id": "net-mng.vmware.port.enterprise.save",
        "method": "POST",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/{id}/save/ent"
    },
    //VMware最外层导航页
    {
        "desc": "区域联动列表",
        "id": "net-mng.vmware-index.regionlist.get",
        "method": "GET",
        "url": "adminboe/authsec/vmware/network/main/regionlist"
    },
    {
        "desc": "集群列表",
        "id": "net-mng.vmware-index.clusterlist.get",
        "method": "GET",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/main/clusterlist"
    },
    {
        "desc": "NSX管理信息",
        "id": "net-mng.vmware-index.nsxinfo.get",
        "method": "GET",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/main/nsxinfo/get"
    },
    {
        "desc": "保存NSX管理信息",
        "id": "net-mng.vmware-index.nsxinfo.save",
        "method": "PUT",
        "url": "adminboe/authsec/vmware/network/main/nsxinfo/save"
        //"url": "adminboe/authsec/platform/{platform_id}/vmware/network/main/nsxinfo/save"
    },
    {
        "desc": "测试NSX管理信息",
        "id": "net-mng.vmware-index.nsxinfo.test",
        "method": "POST",
        "url": "adminboe/authsec/vmware/network/main/nsxinfo/test"
        //"url": "adminboe/authsec/platform/{platform_id}/vmware/network/main/nsxinfo/test"
    },
    {
        "desc": "更改网络类型",
        "id": "net-mng.vmware-index.network.changetype",
        "method": "PUT",
        "url": "adminboe/authsec/vmware/network/main/changetype/clusterid/{cluster_id}"
    },
    {
        "desc": "验证NSX管理信息",
        "id": "net-mng.vmware-index.nsxstatus.validate",
        "method": "GET",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/main/nsxinfo/validate"
    },
    //IP地址管理[标准网络]
    {
        "desc": "标准网络列表",
        "id": "net-mng.vmware.network.list",
        "method": "GET",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/getlist"
    },
    {
        "desc": "获取DC/Cluster值",
        "id": "net-mng.vmware.dclist.get",
        "method": "GET",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/dclist"

    },
    {
        "desc": "获取IP子网信息或IP范围",
        "id": "net-mng.vmware.subnetinfo.ips.get",
        "method": "GET",
        "url": "adminboe/authsec/vmware/network/portGroup/{portGroup_id}"

    },
    {
        "desc": "获取IP地址管理列表",
        "id": "net-mng.vmware.ipmng.list",
        "method": "GET",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/portGroup"
    },
    {
        "desc": "获取IP使用情况列表",
        "id": "net-mng.vmware.ipusagemng.list",
        "method": "GET",
        "url": "adminboe/authsec/vmware/network/portGroup/{portGroup_id}/ip"
    },
    {
        "desc": "IP地址占用",
        "id": "net-mng.vmware.subnetip.occupy",
        "method": "PUT",
        "url": "adminboe/authsec/vmware/network/portGroup/ip/{ip_id}/occupy"
    },
    {
        "desc": "IP地址释放",
        "id": "net-mng.vmware.subnetip.release",
        "method": "PUT",
        "url": "adminboe/authsec/vmware/network/portGroup/ip/{ip_id}/release"
    },
    {
        "desc": "设置IP子网",
        "id": "net-mng.vmware.subnet.setup",
        "method": "PUT",
        "url": "adminboe/authsec/vmware/network/portGroup/{portGroup_id}/subnet"
    },
    {
        "desc": "设置子网IP范围",
        "id": "net-mng.vmware.subnetips.setup",
        "method": "PUT",
        "url": "adminboe/authsec/vmware/network/portGroup/{portGroup_id}/subnetRange"
    },
    //IP地址管理[分布式网络]
    {
        "desc": "获取IP地址管理列表",
        "id": "net-mng.vmware.dbt.ipmng.list",
        "method": "GET",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/dist/iplist"
    },
    {
        "desc": "获取DC/Switch值",
        "id": "net-mng.vmware.dbt.dclist.get",
        "method": "GET",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/dist/dclist"

    },
    {
        "desc": "获取IP子网信息及IP范围",
        "id": "net-mng.vmware.dbt.subnetinfo.ips.get",
        "method": "GET",
        "url": "adminboe/authsec/vmware/network/dist/{id}/getsub"
    },
    {
        "desc": "设置IP子网",
        "id": "net-mng.vmware.dbt.subnet.setup",
        "method": "PUT",
        "url": "adminboe/authsec/vmware/network/dist/{id}/subnet"
    },
    {
        "desc": "设置子网IP范围",
        "id": "net-mng.vmware.dbt.subnetips.setup",
        "method": "PUT",
        "url": "adminboe/authsec/vmware/network/dist/{id}/subnetRange"
    },
    {
        "desc": "获取IP使用情况列表",
        "id": "net-mng.vmware.dbt.ipusagemng.list",
        "method": "GET",
        "url": "adminboe/authsec/vmware/network/dist/{id}/ipmgmlist"
    },
    {
        "desc": "IP地址占用",
        "id": "net-mng.vmware.dbt.subnetip.occupy",
        "method": "PUT",
        "url": "adminboe/authsec/vmware/network/dist/ip/{id}/occupy"
    },
    {
        "desc": "IP地址释放",
        "id": "net-mng.vmware.dbt.subnetip.release",
        "method": "PUT",
        "url": "adminboe/authsec/vmware/network/dist/ip/{id}/release"
    },
    //IP地址管理[NSX网络]
    {
        "desc": "获取IP地址管理列表",
        "id": "net-mng.vmware.nsx.ipmng.list",
        "method": "GET",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/nsx/iplist"
    },
    {
        "desc": "获取DLR值",
        "id": "net-mng.vmware.nsx.dclist.get",
        "method": "GET",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/nsx/dlrlist"

    },
    {
        "desc": "获取IP子网信息及IP范围",
        "id": "net-mng.vmware.nsx.subnetinfo.ips.get",
        "method": "GET",
        "url": "adminboe/authsec/vmware/network/nsx/getport/{port_id}"
    },
    {
        "desc": "设置子网IP范围",
        "id": "net-mng.vmware.nsx.subnetips.setup",
        "method": "PUT",
        "url": "adminboe/authsec/vmware/network/nsx/{id}/subnetRange"
    },
    {
        "desc": "获取IP使用情况列表",
        "id": "net-mng.vmware.nsx.ipusagemng.list",
        "method": "GET",
        "url": "adminboe/authsec/vmware/network/nsx/{id}/ipmgmlist"
    },
    {
        "desc": "IP地址占用",
        "id": "net-mng.vmware.nsx.subnetip.occupy",
        "method": "PUT",
        "url": "adminboe/authsec/vmware/network/nsx/ip/{id}/occupy"
    },
    {
        "desc": "IP地址释放",
        "id": "net-mng.vmware.nsx.subnetip.release",
        "method": "PUT",
        "url": "adminboe/authsec/vmware/network/nsx/ip/{id}/release"
    },
      //云网络管理
        //openstack
    {
        "desc": "获取Openstack网络列表",
        "id": "net-mng.openstack.net.list",
        "method": "POST",
        "url": "openstacknetworkmgmt/authsec/openstack/network/page/{page}/size/{size}"
    },
    {
        "desc": "获取同步网络列表",
        "id": "net-mng.openstack.net.syn.list",
        "method": "GET",
        "url": "openstacknetworkmgmt/authsec/{platform_id}/openstack/networkSync/{eids}"
    },
    {
        "desc": "获取地域数据中心数据平台选项",
        "id": "net-mng.openstack.net.region_option",
        "method": "GET",
        //"url": "adminboe/authsec/openstack/network/queryCondition"
        "url": "openstacknetworkmgmt/authsec/openstack/network/queryCondition "
    },
    {
        "desc": "同步网络（单个、多个）添加",
        "id": "net-mng.openstack.net.syn.add",
        "method": "POST",
        "url": "openstacknetworkmgmt/authsec/openstack/network"
    },
    {
        "desc": "同步网络（单个、多个）网络更新",
        "id": "net-mng.openstack.net.syn.update",
        "method": "PUT",
        "url": "openstacknetworkmgmt/authsec/openstack/network/sync"

    },
    {
        "desc": "同步网络（单个、多个）网络禁用",
        "id": "net-mng.openstack.net.syn.disable",
        "method": "PUT",
        "url": "openstacknetworkmgmt/authsec/openstack/network/disable"

    },
    {
        "desc": "更改网络显示名称",
        "id": "net-mng.openstack.net.updatename",
        "method": "PUT",
        "url": "openstacknetworkmgmt/authsec/openstack/network/displayName"

    },{
        "desc": "openstack启用网络",
        "id": "net-mng.openstack.net.networkStart",
        "method": "PUT",
        "url": "openstacknetworkmgmt/authsec/openstack/network/{id}/enable"

    },{
        "desc": "openstack禁用网络",
        "id": "net-mng.openstack.net.networkStop",
        "method": "PUT",
        "url": "openstacknetworkmgmt/authsec/openstack/network/{id}/disable"

    }
    // 审批中心

    ,{
        "desc": "查询待审批/已审批订单",
        "id": "check-center.not-checked.list",
        "method": "POST",
        "url": "adminui/authsec/backend/approval/orders/search/paging"
    }
    ,{
        "desc": "获取订购人、提交者列表",
        "id": "check-center.user-list.get",
        "method": "GET",
        "url": "adminui/authsec/approval/department/{departmentId}/users"
    }
    ,{
        "desc": "获取审批人列表",
        "id": "check-center.approver-list.get",
        "method": "GET",
        "url": "adminui/authsec/approval/department/{departmentId}/approvers"
    }
    ,{
        "desc": "审批拒绝/通过",
        "id": "check-center.approve-refust.post",
        "method": "POST",
        "url": "adminui/authsec/backend/approval/order/{orderId}/operation/{operation}/reasons/{reason} "
    }
    ,{
        "desc": "获取审批意见",
        "id": "check-center.approve-info.get",
        "method": "GET",
        "url": "adminui/authsec/backend/approval/history/order/{orderId}"
    },{
        "desc": "获取审批设置列表",
        "id": "check-center.approval-set-list.get",
        "method": "GET",
        "url": "adminui/authsec/enterprises/simple/page/{_page}/size/{_size}"
    },{
        "desc": "设置自动审批时间",
        "id": "check-center.approval.auto-set",
        "method": "PUT",
        "url": "adminui/authsec/enterprise/audit"
    }
    // 审批中心
    //云网络管理
    // vmware标准网络
    , {
        "desc": "获取标准网络列表",
        "id": "net-img.vm-mng.network.list",
        "method": "GET",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/getlist"
    }
    , {
        "desc": "获取标准网络数据中心列表",
        "id": "net-img.vm-mng.network.dclist",
        "method": "GET",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/dclist"
    }
    , {
        "desc": "标准网络启用",
        "id": "net-img.vm-mng.network.enable",
        "method": "PUT",
        "url": "adminboe/authsec/vmware/network/{id}/enable"
    }
    , {
        "desc": "标准网络禁用",
        "id": "net-img.vm-mng.network.disable",
        "method": "PUT",
        "url": "adminboe/authsec/vmware/network/{id}/disable"
    }
    , {
        "desc": "标准网络删除",
        "id": "net-img.vm-mng.network.remove",
        "method": "PUT",
        "url": "adminboe/authsec/vmware/network/{id}/remove"
    }
    , {
        "desc": "创建/编辑标准网络",
        "id": "net-img.vm-mng.network.update",
        "method": "POST",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/update"
    },



    ////云主机管理-镜像管理-
    //镜像管理导航页
    {
        "desc": "获取平台列表-img-index",
        "id": "host-mng.img-index.platforms.list",
        "method": "GET",
        "url": "adminboe/authsec/platforms/page/{page}/size/{size}"
    }
    //openstack镜像管理
    , {
        "desc": "获取镜像列表-openstack",
        "id": "host-mng.openstack-mng.image.list",
        "method": "POST",
        "url": "adminboe/authsec/images/openstack/{platformId}/page/{page}/size/{size}"
    },
    {
        "desc": "镜像openstack保存编辑",
        "id": "host-mng.openstack-mng.image.saveedit",
        "method": "PUT",
        "url": "adminboe/authsec/image/{id}"
    },
    {
        "desc": "镜像openstack启用禁用",
        "id": "host-mng.openstack-mng.image.EDable",
        "method": "PUT",
        "url": "adminboe/authsec/image/{id}/{status}"
    },
    {
        "desc": "企业下拉列表",
        "id": "host-mng.openstack-mng.image.tenantlist",
        "method": "GET",
        "url": "adminboe/authsec/images/{platformId}/tenants/dropdown"
    },
    {
        "desc": "Openstack_同步公共镜像_获取镜像列表",
        "id": "host-mng.openstack-mng.image.sync-public.getlist",
        "method": "GET",
         "url": "adminboe/authsec/images/openstack/pub/{platformId}"
    },
    {
        "desc": "Openstack_同步公共镜像_同步",
        "id": "host-mng.openstack-mng.image.sync-public.sync",
        "method": "POST",
         "url": "adminboe/authsec/images/openstack/pub/{platformId}/sync"
    },
    {
        "desc": "Openstack_同步企业镜像_获取镜像列表",
        "id": "host-mng.openstack-mng.image.sync-ent.getlist",
        "method": "POST",
         "url": "adminboe/authsec/images/openstack/ent/{platformId}"
    },
    {
        "desc": "Openstack_同步企业镜像_同步",
        "id": "host-mng.openstack-mng.image.sync-ent.sync",
        "method": "POST",
         "url": "adminboe/authsec/images/openstack/ent/{platformId}/sync"
    }
    //vmware镜像管理
    , {
        "desc": "获取镜像列表-vmare2.2",
        "id": "host-mng.vmware-mng.image.list",
        "method": "POST",
        "url": "adminboe/authsec/images/vmware/{platformId}/page/{page}/size/{size}"
    }
    , {
        "desc": "获取下拉企业列表-vmware2.3",
        "id": "host-mng.vmware-mng.dropdown-ent.list",
        "method": "GET",
        "url": "adminboe/authsec/images/{platformId}/tenants/dropdown"
    }
    , {
        "desc": "获取未选择和已选择的企业列表-vmware3.1",
        "id": "host-mng.vmware-mng.ents.list",
        "method": "POST",
        "url": "adminboe/authsec/image/detail/{platformId}/{imageId}/tenants"
    }
    , {
        "desc": "设置企业并保存-vmware3.2",
        "id": "host-mng.vmware-mng.ent.save",
        "method": "POST",
        "url": "adminboe/authsec/image/{imageId}/tenants"
    }
    , {
        "desc": "启用和禁用镜像-vmware4",
        "id": "host-mng.vmware-mng.image.enable-disable",
        "method": "PUT",
        "url": "adminboe/authsec/image/{id}/{status}"
    }
    , {
        "desc": "编辑镜像-vmware5",
        "id": "host-mng.vmware-mng.image.edit",
        "method": "PUT",
        "url": "adminboe/authsec/image/{id}"
    }
    , {
        "desc": "获取待同步的镜像列表-vmware11",
        "id": "host-mng.vmware-mng.sync-image.list",
        "method": "GET",
        "url": "adminboe/authsec/images/vmware/{platformId}"
    }
    , {
        "desc": "同步镜像-vmware12",
        "id": "host-mng.vmware-mng.sync-image.sync",
        "method": "POST",
        "url": "adminboe/authsec/images/vmware/{platformId}/sync"
    }

    //Vmware分布式网络导航页
    , {
        "desc": "获取分布式列表",
        "id": "net-mng.vm-mng-dbt.index.portlist",
        "method": "GET",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/dist/portlist"
    }
    , {
        "desc": "获取数据中心联动列表",
        "id": "net-mng.vm-mng-dbt.index.dclist",
        "method": "GET",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/dist/dclist"
    }
    , {
        "desc": "设置端口组显示名称",
        "id": "net-mng.vm-mng-dbt.index.setportname",
        "method": "PUT",
        "url": "adminboe/authsec/vmware/network/dist/{id}/setportname"
    }
    , {
        "desc": "启用分布式网络",
        "id": "net-mng.vm-mng-dbt.index.enable",
        "method": "PUT",
        "url": "adminboe/authsec/vmware/network/dist/{id}/enable"
    }
    , {
        "desc": "禁用分布式网络",
        "id": "net-mng.vm-mng-dbt.index.disable",
        "method": "PUT",
        "url": "adminboe/authsec/vmware/network/dist/{id}/disable"
    },
    {
        "desc": "分布式网络取得同步网络信息",
        "id": "net-mng.vm-mng-dbt.index.syn.getinfolist",
        "method": "GET",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/dist/synclist"
    },
    {
        "desc": "分布式网络同步网络",
        "id": "net-mng.vm-mng-dbt.index.syn.dosyn",
        "method": "PUT",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/dist/{vds_id}/sync"
    },
    //云网络管理
    //vmware-分布式网络
    {
        "desc": "端口组列表",
        "id": "net-mng.vm-mng-dbt.port.list",
        "method": "GET",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/dist/portres/list"
    },
    {
        "desc": "设置企业",
        "id": "net-mng.vm-mng-dbt.port.set-ent",
        "method": "GET",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/dist/portres/{id}/set/ent"
    },
    {
        "desc": "数据中心联动列表",
        "id": "net-mng.vm-mng-dbt.port.dclist",
        "method": "GET",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/dist/dclist"
    },
    {
        "desc": "保存企业",
        "id": "net-mng.vm-mng-dbt.port.ent-save",
        "method": "POST",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/dist/portres/{id}/save/ent"
    },

    //Vmware NSX导航页
    {
        "desc": "NSX网络列表",
        "id": "net-mng.vm-mng-nsx.index.portlist",
        "method": "GET",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/nsx/portlist"
    },
    {
        "desc": "NSX DLR列表",
        "id": "net-mng.vm-mng-nsx.index.dlrlist",
        "method": "GET",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/nsx/dlrlist"
    },
    {
        "desc": "获取TransportZone信息",
        "id": "net-mng.vm-mng-nsx.index.getzone",
        "method": "PUT",
        "url": "adminboe/authsec/vmware/network/nsx/{port_id}/getzone"
    },
    {
        "desc": "启用网络",
        "id": "net-mng.vm-mng-nsx.index.enable",
        "method": "PUT",
        "url": "adminboe/authsec/vmware/network/nsx/{port_id}/enable"
    },
    {
        "desc": "禁用网络",
        "id": "net-mng.vm-mng-nsx.index.disable",
        "method": "PUT",
        "url": "adminboe/authsec/vmware/network/nsx/{port_id}/disable"
    },
    {
        "desc": "设置dlr子网显示名称",
        "id": "net-mng.vm-mng-nsx.index.setdlrname",
        "method": "PUT",
        "url": "adminboe/authsec/vmware/network/nsx/{port_id}/setdlrname"
    },
{
        "desc": "NSX网络引导页同步获取列表",
        "id": "net-mng.vm-mng-nsx.index.synclist",
        "method": "GET",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/nsx/synclist"
    },
    {
        "desc": "NSX网络引导页同步操作",
        "id": "net-mng.vm-mng-nsx.index.dosync",
        "method": "PUT",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/nsx/{dlr_id}/sync"
    },
    {
        "desc": "NSX云网络DLR资源分配保存企业",
        "id": "net-mng.vm-mng-nsx.dlr.ent-save",
        "method": "POST",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/nsx/portres/{id}/save/ent"
        
    },
    {
       "desc": "NSX云网络DLR资源分配dlr设置企业",
        "id": "net-mng.vm-mng-nsx.dlr.dlr-detail",
        "method": "GET",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/nsx/portres/{id}/set/ent"
    },
//vmware-nsx网络
    {
        "desc": "获取nsxdlr网络列表",
        "id": "net-mng.vm-mng-nsx.port.list",
        "method": "GET",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/nsx/portres/list"
    },
    {
        "desc": "获取DLR列表",
        "id": "net-mng.vm-mng-nsx.port.dlrlist",
        "method": "GET",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/nsx/dlrlist"
    },


    //物理机资源池fhd
    {
        "desc": "获取物理机资源池列表",
        "id": "phy-mng.phy-pool.phylist.data",
        "method": "POST",
        "url": "pmresourcemgmt/noauth/pmpools/page/{page}/size/{size}"
    },
    {
        "desc": "删除/禁用/启用物理机资源池",
        "id": "phy-mng.phy-pool.phylist.enable",
        "method": "PUT",
        "url": "pmresourcemgmt/noauth/pmpool/{pmpool_id}/{status}"
    },
    {
        "desc": "创建物理机资源池",
        "id": "phy-mng.phy-pool.phylist.creat",
        "method": "POST",
        "url": "pmresourcemgmt/noauth/pmpool"
    },
    {
        "desc": "编辑物理机资源池",
        "id": "phy-mng.phy-pool.phylist.edit",
        "method": "PUT",
        "url": "pmresourcemgmt/noauth/pmpool/{pmpool_id}"
    },
    {
        "desc": "获取物理机地域列表",
        "id": "phy-mng.phy-pool.phylist.region",
        "method": "GET",
        "url": "basis/authsec/regions"
    },
    {
        "desc": "根据poolId获取资源池信息",
        "id": "phy-mng.phy-pool.phylist.view",
        "method": "GET",
        "url": "pmresourcemgmt/noauth/pmpool/view/{pmpool_id}"
    },

	//物理机资源池---物理机
     {
        "desc": "获取物理机列表",
        "id": "physical-mng.physical.list.get",
        "method": "POST",
        "url": "pmresourcemgmt/noauth/pmpools/pms/{pmpool_id}/page/{page}/size/{size}"
    },
    {
         "desc": "添加物理机",
        "id": "physical-mng.physical.create",
        "method": "POST",
        "url": "pmresourcemgmt/noauth/pmpool/pm"
    },
    {
         "desc": "查看物理机",
        "id": "physical-mng.physical.check",
        "method": "GET",
        "url": "pmresourcemgmt/noauth/pmpool/pm/view/{pm_id}"

    },
    {
        "desc": "编辑物理机",
        "id": "physical-mng.physical.edit",
        "method": "PUT",
        "url": "pmresourcemgmt/noauth/pmpool/pm/edit"
    },
    {
        "desc": "获取物理机硬件信息",
        "id": "physical-mng.physical.hardwareinfo.get",
        "method": "POST",
        "url": "pmresourcemgmt/noauth/pmpool/pm/ilo/readpminfo"
    },
    {
        "desc": "修改IPMI信息",
        "id": "physical-mng.physical.ipmiInfo.put",
        "method": "PUT",
        "url": "pmresourcemgmt/noauth/pmpool/pm/ilo/{pm_id}"
    },
     {
        "desc": "测试IPMI信息",
        "id": "physical-mng.physical.ipmiInfo.test.put",
        "method": "PUT",
        "url": "pmresourcemgmt/noauth/pmpool/pm/ilo/verify"
    },
    {
        "desc": "删除/禁用/启用物理机",
        "id": "physical-mng.physical.statusChange",
        "method": "PUT",
        "url": "pmresourcemgmt/noauth/pmpool/pm/{pm_id}/{status}"
    },
    {
        "desc": "获取物理机品牌、型号、服务器类型",
        "id": "physical-mng.physical.serverInfo.get",
        "method": "GET",
        "url": "pmresourcemgmt/noauth/pmpool/pm/modellist"
    },

    //物理机网络管理
    {
        "desc": "添加物理机网络",
        "id": "phy-mng.phy-net-mng.network.create",
        "method": "POST",
        "url": "pmnetworkmgmt/noauth/pmnetwork"
    },
    {
        "desc": "编辑物理机网络",
        "id": "phy-mng.phy-net-mng.network.edit",
        "method": "PUT",
        "url": "pmnetworkmgmt/noauth/pmnetwork/edit"
    },
    {
        "desc": "获取物理机网络列表",
        "id": "phy-mng.phy-net-mng.network.list",
        "method": "POST",
        "url": "pmnetworkmgmt/noauth/pmnetwork/page/{page}/size/{size}"
    },
    {
        "desc": "根据pmNetworkId获取网络信息",
        "id": "phy-mng.phy-net-mng.network.info.get",
        "method": "GET",
        "url": "pmnetworkmgmt/noauth/pmnetwork/view/{pmNetworkId}"
    },
    {
        "desc": "物理机网络状态修改:0:禁用 1:启用 2:删除",
        "id": "phy-mng.phy-net-mng.network.status.set",
        "method": "PUT",
        "url": "pmnetworkmgmt/noauth/pmnetwork/{pmNetworkId}/{status}"
    },

    {
        "desc": "网络资源分配：根据pmNetworkId显示资源池的分配信息",
        "id": "phy-mng.phy-net-mng.network.pmpool.list",
        "method": "GET",
        "url": "pmnetworkmgmt/noauth/pmnetwork/{pmNetworkId}/assign/pmpool"
    },
    {
        "desc": "网络资源分配：根据pmNetworkId和已选择的资源池ID(逗号分割)显示对应物理机信息",
        "id": "phy-mng.phy-net-mng.network.pmhost.list",
        "method": "GET",
        "url": "pmnetworkmgmt/noauth/pmnetwork/{pmNetworkId}/assign/pmview/{pmPoolIds}"
    },
    {
        "desc": "网络资源分配：根据pmNetworkId和已选择的物理机ID(逗号分割)保存网络资源分配信息",
        "id": "phy-mng.phy-net-mng.network.pmres.set",
        "method": "PUT",
        "url": "pmnetworkmgmt/noauth/pmnetwork/{pmNetworkId}/assign/pm"
    },
    
    {
        "desc": "设置IP范围：保存划分的IP信息",
        "id": "phy-mng.phy-net-mng.network.iprange.set",
        "method": "PUT",
        "url": "pmnetworkmgmt/noauth/pmnetwork/{pmNetworkId}/assign/iprange"
    },
    {
        "desc": "设置IP范围：显示网络中划分的IP范围",
        "id": "phy-mng.phy-net-mng.network.iprange.get",
        "method": "GET",
        "url": "pmnetworkmgmt/noauth/pmnetwork/{pmNetworkId}/assign/iprange/view"
    },
    {
        "desc": "获取特定网络的IP列表-所有",
        "id": "phy-mng.phy-net-mng.network.ips.get",
        "method": "GET",
        "url": "pmnetworkmgmt/noauth/pmnetwork/{pmNetworkId}/ipmgmt"
    },
    {
        "desc": "物理机网络IP状态修改:0:空闲 1:已占用 2:预占",
        "id": "phy-mng.phy-net-mng.network.ips.status.set",
        "method": "PUT",
        "url": "pmnetworkmgmt/noauth/pmnetwork/{pmNetworkId}/ipmgmt/changestatus/{status}"
    },    

    //工单管理
    {
        "desc": "获取机构管理员负责的机构下所有工单",
        "id": "case-mng.case.list.get",
        "method": "GET",
        "url": "basis/authsec/adm/worklist/{page}/{size}"
    },
    {
        "desc": "查询：主题/企业/类别/状态/紧急程度",
        "id": "case-mng.case.search",
        "method": "POST",
        "url": "basis/authsec/adm/worklist/search/{page}/{size}"
       // "url": "basis/authsec/adm/worklist/search/{page}/{size}?subject={subject}&type={type}&status={status}&emergency={emergency}&tenantId={tenantId}"
    },
    {
        "desc": "关闭工单",
        "id": "case-mng.case.close",
        "method": "POST",
        "url": "basis/authsec/adm/worklist/close"
    },
    {
        "desc": "处理工单",
        "id": "case-mng.case.handle",
        "method": "POST",
        "url": "basis/authsec/adm/worklist/handle"
    },
    {
        "desc": "获取所有企业基本信息，主要用于下拉框",
        "id": "case-mng.case.enterprise.get",
        "method": "GET",
        "url": "adminui/authsec/enterprises/simple"
    },
    {
        "desc": "获取某个工单基本信息",
        "id": "case-mng.case.info.get",
        "method": "GET",
        "url": "basis/authsec/mpp/worklist/{id}"
    },
    {
        "desc": "获取工单关闭信息",
        "id": "case-mng.case.closeinfo.get",
        "method": "GET",
        "url": "basis/authsec/mpp/worklist/{id}/closeinfo"
    },
    {
        "desc": "获取工单处理信息",
        "id": "case-mng.case.handleinfo.get",
        "method": "GET",
        "url": "basis/authsec/mpp/worklist/{id}/handle"
    },

    //物理机镜像
    //镜像源
    {
        "desc": "获取镜像源列表",
        "id":"phy-mng.phy-img-mng.phyimgsource.getlist",
        "method":"POST",
        "url":"pmimagemgmt/noauth/pmimage/pool/page/{page}/size/{size}"
    },
    {
        "desc": "物理机镜像池状态修改",
        "id":"phy-mng.phy-img-mng.phyimgsource.changestatus",
        "method":"PUT",
        "url":"pmimagemgmt/noauth/pmimage/pool/{pmImagePoolId}/{status}"
    },
    {
        "desc": "创建镜像源提交",
        "id":"phy-mng.phy-img-mng.phyimgsource.commit.create",
        "method":"POST",
        "url":"pmimagemgmt/noauth/pmimage/pool"
    },
    {
        "desc": "编辑镜像源提交",
        "id":"phy-mng.phy-img-mng.phyimgsource.commit.edit",
        "method":"PUT",
        "url":"pmimagemgmt/noauth/pmimage/pool/edit"
    },
    {
        "desc": "获取资源池分配列表",
        "id":"phy-mng.phy-img-mng.phyimgsource.getallolist",
        "method":"GET",
        "url":"pmimagemgmt/noauth/pmimage/pool/{pmImagePoolId}/pmpool/list"
    },
    {
        "desc": "分配资源池提交",
        "id":"phy-mng.phy-img-mng.phyimgsource.commit.allocate",
        "method":"PUT",
        "url":"pmimagemgmt/noauth/pmimage/pool/{pmImagePoolId}/pmpool/assign"
    },
    {
        "desc": "测试物理机镜像池",
        "id":"phy-mng.phy-img-mng.phyimgsource.commit.test",
        "method":"POST",
        "url":"pmimagemgmt/noauth/pmimage/pool/test"
    },
    //物理机镜像列表
    {
        "desc": "分页获取物理机镜像列表",
        "id":"phy-mng.phy-img-mng.phyimglist.getlist",
        "method":"POST",
        "url":"pmimagemgmt/noauth/pmimage/image/{pmImagePoolId}/page/{page}/size/{size}"
    },
    {
        "desc": "物理机镜像状态修改",
        "id":"phy-mng.phy-img-mng.phyimglist.changestatus",
        "method":"PUT",
        "url":"pmimagemgmt/noauth/pmimage/image/changestatus/{pmImageId}/{status}"
    },
    {
        "desc": "提交编辑物理机镜像",
        "id":"phy-mng.phy-img-mng.phyimglist.commit.edit",
        "method":"PUT",
        "url":"pmimagemgmt/noauth/pmimage/image/edit"
    },
    {
        "desc": "根据pmImageId获取镜像信息",
        "id":"phy-mng.phy-img-mng.phyimglist.imgdetail",
        "method":"GET",
        "url":"pmimagemgmt/noauth/pmimage/image/view/{pmImageId}"
    },
    {
        "desc": "保存镜像的企业选择信息",
        "id":"phy-mng.phy-img-mng.phyimglist.commit.allocate",
        "method":"PUT",
        "url":"pmimagemgmt/noauth/pmimage/image/{pmImageId}/enterprise"
    },
    {
        "desc": "获取镜像的企业选择信息",
        "id":"phy-mng.phy-img-mng.phyimglist.getallolist",
        "method":"GET",
        "url":"pmimagemgmt/noauth/pmimage/image/{pmImageId}/enterprise/show"
    },
    {
        "desc": "获取镜像的同步信息列表",
        "id":"phy-mng.phy-img-mng.phyimglist.sync.getinfo",
        "method":"GET",
        "url":"pmimagemgmt/noauth/pmimage/image/{pmImagePoolId}/list"
    },
    {
        "desc": "保存镜像的同步信息列表",
        "id":"phy-mng.phy-img-mng.phyimglist.sync.saveinfo",
        "method":"POST",
        "url":"pmimagemgmt/noauth/pmimage/image/{pmImagePoolId}/savesync"
    },
]

