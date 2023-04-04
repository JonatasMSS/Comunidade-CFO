


export class EmailNotInFirestore extends Error{
    constructor(msg:string){
        super(msg);
    }
}