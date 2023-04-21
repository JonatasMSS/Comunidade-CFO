
import { error } from "console";
import { RT_Database } from "../routes/firebase_app";
import { Database, child, get, push, ref, set, update } from "firebase/database";
import ms from "ms";
import { async } from "@firebase/util";
import UserModel from "../models/user_model";
import { EmailNotInDatabase } from "../errors/EmaitNotInFirestore";
import { query } from "firebase/firestore";
import { User } from "@phosphor-icons/react";


//Referencia do banco de dados
const databaseReference = ref(RT_Database);




const RTGetAllUsers = async () => {
    //Pega todos o usuários
    let users:UserModel[] = []
    get(child(databaseReference,'users'))
    .then((snapshot) => {
        if(snapshot.exists()){
            snapshot.forEach((user) => {
                users.push(
                    new UserModel({
                        email:user.val()['email'],
                        name:user.val()['name'],
                        UID:user.key ?? '',
                        role:user.val()['role'],
                        team:user.val()['team'],
                    })
                )
            })
        }else{
            console.log('No data')
        }
    })


}
const RTGetUser = async (id:string) =>{
    get(child(databaseReference,`users/${id}`))
    .then((user) => {
        if(user.exists()){
            console.log(user.val())
            
            const userModelReturned = new UserModel(
                {
                    email:user.val()['email'],
                    name:user.val()['name'],
                    role:user.val()['role'],
                    team:user.val()['team'],
                    UID:user.key ?? '', 
                }
            )
            return userModelReturned;


        }else{
            throw new EmailNotInDatabase('Error: Usuário não encontrado');
        }
    });
}

const RTCreateUser = async (user:UserModel) => {
    const newUserKey = push(child(databaseReference,'users')).key;
    const referenceToUser = ref(RT_Database,`users/${newUserKey}`);


    const userDataPost = {
        email:user.email,
        name:user.name,
        role:user.role,
        team:user.team,
    }

    await update(referenceToUser,{...userDataPost});


    return {
        code:201,
        message:'Usuário Criado com sucesso. ID:' + newUserKey
    }

    
   
}
interface IUpdateUserData{
    name?:string;
    role?:string;
    team?:string;

}
const RTUpdateUserData = async (userID:string,dataToChange:IUpdateUserData) => {
   
    const databaseReferenceWithPath = ref(RT_Database,`users/${userID}`);
    await update(databaseReferenceWithPath,{...dataToChange});

    return{
        code:200,
        message: 'Seguinte dados atualizados com sucesso:' + dataToChange
    }
}

