
import { RT_Database } from "../routes/firebase_app";
import { child, get, push, ref, update,query, orderByChild, equalTo, remove, set } from "firebase/database";
import UserModel from "../models/user_model";
import { EmailNotInDatabase } from "../errors/EmaitNotInFirestore";
import { EmailAlreadyExistsError } from "../errors/EmailAlreadyExistsError";
import PostModel from "../models/post_model";


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

    }
}

export const RTCreateUser = async (user: UserModel) => {
  
    const verify = query(ref(RT_Database,'users'),orderByChild('email'),equalTo(user.email),);
    const verifyUser = await get(verify);
    if(verifyUser.exists()){
        throw new EmailAlreadyExistsError('Erro: Email já existente');
    }



    const userDataPost = {
        email: user.email,
        name: user.name,
        role: user.role,
        team: user.team,
    }


    set(ref(RT_Database,'users/' + user.UID),{
        ...userDataPost
    })

  
    return {
        code: 201,
        message: 'Usuário Criado com sucesso. ID:' + user.UID
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




//POSTS CONTROLLERS

export const RTGetAllPost = async () => {
    const postReference = ref(RT_Database,'posts');
    const posts = await get(postReference);

    let postList:PostModel[] = [];

    if(posts.exists()){
        posts.forEach((post) => {
            postList.push(
                new PostModel(
                    {
                        UID:post.key ?? '',
                        body:post.val()['body'],
                        likes:post.val()['likes'],
                        team:post.val()['team'],
                        title:post.val()['title'],
                        user:post.val()['user'],
                        userId:post.val()['userId'],
                        postTime:post.val()['postTime'],

                    }
                )
            )
        })

        return postList;
    }
    
    return null;



}

// const usertest = new UserModel(
//     {
//         email:'s@gmail.com',
//         name:'nome teste',
//         UID:'2',
//         team:'team teste',
//         role:'role teste'
//     }
// )

// console.log(await RTCreateUser(usertest));

