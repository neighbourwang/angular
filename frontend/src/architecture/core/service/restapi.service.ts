import { Injectable, Optional } from '@angular/core';
import { Http, Headers, RequestOptionsArgs, Response, Jsonp, URLSearchParams } from '@angular/http';


import { UserInfo } from '../model/userInfo';

import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';

@Injectable()
export class RestApi {

    public defaultHeaders: Headers;

    constructor(
        private http: Http
        // private jsonp: Jsonp
    ) { }

    get(url: string, pathParams: Array<any>, queryParams: any, jwt: string = undefined): Promise<any> {
        return this.httpRequest('GET', url, jwt, pathParams, queryParams, undefined);
    }

    post(url: string, pathParams: Array<any>, queryParams: any, body: any, jwt: string = undefined): Promise<any> {
        return this.httpRequest('POST', url, jwt, pathParams, queryParams, body);
    }

    put(url: string, pathParams: Array<any>, queryParams: any, body: any, jwt: string = undefined): Promise<any> {
        return this.httpRequest('PUT', url, jwt, pathParams, queryParams, body);
    }

    delete(url: string, pathParams: Array<any>, queryParams: any, body: any, jwt: string = undefined): Promise<any> {
        return this.httpRequest('DELETE', url, jwt, pathParams, queryParams, body);
    }

    request(type: string, url: string, pathParams: Array<any>, queryParams: Array<any>, body: any = undefined): Promise<any> {
        return this.httpRequest(type, url, undefined, pathParams, queryParams, body);
    }

    downloadFile(type: string, url: string, fileName:string = new Date().getTime().toString(), pathParams: Array<any> = undefined, queryParams: Array<any> = undefined, body): Promise<any>{
        let headers = new Headers();
        // headers.append("Content-Type", "application/octet-stream");
        // headers.append('responseType', 'arraybuffer');
        return this.httpRequest(type, url, undefined, pathParams, queryParams, body, headers)
                   .then(res => {
                       const blob = new Blob([res._body],{ type: 'octet/stream' });
                       return window.URL.createObjectURL(blob);
                   })
                   .then((url) => {
                        var a = document.createElement("a");
                        a.style.display = "none";
                        a.href = url;
                        a.download = fileName + ".xls";
                        a.click();
                        // window.URL.revokeObjectURL(url);
                        // window.open(url)
                   })
    }

    getLoginInfo() : {userInfo:UserInfo} {   //获取当前的登陆信息
        if(!sessionStorage["userInfo"] || !sessionStorage["token"]) {
            window.location.href = "/login.html";
        }
        return {
            userInfo : JSON.parse(sessionStorage["userInfo"]) || {}
            // userEnterpriseId : JSON.parse(sessionStorage["userEnterpriseId"])
        }
    }

    private httpRequest(type: string, url: string, jwt: string, pathParams: Array<any>, queryParams: Array<any>, body: any, headerParams: Headers = new Headers()): Promise<any> {
        console.debug(`START ${type} ${new Date().toLocaleString()}: ${url}`);

        const path = pathParams ? this.createPath(url, pathParams) : url;

        console.debug(`START ${type} ${new Date().toLocaleString()}: ${path}`);


        let queryParameters = this.createQueryParams(queryParams);

        let requestOptions: RequestOptionsArgs = {
            method: type,
            headers: headerParams,
            search: queryParameters
        };
        if (body) {
            headerParams.append('Content-Type', 'application/json');
            requestOptions.body = JSON.stringify(body);
        }

        let resData = environment.jwt.then((token: string) => {
            headerParams.append('Authorization', token);
        }).then(res =>
            this.http.request(path, requestOptions)
                .timeout(1000000, new Error('接口请求超时！'))
                .toPromise()
            ).then(
            res => {
                console.debug(`SUCCESS ${type} ${new Date().toLocaleString()}: ${path}`);
                // if (type == 'DELETE') {
                //     return Promise.resolve(0);
                // } else {
                return this.extractData(res);
                // }
            }
            )
            .catch(
            error => {
                console.debug(`FAILURE ${type} ${new Date().toLocaleString()}: ${path}`);
                if(error.status === 401 && error._body.indexOf("invalid_token") > -1) window.location.href = "/login.html";  //token不正确重新登录
                return this.handleError(error);
            }
            );

        // console.debug(`END ${type} ${new Date().toLocaleString()}: ${path}`);

        return resData;
    }

    private createPath(url: string, params: Array<any>): string {
        params.forEach(param => {
            url = url.replace(`{${param.key}}`, param.value);
        });

        return url;
    }

    private createQueryParams(params: Array<any>) {
        let queryParameters = new URLSearchParams();

        if (params) {
            params.forEach(element => {
                queryParameters.set(element.key, element.value);
            });
        }

        return queryParameters;
    }

    private extractData(res: Response) {
        let body: any;
        
        if (res.text() != '') {
            try{
                body = res.json();
            }catch(e){
                body = res;
            }
        } else {
            body = {};
        }

        return Promise.resolve(body);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
