class DatabaseModel {
  "bit": string;
  "bootStorageSize": number;
  "cpu": number;
  "dbType": number;//数据库类型
  "desc": string;
  "diskProfileList": Array<diskProfile>;
  "id": string;
  "memory": number;//内存
  "name": string;
  "os": string;//操作系统
  "status": number;
  "storageType": string;//存储类型
  "templateTpye": string;//模板类型
  "version": string;//版本
  "deployMode":number;//缺
  constructor() {
    this.cpu=2;
    this.memory=4;
    this.bootStorageSize=20;
    this.version='';
    this.storageType='FS';
    this.diskProfileList = [
      {
        "copyLevel": 2,
        "defaultPath": '/u01',
        "diskGroup": '',
        "minSize": 50,
        "usage": 0,
        "useDisplay": '安装主目录'
      },
      {
        "copyLevel": 0,
        "defaultPath": '/u02',
        "diskGroup": 'DATA',
        "minSize": 50,
        "usage": 1,
        "useDisplay": '数据库文件'
      },
      {
        "copyLevel": 1,
        "defaultPath": '/u03',
        "diskGroup": 'ARCH',
        "minSize": 200,
        "usage": 2,
        "useDisplay": '归档日志,快速恢复区'
      }
    ]
  }
}
class diskProfile {
  "copyLevel": number;//冗余级别
  "defaultPath": string;//挂在路径
  "diskGroup": string;//磁盘组
  "minSize": number;//最下
  "usage": number;//磁盘用途
  "useDisplay": string;//
}
class DatabaseOptions{
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
  "middleware": null;
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
export { DatabaseModel,DatabaseOptions}