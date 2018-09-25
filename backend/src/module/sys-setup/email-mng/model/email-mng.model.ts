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

export class EmailTypeTemplateModel {
    id: string = "";
    name: string = "";
}

export class EmailTemplateModel {
    createDate: string = "";
    id: string = "";
    name: string = "";
    noticeType: string = "";
    templateType: string = "";

    checked: boolean = false;

    toString(){
        return JSON.stringify(this);
    }

}

export class EmailTemplateDetailsModel {
    content: string = "";
    name: string = "";
    noticeType: string = "";
    subject: string = "";

}