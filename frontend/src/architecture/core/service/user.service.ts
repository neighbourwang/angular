import { Injectable, Optional } from '@angular/core';
import { Http, Headers, RequestOptionsArgs, Response, Jsonp, URLSearchParams } from '@angular/http';

@Injectable()
export class UserService {
    userId: string;
    userName: string;
    accessToken: string;
    loginFlg: boolean;
    constructor(
        private http:Http
    ) {
        this.resetData();
        // this.loginService();
    }

    login(userId: string, password: string) {
        this.userId = userId;
        this.loginFlg = true;
    }

    logout() {
        this.resetData();
    }

    isLogin(): boolean {
        return this.loginFlg;
        // return true;
    }

    private resetData() {
        this.userId = '';
        this.userName = '';
        this.accessToken = '';
        this.loginFlg = false;
    }

    loginService(){
        console.log(this.http)
        let username='gavin@hpe.com',
            password='12345';
        let data='grant_type=password'+'&username='+username+'&password='+password;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('15.114.100.52:30077/uaa/oauth/token',data,{headers:headers}).map(res => res.json())
            .subscribe(
             data => console.log(data),
             err => console.error(err),
            () => console.log('login Complete')
            )

    }
}
