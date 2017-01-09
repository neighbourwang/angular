export class Model{
    id: string;
    model: string;
}

export class Brand{
    id: string;
    brand: string;
    models:Array<Model> = [];
}