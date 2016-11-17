import { Injectable, Optional } from '@angular/core';
import { Http, Headers, RequestOptionsArgs, Response, Jsonp, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';

@Injectable()
export class RestApi {

    public defaultHeaders : Headers;

    constructor(
        private http: Http
        // private jsonp: Jsonp
    ) {}

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

    private httpRequest(type: string, url: string, jwt: string, pathParams: Array<any>, queryParams: Array<any>, body: any): Promise<any> {
        console.debug(`START ${type} ${new Date().toLocaleString()}: ${url}`);

        const path = pathParams ? this.createPath(url, pathParams) : url;
        
        console.debug(`START ${type} ${new Date().toLocaleString()}: ${path}`);

        
        let queryParameters = this.createQueryParams(queryParams);
        let headerParams = new Headers();

        if (jwt) {
            headerParams.append('Authorization', jwt);
        }

        let requestOptions: RequestOptionsArgs = {
            method: type,
            headers: headerParams,
            search: queryParameters
        };
        if (body) {
            headerParams.append('Content-Type', 'application/json');
            requestOptions.body = JSON.stringify(body);
        }
        

        let resData = this.http.request(path, requestOptions)
                               .timeout(30000, new Error('接口请求超时！'))
                               .toPromise()
                               .then(
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
        let body:any;
        if(res.text() != '') {
            body = res.json();
        } else {
            body = {};
        }
        
        if (body.resultCode && body.resultCode != 100) {
            return Promise.reject(undefined);
        } else {
            return Promise.resolve(body);
        }
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
