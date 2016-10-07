import { RestApiModel } from '../model/rest';

export let RestApis: RestApiModel[] = [
    {
        "desc": "获取全部服务目录列标",
        "method": "GET",
        "id": "pf-mng.svc-dir-mng.services.get",
        "url": "noauth/svm/platforms/{platformid}/services/"
    },
    {
        "desc": "获取全部地区列标",
        "method": "GET",
        "id": "pf-mng.svc-dir-mng.regions.get",
        "url": "noauth/svm/platforms/regions/"
    },
    {
        "desc": "更新服务目录信息",
        "id": "pf-mng.svc-dir-mng.services.update",
        "method": "PUT",
        "url": "noauth/svm/platforms/{platformid}/services/{id}"
    },
    {
        "desc": "删除单个服务目录",
        "id": "pf-mng.svc-dir-mng.services.remove",
        "method": "DELETE",
        "url": "noauth/svm/platforms/{platformid}/services/{id}"
    },
    {
        "desc": "删除多个服务目录",
        "id": "pf-mng.svc-dir-mng.services.removeAll",
        "method": "DELETE",
        "url": "/noauth/svm/platforms/{platformid}/services/batch"
    },
    {
        "desc": "更新服务目录状态.1:发布, 0:取消发布",
        "id": "pf-mng.svc-dir-mng.services.publish",
        "method": "PUT",
        "url": "noauth/svm/platforms/{platformid}/services/{id}/status/{status}"
    },


    {
        "desc": "获取全部服务模板列表",
        "id": "pf-mng.svc-dir-mng.servicetemplates.get",
        "method": "GET",
        "url": "noauth/svm/servicetemplates/"
    },
    {
        "desc": "获取全部主机配置列表",
        "id": "pf-mng.svc-dir-mng.flavors.get",
        "method": "GET",
        "url": "noauth/svm/platforms/{platformid}/flavors/"
    },
    {
        "desc": "获取全部可用区列表",
        "id": "pf-mng.svc-dir-mng.zones.get",
        "method": "GET",
        "url": "noauth/svm/platforms/{platformid}/zones/"
    },
    {
        "desc": "获取全部启动盘参数列表",
        "id": "pf-mng.svc-dir-mng.storages.get",
        "method": "GET",
        "url": "noauth/svm/platforms/{platformid}/storages/"
    },
    {
        "desc": "创建服务目录",
        "id": "pf-mng.svc-dir-mng.services.create",
        "method": "POST",
        "url": "/noauth/svm/platforms/{platformid}/services/"
    },

    {
        "desc": "获取全部已创建平台信息",
        "id": "pf.conn.mng.platforms.get",
        "method": "GET",
        "url": "adminui/authsec/platform/page/{page}/size/{size}"
   },
   {
        "desc": "创建平台",
        "id": "pf.cre.step.01.paltform.post",
        "method": "POST",
        "url": "adminui/authsec/platform"
    },
   {
       "desc": "获取企业列表",
       "id": "ent-mng.admin.cre.enterprise.get",
       "method": "GET",
       "url": "/adminui/authsec/enterprise"
   },
   {
       "desc": "创建企业管理员",
       "id": "ent-mng.admin.cre.post",
       "method": "POST",
       "url": "/adminui/authsec/enterprise/{enterpriseId}/admin"
   },
   {
       "desc": "更新企业管理员",
       "id": "ent-mng.admin.update.put",
       "method": "PUT",
       "url": "/adminui/authsec/enterprise/admin/{id}"
   },
   {
       "desc": "更新企业管理员激活状态",
       "id": "ent-mng.admin.updateStatus.put",
       "method": "PUT",
       "url": "/adminui/authsec/enterprise/admin/{id}/status/{status}"
   },
   {
       "desc": "删除企业管理员",
       "id": "ent-mng.admin.del.delete",
       "method": "DELETE",
       "url": "/adminui/authsec/enterprise/admins"
   },
   {
       "desc": "获取全部企业管理员",
       "id": "ent-mng.admin.all.get",
       "method": "GET",
       "url": "/adminui/authsec/enterprise/admin/page/{page}/size/{size}"
   },
   {
       "desc": "获取某企业管理员",
       "id": "ent-mng.enterprise.admin.get",
       "method": "GET",
       "url": "/adminui/authsec/enterprise/{enterpriseId}/admin/page/{page}/size/{size}"
   }

]