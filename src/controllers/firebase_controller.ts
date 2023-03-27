import { collection, getDocs } from "firebase/firestore";
import DB_Firestore from "../routes/firebase_firestore";


export async function GetAllPosts(){
    const postCollection = collection(DB_Firestore,'posts');
    const postSnapshot = await getDocs(postCollection);
    

}