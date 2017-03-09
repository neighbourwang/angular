export class EmailSetupModel {
    noticeType: string = "";
    id: string = "";
    name: string = "";
    send: string = "";
    receivers: Array<string> = [];
    description: string = "";

    checked: boolean = false;

    toString(){
        return JSON.stringify(this);
    }

}