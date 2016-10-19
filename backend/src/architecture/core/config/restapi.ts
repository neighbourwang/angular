import { RestApiModel } from '../model/rest';

export let RestApis: RestApiModel[] = [
    // 数据字典
    {
        "desc": "全部数据字典信息",
        "id": "sysdic",
        "method": "GET",
        "url": "/authsec/sysdic"
    },
    {
        "desc": "数据字典信息（OWNER）",
        "id": "sysdic.owner",
        "method": "GET",
        "url": "/authsec/sysdic/{_owner}"
    },
    {
        "desc": "数据字典信息（OWNER/FIELD）",
        "id": "sysdic.owner.field",
        "method": "GET",
        "url": "/authsec/sysdic/{_owner}/{_field}"
    },
    {
        "desc": "数据字典信息（OWNER/FIELD/CODE）",
        "id": "sysdic.owner.field.code",
        "method": "GET",
        "url": "/authsec/sysdic/{_owner}/{_field}/{_code}"
    },
    // 数据字典
    // 平台接入管理
    {
        "desc": "获取全部已创建平台信息",
        "id": "pf.conn.mng.platforms.get",
        "method": "GET",
        "url": "/authsec/platforms/page/{page}/size/{size}"
    },
    {
        "desc": "创建平台",
        "id": "pf.cre.step.01.paltform.post",
        "method": "POST",
        "url": "/authsec/platform"
    },
    {
        "desc": "取得特定平台信息",
        "id": "pf.cre.paltform.get",
        "method": "GET",
        "url": "/authsec/platform/{pf-id}"
    },
    {
        "desc": "启用特定平台",
        "id": "pf.cre.paltform.active.get",
        "method": "GET",
        "url": "/authsec/platform/{pf-id}/active"
    },
    {
        "desc" : "禁用平台",
        "id" : "pf.cre.platform.disable.put",
        "method" : "PUT",
        "url" : "/authsec/platform/{_id}/suspend"
    },
    {
        "desc": "删除特定平台信息",
        "id": "pf.cre.paltform.delete",
        "method": "DELETE",
        "url": "/authsec/platform/{pf-id}"
    },
    {
        "desc": "取得资源同步数量信息",
        "id": "pf.cre.step.01.synchronize.count.get",
        "method": "GET",
        "url": "/authsec/platform/{pf-id}/synchronizeCounts"
    },
    {
        "desc": "可用区同步",
        "id": "pf.cre.step.02.zones.synchronize.get",
        "method": "GET",
        "url": "/authsec/platform/{pf-id}/zones/synchronize"
    },
    {
        "desc": "存储同步",
        "id": "pf.cre.step.02.storages.synchronize.get",
        "method": "GET",
        "url": "/authsec/platform/{pf-id}/storages/synchronize"
    },
    {
        "desc": "云主机类型同步",
        "id": "pf.cre.step.02.flavors.synchronize.get",
        "method": "GET",
        "url": "/authsec/platform/{pf-id}/flavors/synchronize"
    },
    {
        "desc": "可用域同步",
        "id": "pf.cre.step.02.regions.synchronize.get",
        "method": "GET",
        "url": "/authsec/platform/{pf-id}/regions/synchronize"
    },
    {
        "desc": "镜像同步",
        "id": "pf.cre.step.02.images.synchronize.get",
        "method": "GET",
        "url": "/authsec/platform/{pf-id}/images/synchronize"
    },
    {
        "desc": "取得可用区资源",
        "id": "pf.cre.zone.get",
        "method": "GET",
        "url": "/authsec/platform/{pf-id}/zone/quota"
    },
    {
        "desc": "更新可用区资源",
        "id": "pf.cre.step.03.zone.put",
        "method": "PUT",
        "url": "/authsec/platform/{pf-id}/zone/quota"
    },
    {
        "desc": "取得存储资源",
        "id": "pf.cre.storage.get",
        "method": "GET",
        "url": "/authsec/platform/{pf-id}/storage/quota"
    },
    {
        "desc": "更新存储资源",
        "id": "pf.cre.step.04.storage.put",
        "method": "PUT",
        "url": "/authsec/platform/{pf-id}/storage/quota"
    },
    {
        "desc": "取得云主机类型",
        "id": "pf.cre.flavor.get",
        "method": "GET",
        "url": "/authsec/platform/{pf-id}/flavor"
    },
    {
        "desc": "更新云主机类型",
        "id": "pf.cre.step.05.flavor.put",
        "method": "PUT",
        "url": "/authsec/platform/{pf-id}/flavor"
    },
    // 平台接入管理
    // 企业资源配额管理
    {
        "desc": "取得所有企业的资源配额信息",
        "id": "ent.res.quota.mng.resouces.quotas.get",
        "method": "GET",
        "url": "/authsec/enterprises/resouces/quotas/page/{page}/size/{size}"
    },
    {
        "desc": "取得特定企业的资源配额信息",
        "id": "ent.res.quota.mng.resouces.ent.quotas.get",
        "method": "GET",
        "url": "/authsec/enterprise/{ent-id}/resouces/quotas/page/{page}/size/{size}"
    },
    {
        "desc": "取得所有企业信息",
        "id": "ent.res.quota.mng.enterprises.get",
        "method": "GET",
        "url": "/authsec/enterprises/simple/page/{page}/size/{size}"
    },
    {
        "desc": "取得所有区域信息",
        "id": "ent.res.quota.cre.regions.virtual.get",
        "method": "GET",
        "url": "/authsec/regions/virtual"
    },
    {
        "desc": "创建企业资源配额信息",
        "id": "ent.res.quota.cre.post",
        "method": "POST",
        "url": "/authsec/enterprise/{_enterpriseId}/resouce/quota"
    },
    // 企业资源配额管理
    // 服务目录管理
    {
        "desc": "获取全部服务目录",
        "method": "GET",
        "id": "pf-mng.svc-dir-mng.services.get",
        "url": "/authsec/services"
    },
    {
        "desc": "获取全部地区列标",
        "method": "GET",
        "id": "pf-mng.svc-dir-mng.regions.get",
        "url": "/authsec/regions/virtual"
    },
    {
        "desc": "更新服务目录信息",
        "id": "pf-mng.svc-dir-mng.services.update",
        "method": "PUT",
        "url": "/authsec/platform/{platformid}/service"
    },
    {
        "desc": "删除单个服务目录",
        "id": "pf-mng.svc-dir-mng.services.remove",
        "method": "DELETE",
        "url": "/authsec/platform/{platformid}/service"
    },
    {
        "desc": "删除多个服务目录",
        "id": "pf-mng.svc-dir-mng.services.removeAll",
        "method": "DELETE",
        "url": "/authsec/platform/{platformid}/service"
    },
    {
        "desc": "更新服务目录状态.1:发布, 0:取消发布",
        "id": "pf-mng.svc-dir-mng.services.publish",
        "method": "PUT",
        "url": "/authsec/platform/{platformid}/service"
    },
    {
        "desc": "获取全部服务模板列表",
        "id": "pf-mng.svc-dir-mng.servicetemplates.get",
        "method": "GET",
        "url": "/authsec/servicetemplate"
    },
    {
        "desc": "获取全部主机配置列表",
        "id": "pf-mng.svc-dir-mng.flavors.get",
        "method": "GET",
        "url": "/authsec/platform/{platformid}/flavor"
    },
    {
        "desc": "获取全部可用区列表",
        "id": "pf-mng.svc-dir-mng.zones.get",
        "method": "GET",
        "url": "/authsec/platform/{platformid}/zone"
    },
    {
        "desc": "获取全部启动盘参数列表",
        "id": "pf-mng.svc-dir-mng.storages.get",
        "method": "GET",
        "url": "/authsec/platform/{platformid}/storage/quota"
    },
    {
        "desc": "创建服务目录",
        "id": "pf-mng.svc-dir-mng.services.create",
        "method": "POST",
        "url": "/authsec/platform/{_id}/service"
    },// 服务目录管理
   {
       "desc": "获取企业列表",
       "id": "ent-mng.admin.cre.enterprise.get",
       "method": "GET",
       "url": "/authsec/enterprises/simple/page/{page}/size/{size} "
   },
   {
       "desc": "创建企业管理员",
       "id": "ent-mng.admin.cre.post",
       "method": "POST",
       "url": "/authsec/enterprise/admin"
   },
   {
       "desc": "根据id获取企业管理员",
       "id": "ent-mng.admin.get",
       "method": "GET",
       "url": "/authsec/enterprise/admin/{id}"
   },
   {
       "desc": "更新企业管理员",
       "id": "ent-mng.admin.update.put",
       "method": "PUT",
       "url": "/authsec/enterprise/admin/{id}"
   },
   {
       "desc": "更新企业管理员激活状态",
       "id": "ent-mng.admin.updateStatus.put",
       "method": "PUT",
       "url": "/authsec/enterprise/admins/status/{status}"
   },
   {
       "desc": "删除企业管理员批量",
       "id": "ent-mng.admin.del.delete",
       "method": "DELETE",
       "url": "/authsec/enterprises/admins"
   },
   {
       "desc": "删除單個企业管理员",
       "id": "ent-mng.admin.delOne.delete",
       "method": "DELETE",
       "url": "/authsec/enterprise/admin/{id}"
   },
   {
       "desc": "获取全部企业管理员",
       "id": "ent-mng.admin.all.get",
       "method": "GET",
       "url": "/authsec/enterprises/admins/page/{page}/size/{size}"
   },
   {
       "desc": "获取某企业管理员",
       "id": "ent-mng.enterprise.admin.get",
       "method": "GET",
       "url": "/authsec/enterprise/{enterpriseId}/admins/page/{page}/size/{size}"
   },
   // 企业产品管理
   {
       "desc": "获取产品",
       "id": "ent-mng.ent-prod-mng.all.get",
       "method": "GET",
       "url": "/authsec/enterprises/products/page/{_page}/size/{_size}"
   },
   {
       "desc": "获取产品(企业)",
       "id": "ent-mng.ent-prod-mng.ent.all.get",
       "method": "GET",
       "url": "/authsec/enterprise/{_enterpriseId}/products/page/{_page}/size/{_size}"

   },
   {
       "desc": "获取产品(区域)",
       "id": "ent-mng.ent-prod-mng.region.all.get",
       "method": "GET",
       "url": "/authsec/enterprises/region/{_regionId}/products/page/{_page}/size/{_size}"
   },
   {
       "desc": "获取产品(企业/区域)",
       "id": "ent-mng.ent-prod-mng.ent.region.all.get",
       "method": "GET",
       "url": "/authsec/enterprise/{_enterpriseId}/region/{_regionId}/product/page/{_page}/size/{_size}"
   },
   {
       "desc": "更改产品状态",
       "id": "ent-mng.ent-prod-mng.prod.status.put",
       "method": "PUT",
       "url": "/authsec/enterprise/products/status/{_status}"
   },
   {
       "desc": "企业产品管理获取企业",
       "id": "ent-mng.ent-prod-cre.enterprises.get",
       "method": "GET",
       "url": "/authsec/enterprises/simple/page/{page}/size/{size} "
   },
   {
       "desc": "企业产品管理获取区域",
       "id": "ent-mng.ent-prod-cre.regions.get",
       "method": "GET",
       "url": "/authsec/regions/virtual"
   },
   {
       "desc": "企业产品管理获取服务目录",
       "id": "ent-mng.ent-prod-cre.directories.get",
       "method": "GET",
       "url": "/authsec/region/{region_id}/serviceitem"
   },
   {
       "desc": "企业产品管理获取所有可用区",
       "id": "ent-mng.ent-prod-cre.storages.get",
       "method": "GET",
       "url": "/authsec/platform/{pf_id}/flavor"
   },
   {
       "desc": "创建产品",
       "id": "ent-mng.ent-prod-cre.creation",
       "method": "POST",
       "url": "/authsec/enterprise/{enterpriseId}/product "
   },
   // 企业产品管理
   {
       "desc": "获取企业开通配额",
       "id": "ent-mng.ent-est-mng.resourcequota.get",
       "method": "GET",
       "url": "/authsec/platforms/resoucequotas/page/{_page}/size/{_size}"
   }
   ,{
       "desc": "企业开通信息概览",
       "id": "ent-mng.ent-est-mng.enterprise.get",
       "method": "GET",
       "url": "/authsec/enterprises/opening/page/{_page}/size/{_size}"
   }
   ,{
       "desc": "企业基础信息创建",
       "id": "ent-mng.ent-est-mng.enterprise.create",
       "method": "POST",
       "url": "/authsec/enterprise"
   }
   ,{
       "desc": "企业配额信息提交",
       "id": "ent-mng.ent-est-mng.resourcequota.create",
       "method": "POST",
       "url": "/authsec/enterprise/{_enterpriseId}/resouce/quota"
   }
   ,{
       "desc": "企业开通",
       "id": "ent-mng.ent-est-mng.enterprise.open",
       "method": "PUT",
       "url": "/authsec/enterprise/{_enterpriseId}/status/{_status}"
   }
]
