export default class Vote {
    type: string = '';
    author: string = '';
    id: string = '';



    constructor(type:string,author:string,id:string) {
        this.id = id;
        this.type = type;
        this.author = author;
    }

}