import { Injectable } from "@angular/core";
import { RestApiCfg, RestApi, SystemDictionary, LayoutService } from "../../";

let dicPromise : Promise<Array<SystemDictionary>>;

@Injectable()
export class SystemDictionaryService {
    constructor(
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private layoutService: LayoutService
    ) {
    }

    get(cf:{owner?:string,field?:string,code?:string} = {}):Promise<Array<SystemDictionary>>{

        const api = this.restApiCfg.getRestApi("sysdic");

        dicPromise = dicPromise ? dicPromise : this.restApi.request(api.method, api.url, undefined, undefined, undefined)
            .then(res => {
                return res.resultContent;
            })  
            .catch(error => {
                console.log("获取全部数据词典的服务器错误")
            });

        return dicPromise.then(dictList => {
            return dictList.filter(dict => {
                return  (!cf.code || dict.code === cf.code) 
                        && (!cf.owner || dict.owner === cf.owner) 
                        && (!cf.field || dict.field === cf.field)
            })
        })
    };

    sysDic(caller: Object, callback: Function, showLoading: boolean = true) {
        const key = `dic_all`;
        let systemDictionarys: Array<SystemDictionary>;
        const systemDictionarysStr = window.sessionStorage.getItem(key);
        if (systemDictionarysStr) {
            systemDictionarys = JSON.parse(systemDictionarysStr);
            new Promise(resovle => setTimeout(resovle, 10)).then(() => {
                callback.call(caller, true, systemDictionarys);
            });
        }
        if (showLoading) {
            this.layoutService.show();
        }
        const api = this.restApiCfg.getRestApi("sysdic");

        const promise = this.restApi.request(api.method, api.url, undefined, undefined, undefined);

        promise.then(
            response => {
                if (showLoading) {
                    this.layoutService.hide();
                }
                const systemDictionarys = new Array<SystemDictionary>();

                if (response.resultCode && 100 == response.resultCode && response.resultContent) {

                    for (let content of response.resultContent) {
                        const systemDictionary = new SystemDictionary();

                        systemDictionary.owner = content.owner;
                        systemDictionary.field = content.field;
                        systemDictionary.code = content.code;
                        systemDictionary.value = content.value;
                        systemDictionary.displayValue = content.displayValue;

                        systemDictionarys.push(systemDictionary);
                    }


                }
                if (systemDictionarys.length > 0) {
                    window.sessionStorage.setItem(key, JSON.stringify(systemDictionarys));
                }
                callback.call(caller, true, systemDictionarys);
            }
        )
            .catch(
            reason => {
                if (showLoading) {
                    this.layoutService.hide();
                }
                callback.call(caller, false, reason.statusText);
            }
            );
    }

    sysDicO(caller: Object, callback: Function, owner: String, showLoading: boolean = true) {

        const key = `dic_o_${owner}`;
        let systemDictionarys: Array<SystemDictionary>;
        const systemDictionarysStr = window.sessionStorage.getItem(key);
        if (systemDictionarysStr) {
            systemDictionarys = JSON.parse(systemDictionarysStr);
            new Promise(resovle => setTimeout(resovle, 10)).then(() => {
                callback.call(caller, true, systemDictionarys);
            });
        }
        if (showLoading) {
            this.layoutService.show();
        }

        const api = this.restApiCfg.getRestApi("sysdic.owner");

        const promise = this.restApi.request(api.method,
            api.url,
            [{ key: "_owner", value: owner }],
            undefined,
            undefined);

        promise.then(
            response => {
                systemDictionarys = new Array<SystemDictionary>();
                if (showLoading) {
                    this.layoutService.hide();
                }
                if (response.resultCode && 100 == response.resultCode && response.resultContent) {

                    for (let content of response.resultContent) {
                        const systemDictionary = new SystemDictionary();

                        systemDictionary.owner = content.owner;
                        systemDictionary.field = content.field;
                        systemDictionary.code = content.code;
                        systemDictionary.value = content.value;
                        systemDictionary.displayValue = content.displayValue;

                        systemDictionarys.push(systemDictionary);
                    }


                }
                if (systemDictionarys.length > 0) {
                    window.sessionStorage.setItem(key, JSON.stringify(systemDictionarys));
                }
                callback.call(caller, true, systemDictionarys);
            }
        )
            .catch(
            reason => {
                if (showLoading) {
                    this.layoutService.hide();
                }
                callback.call(caller, false, reason.statusText);
            }
            );
    }

