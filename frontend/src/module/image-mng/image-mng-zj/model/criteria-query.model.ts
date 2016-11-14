export class CriteriaQuery {
    areaList: string; 
    imageOwner: string;
    imageName: string;
    os: string;
    status: string = "99";
    imageType: string;
    constructor() {
    }

    toString() {
        return JSON.stringify(this);
    }
}
