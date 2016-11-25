import { Injectable } from "@angular/core";

@Injectable()
export class UserService {
    userId: string;
    userName: string;
    accessToken: string;
    loginFlg: boolean;

    constructor() {
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
        this.userId = "";
        this.userName = "";
        this.accessToken = "";
        this.loginFlg = false;
    }
}