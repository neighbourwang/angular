class MiddleWareModel {
  "bit": string;
  "bootStorageSize": number;
  "cpu": number;
  "dbMiddlewareDiskTemplateModelList": Array<dbMiddlewareDiskTemplateModel>
  "deploymentMode": number;
  "id": string;
  "memory": number;
  "name": string;
  "os": string;
  "type": number;
  "version": string;
  "desc": string;
  "isDefault": 0;
  "status": 0;
  "templateType": string;
  constructor() {
    this.dbMiddlewareDiskTemplateModelList = [
      {
        usageType: 0,
        id: '',
        minDiskSize: 0,
        mountPath: '',
        templateId: '',
        useDisplay: '安装主目录'
      },
      {
        usageType: 1,
        id: '',
        minDiskSize: 0,
        mountPath: '',
        templateId: '',
        useDisplay: '数据库文件'        
      },
      {
        usageType: 2,
        id: '',
        minDiskSize: 0,
        mountPath: '',
        useDisplay: '归档日志,快速恢复区',
        templateId: '',
      }
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
