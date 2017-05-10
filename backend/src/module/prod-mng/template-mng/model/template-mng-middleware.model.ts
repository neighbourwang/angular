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
}
class dbMiddlewareDiskTemplateModel{
      "id": string;
      "minDiskSize": number;
      "mountPath": string;
      "templateId": string;
      "usageType":number;
    }