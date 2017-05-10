class DatabaseModel{
  "bit": string;
  "bootStorageSize": number;
  "cpu": number;
  "dbType": number;
  "desc": string;
  "diskProfileList": Array<diskProfile>;
  "id": string;
  "memory": number;
  "name": string;
  "os": string;
  "status": number;
  "storageType": string;
  "templateTpye": string;
  "version":string;
}
class diskProfile{
      "copyLevel": number;
      "defaultPath": string;
      "diskGroup": string;
      "minSize": number;
      "usage": number
    }