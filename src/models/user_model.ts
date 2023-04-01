

interface IUserModel{
    UID:string;
    name:string;
    role:string;
    team:string;
   

    
}

class UserModel{
    UID:string;
    name:string;
    role:string;
    team:string;
    constructor({...props}:IUserModel){
        this.UID = props.UID;
        this.name = props.name;
        this.role = props.role;
        this.team = props.team;
    }
}

export default UserModel;