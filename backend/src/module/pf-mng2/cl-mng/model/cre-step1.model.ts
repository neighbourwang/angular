export class CreStep1Model {
    name : string; // 云平台名称
    dataCenter : string; //所属数据中心
    platformType : string ; //云平台类型id
    // platformTypeName : string; //云平台类型名称
    uri : string ; //地址
    version : string ;//版本
    userName : string ;//用户名
    passwd : string; //密码
    region : string;//region
    regionId : string; //所属地域
    supportChange:boolean;
    constructor() {
    }
}
