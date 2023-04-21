


export class EmailNotInDatabase extends Error{
    constructor(msg:string){
        super(msg);
    }
}