    sysDicOF(caller: Object, callback: Function, owner: String, field: String, showLoading: boolean = true) {

        const key = `dic_o_${owner}_f_${field}`;
        let systemDictionarys: Array<SystemDictionary>;
        const systemDictionarysStr = window.sessionStorage.getItem(key);
        if (systemDictionarysStr) {
            systemDictionarys = JSON.parse(systemDictionarysStr);
            new Promise(resovle => setTimeout(resovle, 10)).then(() => {
                callback.call(caller, true, systemDictionarys);
            });
        }
        if (showLoading) {
            this.layoutService.show();
        }
        const api = this.restApiCfg.getRestApi("sysdic.owner.field");

        const promise = this.restApi.request(api.method,
            api.url,
            [{ key: "_owner", value: owner }, { key: "_field", value: field }],
            undefined,
            undefined);

        promise.then(
            response => {
                if (showLoading) {
                    this.layoutService.hide();
                }
                systemDictionarys = new Array<SystemDictionary>();

                if (response.resultCode && 100 == response.resultCode && response.resultContent) {

                    for (let content of response.resultContent) {
                        const systemDictionary = new SystemDictionary();

                        systemDictionary.owner = content.owner;
                        systemDictionary.field = content.field;
                        systemDictionary.code = content.code;
                        systemDictionary.value = content.value;
                        systemDictionary.displayValue = content.displayValue;

                        systemDictionarys.push(systemDictionary);
                    }


                }
                if (systemDictionarys.length > 0) {
                    window.sessionStorage.setItem(key, JSON.stringify(systemDictionarys));
                }
                callback.call(caller, true, systemDictionarys);
            }
        )
            .catch(
            reason => {
                if (showLoading) {
                    this.layoutService.hide();
                }
                callback.call(caller, false, reason.statusText);
            }
            );
    }

    sysDicOFC(caller: Object, callback: Function, owner: String, field: String, code: String, showLoading: boolean = true) {
        const key = `dic_o_${owner}_f_${field}_code${code}`;
        let systemDictionarys: Array<SystemDictionary>;
        const systemDictionarysStr = window.sessionStorage.getItem(key);
        if (systemDictionarysStr) {
            systemDictionarys = JSON.parse(systemDictionarysStr);
            new Promise(resovle => setTimeout(resovle, 10)).then(() => {
                callback.call(caller, true, systemDictionarys);
            });
        }
        if (showLoading) {
            this.layoutService.show();
        }
        const api = this.restApiCfg.getRestApi("sysdic.owner.field.code");

        const promise = this.restApi.request(api.method,
            api.url,
            [{ key: "_owner", value: owner }, { key: "_field", value: field }, { key: "_code", value: code }],
            undefined,
            undefined);

        promise.then(
            response => {
                if (showLoading) {
                    this.layoutService.hide();
                }
                if (response.resultCode && 100 == response.resultCode && response.resultContent) {
                    const content = response.resultContent;
                    const systemDictionary = new SystemDictionary();

                    systemDictionary.owner = content.owner;
                    systemDictionary.field = content.field;
                    systemDictionary.code = content.code;
                    systemDictionary.value = content.value;
                    systemDictionary.displayValue = content.displayValue;

                    systemDictionarys.push(systemDictionary);


                }
                if (systemDictionarys.length > 0) {
                    window.sessionStorage.setItem(key, JSON.stringify(systemDictionarys));
                }
                callback.call(caller, true, systemDictionarys);
            }
        )
            .catch(
            reason => {
                if (showLoading) {
                    this.layoutService.hide();
                }
                callback.call(caller, false, reason.statusText);
            }
            );
    }

    getItems(owner: String, field: String, showLoading: boolean = true): Promise<any> {

        const key = `dic_o_${owner}_f_${field}`;
        let systemDictionarys: Array<SystemDictionary>;
        const systemDictionarysStr = window.sessionStorage.getItem(key);
        if (systemDictionarysStr) {
            systemDictionarys = JSON.parse(systemDictionarysStr);
            return new Promise(resovle => setTimeout(resovle(systemDictionarys), 10));
        }
        if (showLoading) {
            this.layoutService.show();
        }
        const api = this.restApiCfg.getRestApi("sysdic.owner.field");

        const promise = this.restApi.request(api.method,
            api.url,
            [{ key: "_owner", value: owner }, { key: "_field", value: field }],
            undefined,
            undefined);

        return promise.then(
            response => {
                if (showLoading) {
                    this.layoutService.hide();
                }
                systemDictionarys = new Array<SystemDictionary>();

                if (response.resultCode && 100 == response.resultCode && response.resultContent) {

                    for (let content of response.resultContent) {
                        const systemDictionary = new SystemDictionary();

                        systemDictionary.owner = content.owner;
                        systemDictionary.field = content.field;
                        systemDictionary.code = content.code;
                        systemDictionary.value = content.value;
                        systemDictionary.displayValue = content.displayValue;

                        systemDictionarys.push(systemDictionary);
                    }


                }
                if (systemDictionarys.length > 0) {
                    window.sessionStorage.setItem(key, JSON.stringify(systemDictionarys));
                }
                return new Promise(resovle => resovle(systemDictionarys));
            }
        )
            .catch(
            reason => {
                if (showLoading) {
                    this.layoutService.hide();
                }
                return new Promise(resovle => resovle(reason.statusText));
            }
            );
    }
}