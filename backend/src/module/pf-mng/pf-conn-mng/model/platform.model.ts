export class Platform {
    name: String;
    platformTypeName: String;
    uri: String;
    userName: String;
    passwd: String;
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