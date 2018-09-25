import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import { Org, Member, Resource } from '../model/org-mng.org.model';
import { EntResource } from '../model/ent-resource-obj.model';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OrgMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }
    // 获取组织管理 所有机构
    getOrg(page: number, size: number) {

        let api = this.restApiCfg.getRestApi("user-center.org-mng.list");

        return this.restApi.request(api.method, api.url, [{ key: "page", value: page }, { key: "size", value: 500 }], undefined);
    }

    //删除 机构
    deleteOrg(id: string) {
        let api = this.restApiCfg.getRestApi("user-center.org-mng.delete");

        return this.restApi.request(api.method, api.url, [{ key: "id", value: id }], undefined);
    }

    //启用 机构
    enableOrg(id: string) {
        let api = this.restApiCfg.getRestApi("user-center.org-mng.enable");

        return this.restApi.request(api.method, api.url, [{ key: "id", value: id }], undefined);
    }

    //禁用机构
    disableOrg(id: string) {
        let api = this.restApiCfg.getRestApi("user-center.org-mng.disable");

        return this.restApi.request(api.method, api.url, [{ key: "id", value: id }], undefined);
    }

    //获取 未管理的机构成员列表
    members: Array<Member> = new Array();
    getNoMngUser() {
        let api = this.restApiCfg.getRestApi("user-center.org-mng.nomnguser.list");
        if (this.members.length == 0) {
            return this.restApi.request(api.method, api.url, [{ key: "page", value: 0 }, { key: "size", value: 999 }], undefined).then(
                res => {
                    console.log('getNoMngUser', res);
                    this.members = res.resultContent;
                }
            ).catch(
                err => {
                    console.error(err);
                }
                );
        } else {
            return new Promise(resovle => setTimeout(resovle, 10)).then(() => this.members);
        }

    }
    //创建机构
    createOrg(org) {
        let api = this.restApiCfg.getRestApi("user-center.org-mng.create");

        return this.restApi.request(api.method, api.url, undefined, undefined, org);
    }

    //获得单个机构 基本信息
    getOrgById(id: string) {
        let api = this.restApiCfg.getRestApi("user-center.org-mng.account.get");

        return this.restApi.request(api.method, api.url, [{ key: "id", value: id }], undefined);
    }
    //获得单个机构 资源信息
    getOrgResourceById(id: string) {
        let api = this.restApiCfg.getRestApi("user-center.org-mng.resource.get");

        return this.restApi.request(api.method, api.url, [{ key: "id", value: id }], undefined);
    }

    //获得机构下的成员
    getUserByOrg(id: string) {
        let api = this.restApiCfg.getRestApi("user-center.org-mng.user-by-org.list");

        return this.restApi.request(api.method, api.url, [{ key: "id", value: id }], undefined);
    }

    //编辑机构
    editOrg(id: string, org) {
        let api = this.restApiCfg.getRestApi("user-center.org-mng.edit");

        return this.restApi.request(api.method, api.url, [{ key: "id", value: id }], undefined, org);
    }
    //获得当前登录人企业ID
    curEntId: string;
    getCurEntId() {
        let api = this.restApiCfg.getRestApi("user-center.org-mng.currentEnterpriseID.get");
        if (!this.curEntId) {
            return this.restApi.request(api.method, api.url, [], undefined).then(
                res => {
                    console.log('当前账户企业ID', res);
                    if (res.resultContent) {
                        this.curEntId = res.resultContent;
                        this.getCurEntResource(this.curEntId);
                        return this.curEntId
                    }
                }
            ).catch(
                err => {
                    console.error('获取当前企业ID失败');
                }
                );
        } else {
            return new Promise(resovle => setTimeout(resovle, 10)).then(() => {
                this.getCurEntResource(this.curEntId);
                return this.curEntId
            });
        }
    }
    //获得当前登陆人企业资源
    entResourceObj: EntResource = new EntResource();
    getCurEntResource(id: string) {
        let api = this.restApiCfg.getRestApi("user-center.org-mng.currEntResoure.get");
        console.log(this.entResourceObj.enterpriseId);
        this.restApi.request(api.method, api.url, [{ key: "id", value: id }, { key: "page", value: 1 }, { key: "size", value: 9999 }], undefined).then(
            res => {
                res.resultContent[0].memQuota = res.resultContent[0].memQuota / 1024;
                res.resultContent[0].usedMemQuota = res.resultContent[0].usedMemQuota / 1024;
                res.resultContent[0].realUsedMemQuota = res.resultContent[0].realUsedMemQuota / 1024;
                console.log('获取企业资源信息', res);
                this.entResourceObj = res.resultContent[0];
                console.log(this.entResourceObj);
                return this.entResourceObj;
            }
        ).catch(
            err => {
                console.error('获取企业资源信息失败');
            }
            );
    }
}