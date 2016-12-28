class Member{
    "description": string;
      "email": string;
      "id": string;
      "isAD": number;
      "loginName": string;
      "name": string;     
      "phone": string;
       type:number;
       selected:boolean;
}
class Platform{
     "dataCenter": string;
      "description": string;
      "id": string;
      "name": string;
      "passwd": string;
      "platformTy":number;
      "platformTypeName": string;
      "regionId": string;
      "supportChange": boolean;
      "uri": string;
      "userName":string;
      "version": string;
      selected:boolean;
}
class  Org{
  "description": string;
  isDefault:boolean;
  "id": string;
  "leaderId": string;
  "members": Array<Member>;
  "name": string;
  "platforms": Array<Platform>
//   "resource": {
//     "disk": 0,
//     "image": 0,
//     "ipaddress": 0,
//     "mem": 0,
//     "physical": 0,
//     "snapshot": 0,
//     "storage": 0,
//     "vcpu": 0
//   }
}
export{
    Org,
    Member,
    Platform
}