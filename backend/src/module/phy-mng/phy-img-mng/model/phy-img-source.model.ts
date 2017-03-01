import {Pool} from "./pool.model";
//      "description": "string",
//       "id": "string",
//       "imageName": "string",
//       "imageURL": "string",
//       "pmPoolList": [
    //     {
    //       "pmPoolId": "POOLID0000001",
    //       "pmPoolName": "资源池1"
    //     },
    //     {
    //       "pmPoolId": "POOLID0000002",
    //       "pmPoolName": "资源池2"
    //     }
    //   ]
//       "status": 0
export class PhyImgSource {
    id:string;
    imageName:string;
    imageURL:string;
    pmPoolList:Array<Pool>;
    description:string;
    status:string;

    selected:boolean;
}