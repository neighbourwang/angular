export class Enterprise {
    id: String;
    code: String;
    name: String;
    description: String;
    status: String;

    toString(): String {
        return this.id + "\r\n" +
            this.code + "\r\n" +
            this.name + "\r\n" +
            this.description + "\r\n" +
            this.status;
    }
}