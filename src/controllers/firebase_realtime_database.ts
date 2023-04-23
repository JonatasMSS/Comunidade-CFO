
import { RT_Database } from "../routes/firebase_app";
import { child, get, push, ref, update, query, orderByChild, equalTo, remove, set, QueryConstraint } from "firebase/database";
import UserModel from "../models/user_model";
import { EmailNotInDatabase } from "../errors/EmaitNotInFirestore";
import { EmailAlreadyExistsError } from "../errors/EmailAlreadyExistsError";
import PostModel from "../models/post_model";
import CommentModel from "../models/comment_model";
import { Timestamp } from "firebase/firestore";



//Referencia do banco de dados
const databaseReference = ref(RT_Database);


export const RTDeleteUser = async (userID: string) => {
    const userReference = ref(RT_Database, 'users/' + userID);
    await remove(userReference);

    return {
        code: 200,
        message: ['Usuário deletado com sucesso. ID:' + userID, userID]
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

    const verify = query(ref(RT_Database, 'users'), orderByChild('email'), equalTo(user.email),);
    const verifyUser = await get(verify);
    if (verifyUser.exists()) {
        throw new EmailAlreadyExistsError('Erro: Email já existente');
    }



    const userDataPost = {
        email: user.email,
        name: user.name,
        role: user.role,
        team: user.team,
    }

    console.log(user.UID);
    set(ref(RT_Database, 'users/' + user.UID), {
        ...userDataPost
    })


    return {
        code: 201,
        message: 'Usuário Criado com sucesso. ID:' + user.UID
    }



}
export const RTGetUserByEmail = async (email: string) => {
    const queriedUserData = query(ref(RT_Database, 'users'), orderByChild('email'), equalTo(email));
    const user = await get(queriedUserData);

    if (user.exists()) {
        return new UserModel({
            email: user.val()['email'],
            name: user.val()['name'],
            UID: user.key ?? '',
            role: user.val()['role'],
            team: user.val()['team'],
        })
    }
    return null;

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


export const RTCreatePost = async (postData: PostModel) => {
    const newPostKey = push(child(ref(RT_Database), 'posts')).key;
    const convertedTime = Timestamp.fromDate(postData.postTime);

    const postDataToSend = {
        body: postData.body,
        likes: postData.likes,
        team: postData.team,
        title: postData.title,
        user: postData.user,
        userId: postData.userId,
        postTime: convertedTime,

    }

    await update(ref(RT_Database, `posts/${newPostKey}`), {
        ...postDataToSend
    })

    return {
        code: 200,
        message: 'Post criado com sucesso.ID' + newPostKey
    }


}

interface IUpdatePost{
    body?:string;
    likes?:string;
    title?:string;
}
export const RTUpdatePost = async (postID:string, dataToChange:IUpdatePost) => {
    const postReference = ref(RT_Database,`posts/${postID}`);

    await update(postReference,{...dataToChange});

    return {
        code:200,
        message:`Post ${postID} alterado com sucesso`
    }
}
export const RTGetAllPost = async () => {
    const postReference = ref(RT_Database, 'posts');
    const posts = await get(postReference);

    let postList: PostModel[] = [];

    if (posts.exists()) {
        posts.forEach((post) => {
            const { seconds, nanoseconds } = post.val()['postTime'];
            const convertedToDate = new Timestamp(seconds, nanoseconds).toDate();
            postList.push(
                new PostModel(
                    {
                        UID: post.key ?? '',
                        body: post.val()['body'],
                        likes: post.val()['likes'],
                        team: post.val()['team'],
                        title: post.val()['title'],
                        user: post.val()['user'],
                        userId: post.val()['userId'],
                        postTime: convertedToDate,

                    }
                )
            )
        })

        return postList;
    }

    return null;


}
export const RTGetPost = async (id: string) => {
    const postReference = ref(RT_Database, 'posts/' + id);
    const post = await get(postReference);
    if (post.exists()) {
        const { seconds, nanoseconds } = post.val()['postTime'];
        const convertedToDate = new Timestamp(seconds, nanoseconds).toDate();
        return new PostModel(
            {
                UID: post.key ?? '',
                body: post.val()['body'],
                likes: post.val()['likes'],
                team: post.val()['team'],
                title: post.val()['title'],
                user: post.val()['user'],
                userId: post.val()['userId'],
                postTime: convertedToDate,

            }
        )
    }
    return null;
}


export const RTQueryGetPost = async (filter: QueryConstraint[]) => {
    const queriedReferencePost = query(ref(RT_Database, 'posts'), ...filter);
    const posts = await get(queriedReferencePost);
    let postList: PostModel[] = [];

    if (posts.exists()) {
        posts.forEach((post) => {
            const { seconds, nanoseconds } = post.val()['postTime'];
            const convertedToDate = new Timestamp(seconds, nanoseconds).toDate();
            postList.push(
                new PostModel(
                    {
                        UID: post.key ?? '',
                        body: post.val()['body'],
                        likes: post.val()['likes'],
                        team: post.val()['team'],
                        title: post.val()['title'],
                        user: post.val()['user'],
                        userId: post.val()['userId'],
                        postTime: convertedToDate,

                    }
                )
            )
        })

        return postList;
    }

    return null;

}


//Comments

export const RTQueryGetComments = async (filter: QueryConstraint[]) => {
    const queriedComments = query(ref(RT_Database, 'comments'), ...filter);
    const comments = await get(queriedComments);

    let commentsList: CommentModel[] = [];

    if (comments.exists()) {
        comments.forEach((comment) => {

            const {seconds,nanoseconds} = comment.val()['commentTime'];
            const convertedTime = new Timestamp(seconds,nanoseconds).toDate()

            commentsList.push(new CommentModel({
                UID: comment.key ?? '',
                body: comment.val()['body'],
                commentTime: convertedTime,
                likes: comment.val()['likes'],
                postReference: comment.val()['postReferenceId'],
                user: comment.val()['user']
            
            }))
        })
        return commentsList;
    }
    return null;
}
export const RTCreateComment = async (postUID:string,commentData:CommentModel) => {
    const newCommentkey = push(child(ref(RT_Database),'comments')).key;
    const convertedTime = Timestamp.fromDate(commentData.commentTime);
    
    const dataToSend = {
        UID:commentData.UID,
        body:commentData.body,
        likes:'0',
        postReference:postUID,
        user:commentData.user,
        commentTime:convertedTime
    }

    await update(ref(RT_Database,`comments/${newCommentkey}`),{
        ...dataToSend
    })

    return{
        code:200,
        msg: 'Dados enviados com sucesso!'
    }
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

