export class StorageModel {

    // "description": "string",
    // "displayName": "string",
    // "id": "string",
    // "name": "string",
    // "quota": 0
    clusterName:String; //可用区名称
    name : String; //名称
    displayName : String; //显示名称
    quota : number; //配额
    quotaPercentDisplay:number;//显示比例
    quotaPercentage:number;//
    maximum : number;//最大空间
    description : String;//说明
    //   "platformId": "9e8267b6-665f-4891-81a5-8960e3996c82",
    //   "code": null,
    //   "clusterName": null
    replica: number;//副本
    type: number;//存储类型
    typeDisplayName: string//存储类型显示名称
    //   "status": 0,
    //   "uuid": null,
    isEdit:boolean;
    constructor() {
    }
}
