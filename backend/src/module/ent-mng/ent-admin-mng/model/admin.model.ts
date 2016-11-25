export class Admin {
    id: string;
    userName: string;
    contactPhone: string;
    email: string;
    description: string;
    loginName: string;
    password: string;
    enterpriseId: string;
    enterpriseName: string;
    status: number;
    ldapId: string = "";
    ldapName: string;
    isSelect = false;
    authMode: string;//0 ±¾µØ £¬ 1 AD

    constructor() {
    }
}