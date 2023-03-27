import { Timestamp, collection, getDocs } from "firebase/firestore";
import DB_Firestore from "../routes/firebase_firestore";
import PostModel from "../models/post_model";


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
        console.log("Algo deu errado -> ",error);
    }
}


const data = await GetAllPosts();
console.log(data);