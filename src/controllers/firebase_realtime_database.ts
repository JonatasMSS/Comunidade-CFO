
import { error } from "console";
import { RT_Database } from "../routes/firebase_app";
import { Database, child, get, push, ref, set, update,query, orderByChild, equalTo, remove } from "firebase/database";
import ms from "ms";
import { async } from "@firebase/util";
import UserModel from "../models/user_model";
import { EmailNotInDatabase } from "../errors/EmaitNotInFirestore";

import { User } from "@phosphor-icons/react";
import { EmailAlreadyExistsError } from "../errors/EmailAlreadyExistsError";


//Referencia do banco de dados
const databaseReference = ref(RT_Database);


export const RTDeleteUser = async (userID:string) => {
    const userReference = ref(RT_Database,'users/'+userID);
    await remove(userReference);

    return {
        code: 200,
        message:['Usuário deletado com sucesso. ID:' + userID,userID]
    }

}

export const RTGetAllUsers = async () => {
    //Pega todos o usuários
    let users: UserModel[] = []
    get(child(databaseReference, 'users'))
        .then((snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((user) => {
                    users.push(
                        new UserModel({
                            email: user.val()['email'],
                            name: user.val()['name'],
                            UID: user.key ?? '',
                            role: user.val()['role'],
                            team: user.val()['team'],
                        })
                    )
                })
            } else {
                console.log('No data')
            }
        })


}
export const RTGetUser = async (id: string) => {
    const user = await get(child(databaseReference, `users/${id}`));
    if (user.exists()) {
        const userModelReturned = new UserModel(
            {
                email: user.val()['email'],
                name: user.val()['name'],
                role: user.val()['role'],
                team: user.val()['team'],
                UID: user.key ?? '',
            }
        )


        return userModelReturned;

    }else{
        throw new EmailNotInDatabase('Error: Usuário não encontrado');
    }
}

export const RTCreateUser = async (user: UserModel) => {
  
    const verify = query(ref(RT_Database,'users'),orderByChild('email'),equalTo(user.email),);
    const verifyUser = await get(verify);
    if(verifyUser.exists()){
        throw new EmailAlreadyExistsError('Erro: Email já existente');
    }

    const newUserKey = push(child(databaseReference, 'users')).key;
    const referenceToUser = ref(RT_Database, `users/${newUserKey}`);


    const userDataPost = {
        email: user.email,
        name: user.name,
        role: user.role,
        team: user.team,
    }

    await update(referenceToUser, { ...userDataPost });


    return {
        code: 201,
        message: 'Usuário Criado com sucesso. ID:' + newUserKey
    }



}
interface IUpdateUserData {
    name?: string;
    role?: string;
    team?: string;

}
export const RTUpdateUserData = async (userID: string, dataToChange: IUpdateUserData) => {

    const databaseReferenceWithPath = ref(RT_Database, `users/${userID}`);
    await update(databaseReferenceWithPath, { ...dataToChange });

    return {
        code: 200,
        message: 'Seguinte dados atualizados com sucesso:' + dataToChange
    }
}

// const usertest = new UserModel(
//     {
//         email:'s@gmail.com',
//         name:'nome teste',
//         UID:'',
//         team:'team teste',
//         role:'role teste'
//     }
// )

// console.log(await RTDeleteUser('-NT_Pdw3SaTqvlJ9uru7'))

