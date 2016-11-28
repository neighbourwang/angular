import { Role } from './role.model';
import { Organization } from './organization.model';
export class Account {
    id: string; // 编号
    userName: string; // 姓名
    loginName: string; //帐号信息
    phone: string; //联系电话
    email: string;// 邮箱
    selected: boolean;//是否选中
    description: string;//备注
    isLeader: boolean;
    type: string;//0 本地 ， 1 AD
    ldapId: string = "";
    ldapName: string;
    roles: Array<Role> = [];
    organizations: Array<Organization> = [];
    constructor() {
    }
}
