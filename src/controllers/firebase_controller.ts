import { Timestamp, collection, getDocs,doc, getDoc } from "firebase/firestore";
import DB_Firestore from "../routes/firebase_firestore";
import PostModel from "../models/post_model";
import CommentModel from "../models/comment_model";
import UserModel from "../models/user_model";


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
export async function GetUserData(id:string) {
    const userReference = doc(DB_Firestore,'users',id);
    const userSnap = await getDoc(userReference)
    
    if(userSnap.exists()){
        return new UserModel({
            name:userSnap.data()['name'],
            role:userSnap.data()['role'],
            team:userSnap.data()['team'],
            UID:userSnap.id
        })
    }

    return null;   
}
