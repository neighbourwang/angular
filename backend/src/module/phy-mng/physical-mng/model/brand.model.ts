export class Model{
    id: number;
    model: string;
}

export class Brand{
    id: number;
    brand: string;
    models:Array<Model>;
}