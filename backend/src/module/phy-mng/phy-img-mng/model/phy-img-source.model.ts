import {Pool} from "./pool.model";
//      "description": "string",
//       "id": "string",
//       "imageName": "string",
//       "imageURL": "string",
//       "pmPools": "资源池1， 资源池2， 资源池3"
//       "status": 0
export class PhyImgSource {
    id:string;
    imageName:string;
    imageURL:string;
    pmPools:string;
    description:string;
    status:string;

    selected:boolean;
}