class MiddleWareModel {
  "bit": string;
  "bootStorageSize": number;
  "cpu": number;
  "dbMiddlewareDiskTemplateModelList": Array<dbMiddlewareDiskTemplateModel>;
  "diskInfoList":Array<dbMiddlewareDiskTemplateModel>;//编辑额外添加字段
  "deploymentMode": number;
  "id": string;
  "memory": number;
  "name": string;
  "os": string;
  "type": number;
  "createTime":number;
  "version": string;
  "desc": string;
  "isDefault": 0;
  "status": 0;
  "templateType": string;
  constructor() {
    this.templateType='middleware';
    this.cpu=2;
    this.memory=4;
    this.bootStorageSize=20;
    this.version='';
    this.bit='64bit';
    this.os='linux';
    this.deploymentMode=0;
    this.templateType='middleware';
    this.dbMiddlewareDiskTemplateModelList = [
      {
        usageType: 1,
        id: '',
        minDiskSize: 100,
        mountPath: '/data',
        templateId: '',
        useDisplay: '应用数据及日志'
      },
      // {
      //   usageType: 1,
      //   id: '',
      //   minDiskSize: 0,
      //   mountPath: '',
      //   templateId: '',
      //   useDisplay: '数据库文件'        
      // },
      // {
      //   usageType: 2,
      //   id: '',
      //   minDiskSize: 0,
      //   mountPath: '',
      //   useDisplay: '归档日志,快速恢复区',
      //   templateId: '',
      // }
    ]
  }
}
class dbMiddlewareDiskTemplateModel {
  "id": string;
  "minDiskSize": number;
  "mountPath": string;
  "templateId": string;
  "usageType": number;
  "useDisplay": string;
}

export { MiddleWareModel }
