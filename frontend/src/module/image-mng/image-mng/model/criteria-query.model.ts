export class CriteriaQuery {
    areaId: string;
    imageOwner: string;
    imageName: string;
    os: string;
    status: string = "";
    imageType: string = "";
    constructor() {
    }

    toString() {
        return JSON.stringify(this);
    }
}
