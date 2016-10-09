export class Platform {
    name: String;
    platformTypeName: String;
    uri: String = "http://192.168.0.11:5000/v3";
    userName: String = "admin";
    passwd: String = "G0L90l1qh";
    version: String;
    description: String;
    status: number = 0;

    constructor() {
    }

    toString() {
        return this.name + "\n" +
            this.platformTypeName + "\n" +
            this.description + "\n" +
            this.uri + "\n" +
            this.userName + "\n" +
            this.passwd + "\n" +
            this.version + "\n" +
            this.status;
    }
}