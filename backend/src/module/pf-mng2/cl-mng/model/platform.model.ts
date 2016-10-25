export class Platform {
    id : string; //编号
    name: string; 
    platformType: string; // 云平台类型
    // platformTypeName : string; //云平台名称
    uri : string; // 访问地址
    userName : string; //账号
    passwd : string; //密码
    description : string; //说明
    version : string; //版本
    regionId : string; //地域
    dataCenter : string; //所属数据中心
    // status : number;
    // supportChange : boolean;
    isSelected : boolean;

    constructor() {
    }
}
