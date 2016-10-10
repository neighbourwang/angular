import { Injectable } from '@angular/core';
import { RestApiCfg, RestApi, SystemDictionary } from '../../';

@Injectable()
export class SystemDictionaryService {
    constructor(
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    sysDic(caller: Object, callback: Function) {
        let api = this.restApiCfg.getRestApi("sysdic");

        let promise = this.restApi.request(api.method, api.url, undefined, undefined, undefined);

        promise.then(
            response => {
                let systemDictionarys: Array<SystemDictionary> = new Array<SystemDictionary>();

                if (response.resultCode && 100 == response.resultCode && response.resultContent) {

                    for (let content of response.resultContent) {
                        let systemDictionary: SystemDictionary = new SystemDictionary();

                        systemDictionary.owner = content.owner;
                        systemDictionary.field = content.field;
                        systemDictionary.code = content.code;
                        systemDictionary.value = content.value;
                        systemDictionary.displayValue = content.displayValue;

                        systemDictionarys.push(systemDictionary);
                    }


                }

                callback.call(caller, true, systemDictionarys);
            }
        ).catch(
            reason => {
                callback.call(caller, false, reason.statusText);
            }
        );
    }

    sysDicO(caller: Object, callback: Function, owner: String) {
        let api = this.restApiCfg.getRestApi("sysdic.owner");

        let promise = this.restApi.request(api.method, api.url, [{ key: "_owner", value: owner }], undefined, undefined);

        promise.then(
            response => {
                let systemDictionarys: Array<SystemDictionary> = new Array<SystemDictionary>();

                if (response.resultCode && 100 == response.resultCode && response.resultContent) {

                    for (let content of response.resultContent) {
                        let systemDictionary: SystemDictionary = new SystemDictionary();

                        systemDictionary.owner = content.owner;
                        systemDictionary.field = content.field;
                        systemDictionary.code = content.code;
                        systemDictionary.value = content.value;
                        systemDictionary.displayValue = content.displayValue;

                        systemDictionarys.push(systemDictionary);
                    }

                    
                }

                callback.call(caller, true, systemDictionarys);
            }
        ).catch(
            reason => {
                callback.call(caller, false, reason.statusText);
            }
        );
    }

    sysDicOF(caller: Object, callback: Function, owner: String, field: String) {
        let api = this.restApiCfg.getRestApi("sysdic.owner.field");

        let promise = this.restApi.request(api.method, api.url, [{ key: "_owner", value: owner }, { key: "_field", value: field }], undefined, undefined);

        promise.then(
            response => {
                let systemDictionarys: Array<SystemDictionary> = new Array<SystemDictionary>();

                if (response.resultCode && 100 == response.resultCode && response.resultContent) {

                    for (let content of response.resultContent) {
                        let systemDictionary: SystemDictionary = new SystemDictionary();

                        systemDictionary.owner = content.owner;
                        systemDictionary.field = content.field;
                        systemDictionary.code = content.code;
                        systemDictionary.value = content.value;
                        systemDictionary.displayValue = content.displayValue;

                        systemDictionarys.push(systemDictionary);
                    }


                }

                callback.call(caller, true, systemDictionarys);
            }
        ).catch(
            reason => {
                callback.call(caller, false, reason.statusText);
            }
        );
    }

    sysDicOFC(caller: Object, callback: Function, owner: String, field: String, code: String) {
        let api = this.restApiCfg.getRestApi("sysdic.owner.field.code");

        let promise = this.restApi.request(api.method, api.url, [{ key: "_owner", value: owner }, { key: "_field", value: field }, { key: "_code", value: code }], undefined, undefined);

        promise.then(
            response => {
                let systemDictionarys: Array<SystemDictionary> = new Array<SystemDictionary>();

                if (response.resultCode && 100 == response.resultCode && response.resultContent) {
                    let content = response.resultContent

                    let systemDictionary: SystemDictionary = new SystemDictionary();

                    systemDictionary.owner = content.owner;
                    systemDictionary.field = content.field;
                    systemDictionary.code = content.code;
                    systemDictionary.value = content.value;
                    systemDictionary.displayValue = content.displayValue;

                    systemDictionarys.push(systemDictionary);

                    
                }

                callback.call(caller, true, systemDictionarys);
            }
        ).catch(
            reason => {
                callback.call(caller, false, reason.statusText);
            }
        );
    }
}