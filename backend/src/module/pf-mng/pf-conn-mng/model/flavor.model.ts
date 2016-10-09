export class Flavor {
    uuid: String;
    id: String;
    name: String;
    displayName: String;
    vcpu: number;
    memSize: number;
    diskSize: number;
    publicFlag: boolean;
    description: String;

    toString() {
        return this.uuid + "\n" +
            this.id + "\n" +
            this.name + "\n" +
            this.displayName + "\n" +
            this.vcpu + "\n" +
            this.memSize + "\n" +
            this.diskSize + "\n" +
            this.publicFlag + "\n" +
            this.description;
    }
}