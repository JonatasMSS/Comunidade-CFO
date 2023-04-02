

export class EmailNotVerified extends Error{
    constructor(msg:string){
        super(msg);
    }
}