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
}
