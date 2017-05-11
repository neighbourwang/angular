//物理机
export class PhysicalMachine{

    partsEntitys:Array<PhysicalMachinePart>=[]
}

export class PhysicalMachinePart{
    id:string;
    addonNumber:string;
    ajustmentPrice:string;
    number:string;//数量
    partsId:string;
    partsName:string;//部件名称
    referencePrice:string;
    specId:string;
    specName:string;//规格
    specValue:string;//规格值
    capacity:string;//只有磁盘和内存才有总容量
  
}


//  "pmEntity": {
//           "applicant": "string",
//           "brandId": 0,
//           "brandName": "string",
//           "department": "string",
//           "description": "string",
//           "endDate": "string",
//           "enterprise": "string",
//           "iloIPAddress": "string",
//           "iloPwd": "string",
//           "iloUserName": "string",
//           "image": "string",
//           "locale": "string",
//           "macAddress": "string",
//           "mainEndDate": "string",
//           "mainStartDate": "string",
//           "model": "string",
//           "modleId": 0,
//           "modleName": "string",
//           "partsEntitys": [
//             {
//               "addonNumber": 0,
//               "ajustmentPrice": 0,
//               "id": "string",
//               "number": 0,
//               "partsId": "string",
//               "partsName": "string",
//               "referencePrice": 0,
//               "specId": "string",
//               "specName": "string",
//               "specValue": "string"
//             }
//           ],
//           "partsList": [
//             {
//               "count": 0,
//               "specName": "string",
//               "specValue": "string"
//             }
//           ],
//           "pmId": "string",
//           "pmName": "string",
//           "pmPoolId": "string",
//           "priIPAddr": "string",
//           "pubIPAddr": "string",
//           "sererTypeId": 0,
//           "serverTypeName": "string",
//           "sn": "string",
//           "startDate": "string"
//         }