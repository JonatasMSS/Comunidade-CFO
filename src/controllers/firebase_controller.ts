import { Timestamp, collection, getDocs,doc, getDoc, setDoc, query, where, updateDoc, orderBy, OrderByDirection } from "firebase/firestore";
import DB_Firestore from "../routes/firebase_firestore";
import PostModel from "../models/post_model";
import CommentModel from "../models/comment_model";
import UserModel from "../models/user_model";

interface IFirestorePostDoc{
    body:string,
    likes:number,
    postTime:Timestamp,
    team:string,
    title:string,
    user:string,
    userId:string,
}


export async function CreatePost(post:PostModel){
    const postDoc = doc(DB_Firestore,'posts',post.UID);
    const dataToFiretstore:IFirestorePostDoc = {
        body:post.body,
        likes:Number(post.likes),
        postTime: Timestamp.fromDate(post.postTime),
        team:post.team,
        title:post.title,
        user:post.user,
        userId:post.userId,

    }

    await setDoc(postDoc,dataToFiretstore);
}


export async function QueryGetPost(queryData:string,direction?:OrderByDirection){

    let queriedPosts:PostModel[] = [];

    const postRefence = collection(DB_Firestore,'posts');
    const postQuery = query(postRefence,orderBy(queryData,direction))
    const postSnap = await getDocs(postQuery);

    if(!postSnap.empty){
        postSnap.forEach(post => {
            const { seconds, nanoseconds } = post.data().postTime;
            const convertedTime = new Timestamp(seconds, nanoseconds).toDate();
    
            //Empurra os dados para uma lista criada anteriormente
            queriedPosts.push(
                new PostModel({
                    UID: post.id,
                    team:post.data().team,
                    userId:post.data().userId,
                    user: post.data().user,
                    title: post.data().title,
                    body: post.data().body,
                    likes: post.data().likes,
                    postTime: convertedTime,
    
                })
            )
        })
        return queriedPosts;
    }
    return null;
    

}


interface IUpdatePostDate{
    title?: string;
    body?: string;
    likes?: number;
}

export async function UpdatePostData(postUID:string,{...rest}:IUpdatePostDate){
    const postRef = doc(DB_Firestore,'posts',postUID);
    await updateDoc(postRef,rest).then(() => console.log("mudança executada"))
}


export async function GetAllPosts() {
    try {
        const postCollection = collection(DB_Firestore, 'posts');
        const postSnapshot = await getDocs(postCollection);
        let PostList: PostModel[] = [];

        postSnapshot.forEach(post => {
            const { seconds, nanoseconds } = post.data().postTime;
            const convertedTime = new Timestamp(seconds, nanoseconds).toDate();

            //Empurra os dados para uma lista criada anteriormente
            PostList.push(
                new PostModel({
                    UID: post.id,
                    team:post.data().team,
                    userId:post.data().userId,
                    user: post.data().user,
                    title: post.data().title,
                    body: post.data().body,
                    likes: post.data().likes,
                    postTime: convertedTime,

                })
            )
        })

        return PostList;
    } catch (error) {
        console.log("Algo deu errado -> ", error);
    }
}

export async function GetAllComments() {
    try {
        const commentsCollection = collection(DB_Firestore, 'comments');
        const commentsSnapshot = await getDocs(commentsCollection);
        let CommentsList: CommentModel[] = [];

        commentsSnapshot.forEach(comment => {
            const { seconds, nanoseconds } = comment.data().commentTime;
            const convertedTime = new Timestamp(seconds, nanoseconds).toDate();
            //Empurra os dados para uma lista criada anteriormente
            CommentsList.push(
                new CommentModel({
                    UID: comment.id,
                    user: comment.data().name,
                    body: comment.data().body,
                    postReference: comment.data().postReference,
                    commentTime: convertedTime,
                    likes: comment.data().likes

                })
            )
        })

        return CommentsList;
    } catch (error) {
        console.log("Algo deu errado -> ", error);
    }
}

export async function GetCommentsInPost(postUID:string) {
    const commentsReference =   collection(DB_Firestore,'comments');
    const commentsQuery = query(commentsReference,where("postReference","==",postUID));
    const commentsSnapshot = await getDocs(commentsQuery);

    let comments:CommentModel[] = [];
    

    if(!commentsSnapshot.empty){
        commentsSnapshot.forEach(comment => {
            comments.push(
                new CommentModel({
                    body:comment.data().body,
                    commentTime:comment.data().time,
                    likes:comment.data().likes,
                    user:comment.data().name,
                    UID:comment.id,
                    postReference:comment.data().postReference
                })
            )
        })
        return comments;
    }
    return null
}

export async function GetUserData(email:string | null) {
    const userReference = doc(DB_Firestore,'users',email ?? '');
    const userSnap = await getDoc(userReference)
    
    if(userSnap.exists()){
        return new UserModel({
            name:userSnap.data()['name'],
            email:userSnap.id,
            role:userSnap.data()['role'],
            team:userSnap.data()['team'],
            UID:userSnap.data()['UID'],
        })
    }

    return null;   
}
export async function CreateUserInFirestore(userData:UserModel) {
    //Cria dados extras dos usuários usando email com identificador unico
    const usersReference = doc(DB_Firestore,'users',userData.email);
    await setDoc(usersReference,userData.toFirestore())
}
interface IDataUserEditable{
    role?:string,
    team?:string,
    name?:string
}
export async function UpdateUserInFirestore(userData:IDataUserEditable, userEmail:string){

    //Só é permitido alterar o time (team), a função(role) e o nickname.

    const usersReference = doc(DB_Firestore,'users',userEmail);
    await updateDoc(usersReference,{
        role:userData.role ?? 'no role',
        team:userData.team ?? 'no team',
        name: userData.name ??'no name'
    });
}