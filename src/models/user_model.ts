

interface IUserModel{
    UID:string;
    name:string;
    role?:string | null;
    team?:string | null;
    email:string;
   
}

class UserModel{
    UID:string;
    name:string;
    role?:string | null;
    team?:string | null;
    email:string;
 

    constructor({...props}:IUserModel){
        this.UID = props.UID;
        this.name = props.name;
        this.role = props.role;
        this.team = props.team;
        this.email = props.email;
        
    }


    toFirestore(){
        return {
            email:this.email,
            role:this.role,
            team:this.team,
            name:this.name,
            UID:this.UID,
            
        }
    }
}

export default UserModel;