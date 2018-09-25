class DatabaseModel {
  "bit": string;
  "bootStorageSize": number;
  "cpu": number;
  "dbType": number;//数据库类型
  "desc": string;
  "diskProfileList": Array<diskProfile>;
  "diskInfoList": Array<diskProfile>;
  "id": string;
  "memory": number;//内存
  "name": string;
  "os": string;//操作系统
  "status": number;
  "storageType": string;//存储类型
  "templateType": string;//模板类型
  "version": string;//版本
  "deploymentMode":number;//缺
  "createTime":number;
  constructor() {
    this.cpu=2;
    this.memory=4;
    this.bootStorageSize=20;
    this.version='';
    this.storageType='FS';
    this.bit='64bit';
    this.os='linux';
    this.deploymentMode=0;
    this.templateType='database';
    this.diskProfileList = [
      {
        "copyLevel": 2,
        "diskGroup": '',
        "useDisplay": '安装主目录',
        "minDiskSize":50,
        "mountPath":'/u01',
        "usageType":0,
        "minSizeValid":true,
      },
      {
        "copyLevel": 0,
        "diskGroup": 'DATA',
        "useDisplay": '数据库文件',
        "minDiskSize":50,
        "mountPath":'/u02',
        "usageType":1,
        "minSizeValid":true,
      },
      {
        "copyLevel": 1,
        "diskGroup": 'ARCH',
        "useDisplay": '归档日志,快速恢复区',
        "minDiskSize":200,
        "mountPath":'/u03',
        "usageType":2,
        "minSizeValid":true,
      }
    ]
  }
}
class diskProfile {
  "copyLevel": number;//冗余级别
  "diskGroup": string;//磁盘组
  "useDisplay": string;//
  //获取时字段不一样
  "minDiskSize":number;
  "mountPath":string;
  "usageType":number;
  "minSizeValid":boolean;
}
class TemplateOptions{
  items:Array<DatabaseOption>;
  constructor(){
    this.items=new Array<DatabaseOption>();
  }
}
class DatabaseOption {
  "db": {
    "code": string,
    "label": string,
    "value": number
  };//数据库 0 Oracle, 1 Mysql ,
  "middleware": {
    "code": string,
    "label": string,
    "value": number
  };;
  "version": Array<string>;
  "mode": Array<mode>//0 单节点部署,1 集群 ,
  constructor(){
    this.version=new Array<string>();
    this.mode=new Array<mode>();
  }
}
class mode {
  "code": string;
  "label": string;
  "value": number
}
export { DatabaseModel,TemplateOptions}