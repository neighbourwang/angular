import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel, SystemDictionaryService } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class DatabaseService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict: SystemDictionaryService
    ) { }
    //获取数据库模板详情
    getTemplatedetail( data: any) {
        let api = this.restApiCfg.getRestApi("prod-mng.template-mng.detail.search");

        return this.restApi.request(api.method, api.url, [], undefined, data);
    }
    //获取数据库选项基础信息
    getDatabaseOptionInitInfo() {
        let api = this.restApiCfg.getRestApi("template-mng-database.initInfo.get");

        return this.restApi.request(api.method, api.url, [], undefined);
    }
    //创建数据库模板
    postDatabaseTemplate(data: any) {
        let api = this.restApiCfg.getRestApi("template-mng-database.cre.post");

        return this.restApi.request(api.method, api.url, [], undefined, data);
    }
    //更新数据库模板
    putDatabaseTemplate(data: any) {
        let api = this.restApiCfg.getRestApi("template-mng-database.update.put");

        return this.restApi.request(api.method, api.url, [], undefined, data);
    }
}
// [‎2017/‎5/‎17 17:41] Chen, Roger: 
// 无标题
// INSERT INTO `foxbase`.`FOX_SYSTEMDICTIONARY` (`ID`, `OWNER`, `FIELD`, `CODE`, `VALUE`, `TEXT`, `DESCRIPTION`) VALUES ('763', 'TEMPALTE', 'STATUS', '0', '已删除', '已删除', '已删除');
// INSERT INTO `foxbase`.`FOX_SYSTEMDICTIONARY` (`ID`, `OWNER`, `FIELD`, `CODE`, `VALUE`, `TEXT`, `DESCRIPTION`) VALUES ('764', 'TEMPLATE', 'STATUS', '1', '已启用', '已启用', '已启用');
// INSERT INTO `foxbase`.`FOX_SYSTEMDICTIONARY` (`ID`, `OWNER`, `FIELD`, `CODE`, `VALUE`, `TEXT`, `DESCRIPTION`) VALUES ('822', 'DB', 'DB_TYPE', 'Oracle', '0', 'Oracle', 'Oracle');
// INSERT INTO `foxbase`.`FOX_SYSTEMDICTIONARY` (`ID`, `OWNER`, `FIELD`, `CODE`, `VALUE`, `TEXT`, `DESCRIPTION`) VALUES ('823', 'DB', 'DEPLOYMENT_MODE', 'single', '0', '单机部署', '单机部署');
// INSERT INTO `foxbase`.`FOX_SYSTEMDICTIONARY` (`ID`, `OWNER`, `FIELD`, `CODE`, `VALUE`, `TEXT`, `DESCRIPTION`) VALUES ('824', 'MIDDLEWARE', 'DEPLOYMENT_MODE', 'single', '0', '单例部署', '单例部署');
// INSERT INTO `foxbase`.`FOX_SYSTEMDICTIONARY` (`ID`, `OWNER`, `FIELD`, `CODE`, `VALUE`, `TEXT`, `DESCRIPTION`) VALUES ('825', 'MIDDLEWARE', 'DEPLOYMENT_MODE', 'cluster', '1', '多实例部署', '多实例部署');
// INSERT INTO `foxbase`.`FOX_SYSTEMDICTIONARY` (`ID`, `OWNER`, `FIELD`, `CODE`, `VALUE`, `TEXT`, `DESCRIPTION`) VALUES ('826', 'DB', 'DEPLOYMENT_MODE', 'cluster', '1', '集群部署', '集群部署');
// INSERT INTO `foxbase`.`FOX_SYSTEMDICTIONARY` (`ID`, `OWNER`, `FIELD`, `CODE`, `VALUE`, `TEXT`, `DESCRIPTION`) VALUES ('827', 'MIDDLEWARE', 'TYPE', 'weblogic', '0', 'Weblogic', 'Weblogic'); 

