
export class EmailAlreadyExistsError extends Error{
    constructor(message:string){
        super(message);
    }

    className(){
        return this.constructor.name;
    }
}